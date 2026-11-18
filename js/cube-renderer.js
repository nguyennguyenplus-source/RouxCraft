/**
 * RouxCraft - Advanced Vector Cube Renderer
 * Mathematically rigorous 3D Isometric Projection & Top-Down Cube Visualizer
 * Supports:
 * - Left-click to Paint / Arrow select
 * - Right-click to Instant Erase (dim to grey)
 * - Drag-to-paint and Drag-to-erase
 * - Interactive visual arrow placement (click start -> click end)
 * - 1-way and 2-way (swap) arrows with color selection
 */

class CubeRenderer {
    constructor(cube, options = {}) {
        this.cube = cube;
        this.options = {
            viewMode: options.viewMode || 'iso_ufr', // 'iso_ufr', 'iso_ufl', 'top_down', 'flat_net'
            interactive: options.interactive || false,
            width: options.width || 240,
            height: options.height || 240,
            showArrows: options.showArrows !== false,
            onStickerClick: options.onStickerClick || null,
            onStickerRightClick: options.onStickerRightClick || null,
            onArrowClick: options.onArrowClick || null,
            arrowStartPoint: options.arrowStartPoint || null, // { face, idx } for highlight
            ...options
        };

        // Cache sticker centers for accurate arrow drawing
        this.stickerCenters = {};
    }

    setViewMode(mode) {
        this.options.viewMode = mode;
    }

    renderSVG() {
        const { viewMode, width, height } = this.options;
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('viewBox', '0 0 300 300');
        svg.setAttribute('width', width);
        svg.setAttribute('height', height);
        svg.classList.add('cube-svg');
        svg.style.userSelect = 'none';

        // Add Defs for arrow markers (standard and reverse)
        svg.appendChild(this.createDefs());
        this.stickerCenters = {};

        if (viewMode === 'top_down') {
            this.renderTopDown(svg);
        } else if (viewMode === 'flat_net') {
            this.renderFlatNet(svg);
        } else if (viewMode === 'iso_ufl') {
            this.renderIsometricUFL(svg);
        } else {
            this.renderIsometricUFR(svg);
        }

        // Render arrow overlays
        if (this.options.showArrows && this.cube.arrows && this.cube.arrows.length > 0) {
            this.renderArrows(svg);
        }

        return svg;
    }

    createDefs() {
        const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');

        // Forward arrow marker
        const createMarker = (id, color) => {
            const marker = document.createElementNS('http://www.w3.org/2000/svg', 'marker');
            marker.setAttribute('id', id);
            marker.setAttribute('viewBox', '0 0 10 10');
            marker.setAttribute('refX', '7');
            marker.setAttribute('refY', '5');
            marker.setAttribute('markerWidth', '6');
            marker.setAttribute('markerHeight', '6');
            marker.setAttribute('orient', 'auto-start-reverse');

            const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            path.setAttribute('d', 'M 0 1.5 L 9 5 L 0 8.5 z');
            path.setAttribute('fill', color);
            marker.appendChild(path);
            return marker;
        };

        defs.appendChild(createMarker('arrow-head', '#38BDF8'));
        defs.appendChild(createMarker('arrow-head-yellow', '#FDE047'));
        defs.appendChild(createMarker('arrow-head-red', '#EF4444'));
        defs.appendChild(createMarker('arrow-head-green', '#10B981'));

        return defs;
    }

    // =========================================================================
    // 1. ISOMETRIC U-F-R VIEW (Standard 3D Cube)
    // =========================================================================
    renderIsometricUFR(svg) {
        const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');

        // Front-Center Vertex V_front
        const cx = 150, cy = 138;
        const s = 29; // unit length per sticker
        const cos30 = Math.cos(Math.PI / 6); // ~0.8660
        const sin30 = Math.sin(Math.PI / 6); // 0.5

        // 3 Isometric basis vectors (120 deg apart)
        const vecA = [-s * cos30, -s * sin30]; // Top-Left (towards UFL)
        const vecB = [s * cos30, -s * sin30];  // Top-Right (towards UBR)
        const vecC = [0, s];                   // Downward vertical

        const gapRatio = 0.08;

        const getPt = (u, v, w = 0) => [
            cx + u * vecA[0] + v * vecB[0] + w * vecC[0],
            cy + u * vecA[1] + v * vecB[1] + w * vecC[1]
        ];

        // Draw Cube Black Base Frame first
        this.renderCubeBackground(group, [
            getPt(0, 0, 0), getPt(3, 0, 0), getPt(3, 3, 0), getPt(0, 3, 0),
            getPt(3, 0, 3), getPt(0, 0, 3), getPt(0, 3, 3)
        ]);

        // 1. U Face
        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 3; col++) {
                const idx = row * 3 + col;
                const u = 2 - col;
                const v = 2 - row;

                const p1 = getPt(u, v);
                const p2 = getPt(u + 1, v);
                const p3 = getPt(u + 1, v + 1);
                const p4 = getPt(u, v + 1);

                const center = [
                    (p1[0] + p2[0] + p3[0] + p4[0]) / 4,
                    (p1[1] + p2[1] + p3[1] + p4[1]) / 4
                ];
                this.stickerCenters[`U_${idx}`] = { x: center[0], y: center[1] };

                const insetPts = this.insetPolygon([p1, p2, p3, p4], center, gapRatio);
                const color = this.cube.getSticker('U', idx);
                const poly = this.createPolygon(insetPts, color, 'U', idx, 1.06);
                group.appendChild(poly);
            }
        }

        // 2. F Face (Front-Left)
        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 3; col++) {
                const idx = row * 3 + col;
                const u = 2 - col;
                const w = row;

                const p1 = getPt(u, 0, w);
                const p2 = getPt(u + 1, 0, w);
                const p3 = getPt(u + 1, 0, w + 1);
                const p4 = getPt(u, 0, w + 1);

                const center = [
                    (p1[0] + p2[0] + p3[0] + p4[0]) / 4,
                    (p1[1] + p2[1] + p3[1] + p4[1]) / 4
                ];
                this.stickerCenters[`F_${idx}`] = { x: center[0], y: center[1] };

                const insetPts = this.insetPolygon([p1, p2, p3, p4], center, gapRatio);
                const color = this.cube.getSticker('F', idx);
                const poly = this.createPolygon(insetPts, color, 'F', idx, 0.94);
                group.appendChild(poly);
            }
        }

        // 3. R Face (Front-Right)
        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 3; col++) {
                const idx = row * 3 + col;
                const v = col;
                const w = row;

                const p1 = getPt(0, v, w);
                const p2 = getPt(0, v + 1, w);
                const p3 = getPt(0, v + 1, w + 1);
                const p4 = getPt(0, v, w + 1);

                const center = [
                    (p1[0] + p2[0] + p3[0] + p4[0]) / 4,
                    (p1[1] + p2[1] + p3[1] + p4[1]) / 4
                ];
                this.stickerCenters[`R_${idx}`] = { x: center[0], y: center[1] };

                const insetPts = this.insetPolygon([p1, p2, p3, p4], center, gapRatio);
                const color = this.cube.getSticker('R', idx);
                const poly = this.createPolygon(insetPts, color, 'R', idx, 0.85);
                group.appendChild(poly);
            }
        }

        // Floating Face Indicator Badges
        if (this.options.showFaceBadges !== false && this.options.width >= 180) {
            const uCol = this.cube.getSticker('U', 4);
            const fCol = this.cube.getSticker('F', 4);
            const rCol = this.cube.getSticker('R', 4);
            group.appendChild(this.createFaceBadge(150, 22, 'U', 'Mặt Trên', uCol));
            group.appendChild(this.createFaceBadge(48, 175, 'F', 'Mặt Trước', fCol));
            group.appendChild(this.createFaceBadge(252, 175, 'R', 'Mặt Phải', rCol));
        }

        svg.appendChild(group);
    }

    // =========================================================================
    // 2. ISOMETRIC U-F-L VIEW (Optimized for First Block)
    // =========================================================================
    renderIsometricUFL(svg) {
        const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');

        // Front-Center Vertex V_front (UFL Corner)
        const cx = 150, cy = 138;
        const s = 29;
        const cos30 = Math.cos(Math.PI / 6);
        const sin30 = Math.sin(Math.PI / 6);

        const vecA = [-s * cos30, -s * sin30]; // Top-Left (towards UBL)
        const vecB = [s * cos30, -s * sin30];  // Top-Right (towards UFR)
        const vecC = [0, s];                   // Downward vertical

        const gapRatio = 0.08;

        const getPt = (u, v, w = 0) => [
            cx + u * vecA[0] + v * vecB[0] + w * vecC[0],
            cy + u * vecA[1] + v * vecB[1] + w * vecC[1]
        ];

        // Draw Cube Black Base Frame
        this.renderCubeBackground(group, [
            getPt(0, 0, 0), getPt(3, 0, 0), getPt(3, 3, 0), getPt(0, 3, 0),
            getPt(3, 0, 3), getPt(0, 0, 3), getPt(0, 3, 3)
        ]);

        // 1. U Face
        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 3; col++) {
                const idx = row * 3 + col;
                const u = 2 - row;
                const v = col;

                const p1 = getPt(u, v);
                const p2 = getPt(u + 1, v);
                const p3 = getPt(u + 1, v + 1);
                const p4 = getPt(u, v + 1);

                const center = [
                    (p1[0] + p2[0] + p3[0] + p4[0]) / 4,
                    (p1[1] + p2[1] + p3[1] + p4[1]) / 4
                ];
                this.stickerCenters[`U_${idx}`] = { x: center[0], y: center[1] };

                const insetPts = this.insetPolygon([p1, p2, p3, p4], center, gapRatio);
                const color = this.cube.getSticker('U', idx);
                const poly = this.createPolygon(insetPts, color, 'U', idx, 1.06);
                group.appendChild(poly);
            }
        }

        // 2. L Face (Left side)
        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 3; col++) {
                const idx = row * 3 + col;
                const u = 2 - col;
                const w = row;

                const p1 = getPt(u, 0, w);
                const p2 = getPt(u + 1, 0, w);
                const p3 = getPt(u + 1, 0, w + 1);
                const p4 = getPt(u, 0, w + 1);

                const center = [
                    (p1[0] + p2[0] + p3[0] + p4[0]) / 4,
                    (p1[1] + p2[1] + p3[1] + p4[1]) / 4
                ];
                this.stickerCenters[`L_${idx}`] = { x: center[0], y: center[1] };

                const insetPts = this.insetPolygon([p1, p2, p3, p4], center, gapRatio);
                const color = this.cube.getSticker('L', idx);
                const poly = this.createPolygon(insetPts, color, 'L', idx, 0.94);
                group.appendChild(poly);
            }
        }

        // 3. F Face (Right side in U-F-L view)
        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 3; col++) {
                const idx = row * 3 + col;
                const v = col;
                const w = row;

                const p1 = getPt(0, v, w);
                const p2 = getPt(0, v + 1, w);
                const p3 = getPt(0, v + 1, w + 1);
                const p4 = getPt(0, v, w + 1);

                const center = [
                    (p1[0] + p2[0] + p3[0] + p4[0]) / 4,
                    (p1[1] + p2[1] + p3[1] + p4[1]) / 4
                ];
                this.stickerCenters[`F_${idx}`] = { x: center[0], y: center[1] };

                const insetPts = this.insetPolygon([p1, p2, p3, p4], center, gapRatio);
                const color = this.cube.getSticker('F', idx);
                const poly = this.createPolygon(insetPts, color, 'F', idx, 0.85);
                group.appendChild(poly);
            }
        }

        // Floating Face Indicator Badges
        if (this.options.showFaceBadges !== false && this.options.width >= 180) {
            const uCol = this.cube.getSticker('U', 4);
            const lCol = this.cube.getSticker('L', 4);
            const fCol = this.cube.getSticker('F', 4);
            group.appendChild(this.createFaceBadge(150, 22, 'U', 'Mặt Trên', uCol));
            group.appendChild(this.createFaceBadge(48, 175, 'L', 'Mặt Trái', lCol));
            group.appendChild(this.createFaceBadge(252, 175, 'F', 'Mặt Trước', fCol));
        }

        svg.appendChild(group);
    }

    renderCubeBackground(parent, pts) {
        const [uFront, uLeft, uBack, uRight, lDown, cDown, rDown] = pts;

        const bodyPoly = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
        const hull = [uBack, uLeft, lDown, cDown, rDown, uRight];
        bodyPoly.setAttribute('points', hull.map(p => `${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' '));
        bodyPoly.setAttribute('fill', '#0B1120');
        bodyPoly.setAttribute('stroke', '#1E293B');
        bodyPoly.setAttribute('stroke-width', '2');
        bodyPoly.setAttribute('stroke-linejoin', 'round');
        parent.appendChild(bodyPoly);
    }

    insetPolygon(points, center, ratio) {
        return points.map(p => [
            p[0] + (center[0] - p[0]) * ratio,
            p[1] + (center[1] - p[1]) * ratio
        ]);
    }

    // =========================================================================
    // 3. TOP-DOWN CMLL / EO VIEW
    // =========================================================================
    renderTopDown(svg) {
        const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');

        const uSize = 42;
        const bandThick = 20;
        const gap = 3;
        const cornerR = 4;
        const originX = 150 - (uSize * 3 + gap * 2) / 2;
        const originY = 150 - (uSize * 3 + gap * 2) / 2;

        // 1. Center U Face (3x3)
        for (let r = 0; r < 3; r++) {
            for (let c = 0; c < 3; c++) {
                const idx = r * 3 + c;
                const x = originX + c * (uSize + gap);
                const y = originY + r * (uSize + gap);
                const color = this.cube.getSticker('U', idx);

                this.stickerCenters[`U_${idx}`] = { x: x + uSize / 2, y: y + uSize / 2 };
                const rect = this.createRoundedRect(x, y, uSize, uSize, cornerR, color, 'U', idx);
                group.appendChild(rect);
            }
        }

        // 2. Back (B) Top Band: stickers B[2], B[1], B[0]
        const bIndices = [2, 1, 0];
        for (let c = 0; c < 3; c++) {
            const idx = bIndices[c];
            const x = originX + c * (uSize + gap);
            const y = originY - bandThick - gap;
            const color = this.cube.getSticker('B', idx);

            this.stickerCenters[`B_${idx}`] = { x: x + uSize / 2, y: y + bandThick / 2 };
            const rect = this.createRoundedRect(x, y, uSize, bandThick, 3, color, 'B', idx);
            group.appendChild(rect);
        }

        // 3. Front (F) Bottom Band: stickers F[0], F[1], F[2]
        const fIndices = [0, 1, 2];
        for (let c = 0; c < 3; c++) {
            const idx = fIndices[c];
            const x = originX + c * (uSize + gap);
            const y = originY + 3 * (uSize + gap);
            const color = this.cube.getSticker('F', idx);

            this.stickerCenters[`F_${idx}`] = { x: x + uSize / 2, y: y + bandThick / 2 };
            const rect = this.createRoundedRect(x, y, uSize, bandThick, 3, color, 'F', idx);
            group.appendChild(rect);
        }

        // 4. Left (L) Band: stickers L[0], L[1], L[2]
        const lIndices = [0, 1, 2];
        for (let r = 0; r < 3; r++) {
            const idx = lIndices[r];
            const x = originX - bandThick - gap;
            const y = originY + r * (uSize + gap);
            const color = this.cube.getSticker('L', idx);

            this.stickerCenters[`L_${idx}`] = { x: x + bandThick / 2, y: y + uSize / 2 };
            const rect = this.createRoundedRect(x, y, bandThick, uSize, 3, color, 'L', idx);
            group.appendChild(rect);
        }

        // 5. Right (R) Band: stickers R[2], R[1], R[0]
        const rIndices = [2, 1, 0];
        for (let r = 0; r < 3; r++) {
            const idx = rIndices[r];
            const x = originX + 3 * (uSize + gap);
            const y = originY + r * (uSize + gap);
            const color = this.cube.getSticker('R', idx);

            this.stickerCenters[`R_${idx}`] = { x: x + bandThick / 2, y: y + uSize / 2 };
            const rect = this.createRoundedRect(x, y, bandThick, uSize, 3, color, 'R', idx);
            group.appendChild(rect);
        }

        // Floating orientation badges around Top-Down view
        if (this.options.showFaceBadges !== false && this.options.width >= 180) {
            const bCol = this.cube.getSticker('B', 4);
            const fCol = this.cube.getSticker('F', 4);
            const lCol = this.cube.getSticker('L', 4);
            const rCol = this.cube.getSticker('R', 4);
            group.appendChild(this.createFaceBadge(150, 16, 'B', 'Mặt Sau', bCol));
            group.appendChild(this.createFaceBadge(150, 284, 'F', 'Mặt Trước', fCol));
            group.appendChild(this.createFaceBadge(34, 150, 'L', 'Mặt Trái', lCol));
            group.appendChild(this.createFaceBadge(266, 150, 'R', 'Mặt Phải', rCol));
        }

        svg.appendChild(group);
    }

    // =========================================================================
    // 4. FLAT NET 2D VIEW (All 6 faces)
    // =========================================================================
    renderFlatNet(svg) {
        const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');

        const s = 22;
        const gap = 2;
        const faceGap = 8;
        const fSize = s * 3 + gap * 2;

        const startX = 150 - (fSize * 4 + faceGap * 3) / 2;
        const startY = 150 - (fSize * 3 + faceGap * 2) / 2;

        const faceCoords = {
            'U': { col: 1, row: 0 },
            'L': { col: 0, row: 1 },
            'F': { col: 1, row: 1 },
            'R': { col: 2, row: 1 },
            'B': { col: 3, row: 1 },
            'D': { col: 1, row: 2 }
        };

        const faceNames = {
            'U': 'U • Vàng',
            'L': 'L • Xanh',
            'F': 'F • Đỏ',
            'R': 'R • Lá',
            'B': 'B • Cam',
            'D': 'D • Trắng'
        };

        for (const face of CubeModel.FACES) {
            const pos = faceCoords[face];
            const fx = startX + pos.col * (fSize + faceGap);
            const fy = startY + pos.row * (fSize + faceGap);

            const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            label.setAttribute('x', fx + fSize / 2);
            label.setAttribute('y', fy - 3);
            label.setAttribute('text-anchor', 'middle');
            label.setAttribute('fill', '#94A3B8');
            label.setAttribute('font-family', 'Inter, system-ui, sans-serif');
            label.setAttribute('font-size', '8.5');
            label.setAttribute('font-weight', '700');
            label.textContent = faceNames[face] || face;
            group.appendChild(label);

            for (let r = 0; r < 3; r++) {
                for (let c = 0; c < 3; c++) {
                    const idx = r * 3 + c;
                    const x = fx + c * (s + gap);
                    const y = fy + r * (s + gap);
                    const color = this.cube.getSticker(face, idx);

                    this.stickerCenters[`${face}_${idx}`] = { x: x + s / 2, y: y + s / 2 };
                    const rect = this.createRoundedRect(x, y, s, s, 2, color, face, idx);
                    group.appendChild(rect);
                }
            }
        }

        svg.appendChild(group);
    }

    // =========================================================================
    // 5. ARROWS & OVERLAY
    // =========================================================================
    renderArrows(svg) {
        const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        group.classList.add('cube-arrows');

        this.cube.arrows.forEach((arrow, arrowIndex) => {
            const startPt = this.stickerCenters[`${arrow.fromFace}_${arrow.fromIdx}`];
            const endPt = this.stickerCenters[`${arrow.toFace}_${arrow.toIdx}`];

            if (!startPt || !endPt) return;

            const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            const dx = endPt.x - startPt.x;
            const dy = endPt.y - startPt.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            const curvature = dist > 40 ? 10 : 4;
            const midX = (startPt.x + endPt.x) / 2 - (dy / (dist || 1)) * curvature;
            const midY = (startPt.y + endPt.y) / 2 + (dx / (dist || 1)) * curvature;

            const d = `M ${startPt.x.toFixed(1)} ${startPt.y.toFixed(1)} Q ${midX.toFixed(1)} ${midY.toFixed(1)} ${endPt.x.toFixed(1)} ${endPt.y.toFixed(1)}`;
            path.setAttribute('d', d);
            path.setAttribute('fill', 'none');
            
            const arrowColor = arrow.color || '#38BDF8';
            path.setAttribute('stroke', arrowColor);
            path.setAttribute('stroke-width', '3');
            path.setAttribute('stroke-linecap', 'round');

            // Select marker head matching color
            let markerId = 'arrow-head';
            if (arrowColor.includes('FDE047') || arrowColor.includes('yellow')) markerId = 'arrow-head-yellow';
            else if (arrowColor.includes('EF4444') || arrowColor.includes('red')) markerId = 'arrow-head-red';
            else if (arrowColor.includes('10B981') || arrowColor.includes('green')) markerId = 'arrow-head-green';

            path.setAttribute('marker-end', `url(#${markerId})`);
            if (arrow.bidirectional) {
                path.setAttribute('marker-start', `url(#${markerId})`);
            }

            path.style.cursor = 'pointer';
            path.addEventListener('click', (e) => {
                e.stopPropagation();
                if (this.options.onArrowClick) {
                    this.options.onArrowClick(arrowIndex, arrow);
                }
            });

            group.appendChild(path);

            if (arrow.label) {
                const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
                text.setAttribute('x', midX);
                text.setAttribute('y', midY - 6);
                text.setAttribute('text-anchor', 'middle');
                text.setAttribute('fill', '#FFFFFF');
                text.setAttribute('font-size', '10');
                text.setAttribute('font-weight', '700');
                text.setAttribute('filter', 'drop-shadow(0 1px 3px rgba(0,0,0,0.9))');
                text.textContent = arrow.label;
                group.appendChild(text);
            }
        });

        svg.appendChild(group);
    }

    // =========================================================================
    // SVG PRIMITIVE BUILDERS & INTERACTION (LEFT & RIGHT CLICK)
    // =========================================================================
    createPolygon(points, color, face, index, shadeFactor = 1.0) {
        const poly = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
        const ptsStr = points.map(p => `${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' ');
        poly.setAttribute('points', ptsStr);

        const shadedColor = this.applyShade(color, shadeFactor);
        poly.setAttribute('fill', shadedColor);

        // Highlight if this is the start point of an arrow being drawn
        const isArrowStart = this.options.arrowStartPoint &&
            this.options.arrowStartPoint.face === face &&
            this.options.arrowStartPoint.idx === index;

        if (isArrowStart) {
            poly.setAttribute('stroke', '#38BDF8');
            poly.setAttribute('stroke-width', '2.5');
        } else {
            poly.setAttribute('stroke', '#0F172A');
            poly.setAttribute('stroke-width', '1.2');
        }

        poly.setAttribute('stroke-linejoin', 'round');
        this.attachInteractiveEvents(poly, face, index);
        return poly;
    }

    createRoundedRect(x, y, w, h, r, color, face, index) {
        const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        rect.setAttribute('x', x);
        rect.setAttribute('y', y);
        rect.setAttribute('width', w);
        rect.setAttribute('height', h);
        rect.setAttribute('rx', r);
        rect.setAttribute('ry', r);
        rect.setAttribute('fill', color);

        const isArrowStart = this.options.arrowStartPoint &&
            this.options.arrowStartPoint.face === face &&
            this.options.arrowStartPoint.idx === index;

        if (isArrowStart) {
            rect.setAttribute('stroke', '#38BDF8');
            rect.setAttribute('stroke-width', '2.5');
        } else {
            rect.setAttribute('stroke', '#0F172A');
            rect.setAttribute('stroke-width', '1.2');
        }

        this.attachInteractiveEvents(rect, face, index);
        return rect;
    }

    createCenterLabel(center, faceLetter, isDarkText = false) {
        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('x', center[0]);
        text.setAttribute('y', center[1] + 1);
        text.setAttribute('text-anchor', 'middle');
        text.setAttribute('dominant-baseline', 'central');
        text.setAttribute('fill', isDarkText ? '#0F172A' : '#FFFFFF');
        text.setAttribute('font-family', 'Inter, system-ui, -apple-system, sans-serif');
        text.setAttribute('font-size', '12');
        text.setAttribute('font-weight', '900');
        text.setAttribute('letter-spacing', '0.5px');
        text.setAttribute('pointer-events', 'none');
        text.setAttribute('filter', isDarkText ? 'drop-shadow(0 0 1px rgba(255,255,255,0.9))' : 'drop-shadow(0 1px 3px rgba(0,0,0,0.95))');
        text.textContent = faceLetter;
        return text;
    }

    createFaceBadge(x, y, faceLetter, faceName, colorDot) {
        const badge = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        badge.setAttribute('class', 'cube-face-badge');
        badge.setAttribute('pointer-events', 'none');

        const width = 94;
        const height = 23;
        const rx = 11.5;

        const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        rect.setAttribute('class', 'cube-badge-bg');
        rect.setAttribute('x', x - width / 2);
        rect.setAttribute('y', y - height / 2);
        rect.setAttribute('width', width);
        rect.setAttribute('height', height);
        rect.setAttribute('rx', rx);
        rect.setAttribute('fill', 'rgba(28, 28, 30, 0.92)');
        rect.setAttribute('stroke', 'rgba(255, 255, 255, 0.14)');
        rect.setAttribute('stroke-width', '1');
        badge.appendChild(rect);

        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', x - width / 2 + 11);
        circle.setAttribute('cy', y);
        circle.setAttribute('r', '3.8');
        circle.setAttribute('fill', colorDot || '#0A84FF');
        badge.appendChild(circle);

        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('class', 'cube-badge-text');
        text.setAttribute('x', x - width / 2 + 21);
        text.setAttribute('y', y + 0.5);
        text.setAttribute('dominant-baseline', 'central');
        text.setAttribute('fill', '#F5F5F7');
        text.setAttribute('font-family', '"Be Vietnam Pro", -apple-system, BlinkMacSystemFont, sans-serif');
        text.setAttribute('font-size', '9.2');
        text.setAttribute('font-weight', '600');
        text.textContent = `${faceLetter} · ${faceName}`;
        badge.appendChild(text);

        return badge;
    }

    attachInteractiveEvents(elem, face, index) {
        elem.dataset.face = face;
        elem.dataset.index = index;

        if (this.options.interactive) {
            elem.style.cursor = 'pointer';

            // Prevent default right-click context menu on cube
            elem.addEventListener('contextmenu', (e) => {
                e.preventDefault();
                e.stopPropagation();
                if (this.options.onStickerRightClick) {
                    this.options.onStickerRightClick(face, index, elem);
                }
            });

            // Hover effects & Drag to paint/erase
            elem.addEventListener('mouseenter', (e) => {
                elem.dataset.prevStroke = elem.getAttribute('stroke');
                elem.setAttribute('stroke', '#38BDF8');
                elem.setAttribute('stroke-width', '2.5');

                // If holding left mouse button while dragging -> paint
                if (e.buttons === 1 && this.options.onStickerClick) {
                    this.options.onStickerClick(face, index, elem, true);
                }
                // If holding right mouse button while dragging -> erase
                else if (e.buttons === 2 && this.options.onStickerRightClick) {
                    this.options.onStickerRightClick(face, index, elem, true);
                }
            });

            elem.addEventListener('mouseleave', () => {
                elem.setAttribute('stroke', elem.dataset.prevStroke || '#0F172A');
                elem.setAttribute('stroke-width', '1.2');
            });

            // Left click
            elem.addEventListener('mousedown', (e) => {
                if (e.button === 0 && this.options.onStickerClick) {
                    e.stopPropagation();
                    this.options.onStickerClick(face, index, elem, false);
                } else if (e.button === 2 && this.options.onStickerRightClick) {
                    e.stopPropagation();
                    this.options.onStickerRightClick(face, index, elem, false);
                }
            });
        }
    }

    applyShade(hex, factor) {
        if (!hex.startsWith('#') || hex.length !== 7 || hex === CubeModel.COLORS['X']) {
            return hex;
        }
        let r = parseInt(hex.slice(1, 3), 16);
        let g = parseInt(hex.slice(3, 5), 16);
        let b = parseInt(hex.slice(5, 7), 16);

        r = Math.min(255, Math.max(0, Math.round(r * factor)));
        g = Math.min(255, Math.max(0, Math.round(g * factor)));
        b = Math.min(255, Math.max(0, Math.round(b * factor)));

        const toHex = c => c.toString(16).padStart(2, '0');
        return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
    }

    async exportToDataURL(scale = 3, transparent = true) {
        const svg = this.renderSVG();
        const svgString = new XMLSerializer().serializeToString(svg);
        const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
        const URL = window.URL || window.webkitURL || window;
        const blobURL = URL.createObjectURL(svgBlob);

        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement('canvas');
                canvas.width = this.options.width * scale;
                canvas.height = this.options.height * scale;
                const ctx = canvas.getContext('2d');

                if (!transparent) {
                    ctx.fillStyle = '#0F172A';
                    ctx.fillRect(0, 0, canvas.width, canvas.height);
                }

                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                URL.revokeObjectURL(blobURL);
                resolve(canvas.toDataURL('image/png'));
            };
            img.onerror = err => {
                URL.revokeObjectURL(blobURL);
                reject(err);
            };
            img.src = blobURL;
        });
    }
}

window.CubeRenderer = CubeRenderer;
