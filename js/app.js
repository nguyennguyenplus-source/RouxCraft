/**
 * RouxCraft - Main Application Controller
 * Handles state management, UI events, studio sticker painting (left/right click, drag, eraser),
 * interactive arrow drawing, cheat sheet rendering, speedcubing timer, and cube solver.
 */

class RouxCraftApp {
    constructor() {
        this.storageKey = 'rouxcraft_cases_v2';
        this.deletedDefaultsKey = 'rouxcraft_deleted_defaults_v2';
        this.orderMigratedKey = 'rouxcraft_order_migrated_v1';
        this.cases = [];
        this.deletedDefaultIds = [];
        this.currentFilter = 'all';
        this.searchQuery = '';

        // Drag & Drop State
        this.draggedCaseId = null;
        this.draggedCategory = null;

        // Studio State
        this.studioCube = new CubeModel();
        this.studio3D = null;
        this.studioSelectedColor = CubeModel.COLORS['U']; // default Yellow
        this.studioViewMode = 'iso_ufr';
        this.editingCaseId = null;
        this.studioTool = 'paint'; // 'paint', 'eraser', 'arrow'
        this.arrowStart = null;
        this.arrowColor = '#38BDF8';
        this.arrowType = '1way'; // '1way' or '2way'

        // 3D Player Instance
        this.player3D = null;
        this.currentPlayingCase = null;

        // Timer Instance
        this.cubeTimer = null;

        // Authentication & Role State (Salted SHA-256 One-Way Hash)
        this.authSalt = 'rc_2026_salt_8f7b';
        this.adminCredHash = 'a3628e86bc81805bd2b52b0a524d4afacc3b77212a84cceb5428f472f33ddafb';

        this.init();
    }

    init() {
        this.loadCases();
        this.setupStudio();
        this.setupNavigation();
        this.setupToolbar();
        this.setupModal3D();
        this.setupSolutionModal();
        this.setupRouxGuideModal();
        this.setupAuthModal();
        this.renderSheet();

        // Initialize Timer
        this.cubeTimer = new CubeTimer();

        // Refresh studio canvas initially so it's never blank
        this.refreshStudioCanvas();

        // Refresh icons
        if (window.lucide) {
            window.lucide.createIcons();
        }
    }

    // =========================================================================
    // STATE & STORAGE
    // =========================================================================
    loadDeletedDefaults() {
        try {
            const raw = localStorage.getItem(this.deletedDefaultsKey);
            const parsed = raw ? JSON.parse(raw) : [];
            this.deletedDefaultIds = Array.isArray(parsed) ? parsed : [];
        } catch (e) {
            this.deletedDefaultIds = [];
        }
    }

    saveDeletedDefaults() {
        try {
            localStorage.setItem(this.deletedDefaultsKey, JSON.stringify(this.deletedDefaultIds));
        } catch (e) {
            console.error('LocalStorage deleted defaults save error:', e);
        }
    }

    loadCases() {
        this.loadDeletedDefaults();
        const deletedSet = new Set(this.deletedDefaultIds);
        const stored = localStorage.getItem(this.storageKey);

        if (stored) {
            try {
                const parsed = JSON.parse(stored);
                if (!Array.isArray(parsed)) throw new Error('Stored cases is not an array');

                // Preserve exact user-defined order and user edits, excluding permanently deleted default IDs
                const kept = [];
                const seenIds = new Set();

                for (const item of parsed) {
                    if (!item || !item.id) continue;
                    if (deletedSet.has(item.id)) continue;
                    if (seenIds.has(item.id)) continue;
                    seenIds.add(item.id);

                    const def = DEFAULT_ROUX_CASES.find(d => d.id === item.id);
                    if (def) {
                        kept.push({
                            ...def,
                            ...item,
                            cubeState: item.cubeState || def.cubeState,
                            arrows: item.arrows !== undefined ? item.arrows : def.arrows,
                            viewMode: item.viewMode || def.viewMode
                        });
                    } else {
                        kept.push(item);
                    }
                }

                // Append any newly released default cases that were NOT deleted by the user
                for (const def of DEFAULT_ROUX_CASES) {
                    if (!seenIds.has(def.id) && !deletedSet.has(def.id)) {
                        kept.push({ ...def });
                        seenIds.add(def.id);
                    }
                }

                // One-time chronological migration for legacy data before manual reordering was introduced
                if (!localStorage.getItem(this.orderMigratedKey)) {
                    const getCreatedTime = (c) => {
                        if (typeof c.createdAt === 'number') return c.createdAt;
                        if (typeof c.id === 'string' && c.id.startsWith('custom-')) {
                            const ts = parseInt(c.id.replace('custom-', ''));
                            if (!isNaN(ts)) return ts;
                        }
                        const defIdx = DEFAULT_ROUX_CASES.findIndex(d => d.id === c.id);
                        if (defIdx !== -1) return defIdx;
                        return 9999999999999;
                    };
                    kept.sort((a, b) => getCreatedTime(a) - getCreatedTime(b));
                    localStorage.setItem(this.orderMigratedKey, '1');
                }

                this.cases = kept;
                this.saveCases();
            } catch (e) {
                console.error('Failed to parse saved cases, resetting to defaults.', e);
                this.cases = DEFAULT_ROUX_CASES.filter(d => !deletedSet.has(d.id)).map(d => ({ ...d }));
                localStorage.setItem(this.orderMigratedKey, '1');
                this.saveCases();
            }
        } else {
            this.cases = DEFAULT_ROUX_CASES.filter(d => !deletedSet.has(d.id)).map(d => ({ ...d }));
            localStorage.setItem(this.orderMigratedKey, '1');
            this.saveCases();
        }
    }

    saveCases() {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(this.cases));
        } catch (e) {
            console.error('LocalStorage save error:', e);
        }
    }

    showToast(message, type = 'success') {
        const container = document.getElementById('toast-container');
        if (!container) return;

        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.innerHTML = `
            <i data-lucide="${type === 'success' ? 'check-circle-2' : 'info'}" style="width: 16px; height: 16px;"></i>
            <span>${message}</span>
        `;
        container.appendChild(toast);

        if (window.lucide) window.lucide.createIcons();

        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateY(10px)';
            toast.style.transition = 'all 0.25s ease';
            setTimeout(() => toast.remove(), 250);
        }, 3000);
    }

    // =========================================================================
    // NAVIGATION & VIEW SWITCHING
    // =========================================================================
    setupNavigation() {
        const tabBtns = document.querySelectorAll('.header-tabs .tab-btn');
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const targetView = btn.dataset.view;
                this.switchView(targetView);
            });
        });

        // Quick create button in header
        const btnNewCase = document.getElementById('btn-new-case');
        if (btnNewCase) {
            btnNewCase.addEventListener('click', () => {
                if (!this.isAdmin()) {
                    this.showToast('Vui lòng đăng nhập Quản trị viên để thêm trường hợp mới.', 'info');
                    this.openLoginModal();
                    return;
                }
                this.openStudioForNewCase();
            });
        }

        // macOS Tools Popover Menu
        const btnToolsMenu = document.getElementById('btn-tools-menu');
        const toolsPopover = document.getElementById('header-tools-popover');
        const closePopover = () => {
            if (toolsPopover) toolsPopover.classList.remove('open');
            if (btnToolsMenu) btnToolsMenu.setAttribute('aria-expanded', 'false');
        };

        if (btnToolsMenu && toolsPopover) {
            btnToolsMenu.addEventListener('click', (e) => {
                e.stopPropagation();
                const isOpen = toolsPopover.classList.toggle('open');
                btnToolsMenu.setAttribute('aria-expanded', String(isOpen));
            });
            document.addEventListener('click', (e) => {
                if (!toolsPopover.contains(e.target) && e.target !== btnToolsMenu) {
                    closePopover();
                }
            });
        }

        // Apple Light / Pro Dark Theme Toggle
        const btnTheme = document.getElementById('btn-theme-toggle');
        const syncThemeIcon = () => {
            if (!btnTheme) return;
            const current = document.documentElement.getAttribute('data-theme') || 'dark';
            btnTheme.innerHTML = current === 'dark'
                ? `<i data-lucide="sun" style="width: 16px; height: 16px;"></i>`
                : `<i data-lucide="moon" style="width: 16px; height: 16px;"></i>`;
            btnTheme.title = current === 'dark' ? 'Chuyển sang Apple Light Mode' : 'Chuyển sang Apple Pro Dark Mode';
            if (window.lucide) window.lucide.createIcons();
        };
        syncThemeIcon();

        if (btnTheme) {
            btnTheme.addEventListener('click', () => {
                const current = document.documentElement.getAttribute('data-theme') || 'dark';
                const next = current === 'dark' ? 'light' : 'dark';
                document.documentElement.setAttribute('data-theme', next);
                localStorage.setItem('rouxcraft_theme', next);
                syncThemeIcon();
                window.SoundEngine.playClick();
                this.showToast(next === 'light' ? 'Đã chuyển sang chế độ Apple Light' : 'Đã chuyển sang chế độ Apple Pro Dark');
            });
        }

        // Export PDF
        const btnExportPdf = document.getElementById('btn-export-pdf');
        if (btnExportPdf) {
            btnExportPdf.addEventListener('click', () => {
                closePopover();
                this.exportPDF();
            });
        }

        // Export Poster PNG
        const btnExportPoster = document.getElementById('btn-export-poster');
        if (btnExportPoster) {
            btnExportPoster.addEventListener('click', () => {
                closePopover();
                this.exportPosterPNG();
            });
        }

        // Backup / Restore JSON
        const btnBackup = document.getElementById('btn-backup-json');
        if (btnBackup) {
            btnBackup.addEventListener('click', () => {
                closePopover();
                this.exportJSONBackup();
            });
        }

        const inputRestore = document.getElementById('input-restore-json');
        if (inputRestore) {
            inputRestore.addEventListener('change', (e) => {
                closePopover();
                this.importJSONBackup(e);
            });
        }

        // Sound Toggle
        const btnSoundToggle = document.getElementById('btn-sound-toggle');
        if (btnSoundToggle) {
            btnSoundToggle.addEventListener('click', () => {
                const enabled = window.SoundEngine.toggle();
                btnSoundToggle.innerHTML = enabled
                    ? `<i data-lucide="volume-2" style="width: 15px; height: 15px;"></i><span>Âm thanh xoay Rubik</span>`
                    : `<i data-lucide="volume-x" style="width: 15px; height: 15px;"></i><span>Âm thanh: Đang tắt</span>`;
                if (window.lucide) window.lucide.createIcons();
                this.showToast(enabled ? 'Đã bật âm thanh xoay Rubik' : 'Đã tắt âm thanh');
            });
        }
    }

    switchView(viewName) {
        document.querySelectorAll('.view-section').forEach(sec => sec.classList.remove('active'));
        document.querySelectorAll('.header-tabs .tab-btn').forEach(btn => btn.classList.remove('active'));

        const targetSection = document.getElementById(`view-${viewName}`);
        const targetBtn = document.querySelector(`.tab-btn[data-view="${viewName}"]`);

        if (targetSection) targetSection.classList.add('active');
        if (targetBtn) targetBtn.classList.add('active');

        if (viewName === 'sheet') {
            this.renderSheet();
        } else if (viewName === 'studio') {
            this.refreshStudioCanvas();
        } else if (viewName === 'timer') {
            if (this.cubeTimer) {
                this.cubeTimer.generateNewScramble();
            }
        }

        if (window.lucide) window.lucide.createIcons();
    }

    // =========================================================================
    // CHEAT SHEET RENDERING & FILTERING
    // =========================================================================
    setupToolbar() {
        const chips = document.querySelectorAll('.filter-chip');
        chips.forEach(chip => {
            chip.addEventListener('click', () => {
                chips.forEach(c => c.classList.remove('active'));
                chip.classList.add('active');
                this.currentFilter = chip.dataset.filter;
                this.renderSheet();
            });
        });

        const searchInput = document.getElementById('sheet-search-input');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.searchQuery = e.target.value.toLowerCase().trim();
                this.renderSheet();
            });
        }
    }

    renderSheet() {
        const container = document.getElementById('sheet-content-area');
        if (!container) return;

        let filtered = this.cases.filter(item => {
            const matchesCat = this.currentFilter === 'all' || item.category === this.currentFilter;
            const matchesSearch = !this.searchQuery ||
                item.title.toLowerCase().includes(this.searchQuery) ||
                item.algorithm.toLowerCase().includes(this.searchQuery) ||
                (item.description && item.description.toLowerCase().includes(this.searchQuery));
            return matchesCat && matchesSearch;
        });

        container.innerHTML = '';

        if (filtered.length === 0) {
            container.innerHTML = `
                <div style="text-align: center; padding: 4rem 1rem; color: var(--text-muted);">
                    <i data-lucide="search-x" style="width: 48px; height: 48px; margin-bottom: 1rem; stroke-width: 1.5;"></i>
                    <h3 style="font-size: 1.1rem; color: var(--text-secondary); margin-bottom: 0.5rem;">Không tìm thấy trường hợp nào</h3>
                    <p style="font-size: 0.85rem;">Hãy thử từ khóa khác hoặc chuyển sang mục Tất cả.</p>
                </div>
            `;
            if (window.lucide) window.lucide.createIcons();
            return;
        }

        const categories = [
            {
                id: 'fb',
                title: '1. First Block · Khối 1×2×3 Bên Trái',
                holding: 'Cầm: F (Đỏ) trước • U (Vàng) trên • L (Xanh dương)',
                dotClass: 'dot-fb'
            },
            {
                id: 'sb',
                title: '2. Second Block · Khối 1×2×3 Bên Phải',
                holding: 'Cầm: F (Đỏ) trước • U (Vàng) trên • R (Xanh lá)',
                dotClass: 'dot-sb'
            },
            {
                id: 'cmll',
                title: '3. CMLL · 4 Góc Tầng Cuối',
                holding: 'Cầm: U (Vàng) trên đỉnh • F (Đỏ) trước mặt',
                dotClass: 'dot-cmll'
            },
            {
                id: 'lse',
                title: '4. LSE · 6 Cạnh Cuối Cùng',
                holding: 'Cầm: F (Đỏ) trước • U (Vàng) trên • Chỉ xoay lát M & U',
                dotClass: 'dot-lse'
            },
            {
                id: 'custom',
                title: 'Trường Hợp Tự Tạo & Ghi Chú Cá Nhân',
                holding: 'Quy chuẩn: F (Đỏ) trước • U (Vàng) trên',
                dotClass: 'dot-custom'
            }
        ];

        categories.forEach(cat => {
            const catCases = filtered.filter(c => c.category === cat.id);
            if (catCases.length === 0) return;

            const sectionBlock = document.createElement('div');
            sectionBlock.className = 'sheet-category-block';
            sectionBlock.innerHTML = `
                <div class="category-header">
                    <div class="category-heading-stack">
                        <div class="category-title-wrap">
                            <span class="phase-dot phase-dot-lg ${cat.dotClass}"></span>
                            <h2 class="category-title">${cat.title}</h2>
                        </div>
                        <div class="category-holding-note">
                            <i data-lucide="compass" style="width: 13px; height: 13px; color: var(--accent);"></i>
                            <span>${cat.holding}</span>
                        </div>
                    </div>
                    <div class="category-header-right">
                        ${this.isAdmin() ? `
                        <span class="category-reorder-hint" title="Kéo thả trực tiếp thẻ công thức hoặc dùng nút mũi tên trên thẻ để thay đổi thứ tự">
                            <i data-lucide="grip-vertical" style="width: 13px; height: 13px;"></i>
                            Kéo thả để sắp xếp
                        </span>` : ''}
                        <span class="category-count">${catCases.length} trường hợp</span>
                    </div>
                </div>
                <div class="cases-grid" id="grid-${cat.id}"></div>
            `;

            container.appendChild(sectionBlock);
            const grid = sectionBlock.querySelector(`#grid-${cat.id}`);

            catCases.forEach((caseItem, idx) => {
                const prevId = idx > 0 ? catCases[idx - 1].id : null;
                const nextId = idx < catCases.length - 1 ? catCases[idx + 1].id : null;
                const card = this.createCaseCardElement(caseItem, prevId, nextId);
                grid.appendChild(card);
            });
        });

        if (window.lucide) window.lucide.createIcons();
    }

    swapCasesById(idA, idB) {
        if (!idA || !idB || idA === idB) return;
        const idxA = this.cases.findIndex(c => c.id === idA);
        const idxB = this.cases.findIndex(c => c.id === idB);
        if (idxA === -1 || idxB === -1) return;

        const temp = this.cases[idxA];
        this.cases[idxA] = this.cases[idxB];
        this.cases[idxB] = temp;

        this.saveCases();
        this.renderSheet();
        window.SoundEngine.playClick();
    }

    reorderCaseByDrop(draggedId, targetId) {
        if (!draggedId || !targetId || draggedId === targetId) return;
        const draggedIdx = this.cases.findIndex(c => c.id === draggedId);
        const targetIdx = this.cases.findIndex(c => c.id === targetId);
        if (draggedIdx === -1 || targetIdx === -1) return;

        // Only reorder within the same category
        if (this.cases[draggedIdx].category !== this.cases[targetIdx].category) return;

        const [movedItem] = this.cases.splice(draggedIdx, 1);
        const newTargetIdx = this.cases.findIndex(c => c.id === targetId);
        const insertIdx = draggedIdx < targetIdx ? newTargetIdx + 1 : newTargetIdx;
        this.cases.splice(insertIdx, 0, movedItem);

        this.saveCases();
        this.renderSheet();
        window.SoundEngine.playClick();
        this.showToast(`Đã di chuyển vị trí: ${movedItem.title}`);
    }

    createCaseCardElement(caseItem, prevId = null, nextId = null) {
        const isAdmin = this.isAdmin();
        const card = document.createElement('div');
        card.className = 'case-card';
        card.dataset.caseId = caseItem.id;
        card.dataset.category = caseItem.category;
        card.setAttribute('draggable', isAdmin ? 'true' : 'false');

        const cube = initCubeForCase(caseItem);
        const renderer = new CubeRenderer(cube, {
            viewMode: caseItem.viewMode || (caseItem.category === 'fb' ? 'iso_ufl' : (caseItem.category === 'cmll' ? 'top_down' : 'iso_ufr')),
            width: 220,
            height: 195,
            interactive: false
        });
        const svg = renderer.renderSVG();

        card.innerHTML = `
            <div class="case-header">
                <div class="case-top-bar">
                    ${isAdmin ? `
                    <div class="case-reorder-controls">
                        <span class="case-drag-handle" title="Giữ và kéo thẻ này để đổi vị trí">
                            <i data-lucide="grip-vertical" style="width: 14px; height: 14px;"></i>
                        </span>
                        <button type="button" class="case-move-btn btn-move-left" title="Di chuyển lên trước" ${prevId ? '' : 'disabled'}>
                            <i data-lucide="chevron-left" style="width: 13px; height: 13px;"></i>
                        </button>
                        <button type="button" class="case-move-btn btn-move-right" title="Di chuyển ra sau" ${nextId ? '' : 'disabled'}>
                            <i data-lucide="chevron-right" style="width: 13px; height: 13px;"></i>
                        </button>
                    </div>` : `<div></div>`}
                    <span class="case-group-badge">${this.escapeHTML(caseItem.group || 'Chung')}</span>
                </div>
                <div class="case-title-row">
                    <h3 class="case-title">${this.escapeHTML(caseItem.title)}</h3>
                </div>
            </div>
            <div class="case-body">
                <div class="case-cube-preview" title="Bấm để mở trình chiếu 3D">
                    <div class="preview-svg-wrap"></div>
                </div>
            </div>
            <div class="case-alg-box">
                <span class="case-alg-text" title="Công thức">${this.escapeHTML(caseItem.algorithm || 'Tự do / Intuitive')}</span>
                <button class="case-alg-copy" title="Sao chép công thức" data-alg="${this.escapeHTML(caseItem.algorithm || '')}">
                    <i data-lucide="copy" style="width: 15px; height: 15px;"></i>
                </button>
            </div>
            <div class="case-footer">
                <div class="case-actions-left">
                    ${isAdmin ? `
                    <button class="case-footer-btn btn-edit-case" title="Chỉnh sửa hoặc vẽ lại hình">
                        <i data-lucide="pencil" style="width: 12px; height: 12px;"></i> Sửa
                    </button>` : ''}
                    <button class="case-footer-btn btn-export-cube-png" title="Tải ảnh riêng khối Rubik này (PNG)">
                        <i data-lucide="download" style="width: 12px; height: 12px;"></i> Ảnh
                    </button>
                    ${isAdmin ? `
                    <button class="case-footer-btn btn-delete-case" title="Xóa vĩnh viễn trường hợp này" style="color: var(--rose);">
                        <i data-lucide="trash-2" style="width: 12px; height: 12px;"></i>
                    </button>` : ''}
                </div>
                <div class="case-actions-right">
                    <button class="case-footer-btn btn-view-guide" title="Xem hướng dẫn giải chi tiết trường hợp này">
                        <i data-lucide="book-open" style="width: 12px; height: 12px;"></i> Chi tiết
                    </button>
                    <button class="case-footer-btn btn-play-3d" title="Chạy hoạt ảnh 3D">
                        <i data-lucide="play-circle" style="width: 13px; height: 13px;"></i> Chạy 3D
                    </button>
                </div>
            </div>
        `;

        card.querySelector('.preview-svg-wrap').appendChild(svg);

        // Quick Move Left / Right events (Admin only)
        if (isAdmin) {
            const btnMoveLeft = card.querySelector('.btn-move-left');
            if (btnMoveLeft && prevId) {
                btnMoveLeft.addEventListener('click', (e) => {
                    e.stopPropagation();
                    this.swapCasesById(caseItem.id, prevId);
                });
            }

            const btnMoveRight = card.querySelector('.btn-move-right');
            if (btnMoveRight && nextId) {
                btnMoveRight.addEventListener('click', (e) => {
                    e.stopPropagation();
                    this.swapCasesById(caseItem.id, nextId);
                });
            }

            // Drag & Drop Reordering Events (Admin only)
            card.addEventListener('dragstart', (e) => {
                this.draggedCaseId = caseItem.id;
                this.draggedCategory = caseItem.category;
                e.dataTransfer.effectAllowed = 'move';
                e.dataTransfer.setData('text/plain', caseItem.id);
                requestAnimationFrame(() => card.classList.add('dragging'));
            });

            card.addEventListener('dragover', (e) => {
                if (!this.draggedCaseId || this.draggedCaseId === caseItem.id) return;
                if (this.draggedCategory !== caseItem.category) return;
                e.preventDefault();
                e.dataTransfer.dropEffect = 'move';
                card.classList.add('drag-over');
            });

            card.addEventListener('dragleave', (e) => {
                if (!card.contains(e.relatedTarget)) {
                    card.classList.remove('drag-over');
                }
            });

            card.addEventListener('drop', (e) => {
                e.preventDefault();
                card.classList.remove('drag-over');
                const draggedId = this.draggedCaseId || e.dataTransfer.getData('text/plain');
                if (draggedId && draggedId !== caseItem.id) {
                    this.reorderCaseByDrop(draggedId, caseItem.id);
                }
            });

            card.addEventListener('dragend', () => {
                this.draggedCaseId = null;
                this.draggedCategory = null;
                document.querySelectorAll('.case-card.dragging, .case-card.drag-over').forEach(el => {
                    el.classList.remove('dragging', 'drag-over');
                });
            });
        }

        // Events
        card.querySelector('.case-cube-preview').addEventListener('click', () => {
            this.openPlayer3D(caseItem);
        });

        const btnGuide = card.querySelector('.btn-view-guide');
        if (btnGuide) {
            btnGuide.addEventListener('click', () => {
                this.openCaseDetailModal(caseItem);
            });
        }

        card.querySelector('.btn-play-3d').addEventListener('click', () => {
            this.openPlayer3D(caseItem);
        });

        card.querySelector('.case-alg-copy').addEventListener('click', (e) => {
            const alg = e.currentTarget.dataset.alg;
            if (alg) {
                navigator.clipboard.writeText(alg).then(() => {
                    this.showToast(`Đã chép: ${alg}`);
                    window.SoundEngine.playClick();
                });
            }
        });

        const btnEdit = card.querySelector('.btn-edit-case');
        if (btnEdit) {
            btnEdit.addEventListener('click', () => {
                this.openStudioForEditCase(caseItem);
            });
        }

        card.querySelector('.btn-export-cube-png').addEventListener('click', async () => {
            const dataUrl = await renderer.exportToDataURL(3, false);
            const a = document.createElement('a');
            a.href = dataUrl;
            a.download = `${caseItem.id}-cube.png`;
            a.click();
            this.showToast('Đã tải ảnh khối Rubik PNG!');
        });

        const btnDelete = card.querySelector('.btn-delete-case');
        if (btnDelete) {
            btnDelete.addEventListener('click', () => {
                if (confirm(`Bạn có chắc muốn xóa trường hợp "${caseItem.title}"?`)) {
                    this.cases = this.cases.filter(c => c.id !== caseItem.id);
                    // Record deleted default ID so reloading the page will NEVER restore it
                    if (DEFAULT_ROUX_CASES.some(d => d.id === caseItem.id)) {
                        if (!this.deletedDefaultIds.includes(caseItem.id)) {
                            this.deletedDefaultIds.push(caseItem.id);
                            this.saveDeletedDefaults();
                        }
                    }
                    this.saveCases();
                    this.renderSheet();
                    this.showToast('Đã xóa trường hợp vĩnh viễn.');
                }
            });
        }

        return card;
    }

    // =========================================================================
    // STUDIO & DRAW LAB ENGINE (LEFT/RIGHT CLICK, DRAG, ARROWS & SOLVER)
    // =========================================================================
    setupStudio() {
        this.renderStudioPalette();
        this.setupStudioPresets();
        this.setupStudioSimulator();
        this.setupStudioForm();
        this.setupStudioTools();

        // View mode selector buttons
        const viewBtns = document.querySelectorAll('.view-mode-selector .view-btn');
        viewBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                viewBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                const nextMode = btn.dataset.mode;
                this.studioViewMode = nextMode;
                if (nextMode !== 'flat_net' && this.studio3D) {
                    this.studio3D.setCameraView(nextMode, true);
                } else {
                    this.refreshStudioCanvas(true);
                }
            });
        });

        // Clear arrows
        const btnClearArrows = document.getElementById('studio-btn-clear-arrows');
        if (btnClearArrows) {
            btnClearArrows.addEventListener('click', () => {
                this.studioCube.clearArrows();
                this.arrowStart = null;
                this.refreshStudioCanvas();
                this.showToast('Đã xóa các mũi tên trên cube');
            });
        }

        // Export studio PNG
        const btnExportStudioPng = document.getElementById('studio-btn-export-png');
        if (btnExportStudioPng) {
            btnExportStudioPng.addEventListener('click', async () => {
                const renderer = new CubeRenderer(this.studioCube, {
                    viewMode: this.studioViewMode,
                    width: 400,
                    height: 400
                });
                const dataUrl = await renderer.exportToDataURL(3, false);
                const a = document.createElement('a');
                a.href = dataUrl;
                a.download = `roux-custom-cube-${Date.now()}.png`;
                a.click();
                this.showToast('Đã xuất ảnh khối Rubik PNG!');
            });
        }

        // Solve Painted Cube Button
        const btnSolvePainted = document.getElementById('studio-btn-solve-cube');
        if (btnSolvePainted) {
            btnSolvePainted.addEventListener('click', () => {
                this.solveCurrentPaintedCube();
            });
        }
    }

    setupStudioTools() {
        // Tool Buttons (Paint, Eraser, Arrow)
        const btnToolPaint = document.getElementById('studio-tool-paint');
        const btnToolEraser = document.getElementById('studio-tool-eraser');
        const btnToolArrow = document.getElementById('studio-tool-arrow');

        const setTool = (tool) => {
            this.studioTool = tool;
            this.arrowStart = null;
            [btnToolPaint, btnToolEraser, btnToolArrow].forEach(b => {
                if (b) b.classList.remove('active');
            });
            if (tool === 'paint' && btnToolPaint) btnToolPaint.classList.add('active');
            if (tool === 'eraser' && btnToolEraser) btnToolEraser.classList.add('active');
            if (tool === 'arrow' && btnToolArrow) btnToolArrow.classList.add('active');

            const hint = document.getElementById('studio-tool-hint');
            if (hint) {
                if (tool === 'paint') hint.textContent = 'Nhấp trái: Tô màu • Nhấp phải: Xóa về xám • Giữ & kéo: Xoay khối 3D 360°';
                else if (tool === 'eraser') hint.textContent = 'Nhấp trái/phải: Xóa màu về Xám bỏ qua • Giữ & kéo: Xoay khối 3D 360°';
                else if (tool === 'arrow') hint.textContent = 'Nhấp ô bắt đầu → Nhấp ô kết thúc trên khối 3D để vẽ mũi tên';
            }
            this.refreshStudioCanvas();
        };

        if (btnToolPaint) btnToolPaint.addEventListener('click', () => setTool('paint'));
        if (btnToolEraser) btnToolEraser.addEventListener('click', () => setTool('eraser'));
        if (btnToolArrow) btnToolArrow.addEventListener('click', () => setTool('arrow'));

        // Arrow Type Select (1-way vs 2-way)
        const arrowTypeBtn = document.getElementById('studio-arrow-type');
        if (arrowTypeBtn) {
            arrowTypeBtn.addEventListener('change', (e) => {
                this.arrowType = e.target.value;
            });
        }

        // Arrow Color Select
        const arrowColorBtn = document.getElementById('studio-arrow-color');
        if (arrowColorBtn) {
            arrowColorBtn.addEventListener('change', (e) => {
                this.arrowColor = e.target.value;
            });
        }
    }

    renderStudioPalette() {
        const grid = document.getElementById('studio-palette-grid');
        if (!grid) return;

        const paletteColors = [
            { hex: CubeModel.COLORS['U'], name: 'Vàng (U)' },
            { hex: CubeModel.COLORS['D'], name: 'Trắng (D)' },
            { hex: CubeModel.COLORS['F'], name: 'Đỏ (F)' },
            { hex: CubeModel.COLORS['B'], name: 'Cam (B)' },
            { hex: CubeModel.COLORS['L'], name: 'Xanh dương (L)' },
            { hex: CubeModel.COLORS['R'], name: 'Xanh lá (R)' },
            { hex: CubeModel.COLORS['X'], name: 'Xám (Bỏ qua)' },
            { hex: '#1E293B', name: 'Đen' }
        ];

        grid.innerHTML = '';
        paletteColors.forEach((item) => {
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = `color-swatch-btn ${item.hex === this.studioSelectedColor ? 'active' : ''}`;
            btn.innerHTML = `
                <div class="swatch-circle" style="background-color: ${item.hex};"></div>
                <span class="swatch-name">${item.name}</span>
            `;

            btn.addEventListener('click', () => {
                grid.querySelectorAll('.color-swatch-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.studioSelectedColor = item.hex;
                this.studioTool = 'paint';
                document.getElementById('studio-tool-paint')?.classList.add('active');
                document.getElementById('studio-tool-eraser')?.classList.remove('active');
                document.getElementById('studio-tool-arrow')?.classList.remove('active');
                window.SoundEngine.playClick();
            });

            grid.appendChild(btn);
        });
    }

    setupStudioPresets() {
        const bindPreset = (btnId, applyFn, msg) => {
            const btn = document.getElementById(btnId);
            if (btn) {
                btn.addEventListener('click', () => {
                    applyFn.call(this.studioCube);
                    this.refreshStudioCanvas();
                    window.SoundEngine.playClick();
                    this.showToast(msg);
                });
            }
        };

        bindPreset('preset-fb', this.studioCube.applyFBMask, 'Đã áp dụng Mask First Block (FB)');
        bindPreset('preset-sb', this.studioCube.applySBMask, 'Đã áp dụng Mask Second Block (SB)');
        bindPreset('preset-cmll', this.studioCube.applyCMLLMask, 'Đã áp dụng Mask CMLL');
        bindPreset('preset-cmll-top', this.studioCube.applyCMLLTopOnlyMask, 'Đã áp dụng Mask CMLL Top-Only');
        bindPreset('preset-lse', this.studioCube.applyLSEMask, 'Đã áp dụng Mask LSE');
        bindPreset('preset-solved', this.studioCube.reset, 'Đã hoàn trả trạng thái Solved');
        bindPreset('preset-autofill-solved', this.studioCube.fillGreyWithSolved, 'Đã tự động điền các ô xám thành màu đã giải');
        bindPreset('preset-grey', this.studioCube.clearToGrey, 'Đã làm xám toàn bộ (giữ cố định các tâm)');
    }

    setupStudioSimulator() {
        const input = document.getElementById('studio-sim-input');
        const btnRun = document.getElementById('studio-btn-run-sim');
        const btnInvert = document.getElementById('studio-btn-invert-sim');

        const runMovesInStudio = (moves, toastMsg) => {
            if (!moves || moves.length === 0) return;
            this.studioCube.clearArrows();
            if (this.studio3D && this.studioViewMode !== 'flat_net') {
                if (this.studio3D.isAnimating) return;
                this.studio3D.render3DArrows();
                this.studio3D.animateSequence(moves, () => {
                    this.showToast(toastMsg);
                });
            } else {
                for (const mv of moves) {
                    this.studioCube.executeMove(mv);
                }
                this.refreshStudioCanvas();
                window.SoundEngine.playClick();
                this.showToast(toastMsg);
            }
        };

        if (btnRun && input) {
            btnRun.addEventListener('click', () => {
                const alg = input.value.trim();
                if (!alg) return;
                const moves = CubeModel.parseAlgorithm(alg);
                if (moves.length === 0) {
                    this.showToast('Không nhận diện được bước xoay hợp lệ!', 'info');
                    return;
                }
                runMovesInStudio(moves, `Đã xoay công thức (${moves.length} bước): ${alg}`);
            });
        }

        if (btnInvert && input) {
            btnInvert.addEventListener('click', () => {
                const alg = input.value.trim();
                if (!alg) return;
                const inv = CubeModel.invertAlgorithm(alg);
                if (!inv) {
                    this.showToast('Không nhận diện được bước xoay hợp lệ!', 'info');
                    return;
                }
                input.value = inv;
                const moves = CubeModel.parseAlgorithm(inv);
                runMovesInStudio(moves, `Đã xoay nghịch đảo (${moves.length} bước): ${inv}`);
            });
        }
    }

    setupStudioForm() {
        const form = document.getElementById('studio-case-form');
        if (!form) return;

        form.addEventListener('submit', (e) => {
            e.preventDefault();

            if (!this.isAdmin()) {
                this.showToast('Chỉ Quản trị viên mới có quyền lưu trường hợp vào Sheet!', 'error');
                this.openLoginModal();
                return;
            }

            const title = document.getElementById('form-case-title').value.trim();
            const category = document.getElementById('form-case-category').value;
            const group = document.getElementById('form-case-group').value.trim() || 'Tự tạo';
            const algorithm = document.getElementById('form-case-alg').value.trim();
            const description = document.getElementById('form-case-desc').value.trim();
            const tips = document.getElementById('form-case-tips').value.trim();

            if (!title) {
                alert('Vui lòng nhập tên trường hợp!');
                return;
            }

            const existingCase = this.editingCaseId ? this.cases.find(c => c.id === this.editingCaseId) : null;
            const caseData = {
                id: this.editingCaseId || `custom-${Date.now()}`,
                createdAt: existingCase?.createdAt || (typeof this.editingCaseId === 'string' && this.editingCaseId.startsWith('custom-') ? parseInt(this.editingCaseId.replace('custom-', '')) || Date.now() : Date.now()),
                category,
                group,
                title,
                algorithm,
                description,
                tips,
                viewMode: this.studioViewMode,
                cubeState: this.studioCube.serialize(),
                arrows: JSON.parse(JSON.stringify(this.studioCube.arrows)),
                isStudioCustom: true
            };

            if (this.editingCaseId) {
                const idx = this.cases.findIndex(c => c.id === this.editingCaseId);
                if (idx !== -1) {
                    this.cases[idx] = caseData;
                    this.showToast(`Đã cập nhật: ${title}`);
                }
            } else {
                this.cases.push(caseData); // FIFO: Created earlier stays first!
                this.showToast(`Đã thêm mới: ${title}`);
            }

            this.saveCases();
            window.SoundEngine.playSuccess();
            this.switchView('sheet');
        });
    }

    refreshStudioCanvas(snapCamera = false) {
        const area = document.getElementById('studio-canvas-area');
        if (!area) return;

        // Shared interactive sticker / arrow handlers
        const handleStickerClick = (face, index, elem, isDrag = false) => {
            if (this.studioTool === 'arrow') {
                if (isDrag) return;
                if (!this.arrowStart) {
                    this.arrowStart = { face, idx: index };
                    this.refreshStudioCanvas();
                    this.showToast(`Đã chọn điểm bắt đầu (${face}${index + 1}). Hãy nhấp vào ô đích đến!`);
                    window.SoundEngine.playClick();
                } else {
                    this.studioCube.arrows.push({
                        fromFace: this.arrowStart.face,
                        fromIdx: this.arrowStart.idx,
                        toFace: face,
                        toIdx: index,
                        color: this.arrowColor,
                        bidirectional: this.arrowType === '2way'
                    });
                    this.arrowStart = null;
                    this.refreshStudioCanvas();
                    this.showToast('Đã tạo mũi tên!');
                    window.SoundEngine.playSuccess();
                }
                return;
            }

            // Erase Tool
            if (this.studioTool === 'eraser') {
                this.studioCube.setSticker(face, index, CubeModel.COLORS['X']);
                if (this.studio3D && this.studioViewMode !== 'flat_net') {
                    elem.style.backgroundColor = CubeModel.COLORS['X'];
                } else {
                    elem.setAttribute('fill', CubeModel.COLORS['X']);
                }
                window.SoundEngine.playClick();
                return;
            }

            // Paint Tool
            this.studioCube.setSticker(face, index, this.studioSelectedColor);
            if (this.studio3D && this.studioViewMode !== 'flat_net') {
                elem.style.backgroundColor = this.studioSelectedColor;
            } else {
                elem.setAttribute('fill', this.studioSelectedColor);
            }
            window.SoundEngine.playPaint();
        };

        const handleStickerRightClick = (face, index, elem) => {
            this.studioCube.setSticker(face, index, CubeModel.COLORS['X']);
            if (this.studio3D && this.studioViewMode !== 'flat_net') {
                elem.style.backgroundColor = CubeModel.COLORS['X'];
            } else {
                elem.setAttribute('fill', CubeModel.COLORS['X']);
            }
            window.SoundEngine.playClick();
        };

        const handleArrowClick = (arrowIndex) => {
            this.studioCube.arrows.splice(arrowIndex, 1);
            this.refreshStudioCanvas();
            this.showToast('Đã xóa mũi tên này!');
            window.SoundEngine.playClick();
        };

        // 1. TRUE INTERACTIVE 3D STUDIO MODE (iso_ufr, iso_ufl, top_down)
        if (this.studioViewMode !== 'flat_net') {
            if (!this.studio3D || !area.querySelector('.studio-3d-mode')) {
                if (this.studio3D) this.studio3D.destroy();
                area.innerHTML = '';
                this.studio3D = new VirtualCube3D(area, {
                    interactiveStudio: true,
                    scale: 1.18,
                    onStickerClick: handleStickerClick,
                    onStickerRightClick: handleStickerRightClick,
                    onArrowClick: handleArrowClick,
                    getArrowStartPoint: () => this.arrowStart
                });
                this.studio3D.bindCube(this.studioCube);
                this.studio3D.setCameraView(this.studioViewMode, false);
            } else {
                this.studio3D.bindCube(this.studioCube);
                if (snapCamera) {
                    this.studio3D.setCameraView(this.studioViewMode, true);
                }
            }
            return;
        }

        // 2. FLAT 2D NET FALLBACK MODE (All 6 unfolded faces)
        if (this.studio3D) {
            this.studio3D.destroy();
            this.studio3D = null;
        }

        area.innerHTML = '';
        const renderer = new CubeRenderer(this.studioCube, {
            viewMode: 'flat_net',
            width: 340,
            height: 340,
            interactive: true,
            arrowStartPoint: this.arrowStart,
            onStickerClick: (face, index, elem, isDrag) => {
                handleStickerClick(face, index, elem, isDrag);
            },
            onStickerRightClick: (face, index, elem) => {
                handleStickerRightClick(face, index, elem);
            },
            onArrowClick: handleArrowClick
        });

        const svg = renderer.renderSVG();
        area.appendChild(svg);
    }

    solveCurrentPaintedCube() {
        const simInput = document.getElementById('studio-sim-input');
        const simulatorAlg = simInput ? simInput.value.trim() : '';

        const result = window.CubeSolver.solveCustomCube(this.studioCube, simulatorAlg);
        if (!result.success) {
            alert(result.message);
            return;
        }

        const modal = document.getElementById('modal-solution');
        const content = document.getElementById('solution-content-area');
        if (!modal || !content) return;

        if (result.isSolved) {
            content.innerHTML = `
                <div style="text-align: center; padding: 2rem; color: var(--emerald);">
                    <i data-lucide="check-circle" style="width: 48px; height: 48px; margin-bottom: 0.75rem;"></i>
                    <h3 style="font-size: 1.1rem; color: var(--text-primary); margin-bottom: 0.5rem;">Khối Rubik Đã Hoàn Thành!</h3>
                    <p style="font-size: 0.85rem; color: var(--text-secondary); line-height: 1.5;">${result.message}</p>
                </div>
            `;
            modal.classList.add('open');
            if (window.lucide) window.lucide.createIcons();
            return;
        }

        content.innerHTML = `
            <!-- Holding Orientation Banner -->
            <div class="modal-callout">
                <div class="modal-callout-head">
                    <i data-lucide="compass" style="width: 15px; height: 15px; color: var(--accent);"></i>
                    <strong>Hướng cầm Rubik chuẩn khi thực hiện</strong>
                </div>
                <div class="modal-orientation-grid">
                    <div><span class="guide-color-dot" style="background:#EF4444;"></span><strong>F (Trước):</strong> Đỏ</div>
                    <div><span class="guide-color-dot" style="background:#EAB308;"></span><strong>U (Trên):</strong> Vàng</div>
                    <div><span class="guide-color-dot" style="background:#3B82F6;"></span><strong>L (Trái):</strong> Xanh dương</div>
                    <div><span class="guide-color-dot" style="background:#10B981;"></span><strong>R (Phải):</strong> Xanh lá</div>
                </div>
            </div>

            <!-- Solution Summary Bar -->
            <div class="modal-callout">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.45rem;">
                    <span style="font-size: 0.8rem; color: var(--emerald); font-weight: 600; display: inline-flex; align-items: center; gap: 0.35rem;">
                        <i data-lucide="check-circle" style="width: 14px; height: 14px;"></i>
                        ${result.message} (${result.moveCount} bước)
                    </span>
                    ${result.hadGrey ? '<span class="modal-pill-note">Tự động điền nền đã giải</span>' : ''}
                </div>
                <div class="modal-alg-plate">${result.solution}</div>
            </div>

            <!-- Detailed Steps -->
            <div style="display: flex; flex-direction: column; gap: 0.65rem;">
                ${result.steps.map((st) => `
                    <div class="modal-step-card">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.35rem;">
                            <strong style="color: var(--text-primary); font-size: 0.875rem;">${st.phase}</strong>
                            <span style="font-size: 0.75rem; color: var(--text-muted);">${st.name}</span>
                        </div>
                        <div class="modal-alg-plate is-compact">${st.moves}</div>
                        <div style="font-size: 0.785rem; color: var(--text-secondary); line-height: 1.5; margin-top: 0.4rem;">
                            ${st.explanation}
                        </div>
                        ${st.holdingTip ? `
                            <div style="font-size: 0.74rem; color: var(--accent); margin-top: 0.35rem; display: flex; align-items: center; gap: 0.3rem;">
                                <i data-lucide="info" style="width: 12px; height: 12px;"></i> ${st.holdingTip}
                            </div>
                        ` : ''}
                    </div>
                `).join('')}
            </div>

            <div style="margin-top: 1.15rem; display: flex; justify-content: flex-end; gap: 0.5rem;">
                <button type="button" class="action-btn btn-primary" id="btn-play-custom-solution-3d">
                    <i data-lucide="play" style="width: 15px; height: 15px;"></i> Xem Mô Phỏng 3D Từng Bước
                </button>
            </div>
        `;

        modal.classList.add('open');
        if (window.lucide) window.lucide.createIcons();

        document.getElementById('btn-play-custom-solution-3d').addEventListener('click', () => {
            modal.classList.remove('open');
            // Clone painted cube and ensure grey is filled for 3D simulation
            const playCube = this.studioCube.clone();
            playCube.fillGreyWithSolved();

            this.openPlayer3D({
                title: 'Lời Giải Khối Rubik (Về Solved 100%)',
                algorithm: result.solution,
                cubeState: playCube.serialize(),
                isStudioCustom: true // CRITICAL: Tells openPlayer3D NOT to invert the algorithm!
            });
        });
    }

    openStudioForNewCase() {
        this.editingCaseId = null;
        this.studioCube.applyFBMask();
        this.studioViewMode = 'iso_ufr';

        document.getElementById('form-case-title').value = '';
        document.getElementById('form-case-category').value = 'fb';
        document.getElementById('form-case-group').value = 'Khối 1x2x3';
        document.getElementById('form-case-alg').value = '';
        document.getElementById('form-case-desc').value = '';
        document.getElementById('form-case-tips').value = '';
        document.getElementById('studio-panel-title').textContent = 'Vẽ Khối Rubik & Thêm Trường Hợp Mới';

        this.syncViewModeButtons();
        this.switchView('studio');
        this.refreshStudioCanvas(true);
    }

    openStudioForEditCase(caseItem) {
        this.editingCaseId = caseItem.id;
        this.studioCube = initCubeForCase(caseItem);
        this.studioViewMode = caseItem.viewMode || 'iso_ufr';

        document.getElementById('form-case-title').value = caseItem.title || '';
        document.getElementById('form-case-category').value = caseItem.category || 'fb';
        document.getElementById('form-case-group').value = caseItem.group || '';
        document.getElementById('form-case-alg').value = caseItem.algorithm || '';
        document.getElementById('form-case-desc').value = caseItem.description || '';
        document.getElementById('form-case-tips').value = caseItem.tips || '';
        document.getElementById('studio-panel-title').textContent = `Chỉnh Sửa: ${caseItem.title}`;

        this.syncViewModeButtons();
        this.switchView('studio');
        this.refreshStudioCanvas(true);
    }

    syncViewModeButtons() {
        const viewBtns = document.querySelectorAll('.view-mode-selector .view-btn');
        viewBtns.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.mode === this.studioViewMode);
        });
    }

    // =========================================================================
    // 3D INTERACTIVE PLAYER MODAL
    // =========================================================================
    setupModal3D() {
        const modal = document.getElementById('modal-3d-player');
        const closeBtn = document.getElementById('modal-close-3d');
        const container3D = document.getElementById('cube3d-container');

        if (container3D) {
            this.player3D = new VirtualCube3D(container3D);
        }

        if (closeBtn && modal) {
            closeBtn.addEventListener('click', () => {
                if (this.player3D) this.player3D.pause();
                modal.classList.remove('open');
            });

            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    if (this.player3D) this.player3D.pause();
                    modal.classList.remove('open');
                }
            });
        }

        const btnPlay = document.getElementById('player-btn-play');
        const btnNext = document.getElementById('player-btn-next');
        const btnPrev = document.getElementById('player-btn-prev');
        const btnReset = document.getElementById('player-btn-reset');

        if (btnPlay) {
            btnPlay.addEventListener('click', () => {
                if (!this.player3D) return;
                if (this.player3D.isPlaying) {
                    this.player3D.pause();
                    btnPlay.innerHTML = `<i data-lucide="play" style="width: 15px; height: 15px;"></i> Tiếp tục`;
                } else {
                    btnPlay.innerHTML = `<i data-lucide="pause" style="width: 15px; height: 15px;"></i> Tạm dừng`;
                    this.player3D.play((step, total) => {
                        this.updatePlayerProgress(step, total);
                    }, () => {
                        btnPlay.innerHTML = `<i data-lucide="rotate-ccw" style="width: 15px; height: 15px;"></i> Chạy lại`;
                        window.SoundEngine.playSuccess();
                        this.showToast('Chúc mừng! Khối Rubik đã được giải hoàn tất 100%!', 'success');
                        if (window.lucide) window.lucide.createIcons();
                    });
                }
                if (window.lucide) window.lucide.createIcons();
            });
        }

        if (btnNext) {
            btnNext.addEventListener('click', () => {
                if (this.player3D) {
                    this.player3D.stepForward();
                    this.updatePlayerProgress(this.player3D.currentStep, this.player3D.movesList.length);
                }
            });
        }

        if (btnPrev) {
            btnPrev.addEventListener('click', () => {
                if (this.player3D) {
                    this.player3D.stepBackward();
                    this.updatePlayerProgress(this.player3D.currentStep, this.player3D.movesList.length);
                }
            });
        }

        if (btnReset) {
            btnReset.addEventListener('click', () => {
                if (this.player3D) {
                    this.player3D.reset();
                    this.updatePlayerProgress(0, this.player3D.movesList.length);
                    if (btnPlay) btnPlay.innerHTML = `<i data-lucide="play" style="width: 15px; height: 15px;"></i> Chạy`;
                    if (window.lucide) window.lucide.createIcons();
                }
            });
        }

        const keys = document.querySelectorAll('.key-move-btn');
        keys.forEach(k => {
            k.addEventListener('click', () => {
                const move = k.dataset.move;
                if (this.player3D && move) {
                    this.player3D.animateMove(move);
                }
            });
        });

        // 3D Perspective angle buttons
        const viewBtns3D = document.querySelectorAll('.view-btn-3d');
        viewBtns3D.forEach(b => {
            b.addEventListener('click', () => {
                viewBtns3D.forEach(x => x.classList.remove('active'));
                b.classList.add('active');
                if (this.player3D && b.dataset.view) {
                    this.player3D.setCameraView(b.dataset.view);
                    window.SoundEngine.playClick();
                }
            });
        });
    }

    setupSolutionModal() {
        const modal = document.getElementById('modal-solution');
        const closeBtn = document.getElementById('modal-close-solution');
        if (modal && closeBtn) {
            closeBtn.addEventListener('click', () => modal.classList.remove('open'));
            modal.addEventListener('click', (e) => {
                if (e.target === modal) modal.classList.remove('open');
            });
        }
    }

    setupRouxGuideModal() {
        const modal = document.getElementById('modal-roux-guide');
        const openBtn = document.getElementById('btn-roux-guide');
        const closeBtn = document.getElementById('modal-close-roux-guide');

        if (openBtn && modal) {
            openBtn.addEventListener('click', () => {
                modal.classList.add('open');
                if (window.lucide) window.lucide.createIcons();
            });
        }

        if (modal && closeBtn) {
            closeBtn.addEventListener('click', () => modal.classList.remove('open'));
            modal.addEventListener('click', (e) => {
                if (e.target === modal) modal.classList.remove('open');
            });
        }

        // Case detail modal close listeners
        const detailModal = document.getElementById('modal-case-detail');
        const detailCloseBtn = document.getElementById('modal-close-case-detail');
        if (detailModal && detailCloseBtn) {
            detailCloseBtn.addEventListener('click', () => detailModal.classList.remove('open'));
            detailModal.addEventListener('click', (e) => {
                if (e.target === detailModal) detailModal.classList.remove('open');
            });
        }
    }

    isAdmin() {
        return localStorage.getItem('rouxcraft_admin_session') === this.adminCredHash;
    }

    async verifyCredentials(username, password) {
        if (!username || !password) return false;
        try {
            const str = `${username.trim().toLowerCase()}:${password}:${this.authSalt}`;
            const encoder = new TextEncoder();
            const data = encoder.encode(str);
            const hashBuffer = await crypto.subtle.digest('SHA-256', data);
            const hashArray = Array.from(new Uint8Array(hashBuffer));
            const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
            return hashHex === this.adminCredHash;
        } catch (err) {
            console.error('Auth verification error:', err);
            return false;
        }
    }

    syncAuthState() {
        const isAdmin = this.isAdmin();
        const authBtn = document.getElementById('btn-auth-toggle');
        const authIcon = document.getElementById('auth-popover-icon');
        const authText = document.getElementById('auth-popover-text');
        if (authBtn && authText) {
            if (isAdmin) {
                authBtn.style.color = 'var(--rose)';
                if (authIcon) authIcon.setAttribute('data-lucide', 'log-out');
                authText.textContent = 'Đăng xuất Admin';
            } else {
                authBtn.style.color = '';
                if (authIcon) authIcon.setAttribute('data-lucide', 'lock');
                authText.textContent = 'Đăng nhập Admin';
            }
            if (window.lucide) window.lucide.createIcons();
        }
    }

    openLoginModal() {
        const modal = document.getElementById('modal-login');
        const errMsg = document.getElementById('login-error-msg');
        const form = document.getElementById('form-admin-login');
        if (form) form.reset();
        if (errMsg) errMsg.style.display = 'none';
        if (modal) {
            modal.classList.add('open');
            setTimeout(() => {
                const userInput = document.getElementById('login-username');
                if (userInput) userInput.focus();
            }, 120);
            if (window.lucide) window.lucide.createIcons();
        }
    }

    closeLoginModal() {
        const modal = document.getElementById('modal-login');
        if (modal) modal.classList.remove('open');
    }

    setupAuthModal() {
        const modal = document.getElementById('modal-login');
        const closeBtn = document.getElementById('modal-close-login');
        const form = document.getElementById('form-admin-login');
        const errMsg = document.getElementById('login-error-msg');
        const authToggleBtn = document.getElementById('btn-auth-toggle');

        if (authToggleBtn) {
            authToggleBtn.addEventListener('click', () => {
                const toolsPopover = document.getElementById('header-tools-popover');
                if (toolsPopover) toolsPopover.classList.remove('open');
                if (this.isAdmin()) {
                    localStorage.removeItem('rouxcraft_admin_session');
                    this.syncAuthState();
                    this.renderSheet();
                    this.showToast('Đã đăng xuất tài khoản Quản trị viên.', 'info');
                } else {
                    this.openLoginModal();
                }
            });
        }

        if (modal && closeBtn) {
            closeBtn.addEventListener('click', () => this.closeLoginModal());
            modal.addEventListener('click', (e) => {
                if (e.target === modal) this.closeLoginModal();
            });
        }

        if (form) {
            form.addEventListener('submit', async (e) => {
                e.preventDefault();
                const userInput = document.getElementById('login-username');
                const passInput = document.getElementById('login-password');
                const u = userInput ? userInput.value : '';
                const p = passInput ? passInput.value : '';

                const isValid = await this.verifyCredentials(u, p);
                if (isValid) {
                    localStorage.setItem('rouxcraft_admin_session', this.adminCredHash);
                    this.closeLoginModal();
                    this.syncAuthState();
                    this.renderSheet();
                    this.showToast('Đăng nhập Quản trị viên thành công! Bạn có đầy đủ quyền sửa, tạo và sắp xếp.', 'success');
                } else {
                    if (errMsg) errMsg.style.display = 'block';
                    if (passInput) {
                        passInput.value = '';
                        passInput.focus();
                    }
                }
            });
        }

        this.syncAuthState();
    }

    openCaseDetailModal(caseItem) {
        const modal = document.getElementById('modal-case-detail');
        const titleElem = document.getElementById('case-detail-modal-title');
        const content = document.getElementById('case-detail-content-area');
        if (!modal || !content) return;

        if (titleElem) {
            titleElem.textContent = `Hướng Dẫn Giải: ${caseItem.title}`;
        }

        const cube = initCubeForCase(caseItem);
        const renderer = new CubeRenderer(cube, {
            viewMode: caseItem.viewMode || (caseItem.category === 'fb' ? 'iso_ufl' : (caseItem.category === 'cmll' ? 'top_down' : 'iso_ufr')),
            width: 190,
            height: 190,
            interactive: false
        });
        const svg = renderer.renderSVG();

        // Specific pedagogical steps based on category
        let categorySteps = [];
        let ruleWarning = '';

        if (caseItem.category === 'fb') {
            categorySteps = [
                {
                    title: '1. Nhận diện & Quan sát',
                    desc: caseItem.description || 'Xác định vị trí các viên của cặp First Block (cạnh DL hoặc cặp FL/BL).'
                },
                {
                    title: '2. Đưa lên tầng U (Ghép đôi)',
                    desc: 'Dùng các bước xoay tự do (D, L, U hoặc M/r) để đưa viên cạnh và góc lên tầng U ghép cặp mà không cần lo về tâm.'
                },
                {
                    title: '3. Chèn vào Slot Trái',
                    desc: `Thực hiện công thức: <strong class="inline-alg">${caseItem.algorithm || 'Tự do'}</strong> để đưa khối 1x2x3 vào vị trí hoàn tất.`
                }
            ];
            ruleWarning = '<strong>Đặc quyền của Roux ở Bước 1:</strong> Bạn không cần căn tâm trước; cạnh đáy D-L và 2 cặp FB có thể tự do xoay mà không làm ảnh hưởng các phần khác.';
        } else if (caseItem.category === 'sb') {
            categorySteps = [
                {
                    title: '1. Nhận diện & Bảo toàn FB',
                    desc: caseItem.description || 'Xác định cạnh đáy DR hoặc cặp góc-cạnh của Second Block bên phải.'
                },
                {
                    title: '2. Thao tác trên trục an toàn <r, R, U, M>',
                    desc: 'Chỉ được phép sử dụng các lớp r, R, U và lát cắt M để di chuyển và ghép cặp trên tầng U.'
                },
                {
                    title: '3. Chèn vào Slot Phải',
                    desc: `Áp dụng công thức: <strong class="inline-alg">${caseItem.algorithm || 'Tự do'}</strong> đưa cặp vào slot FR hoặc BR.`
                }
            ];
            ruleWarning = '<strong>Quy tắc sống còn của Second Block:</strong> Tuyệt đối không dùng các bước xoay L, L\', F, F\' hoặc B để tránh làm vỡ First Block bên trái.';
        } else if (caseItem.category === 'cmll') {
            categorySteps = [
                {
                    title: '1. Nhận diện Thế Góc (Recognition)',
                    desc: caseItem.description || 'Quan sát hướng của các sticker màu vàng ở đỉnh tầng U và thanh đồng màu ở cạnh bên.'
                },
                {
                    title: '2. Căn chuẩn góc nhìn',
                    desc: 'Cầm khối sao cho mặt F (Đỏ) đối diện và tầng U (Vàng) ở trên. Xoay U để đưa thanh chuẩn về đúng vị trí.'
                },
                {
                    title: '3. Thực hiện công thức CMLL',
                    desc: `Xoay dứt khoát công thức: <strong class="inline-alg">${caseItem.algorithm || 'Tự do'}</strong> để giải xong cả 4 góc trong 1 lần xoay.`
                }
            ];
            ruleWarning = '<strong>Mẹo Roux CMLL:</strong> Không cần quan tâm các cạnh tầng U hay lát cắt M bị xáo trộn; bước 4 (LSE) sẽ giải toàn bộ các cạnh còn lại chỉ bằng <M, U>.';
        } else if (caseItem.category === 'lse') {
            categorySteps = [
                {
                    title: '1. Xác định pha LSE',
                    desc: caseItem.description || 'Xác định số cạnh bị lật (EO), đưa 2 cạnh UL/UR về chỗ hoặc hoán vị các cạnh M-slice.'
                },
                {
                    title: '2. Kỹ thuật ngón tay M-slice',
                    desc: 'Dùng ngón đeo nhẫn (ring finger) gẩy M\' từ đáy lên, kết hợp double-flick M2 bằng ngón đeo nhẫn + ngón giữa.'
                },
                {
                    title: '3. Hoàn tất chuỗi xoay',
                    desc: `Áp dụng: <strong class="inline-alg">${caseItem.algorithm || 'Tự do'}</strong> để đưa khối Rubik về trạng thái Solved 100%.`
                }
            ];
            ruleWarning = '<strong>Linh hồn của Roux ở LSE:</strong> Chỉ dùng 2 lát xoay M và U. Khi xoay thuần thục M-slice, tốc độ giải LSE chỉ mất từ 2 đến 4 giây.';
        } else {
            categorySteps = [
                {
                    title: '1. Nhận diện tình huống',
                    desc: caseItem.description || 'Xác định vị trí các viên mục tiêu.'
                },
                {
                    title: '2. Thực hiện công thức',
                    desc: `Áp dụng công thức: <strong class="inline-alg">${caseItem.algorithm || 'Tự do'}</strong>.`
                }
            ];
        }

        content.innerHTML = `
            <!-- Holding Banner -->
            <div class="modal-callout">
                <div class="modal-callout-head">
                    <i data-lucide="compass" style="width: 15px; height: 15px; color: var(--accent);"></i>
                    <strong>Hướng cầm Rubik chuẩn khi thực hiện</strong>
                </div>
                <div class="modal-orientation-grid">
                    <div><span class="guide-color-dot" style="background:#EF4444;"></span><strong>F (Trước):</strong> Đỏ</div>
                    <div><span class="guide-color-dot" style="background:#EAB308;"></span><strong>U (Trên):</strong> Vàng</div>
                    <div><span class="guide-color-dot" style="background:#3B82F6;"></span><strong>L (Trái):</strong> Xanh dương</div>
                    <div><span class="guide-color-dot" style="background:#10B981;"></span><strong>R (Phải):</strong> Xanh lá</div>
                    <div><span class="guide-color-dot" style="background:#F5F5F7; border: 1px solid rgba(128,128,128,0.4);"></span><strong>D (Đáy):</strong> Trắng</div>
                </div>
            </div>

            <!-- Main Case Visual & Algorithm -->
            <div class="modal-visual-hero">
                <div style="display: flex; justify-content: center;" id="case-detail-svg-container"></div>
                <div>
                    <div style="font-size: 0.72rem; color: var(--text-muted); font-weight: 600; text-transform: uppercase; letter-spacing: 0.04em; margin-bottom: 0.35rem;">Công Thức Thực Hiện</div>
                    <div class="modal-alg-plate" style="margin-bottom: 0.75rem;">
                        ${this.escapeHTML(caseItem.algorithm || 'Tự do / Intuitive')}
                    </div>
                    <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
                        <button type="button" class="action-btn btn-primary" id="btn-detail-play-3d">
                            <i data-lucide="play" style="width: 14px; height: 14px;"></i> Xem Mô Phỏng 3D
                        </button>
                        <button type="button" class="action-btn" id="btn-detail-copy-alg" data-alg="${this.escapeHTML(caseItem.algorithm || '')}">
                            <i data-lucide="copy" style="width: 14px; height: 14px;"></i> Sao Chép
                        </button>
                    </div>
                </div>
            </div>

            <!-- Goal & Recognition -->
            <div class="modal-step-card" style="margin-bottom: 0.75rem;">
                <strong style="color: var(--text-primary); font-size: 0.85rem; display: inline-flex; align-items: center; gap: 0.35rem;">
                    <i data-lucide="target" style="width: 14px; height: 14px; color: var(--accent);"></i>
                    Mục Tiêu & Nhận Diện Tình Huống
                </strong>
                <p style="font-size: 0.825rem; color: var(--text-secondary); line-height: 1.55; margin-top: 0.35rem; margin-bottom: 0;">
                    ${this.escapeHTML(caseItem.description || 'Chưa có ghi chú.')}
                </p>
            </div>

            <!-- Step by Step Breakdown -->
            <div style="margin-bottom: 0.75rem;">
                <strong style="color: var(--text-primary); font-size: 0.85rem; display: flex; align-items: center; gap: 0.35rem; margin-bottom: 0.5rem;">
                    <i data-lucide="list-ordered" style="width: 14px; height: 14px; color: var(--accent);"></i>
                    Chi Tiết Các Bước Thao Tác
                </strong>
                <div style="display: flex; flex-direction: column; gap: 0.5rem;">
                    ${categorySteps.map(st => `
                        <div class="modal-step-card">
                            <div style="font-size: 0.8rem; font-weight: 700; color: var(--text-primary); margin-bottom: 0.2rem;">${st.title}</div>
                            <div style="font-size: 0.785rem; color: var(--text-secondary); line-height: 1.5;">${st.desc}</div>
                        </div>
                    `).join('')}
                </div>
            </div>

            <!-- Tips & Finger-tricks -->
            ${caseItem.tips ? `
            <div class="modal-callout is-tip">
                <div class="modal-callout-head">
                    <i data-lucide="lightbulb" style="width: 14px; height: 14px; color: var(--amber);"></i>
                    <strong>Mẹo Ngón Tay & Finger-tricks</strong>
                </div>
                <div style="font-size: 0.8rem; color: var(--text-secondary); line-height: 1.5;">
                    ${this.escapeHTML(caseItem.tips)}
                </div>
            </div>` : ''}

            <!-- Core Rule Alert -->
            ${ruleWarning ? `
            <div class="modal-callout is-note">
                <div style="font-size: 0.785rem; color: var(--text-secondary); line-height: 1.5;">
                    ${ruleWarning}
                </div>
            </div>` : ''}
        `;

        content.querySelector('#case-detail-svg-container').appendChild(svg);

        modal.classList.add('open');
        if (window.lucide) window.lucide.createIcons();

        // Wire Copy & Play 3D buttons inside detail modal
        const btnPlay = content.querySelector('#btn-detail-play-3d');
        if (btnPlay) {
            btnPlay.addEventListener('click', () => {
                modal.classList.remove('open');
                this.openPlayer3D(caseItem);
            });
        }

        const btnCopy = content.querySelector('#btn-detail-copy-alg');
        if (btnCopy) {
            btnCopy.addEventListener('click', (e) => {
                const alg = e.currentTarget.dataset.alg;
                if (alg) {
                    navigator.clipboard.writeText(alg).then(() => {
                        this.showToast(`Đã chép: ${alg}`);
                        window.SoundEngine.playClick();
                    });
                }
            });
        }
    }

    openPlayer3D(caseItem) {
        this.currentPlayingCase = caseItem;
        const modal = document.getElementById('modal-3d-player');
        const titleElem = document.getElementById('modal-3d-title');
        const btnPlay = document.getElementById('player-btn-play');

        if (titleElem) {
            titleElem.textContent = `${caseItem.title || 'Mô Phỏng 3D'} - ${caseItem.algorithm || 'Trực quan'}`;
        }

        // Populate instructions card in 3D player
        const infoCard = document.getElementById('player-case-info-card');
        const infoGoal = document.getElementById('player-info-goal-desc');
        const infoTipRow = document.getElementById('player-info-tip-row');
        const infoTipText = document.getElementById('player-info-tip-text');

        if (infoCard && infoGoal) {
            if (caseItem.description || caseItem.tips) {
                infoCard.style.display = 'block';
                infoGoal.textContent = caseItem.description || 'Thực hiện chuỗi xoay để đưa các viên về đúng vị trí.';
                if (caseItem.tips && infoTipRow && infoTipText) {
                    infoTipRow.style.display = 'flex';
                    infoTipText.textContent = caseItem.tips;
                } else if (infoTipRow) {
                    infoTipRow.style.display = 'none';
                }
            } else {
                infoCard.style.display = 'none';
            }
        }

        // Single source of truth: initialize cube state exactly matching the card
        const cube = initCubeForCase(caseItem);

        // Perspective view mode matching the case
        const viewMode = caseItem.viewMode || (caseItem.category === 'fb' ? 'iso_ufl' : (caseItem.category === 'cmll' ? 'top_down' : 'iso_ufr'));

        // Highlight active view button in 3D modal
        document.querySelectorAll('.view-btn-3d').forEach(b => {
            b.classList.toggle('active', b.dataset.view === viewMode);
        });

        if (this.player3D) {
            this.player3D.loadCase(cube, caseItem.algorithm, viewMode);
            this.renderPlayerAlgorithmStrip();
            this.updatePlayerProgress(0, this.player3D.movesList.length);
        }

        if (btnPlay) {
            btnPlay.innerHTML = `<i data-lucide="play" style="width: 15px; height: 15px;"></i> Chạy`;
        }

        if (modal) modal.classList.add('open');
        if (window.lucide) window.lucide.createIcons();
    }

    renderPlayerAlgorithmStrip() {
        const strip = document.getElementById('player-alg-strip');
        if (!strip || !this.player3D) return;

        strip.innerHTML = '';
        if (this.player3D.movesList.length === 0) {
            strip.innerHTML = '<span style="font-size: 0.8rem; color: var(--text-muted);">Trường hợp giải tự do (không có công thức cố định)</span>';
            return;
        }

        this.player3D.movesList.forEach((move, idx) => {
            const token = document.createElement('span');
            token.className = 'alg-token';
            token.dataset.idx = idx;
            token.textContent = move;
            token.style.cursor = 'pointer';
            token.title = `Nhảy đến bước ${idx + 1}: ${move}`;
            token.addEventListener('click', () => {
                if (this.player3D) {
                    this.player3D.goToStep(idx + 1);
                    this.updatePlayerProgress(idx + 1, this.player3D.movesList.length);
                }
            });
            strip.appendChild(token);
        });
    }

    updatePlayerProgress(currentStep) {
        const strip = document.getElementById('player-alg-strip');
        if (!strip) return;

        const tokens = strip.querySelectorAll('.alg-token');
        tokens.forEach((tok, idx) => {
            tok.classList.remove('current', 'passed');
            if (idx === currentStep) {
                tok.classList.add('current');
                tok.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
            } else if (idx < currentStep) {
                tok.classList.add('passed');
            }
        });
    }

    // =========================================================================
    // EXPORT PDF, POSTER & BACKUP
    // =========================================================================
    exportPDF() {
        this.showToast('Đang chuẩn bị trang in PDF...');
        setTimeout(() => {
            window.print();
        }, 300);
    }

    async exportPosterPNG() {
        const content = document.getElementById('sheet-content-area');
        if (!content || !window.html2canvas) {
            this.showToast('Thư viện chụp ảnh đang tải, vui lòng thử lại sau 1 giây.');
            return;
        }

        this.showToast('Đang xuất ảnh Poster độ nét cao (2K)...');
        try {
            const canvas = await window.html2canvas(content, {
                backgroundColor: '#090D16',
                scale: 2,
                logging: false,
                useCORS: true
            });

            const link = document.createElement('a');
            link.download = `Roux_Method_CheatSheet_${Date.now()}.png`;
            link.href = canvas.toDataURL('image/png');
            link.click();
            this.showToast('Đã tải ảnh Poster Cheat Sheet!');
        } catch (err) {
            console.error('Export Poster failed:', err);
            this.showToast('Xuất ảnh thất bại, vui lòng thử in ấn PDF.', 'error');
        }
    }

    exportJSONBackup() {
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(this.cases, null, 2));
        const downloadAnchor = document.createElement('a');
        downloadAnchor.setAttribute("href", dataStr);
        downloadAnchor.setAttribute("download", `RouxCraft_Backup_${new Date().toISOString().slice(0, 10)}.json`);
        document.body.appendChild(downloadAnchor);
        downloadAnchor.click();
        downloadAnchor.remove();
        this.showToast('Đã sao lưu dữ liệu JSON thành công!');
    }

    importJSONBackup(e) {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const parsed = JSON.parse(event.target.result);
                if (Array.isArray(parsed)) {
                    this.cases = parsed;
                    const importedIds = new Set(parsed.map(c => c && c.id));
                    this.deletedDefaultIds = DEFAULT_ROUX_CASES
                        .filter(d => !importedIds.has(d.id))
                        .map(d => d.id);
                    this.saveDeletedDefaults();
                    localStorage.setItem(this.orderMigratedKey, '1');
                    this.saveCases();
                    this.renderSheet();
                    this.showToast(`Đã phục hồi ${parsed.length} trường hợp từ file sao lưu!`);
                } else {
                    alert('Định dạng file sao lưu không hợp lệ.');
                }
            } catch (err) {
                alert('Lỗi đọc file JSON: ' + err.message);
            }
        };
        reader.readAsText(file);
    }

    escapeHTML(str) {
        if (!str) return '';
        return str
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.app = new RouxCraftApp();
});
