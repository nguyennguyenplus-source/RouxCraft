/**
 * RouxCraft - Professional Speedcubing Timer & Specialized Roux Scrambler
 * Supports:
 * - WCA Standard 3x3 Scrambles & Specialized Roux Drills (F2B, CMLL, LSE)
 * - Spacebar / Touch hold-to-ready precision millisecond timer
 * - Statistics (ao5, ao12, best, mean, solve history)
 * - Automatic Roux Solution breakdown integration
 */

class CubeTimer {
    constructor() {
        this.state = 'IDLE'; // 'IDLE', 'HOLDING', 'READY', 'RUNNING', 'STOPPED'
        this.startTime = 0;
        this.elapsed = 0;
        this.timerInterval = null;
        this.holdTimer = null;
        this.holdThreshold = 300; // ms to turn green
        
        this.currentScramble = '';
        this.scrambleType = 'wca'; // 'wca', 'f2b', 'cmll', 'lse'
        this.solves = [];
        this.storageKey = 'rouxcraft_timer_solves_v1';

        this.initDOM();
        this.loadHistory();
        this.generateNewScramble();
        this.attachEvents();
    }

    initDOM() {
        this.timerDisplay = document.getElementById('timer-time-display');
        this.scrambleDisplay = document.getElementById('timer-scramble-display');
        this.historyList = document.getElementById('timer-history-list');
        this.statBest = document.getElementById('timer-stat-best');
        this.statAo5 = document.getElementById('timer-stat-ao5');
        this.statAo12 = document.getElementById('timer-stat-ao12');
        this.statCount = document.getElementById('timer-stat-count');
    }

    loadHistory() {
        try {
            const data = localStorage.getItem(this.storageKey);
            this.solves = data ? JSON.parse(data) : [];
        } catch (e) {
            this.solves = [];
        }
        this.updateStats();
    }

    saveHistory() {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(this.solves));
        } catch (e) {}
        this.updateStats();
    }

    // =========================================================================
    // SCRAMBLE GENERATOR
    // =========================================================================
    generateNewScramble() {
        const type = this.scrambleType;
        let scramble = '';

        if (type === 'cmll') {
            // CMLL Training: Solved F2B + Scrambled U corners
            const cmllMoves = ["R", "R'", "R2", "U", "U'", "U2", "F", "F'", "r", "r'"];
            scramble = this.buildRandomMoves(cmllMoves, 12);
        } else if (type === 'lse') {
            // LSE Training: only M and U moves
            const lseMoves = ["M", "M'", "M2", "U", "U'", "U2"];
            scramble = this.buildRandomMoves(lseMoves, 15);
        } else {
            // Full WCA 3x3 Scramble (21 moves)
            scramble = this.buildWCAScramble(21);
        }

        this.currentScramble = scramble;
        if (this.scrambleDisplay) {
            this.scrambleDisplay.textContent = scramble;
        }

        // Update preview cube in timer
        this.updateTimerCubePreview(scramble);
        return scramble;
    }

    buildWCAScramble(length = 21) {
        const faces = ['U', 'D', 'L', 'R', 'F', 'B'];
        const modifiers = ['', "'", '2'];
        const moves = [];
        let lastAxis = -1;
        let secondLastAxis = -1;

        for (let i = 0; i < length; i++) {
            let axis;
            while (true) {
                axis = Math.floor(Math.random() * 3); // 0: U/D, 1: L/R, 2: F/B
                if (axis !== lastAxis) break;
            }

            secondLastAxis = lastAxis;
            lastAxis = axis;

            const faceIndex = axis * 2 + (Math.random() < 0.5 ? 0 : 1);
            const face = faces[faceIndex];
            const mod = modifiers[Math.floor(Math.random() * modifiers.length)];
            moves.push(face + mod);
        }

        return moves.join(' ');
    }

    buildRandomMoves(allowed, count) {
        const result = [];
        let last = '';
        for (let i = 0; i < count; i++) {
            let move;
            do {
                move = allowed[Math.floor(Math.random() * allowed.length)];
            } while (move[0] === last[0]);
            result.push(move);
            last = move;
        }
        return result.join(' ');
    }

    updateTimerCubePreview(scramble) {
        const previewContainer = document.getElementById('timer-cube-preview');
        if (!previewContainer) return;

        const cube = new CubeModel();
        cube.applyAlgorithm(scramble);

        const renderer = new CubeRenderer(cube, {
            viewMode: 'iso_ufr',
            width: 160,
            height: 160,
            interactive: false
        });

        previewContainer.innerHTML = '';
        previewContainer.appendChild(renderer.renderSVG());
    }

    // =========================================================================
    // TIMER EVENTS & STATE MACHINE
    // =========================================================================
    attachEvents() {
        const timerPad = document.getElementById('timer-touch-pad');

        // Spacebar handler
        window.addEventListener('keydown', (e) => {
            // Ignore if typing in input/textarea
            if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;

            if (e.code === 'Space') {
                e.preventDefault();
                if (this.state === 'IDLE' || this.state === 'STOPPED') {
                    this.onHoldStart();
                } else if (this.state === 'RUNNING') {
                    this.stopTimer();
                }
            } else if (this.state === 'RUNNING') {
                this.stopTimer();
            }
        });

        window.addEventListener('keyup', (e) => {
            if (e.code === 'Space') {
                e.preventDefault();
                if (this.state === 'READY') {
                    this.startTimer();
                } else if (this.state === 'HOLDING') {
                    // Released too early
                    this.state = 'IDLE';
                    clearTimeout(this.holdTimer);
                    this.setTimerColor('normal');
                }
            }
        });

        // Touchpad / Click support for mobile & tablet
        if (timerPad) {
            timerPad.addEventListener('pointerdown', (e) => {
                if (this.state === 'IDLE' || this.state === 'STOPPED') {
                    this.onHoldStart();
                } else if (this.state === 'RUNNING') {
                    this.stopTimer();
                }
            });

            timerPad.addEventListener('pointerup', (e) => {
                if (this.state === 'READY') {
                    this.startTimer();
                } else if (this.state === 'HOLDING') {
                    this.state = 'IDLE';
                    clearTimeout(this.holdTimer);
                    this.setTimerColor('normal');
                }
            });
        }

        // New scramble button
        const btnNewScramble = document.getElementById('btn-timer-new-scramble');
        if (btnNewScramble) {
            btnNewScramble.addEventListener('click', () => {
                this.generateNewScramble();
                window.SoundEngine.playClick();
            });
        }

        // Scramble type select
        const typeSelect = document.getElementById('timer-scramble-type');
        if (typeSelect) {
            typeSelect.addEventListener('change', (e) => {
                this.scrambleType = e.target.value;
                this.generateNewScramble();
            });
        }

        // Clear history button
        const btnClear = document.getElementById('btn-timer-clear-history');
        if (btnClear) {
            btnClear.addEventListener('click', () => {
                if (confirm('Bạn có chắc muốn xóa toàn bộ lịch sử giải này?')) {
                    this.solves = [];
                    this.saveHistory();
                }
            });
        }

        // Show Roux Solution Button
        const btnShowSolution = document.getElementById('btn-timer-show-solution');
        if (btnShowSolution) {
            btnShowSolution.addEventListener('click', () => {
                this.showRouxSolutionModal();
            });
        }
    }

    onHoldStart() {
        this.state = 'HOLDING';
        this.setTimerColor('holding'); // Orange
        clearTimeout(this.holdTimer);

        this.holdTimer = setTimeout(() => {
            if (this.state === 'HOLDING') {
                this.state = 'READY';
                this.setTimerColor('ready'); // Green
                window.SoundEngine.playClick();
            }
        }, this.holdThreshold);
    }

    startTimer() {
        this.state = 'RUNNING';
        this.startTime = performance.now();
        this.setTimerColor('running');

        this.timerInterval = setInterval(() => {
            const now = performance.now();
            this.elapsed = now - this.startTime;
            this.renderTime(this.elapsed);
        }, 10);
    }

    stopTimer() {
        this.state = 'STOPPED';
        clearInterval(this.timerInterval);
        this.setTimerColor('normal');
        window.SoundEngine.playSuccess();

        // Record solve
        this.solves.unshift({
            id: Date.now(),
            timeMs: this.elapsed,
            formatted: this.formatTime(this.elapsed),
            scramble: this.currentScramble,
            type: this.scrambleType,
            date: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
        });

        this.saveHistory();
        this.generateNewScramble();
    }

    renderTime(ms) {
        if (this.timerDisplay) {
            this.timerDisplay.textContent = this.formatTime(ms);
        }
    }

    formatTime(ms) {
        if (isNaN(ms) || ms < 0) return '0.000';
        const seconds = Math.floor(ms / 1000);
        const millis = Math.floor(ms % 1000);

        if (seconds >= 60) {
            const mins = Math.floor(seconds / 60);
            const remSec = seconds % 60;
            return `${mins}:${remSec.toString().padStart(2, '0')}.${millis.toString().padStart(3, '0').slice(0, 2)}`;
        }
        return `${seconds}.${millis.toString().padStart(3, '0').slice(0, 2)}`;
    }

    setTimerColor(mode) {
        if (!this.timerDisplay) return;
        this.timerDisplay.classList.remove('color-holding', 'color-ready', 'color-running');
        if (mode === 'holding') this.timerDisplay.classList.add('color-holding');
        else if (mode === 'ready') this.timerDisplay.classList.add('color-ready');
        else if (mode === 'running') this.timerDisplay.classList.add('color-running');
    }

    // =========================================================================
    // STATISTICS & SOLVE HISTORY
    // =========================================================================
    updateStats() {
        const count = this.solves.length;
        if (this.statCount) this.statCount.textContent = count;

        if (count === 0) {
            if (this.statBest) this.statBest.textContent = '--';
            if (this.statAo5) this.statAo5.textContent = '--';
            if (this.statAo12) this.statAo12.textContent = '--';
            if (this.historyList) this.historyList.innerHTML = '<div style="color: var(--text-muted); font-size: 0.8rem; padding: 1rem; text-align: center;">Chưa có lần giải nào. Giữ Space để bắt đầu!</div>';
            return;
        }

        // Best
        const times = this.solves.map(s => s.timeMs);
        const best = Math.min(...times);
        if (this.statBest) this.statBest.textContent = this.formatTime(best);

        // ao5 (last 5 solves)
        if (count >= 5) {
            const last5 = times.slice(0, 5);
            const ao5 = this.calcTrimmedAverage(last5);
            if (this.statAo5) this.statAo5.textContent = this.formatTime(ao5);
        } else {
            if (this.statAo5) this.statAo5.textContent = '--';
        }

        // ao12 (last 12 solves)
        if (count >= 12) {
            const last12 = times.slice(0, 12);
            const ao12 = this.calcTrimmedAverage(last12);
            if (this.statAo12) this.statAo12.textContent = this.formatTime(ao12);
        } else {
            if (this.statAo12) this.statAo12.textContent = '--';
        }

        // Render History List
        if (this.historyList) {
            this.historyList.innerHTML = '';
            this.solves.slice(0, 50).forEach((item, idx) => {
                const row = document.createElement('div');
                row.className = 'history-item';
                row.innerHTML = `
                    <span class="hist-num">#${count - idx}</span>
                    <span class="hist-time">${item.formatted}</span>
                    <span class="hist-scramble" title="${item.scramble}">${item.scramble}</span>
                    <button type="button" class="hist-del-btn" title="Xóa">×</button>
                `;
                row.querySelector('.hist-del-btn').addEventListener('click', (e) => {
                    e.stopPropagation();
                    this.solves = this.solves.filter(s => s.id !== item.id);
                    this.saveHistory();
                });
                this.historyList.appendChild(row);
            });
        }
    }

    calcTrimmedAverage(arr) {
        const sorted = [...arr].sort((a, b) => a - b);
        // Trim best and worst
        sorted.shift();
        sorted.pop();
        const sum = sorted.reduce((a, b) => a + b, 0);
        return sum / sorted.length;
    }

    showRouxSolutionModal() {
        if (!this.currentScramble) return;
        const solution = window.CubeSolver.solveScramble(this.currentScramble, this.scrambleType);

        const modal = document.getElementById('modal-solution');
        const content = document.getElementById('solution-content-area');
        if (!modal || !content) return;

        if (solution.isSolved) {
            content.innerHTML = `
                <div style="text-align: center; padding: 2rem; color: var(--emerald);">
                    <i data-lucide="check-circle" style="width: 48px; height: 48px; margin-bottom: 0.75rem;"></i>
                    <h3 style="font-size: 1.1rem; color: var(--text-primary); margin-bottom: 0.5rem;">Khối Rubik Đã Hoàn Thành!</h3>
                    <p style="font-size: 0.85rem; color: var(--text-secondary);">Khối Rubik hiện tại đang ở trạng thái đã giải (Solved). Hãy tạo Scramble mới để bắt đầu luyện tập giải!</p>
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

            <div class="modal-callout">
                <div style="font-size: 0.72rem; color: var(--text-muted); margin-bottom: 0.3rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.04em;">Scramble đang giải</div>
                <div class="modal-alg-plate is-compact">${solution.scramble}</div>
                <div style="font-size: 0.78rem; color: var(--emerald); font-weight: 600; margin-top: 0.5rem; display: inline-flex; align-items: center; gap: 0.35rem;">
                    <i data-lucide="check-circle" style="width: 14px; height: 14px;"></i>
                    Đã tính lời giải chuẩn xác (${solution.moveCount} bước đưa về Solved 100%)
                </div>
            </div>
            
            <div style="display: flex; flex-direction: column; gap: 0.65rem;">
                ${solution.steps.map(step => `
                    <div class="modal-step-card">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.35rem;">
                            <strong style="color: var(--text-primary); font-size: 0.875rem;">${step.phase}</strong>
                            <span style="font-size: 0.75rem; color: var(--text-muted);">${step.name}</span>
                        </div>
                        <div class="modal-alg-plate is-compact">${step.moves || 'Hoàn tất'}</div>
                        <div style="font-size: 0.785rem; color: var(--text-secondary); line-height: 1.5; margin-top: 0.4rem;">
                            ${step.explanation}
                        </div>
                        ${step.holdingTip ? `
                            <div style="font-size: 0.74rem; color: var(--accent); margin-top: 0.35rem; display: flex; align-items: center; gap: 0.3rem;">
                                <i data-lucide="info" style="width: 12px; height: 12px;"></i> ${step.holdingTip}
                            </div>
                        ` : ''}
                    </div>
                `).join('')}
            </div>

            <div style="margin-top: 1.15rem; display: flex; justify-content: flex-end; gap: 0.5rem;">
                <button type="button" class="action-btn btn-primary" id="btn-play-solution-3d">
                    <i data-lucide="play" style="width: 15px; height: 15px;"></i> Xem Hoạt Ảnh 3D Xoay Giải
                </button>
            </div>
        `;

        modal.classList.add('open');
        if (window.lucide) window.lucide.createIcons();

        document.getElementById('btn-play-solution-3d').addEventListener('click', () => {
            modal.classList.remove('open');
            window.app.openPlayer3D({
                title: 'Lời Giải Rubik Tự Động (Về Solved 100%)',
                algorithm: solution.fullSolution,
                setupAlg: solution.scramble
            });
        });
    }
}

window.CubeTimer = CubeTimer;
