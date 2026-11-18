/**
 * RouxCraft - True 3D Physical Rubik's Cube Engine with Realistic Slice Turning
 * Renders 26 physical 3D cubelets (cubies) with genuine slice rotation physics,
 * smooth 60fps cubic-bezier animation, and mouse orbit controls.
 */

class VirtualCube3D {
    constructor(containerElem, options = {}) {
        this.container = containerElem;
        this.options = {
            interactiveStudio: false,
            scale: 1.0,
            onStickerClick: null,
            onStickerRightClick: null,
            onArrowClick: null,
            getArrowStartPoint: null,
            onStudioMove: null,
            ...options
        };

        this.cube = new CubeModel();
        this.initialCube = new CubeModel();
        this.algorithm = '';
        this.movesList = [];
        this.currentStep = 0;
        this.isPlaying = false;
        this.playTimer = null;
        this.isAnimating = false;
        const urlDur = (typeof window !== 'undefined' && window.location)
            ? Number(new URLSearchParams(window.location.search).get('animDuration'))
            : NaN;
        this.animDuration = (Number.isFinite(urlDur) && urlDur >= 80 && urlDur <= 3000) ? urlDur : 260; // ms per move animation
        this.sequenceAbort = false;

        // Perspective & Mouse orbit controls
        this.rotX = -26;
        this.rotY = -36;
        this.currentViewMode = 'iso_ufr';
        this.isDragging = false;
        this.hasDragged = false;
        this.downX = 0;
        this.downY = 0;
        this.downButton = 0;
        this.downSticker = null;
        this.lastMouseX = 0;
        this.lastMouseY = 0;

        // Cubies registry (26 pieces)
        this.cubies = [];
        this._boundMouseMove = null;
        this._boundMouseUp = null;
        this._boundTouchMove = null;
        this._boundTouchEnd = null;

        this.initDOM();
        this.buildPhysicalCubies();
        this.attachMouseEvents();
    }

    initDOM() {
        const isStudio = this.options.interactiveStudio;
        if (isStudio) {
            this.container.innerHTML = `
                <div class="cube3d-wrapper studio-3d-mode">
                    <div class="studio-3d-top-hud">
                        <span class="studio-3d-hover-hud">
                            <i data-lucide="orbit" style="width: 13px; height: 13px; color: var(--accent);"></i>
                            <span class="hover-hud-text">Giữ & kéo để xoay 360° • Nhấp trái tô màu • Nhấp phải xóa ô</span>
                        </span>
                    </div>
                    <div class="cube3d-viewport">
                        <div class="cube3d-scene"></div>
                        <svg class="cube3d-arrow-overlay" xmlns="http://www.w3.org/2000/svg"></svg>
                    </div>
                    <div class="studio-3d-cam-bar">
                        <button type="button" class="studio-cam-btn" data-cam="iso_ufr" title="Góc Trước - Phải (U-F-R)">U-F-R</button>
                        <button type="button" class="studio-cam-btn" data-cam="iso_ufl" title="Góc Trước - Trái (First Block)">U-F-L (FB)</button>
                        <button type="button" class="studio-cam-btn" data-cam="top_down" title="Góc Trên Đỉnh (CMLL)">Đỉnh U</button>
                        <button type="button" class="studio-cam-btn" data-cam="back" title="Quay ra Mặt Sau (B)">Mặt Sau (B)</button>
                        <button type="button" class="studio-cam-btn" data-cam="bottom" title="Quay xuống Mặt Đáy (D)">Mặt Đáy (D)</button>
                    </div>
                    <div class="studio-3d-keypad" title="Xoay trực tiếp từng tầng trên khối 3D">
                        <button type="button" class="studio-turn-btn" data-move="R">R</button>
                        <button type="button" class="studio-turn-btn" data-move="R'">R'</button>
                        <button type="button" class="studio-turn-btn" data-move="L">L</button>
                        <button type="button" class="studio-turn-btn" data-move="L'">L'</button>
                        <button type="button" class="studio-turn-btn" data-move="U">U</button>
                        <button type="button" class="studio-turn-btn" data-move="U'">U'</button>
                        <button type="button" class="studio-turn-btn" data-move="F">F</button>
                        <button type="button" class="studio-turn-btn" data-move="F'">F'</button>
                        <button type="button" class="studio-turn-btn" data-move="r">r</button>
                        <button type="button" class="studio-turn-btn" data-move="r'">r'</button>
                        <button type="button" class="studio-turn-btn" data-move="M">M</button>
                        <button type="button" class="studio-turn-btn" data-move="M'">M'</button>
                        <button type="button" class="studio-turn-btn" data-move="M2">M2</button>
                    </div>
                </div>
            `;
        } else {
            this.container.innerHTML = `
                <div class="cube3d-wrapper">
                    <div class="cube3d-viewport">
                        <div class="cube3d-scene"></div>
                    </div>
                    <div class="cube3d-drag-hint">
                        <span class="hint-text">
                            <i data-lucide="orbit" style="width: 13px; height: 13px; display: inline-block; vertical-align: -2px;"></i>
                            Kéo chuột để xoay góc nhìn 3D • Các tầng xoay hoạt ảnh thật 100%
                        </span>
                    </div>
                </div>
            `;
        }

        this.scene = this.container.querySelector('.cube3d-scene');
        this.viewport = this.container.querySelector('.cube3d-viewport');
        this.arrowOverlay = this.container.querySelector('.cube3d-arrow-overlay');
        this.hoverHudText = this.container.querySelector('.hover-hud-text');

        if (isStudio) {
            // Wire quick 3D camera snap buttons
            this.container.querySelectorAll('.studio-cam-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    this.setCameraView(btn.dataset.cam, true);
                    if (window.SoundEngine) window.SoundEngine.playClick();
                });
            });

            // Wire live 3D turn keypad in Studio
            this.container.querySelectorAll('.studio-turn-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    const mv = btn.dataset.move;
                    if (!mv || this.isAnimating) return;
                    if (this.cube && this.cube.clearArrows) this.cube.clearArrows();
                    this.animateMove(mv, () => {
                        if (this.options.onStudioMove) this.options.onStudioMove(mv);
                    });
                });
            });

            if (window.lucide) window.lucide.createIcons();
        }

        this.updateSceneTransform();
    }

    /**
     * Bind an external CubeModel directly (used by Interactive 3D Studio)
     */
    bindCube(cubeModel) {
        this.cube = cubeModel;
        this.initialCube = cubeModel;
        this.updateCubieStickers();
    }

    destroy() {
        this.sequenceAbort = true;
        this.pause();
        if (this._boundMouseMove) window.removeEventListener('mousemove', this._boundMouseMove);
        if (this._boundMouseUp) window.removeEventListener('mouseup', this._boundMouseUp);
        if (this._boundTouchMove) window.removeEventListener('touchmove', this._boundTouchMove);
        if (this._boundTouchEnd) window.removeEventListener('touchend', this._boundTouchEnd);
    }

    /**
     * Construct 26 physical cubelets in 3D space
     */
    buildPhysicalCubies() {
        this.scene.innerHTML = '';
        this.cubies = [];

        const size = 48; // cubie width
        const gap = 52;  // distance between centers

        for (let x = -1; x <= 1; x++) {
            for (let y = -1; y <= 1; y++) {
                for (let z = -1; z <= 1; z++) {
                    if (x === 0 && y === 0 && z === 0) continue; // skip core

                    const cubieElem = document.createElement('div');
                    cubieElem.className = 'cubie-3d';
                    cubieElem.dataset.x = x;
                    cubieElem.dataset.y = y;
                    cubieElem.dataset.z = z;

                    // 6 Faces of each cubie
                    const faces = ['u', 'd', 'f', 'b', 'l', 'r'];
                    faces.forEach(f => {
                        const faceDiv = document.createElement('div');
                        faceDiv.className = `cubie-face cubie-face-${f}`;
                        cubieElem.appendChild(faceDiv);
                    });

                    // Set default resting position
                    const tx = x * gap;
                    const ty = -y * gap; // In screen space, y is inverted
                    const tz = z * gap;
                    cubieElem.style.transform = `translate3d(${tx}px, ${ty}px, ${tz}px)`;

                    this.scene.appendChild(cubieElem);
                    this.cubies.push({
                        elem: cubieElem,
                        x, y, z,
                        tx, ty, tz
                    });
                }
            }
        }

        this.updateCubieStickers();
    }

    /**
     * Map CubeModel's 54 facelets onto the 26 cubies' external faces
     */
    updateCubieStickers() {
        const arrowStart = this.options.getArrowStartPoint ? this.options.getArrowStartPoint() : null;

        const applySticker = (faceElem, faceName, idx) => {
            const colHex = this.cube.getSticker(faceName, idx);
            faceElem.style.backgroundColor = colHex;
            faceElem.classList.add('is-sticker');
            faceElem.dataset.face = faceName;
            faceElem.dataset.index = String(idx);
            const isStart = arrowStart && arrowStart.face === faceName && arrowStart.idx === idx;
            faceElem.classList.toggle('arrow-start-highlight', Boolean(isStart));
        };

        const clearSticker = (faceElem) => {
            faceElem.style.backgroundColor = '#0B1120';
            faceElem.classList.remove('is-sticker', 'arrow-start-highlight');
            delete faceElem.dataset.face;
            delete faceElem.dataset.index;
        };

        this.cubies.forEach(c => {
            const { x, y, z, elem } = c;

            // 1. Up Face (y = 1)
            const uFace = elem.querySelector('.cubie-face-u');
            if (y === 1) {
                const uRow = (z === -1 ? 0 : (z === 0 ? 1 : 2));
                const uCol = x + 1;
                applySticker(uFace, 'U', uRow * 3 + uCol);
            } else {
                clearSticker(uFace);
            }

            // 2. Down Face (y = -1)
            const dFace = elem.querySelector('.cubie-face-d');
            if (y === -1) {
                const dRow = (z === 1 ? 0 : (z === 0 ? 1 : 2));
                const dCol = x + 1;
                applySticker(dFace, 'D', dRow * 3 + dCol);
            } else {
                clearSticker(dFace);
            }

            // 3. Front Face (z = 1)
            const fFace = elem.querySelector('.cubie-face-f');
            if (z === 1) {
                const fRow = 1 - y;
                const fCol = x + 1;
                applySticker(fFace, 'F', fRow * 3 + fCol);
            } else {
                clearSticker(fFace);
            }

            // 4. Back Face (z = -1)
            const bFace = elem.querySelector('.cubie-face-b');
            if (z === -1) {
                const bRow = 1 - y;
                const bCol = 1 - x;
                applySticker(bFace, 'B', bRow * 3 + bCol);
            } else {
                clearSticker(bFace);
            }

            // 5. Left Face (x = -1)
            const lFace = elem.querySelector('.cubie-face-l');
            if (x === -1) {
                const lRow = 1 - y;
                const lCol = z + 1;
                applySticker(lFace, 'L', lRow * 3 + lCol);
            } else {
                clearSticker(lFace);
            }

            // 6. Right Face (x = 1)
            const rFace = elem.querySelector('.cubie-face-r');
            if (x === 1) {
                const rRow = 1 - y;
                const rCol = 1 - z;
                applySticker(rFace, 'R', rRow * 3 + rCol);
            } else {
                clearSticker(rFace);
            }
        });

        if (this.options.interactiveStudio) {
            requestAnimationFrame(() => this.render3DArrows());
        }
    }

    // =========================================================================
    // PHYSICAL 3D SLICE ROTATION ANIMATOR
    // =========================================================================
    /**
     * Animate a slice or cube turn physically in 3D
     */
    animateMove(moveStr, onComplete) {
        if (!moveStr) {
            if (onComplete) onComplete();
            return;
        }

        const base = moveStr[0];
        const mod = moveStr.slice(1);
        let turns = 1;
        if (mod === "'") turns = -1;
        else if (mod === '2' || mod === "2'") turns = 2;

        // Determine axis, rotation angle, and cubies selector
        let axis = 'Y';
        let angleDeg = -90 * turns;
        let selector = () => false;

        switch (base) {
            case 'U':
                axis = 'Y';
                angleDeg = -90 * turns;
                selector = c => c.y === 1;
                break;
            case 'D':
                axis = 'Y';
                angleDeg = 90 * turns;
                selector = c => c.y === -1;
                break;
            case 'R':
                axis = 'X';
                angleDeg = 90 * turns;
                selector = c => c.x === 1;
                break;
            case 'L':
                axis = 'X';
                angleDeg = -90 * turns;
                selector = c => c.x === -1;
                break;
            case 'F':
                axis = 'Z';
                angleDeg = 90 * turns;
                selector = c => c.z === 1;
                break;
            case 'B':
                axis = 'Z';
                angleDeg = -90 * turns;
                selector = c => c.z === -1;
                break;
            // Roux Special Slices
            case 'M':
                // Follows L direction
                axis = 'X';
                angleDeg = -90 * turns;
                selector = c => c.x === 0;
                break;
            case 'E':
                // Follows D direction
                axis = 'Y';
                angleDeg = 90 * turns;
                selector = c => c.y === 0;
                break;
            case 'S':
                // Follows F direction
                axis = 'Z';
                angleDeg = 90 * turns;
                selector = c => c.z === 0;
                break;
            // Wide Moves
            case 'r':
                axis = 'X';
                angleDeg = 90 * turns;
                selector = c => c.x >= 0;
                break;
            case 'l':
                axis = 'X';
                angleDeg = -90 * turns;
                selector = c => c.x <= 0;
                break;
            case 'u':
                axis = 'Y';
                angleDeg = -90 * turns;
                selector = c => c.y >= 0;
                break;
            case 'd':
                axis = 'Y';
                angleDeg = 90 * turns;
                selector = c => c.y <= 0;
                break;
            case 'f':
                axis = 'Z';
                angleDeg = 90 * turns;
                selector = c => c.z >= 0;
                break;
            case 'b':
                axis = 'Z';
                angleDeg = -90 * turns;
                selector = c => c.z <= 0;
                break;
            // Cube Rotations
            case 'x':
                axis = 'X';
                angleDeg = 90 * turns;
                selector = () => true;
                break;
            case 'y':
                axis = 'Y';
                angleDeg = -90 * turns;
                selector = () => true;
                break;
            case 'z':
                axis = 'Z';
                angleDeg = 90 * turns;
                selector = () => true;
                break;
            default:
                this.cube.executeMove(moveStr);
                this.updateCubieStickers();
                if (onComplete) onComplete();
                return;
        }

        // Create temporary rotating group
        const movingCubies = this.cubies.filter(selector);
        const rotGroup = document.createElement('div');
        rotGroup.className = 'rotating-slice-group';
        rotGroup.style.transformStyle = 'preserve-3d';
        this.scene.appendChild(rotGroup);

        // Move target cubies into the rotating container
        movingCubies.forEach(c => rotGroup.appendChild(c.elem));

        this.isAnimating = true;
        window.SoundEngine.playClick();

        // Force style flush then trigger 3D rotation transition
        void rotGroup.offsetWidth;
        requestAnimationFrame(() => {
            rotGroup.style.transition = `transform ${this.animDuration}ms cubic-bezier(0.2, 0.85, 0.3, 1)`;
            rotGroup.style.transform = `rotate${axis}(${angleDeg}deg)`;
        });

        // After animation completes, update logical state and reset DOM
        setTimeout(() => {
            // Update logical cube state
            this.cube.executeMove(moveStr);

            // Return cubies to main scene container
            movingCubies.forEach(c => {
                c.elem.style.transform = `translate3d(${c.tx}px, ${c.ty}px, ${c.tz}px)`;
                this.scene.appendChild(c.elem);
            });
            rotGroup.remove();

            // Refresh sticker colors from updated CubeModel
            this.updateCubieStickers();
            this.isAnimating = false;

            if (onComplete) onComplete();
        }, this.animDuration + 20);
    }

    /**
     * Sequentially animate a list of moves on this 3D cube (for Studio Simulator!)
     */
    animateSequence(moves, onComplete) {
        if (!Array.isArray(moves) || moves.length === 0) {
            if (onComplete) onComplete();
            return;
        }
        this.sequenceAbort = false;
        const prevDur = this.animDuration;
        this.animDuration = moves.length > 8 ? 115 : (moves.length > 4 ? 155 : 210);

        let i = 0;
        const next = () => {
            if (this.sequenceAbort || i >= moves.length) {
                this.animDuration = prevDur;
                if (onComplete) onComplete();
                return;
            }
            const mv = moves[i++];
            this.animateMove(mv, () => {
                setTimeout(next, 25);
            });
        };
        next();
    }

    // =========================================================================
    // MOUSE & TOUCH ORBIT CONTROLS + INTERACTIVE STUDIO PAINTING
    // =========================================================================
    attachMouseEvents() {
        const isStudio = this.options.interactiveStudio;
        const faceLabels = {
            U: { name: 'Mặt Trên (U)', dot: '#FDE047' },
            D: { name: 'Mặt Đáy (D)', dot: '#FFFFFF' },
            F: { name: 'Mặt Trước (F)', dot: '#EF4444' },
            B: { name: 'Mặt Sau (B)', dot: '#F97316' },
            L: { name: 'Mặt Trái (L)', dot: '#3B82F6' },
            R: { name: 'Mặt Phải (R)', dot: '#10B981' }
        };

        if (isStudio) {
            this.viewport.addEventListener('contextmenu', (e) => {
                e.preventDefault();
            });

            this.viewport.addEventListener('mouseover', (e) => {
                if (this.isDragging) return;
                const sticker = e.target.closest('.cubie-face.is-sticker');
                if (sticker && sticker.dataset.face && this.hoverHudText) {
                    const f = sticker.dataset.face;
                    const idx = parseInt(sticker.dataset.index, 10);
                    const info = faceLabels[f] || { name: f, dot: '#38BDF8' };
                    this.hoverHudText.innerHTML = `<span class="hud-face-dot" style="background:${info.dot};"></span> Đang trỏ: <strong>${info.name}</strong> • Ô #${idx + 1}`;
                }
            });

            this.viewport.addEventListener('mouseleave', () => {
                if (this.hoverHudText) {
                    this.hoverHudText.textContent = 'Giữ & kéo để xoay 360° • Nhấp trái tô màu • Nhấp phải xóa ô';
                }
            });
        }

        this.viewport.addEventListener('mousedown', (e) => {
            if (e.button !== 0 && !(isStudio && e.button === 2)) return;
            this.isDragging = true;
            this.hasDragged = false;
            this.downX = e.clientX;
            this.downY = e.clientY;
            this.downButton = e.button;
            this.downSticker = e.target.closest('.cubie-face.is-sticker');
            this.lastMouseX = e.clientX;
            this.lastMouseY = e.clientY;
            if (!isStudio) {
                this.viewport.style.cursor = 'grabbing';
            }
        });

        this._boundMouseMove = (e) => {
            if (!this.isDragging) return;
            const totalDist = Math.hypot(e.clientX - this.downX, e.clientY - this.downY);
            if (!this.hasDragged && totalDist > 5) {
                this.hasDragged = true;
                this.viewport.style.cursor = 'grabbing';
                if (this.scene) this.scene.style.transition = 'none';
            }

            if (this.hasDragged || !isStudio) {
                const dx = e.clientX - this.lastMouseX;
                const dy = e.clientY - this.lastMouseY;

                this.rotY += dx * 0.55;
                this.rotX -= dy * 0.55;
                this.rotX = Math.max(-85, Math.min(85, this.rotX));

                this.lastMouseX = e.clientX;
                this.lastMouseY = e.clientY;
                this.updateSceneTransform();
            }
        };
        window.addEventListener('mousemove', this._boundMouseMove);

        this._boundMouseUp = () => {
            if (!this.isDragging) return;
            const wasClick = !this.hasDragged;
            const sticker = this.downSticker;
            const btn = this.downButton;

            this.isDragging = false;
            this.hasDragged = false;
            this.downSticker = null;
            this.viewport.style.cursor = 'grab';
            if (this.scene) this.scene.style.transition = 'transform 0.08s ease-out';

            if (isStudio && wasClick && sticker && sticker.dataset.face && !this.isAnimating) {
                const face = sticker.dataset.face;
                const idx = parseInt(sticker.dataset.index, 10);
                if (btn === 0 && this.options.onStickerClick) {
                    this.options.onStickerClick(face, idx, sticker);
                } else if (btn === 2 && this.options.onStickerRightClick) {
                    this.options.onStickerRightClick(face, idx, sticker);
                }
            }
        };
        window.addEventListener('mouseup', this._boundMouseUp);

        // Touch support
        this.viewport.addEventListener('touchstart', (e) => {
            if (e.touches.length === 1) {
                this.isDragging = true;
                this.hasDragged = false;
                this.downX = e.touches[0].clientX;
                this.downY = e.touches[0].clientY;
                this.downSticker = e.target.closest('.cubie-face.is-sticker');
                this.lastMouseX = e.touches[0].clientX;
                this.lastMouseY = e.touches[0].clientY;
            }
        }, { passive: true });

        this._boundTouchMove = (e) => {
            if (!this.isDragging || e.touches.length !== 1) return;
            const totalDist = Math.hypot(e.touches[0].clientX - this.downX, e.touches[0].clientY - this.downY);
            if (totalDist > 6) this.hasDragged = true;

            if (this.hasDragged || !isStudio) {
                const dx = e.touches[0].clientX - this.lastMouseX;
                const dy = e.touches[0].clientY - this.lastMouseY;

                this.rotY += dx * 0.65;
                this.rotX -= dy * 0.65;
                this.rotX = Math.max(-85, Math.min(85, this.rotX));

                this.lastMouseX = e.touches[0].clientX;
                this.lastMouseY = e.touches[0].clientY;
                this.updateSceneTransform();
            }
        };
        window.addEventListener('touchmove', this._boundTouchMove, { passive: true });

        this._boundTouchEnd = () => {
            if (!this.isDragging) return;
            const wasTap = !this.hasDragged;
            const sticker = this.downSticker;
            this.isDragging = false;
            this.hasDragged = false;
            this.downSticker = null;

            if (isStudio && wasTap && sticker && sticker.dataset.face && !this.isAnimating) {
                const face = sticker.dataset.face;
                const idx = parseInt(sticker.dataset.index, 10);
                if (this.options.onStickerClick) {
                    this.options.onStickerClick(face, idx, sticker);
                }
            }
        };
        window.addEventListener('touchend', this._boundTouchEnd);
    }

    updateSceneTransform() {
        if (this.scene) {
            const s = this.options.scale || 1.0;
            const scalePart = s !== 1.0 ? `scale3d(${s}, ${s}, ${s}) ` : '';
            this.scene.style.transform = `${scalePart}rotateX(${this.rotX}deg) rotateY(${this.rotY}deg)`;
        }
        if (this.options.interactiveStudio) {
            this.render3DArrows();
        }
    }

    setCameraView(viewMode, smooth = false) {
        this.currentViewMode = viewMode || 'iso_ufr';
        if (this.scene && smooth) {
            this.scene.style.transition = 'transform 0.35s cubic-bezier(0.22, 1, 0.36, 1)';
            setTimeout(() => {
                if (this.scene) this.scene.style.transition = 'transform 0.08s ease-out';
                if (this.options.interactiveStudio) this.render3DArrows();
            }, 370);
        }

        if (this.currentViewMode === 'iso_ufl') {
            this.rotX = -26;
            this.rotY = 36;
        } else if (this.currentViewMode === 'top_down') {
            this.rotX = -65;
            this.rotY = -20;
        } else if (this.currentViewMode === 'back') {
            this.rotX = -26;
            this.rotY = 144;
        } else if (this.currentViewMode === 'bottom') {
            this.rotX = 58;
            this.rotY = -30;
        } else {
            // Standard Front-Right view (iso_ufr)
            this.rotX = -26;
            this.rotY = -36;
        }

        // Highlight active quick camera button in Studio
        if (this.options.interactiveStudio && this.container) {
            this.container.querySelectorAll('.studio-cam-btn').forEach(btn => {
                btn.classList.toggle('active', btn.dataset.cam === this.currentViewMode);
            });
        }

        this.updateSceneTransform();
    }

    /**
     * Check if a face normal is currently visible to the camera under rotateX(rotX) rotateY(rotY)
     */
    isFaceVisible(faceName) {
        const normals = {
            F: [0, 0, 1],
            B: [0, 0, -1],
            R: [1, 0, 0],
            L: [-1, 0, 0],
            U: [0, -1, 0],
            D: [0, 1, 0]
        };
        const n = normals[faceName];
        if (!n) return false;
        const ax = (this.rotX * Math.PI) / 180;
        const ay = (this.rotY * Math.PI) / 180;
        const y1 = n[1];
        const z1 = -n[0] * Math.sin(ay) + n[2] * Math.cos(ay);
        const z2 = y1 * Math.sin(ax) + z1 * Math.cos(ax);
        return z2 > 0.03;
    }

    /**
     * Render real-time 2D-projected SVG arrows tracking the 3D stickers
     */
    render3DArrows() {
        if (!this.arrowOverlay || !this.viewport) return;
        const arrows = this.cube && Array.isArray(this.cube.arrows) ? this.cube.arrows : [];
        if (arrows.length === 0) {
            this.arrowOverlay.innerHTML = '';
            return;
        }

        const vpRect = this.viewport.getBoundingClientRect();
        if (vpRect.width === 0 || vpRect.height === 0) return;

        const svgNS = 'http://www.w3.org/2000/svg';
        this.arrowOverlay.setAttribute('viewBox', `0 0 ${vpRect.width} ${vpRect.height}`);
        this.arrowOverlay.innerHTML = '';

        // Marker definitions
        const defs = document.createElementNS(svgNS, 'defs');
        const makeMarker = (id, col) => {
            const m = document.createElementNS(svgNS, 'marker');
            m.setAttribute('id', id);
            m.setAttribute('viewBox', '0 0 10 10');
            m.setAttribute('refX', '7');
            m.setAttribute('refY', '5');
            m.setAttribute('markerWidth', '6');
            m.setAttribute('markerHeight', '6');
            m.setAttribute('orient', 'auto-start-reverse');
            const p = document.createElementNS(svgNS, 'path');
            p.setAttribute('d', 'M 0 1.5 L 9 5 L 0 8.5 z');
            p.setAttribute('fill', col);
            m.appendChild(p);
            return m;
        };
        defs.appendChild(makeMarker('arrow3d-cyan', '#38BDF8'));
        defs.appendChild(makeMarker('arrow3d-yellow', '#FDE047'));
        defs.appendChild(makeMarker('arrow3d-red', '#EF4444'));
        defs.appendChild(makeMarker('arrow3d-green', '#10B981'));
        this.arrowOverlay.appendChild(defs);

        arrows.forEach((arrow, arrowIndex) => {
            if (!this.isFaceVisible(arrow.fromFace) || !this.isFaceVisible(arrow.toFace)) return;

            const startEl = this.scene.querySelector(`.cubie-face.is-sticker[data-face="${arrow.fromFace}"][data-index="${arrow.fromIdx}"]`);
            const endEl = this.scene.querySelector(`.cubie-face.is-sticker[data-face="${arrow.toFace}"][data-index="${arrow.toIdx}"]`);
            if (!startEl || !endEl) return;

            const r1 = startEl.getBoundingClientRect();
            const r2 = endEl.getBoundingClientRect();
            const x1 = r1.left + r1.width / 2 - vpRect.left;
            const y1 = r1.top + r1.height / 2 - vpRect.top;
            const x2 = r2.left + r2.width / 2 - vpRect.left;
            const y2 = r2.top + r2.height / 2 - vpRect.top;

            const dx = x2 - x1;
            const dy = y2 - y1;
            const dist = Math.hypot(dx, dy) || 1;
            const curve = dist > 50 ? 16 : 8;
            const midX = (x1 + x2) / 2 - (dy / dist) * curve;
            const midY = (y1 + y2) / 2 + (dx / dist) * curve;

            const arrowColor = arrow.color || '#38BDF8';
            let markerId = 'arrow3d-cyan';
            if (arrowColor.includes('FDE047') || arrowColor.includes('yellow')) markerId = 'arrow3d-yellow';
            else if (arrowColor.includes('EF4444') || arrowColor.includes('red')) markerId = 'arrow3d-red';
            else if (arrowColor.includes('10B981') || arrowColor.includes('green')) markerId = 'arrow3d-green';

            const path = document.createElementNS(svgNS, 'path');
            path.setAttribute('d', `M ${x1.toFixed(1)} ${y1.toFixed(1)} Q ${midX.toFixed(1)} ${midY.toFixed(1)} ${x2.toFixed(1)} ${y2.toFixed(1)}`);
            path.setAttribute('fill', 'none');
            path.setAttribute('stroke', arrowColor);
            path.setAttribute('stroke-width', '3.5');
            path.setAttribute('stroke-linecap', 'round');
            path.setAttribute('marker-end', `url(#${markerId})`);
            if (arrow.bidirectional) {
                path.setAttribute('marker-start', `url(#${markerId})`);
            }
            path.style.pointerEvents = 'stroke';
            path.style.cursor = 'pointer';
            path.style.filter = 'drop-shadow(0 2px 4px rgba(0,0,0,0.85))';
            path.addEventListener('click', (e) => {
                e.stopPropagation();
                if (this.options.onArrowClick) {
                    this.options.onArrowClick(arrowIndex, arrow);
                }
            });
            this.arrowOverlay.appendChild(path);
        });
    }

    // =========================================================================
    // PLAYBACK CONTROLLER
    // =========================================================================
    loadCase(initialState, algorithm = '', viewMode = 'iso_ufr') {
        this.pause();
        if (initialState) {
            this.initialCube.loadState(initialState.serialize ? initialState.serialize() : initialState);
        } else {
            this.initialCube.reset();
        }

        this.cube = this.initialCube.clone();
        this.algorithm = algorithm;
        this.parseMoves();
        this.currentStep = 0;
        this.setCameraView(viewMode);
        this.updateCubieStickers();
    }

    parseMoves() {
        if (!this.algorithm) {
            this.movesList = [];
            return;
        }
        this.movesList = CubeModel.parseAlgorithm(this.algorithm);
    }

    stepForward(onComplete) {
        if (this.isAnimating) return;
        if (this.currentStep >= this.movesList.length) {
            this.pause();
            if (onComplete) onComplete(this.currentStep, false);
            return;
        }

        const move = this.movesList[this.currentStep];
        this.animateMove(move, () => {
            this.currentStep++;
            if (onComplete) onComplete(this.currentStep, this.currentStep < this.movesList.length);
        });
    }

    stepBackward(onComplete) {
        if (this.isAnimating) return;
        if (this.currentStep <= 0) return;

        this.currentStep--;
        // Re-simulate cube up to currentStep
        this.cube = this.initialCube.clone();
        for (let i = 0; i < this.currentStep; i++) {
            this.cube.executeMove(this.movesList[i]);
        }
        this.updateCubieStickers();
        window.SoundEngine.playClick();
        if (onComplete) onComplete(this.currentStep, true);
    }

    reset() {
        this.pause();
        this.currentStep = 0;
        this.cube = this.initialCube.clone();
        this.updateCubieStickers();
    }

    goToStep(targetStep) {
        if (this.isAnimating) return;
        this.pause();
        targetStep = Math.max(0, Math.min(this.movesList.length, targetStep));
        this.currentStep = targetStep;
        this.cube = this.initialCube.clone();
        for (let i = 0; i < this.currentStep; i++) {
            this.cube.executeMove(this.movesList[i]);
        }
        this.updateCubieStickers();
        window.SoundEngine.playClick();
    }

    play(onStepChange, onFinish) {
        if (this.isPlaying) return;
        this.isPlaying = true;
        this.onFinishCallback = onFinish;

        if (this.currentStep >= this.movesList.length) {
            this.reset();
            if (onStepChange) onStepChange(0, this.movesList.length);
        }

        const runNext = () => {
            if (!this.isPlaying) return;
            if (this.currentStep >= this.movesList.length) {
                this.pause();
                if (this.onFinishCallback) this.onFinishCallback();
                return;
            }

            this.stepForward((step, hasNext) => {
                if (onStepChange) onStepChange(step, this.movesList.length);
                if (hasNext && this.isPlaying) {
                    this.playTimer = setTimeout(runNext, 200);
                } else {
                    this.pause();
                    if (!hasNext && this.onFinishCallback) {
                        this.onFinishCallback();
                    }
                }
            });
        };

        runNext();
    }

    pause() {
        this.isPlaying = false;
        if (this.playTimer) {
            clearTimeout(this.playTimer);
            this.playTimer = null;
        }
    }
}

window.VirtualCube3D = VirtualCube3D;
