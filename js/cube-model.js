/**
 * RouxCraft - Cube Logic & Algorithm Simulator Engine
 * Represents a 3x3 Rubik's Cube state with 54 facelets (9 per face: U, D, F, B, L, R).
 * Supports standard notation, slice moves (M, E, S), wide moves (r, l, u, d, f, b),
 * cube rotations (x, y, z), and Roux-specific masking.
 */

class CubeModel {
    // Face indices
    static FACES = ['U', 'D', 'F', 'B', 'L', 'R'];
    
    // Standard Roux Color Palette (Hex)
    static COLORS = {
        'U': '#FDE047', // Yellow
        'D': '#FFFFFF', // White
        'F': '#EF4444', // Red
        'B': '#F97316', // Orange
        'L': '#3B82F6', // Blue
        'R': '#10B981', // Green
        'X': '#475569', // Dimmed / Masked Gray (Ignore)
        'BLANK': '#1E293B' // Empty / Unset
    };

    // Color labels in Vietnamese
    static COLOR_NAMES = {
        '#FDE047': 'Vàng (U)',
        '#FFFFFF': 'Trắng (D)',
        '#EF4444': 'Đỏ (F)',
        '#F97316': 'Cam (B)',
        '#3B82F6': 'Xanh dương (L)',
        '#10B981': 'Xanh lá (R)',
        '#475569': 'Xám (Bỏ qua / Dim)',
        '#1E293B': 'Tối (Trống)'
    };

    constructor() {
        this.reset();
    }

    /**
     * Reset cube to solved state
     */
    reset() {
        this.state = {};
        for (const face of CubeModel.FACES) {
            this.state[face] = new Array(9).fill(CubeModel.COLORS[face]);
        }
        this.arrows = []; // [{ fromFace, fromIdx, toFace, toIdx, color, label }]
    }

    /**
     * Reset all stickers to grey / ignored, keeping centers fixed
     */
    clearToGrey(keepCenters = true) {
        for (const face of CubeModel.FACES) {
            this.state[face] = new Array(9).fill(CubeModel.COLORS['X']);
            if (keepCenters) {
                this.state[face][4] = CubeModel.COLORS[face];
            }
        }
        this.arrows = [];
    }

    /**
     * Fill all grey / ignored stickers with their standard solved face colors
     */
    fillGreyWithSolved() {
        for (const face of CubeModel.FACES) {
            for (let i = 0; i < 9; i++) {
                if (this.state[face][i] === CubeModel.COLORS['X']) {
                    this.state[face][i] = CubeModel.COLORS[face];
                }
            }
        }
    }

    /**
     * Deep clone current state
     */
    clone() {
        const copy = new CubeModel();
        for (const face of CubeModel.FACES) {
            copy.state[face] = [...this.state[face]];
        }
        copy.arrows = JSON.parse(JSON.stringify(this.arrows));
        return copy;
    }

    /**
     * Get sticker color
     */
    getSticker(face, index) {
        if (!this.state[face] || index < 0 || index > 8) return CubeModel.COLORS['X'];
        return this.state[face][index];
    }

    /**
     * Set sticker color
     */
    setSticker(face, index, color) {
        if (this.state[face] && index >= 0 && index <= 8) {
            this.state[face][index] = color;
        }
    }

    /**
     * Load state from JSON or object
     */
    loadState(data) {
        if (!data) return;
        const stateObj = data.state || (data.U ? data : null);
        if (stateObj) {
            for (const face of CubeModel.FACES) {
                if (Array.isArray(stateObj[face])) {
                    this.state[face] = [...stateObj[face]];
                }
            }
        }
        if (Array.isArray(data.arrows)) {
            this.arrows = JSON.parse(JSON.stringify(data.arrows));
        }
    }

    /**
     * Export serializable state
     */
    serialize() {
        return {
            state: JSON.parse(JSON.stringify(this.state)),
            arrows: JSON.parse(JSON.stringify(this.arrows))
        };
    }

    // ==========================================
    // ROUX MASKING PRESETS
    // ==========================================

    /**
     * First Block (FB) Mask:
     * Focus on 1x2x3 block on Left (D-L block):
     * DL edge (D[3], L[7]), FL edge (F[3], L[5]), BL edge (B[5], L[3]),
     * DFL corner (D[0], F[6], L[8]), DBL corner (D[6], B[8], L[6]), L center (L[4]).
     * All other stickers become Dimmed Gray ('X').
     */
    applyFBMask() {
        this.reset();
        const activeStickers = {
            'L': [3, 4, 5, 6, 7, 8],
            'D': [0, 3, 6],
            'F': [3, 6],
            'B': [5, 8],
            'U': [],
            'R': []
        };
        this.maskExcept(activeStickers);
    }

    /**
     * Second Block (SB) Mask:
     * First Block + Second Block on Right (D-R block):
     * DR edge (D[5], R[7]), FR edge (F[5], R[3]), BR edge (B[3], R[5]),
     * DFR corner (D[2], F[8], R[6]), DBR corner (D[8], B[6], R[8]), R center (R[4]).
     */
    applySBMask() {
        this.reset();
        const activeStickers = {
            'L': [3, 4, 5, 6, 7, 8],
            'R': [3, 4, 5, 6, 7, 8],
            'D': [0, 2, 3, 5, 6, 8],
            'F': [3, 5, 6, 8],
            'B': [3, 5, 6, 8],
            'U': []
        };
        this.maskExcept(activeStickers);
    }

    /**
     * CMLL Mask:
     * Both blocks solved (F2B), focus solely on 4 U corners (UFL, UFR, UBL, UBR)
     * and their lateral stickers. Last layer edges and M-slice are masked.
     */
    applyCMLLMask() {
        this.reset();
        const activeStickers = {
            'U': [0, 2, 6, 8], // 4 U corners
            'F': [0, 2, 3, 5, 6, 8], // Top corners + F2B
            'B': [0, 2, 3, 5, 6, 8],
            'L': [0, 2, 3, 4, 5, 6, 7, 8],
            'R': [0, 2, 3, 4, 5, 6, 7, 8],
            'D': [0, 2, 3, 5, 6, 8]
        };
        this.maskExcept(activeStickers);
    }

    /**
     * CMLL Pure Top Mask (Only U corners and their side orientation stickers)
     */
    applyCMLLTopOnlyMask() {
        this.clearToGrey(true);
        // U face corners
        this.state['U'][0] = CubeModel.COLORS['U'];
        this.state['U'][2] = CubeModel.COLORS['U'];
        this.state['U'][6] = CubeModel.COLORS['U'];
        this.state['U'][8] = CubeModel.COLORS['U'];

        // Side corners top row
        this.state['F'][0] = CubeModel.COLORS['F'];
        this.state['F'][2] = CubeModel.COLORS['F'];
        this.state['B'][0] = CubeModel.COLORS['B'];
        this.state['B'][2] = CubeModel.COLORS['B'];
        this.state['L'][0] = CubeModel.COLORS['L'];
        this.state['L'][2] = CubeModel.COLORS['L'];
        this.state['R'][0] = CubeModel.COLORS['R'];
        this.state['R'][2] = CubeModel.COLORS['R'];
    }

    /**
     * LSE (Last Six Edges) Mask:
     * Focus on the 6 remaining edges: UF, UB, UL, UR, DF, DB.
     * Both 1x2x3 blocks and 4 CMLL corners are solved.
     */
    applyLSEMask() {
        this.reset();
        const activeStickers = {
            'U': [1, 3, 4, 5, 7], // LSE edges: UB, UL, UR, UF + center
            'D': [1, 4, 7],       // DB, DF + center
            'F': [1, 4, 7],       // UF, DF side edges + center
            'B': [1, 4, 7],       // UB, DB side edges + center
            'L': [1, 4, 7],       // UL side edge + center
            'R': [1, 4, 7]        // UR side edge + center
        };
        this.maskExcept(activeStickers, true);
    }

    /**
     * Helper to mask stickers except the specified map.
     * By default, fixed face center (index 4) is ALWAYS preserved to guarantee orientation!
     */
    maskExcept(activeMap, keepCenters = true) {
        for (const face of CubeModel.FACES) {
            const active = activeMap[face] || [];
            for (let i = 0; i < 9; i++) {
                if (i === 4 && keepCenters) {
                    this.state[face][i] = CubeModel.COLORS[face];
                } else if (!active.includes(i)) {
                    this.state[face][i] = CubeModel.COLORS['X'];
                }
            }
        }
    }

    // ==========================================
    // CUBE ROTATION & MOVE SIMULATION
    // ==========================================

    /**
     * Rotate a 3x3 face clockwise
     */
    rotateFaceCW(face) {
        const s = this.state[face];
        const prev = [...s];
        // 0 1 2     6 3 0
        // 3 4 5  => 7 4 1
        // 6 7 8     8 5 2
        s[0] = prev[6];
        s[1] = prev[3];
        s[2] = prev[0];
        s[3] = prev[7];
        s[4] = prev[4];
        s[5] = prev[1];
        s[6] = prev[8];
        s[7] = prev[5];
        s[8] = prev[2];
    }

    rotateFaceCCW(face) {
        for (let i = 0; i < 3; i++) this.rotateFaceCW(face);
    }

    rotateFace180(face) {
        for (let i = 0; i < 2; i++) this.rotateFaceCW(face);
    }

    /**
     * Execute a single standard move
     * Supports: U, D, F, B, L, R, M, E, S, r, l, u, d, f, b, x, y, z (and ', 2 variants)
     */
    executeMove(move) {
        if (!move) return;
        move = move.trim();
        const base = move[0];
        const modifier = move.slice(1);

        let times = 1;
        if (modifier === "'") times = 3;
        else if (modifier === "2" || modifier === "2'" || modifier === "'2") times = 2;

        for (let t = 0; t < times; t++) {
            this.executeBasicMove(base);
        }
    }

    /**
     * Execute basic clockwise move
     */
    executeBasicMove(base) {
        const U = this.state['U'];
        const D = this.state['D'];
        const F = this.state['F'];
        const B = this.state['B'];
        const L = this.state['L'];
        const R = this.state['R'];

        switch (base) {
            case 'U': {
                this.rotateFaceCW('U');
                const temp = [F[0], F[1], F[2]];
                F[0] = R[0]; F[1] = R[1]; F[2] = R[2];
                R[0] = B[0]; R[1] = B[1]; R[2] = B[2];
                B[0] = L[0]; B[1] = L[1]; B[2] = L[2];
                L[0] = temp[0]; L[1] = temp[1]; L[2] = temp[2];
                break;
            }
            case 'D': {
                this.rotateFaceCW('D');
                const temp = [F[6], F[7], F[8]];
                F[6] = L[6]; F[7] = L[7]; F[8] = L[8];
                L[6] = B[6]; L[7] = B[7]; L[8] = B[8];
                B[6] = R[6]; B[7] = R[7]; B[8] = R[8];
                R[6] = temp[0]; R[7] = temp[1]; R[8] = temp[2];
                break;
            }
            case 'F': {
                this.rotateFaceCW('F');
                const temp = [U[6], U[7], U[8]];
                U[6] = L[8]; U[7] = L[5]; U[8] = L[2];
                L[2] = D[0]; L[5] = D[1]; L[8] = D[2];
                D[0] = R[6]; D[1] = R[3]; D[2] = R[0];
                R[0] = temp[0]; R[3] = temp[1]; R[6] = temp[2];
                break;
            }
            case 'B': {
                this.rotateFaceCW('B');
                const temp = [U[2], U[1], U[0]];
                U[2] = R[8]; U[1] = R[5]; U[0] = R[2];
                R[2] = D[8]; R[5] = D[7]; R[8] = D[6];
                D[8] = L[6]; D[7] = L[3]; D[6] = L[0];
                L[0] = temp[0]; L[3] = temp[1]; L[6] = temp[2];
                break;
            }
            case 'L': {
                this.rotateFaceCW('L');
                const temp = [U[0], U[3], U[6]];
                U[0] = B[8]; U[3] = B[5]; U[6] = B[2];
                B[8] = D[0]; B[5] = D[3]; B[2] = D[6];
                D[0] = F[0]; D[3] = F[3]; D[6] = F[6];
                F[0] = temp[0]; F[3] = temp[1]; F[6] = temp[2];
                break;
            }
            case 'R': {
                this.rotateFaceCW('R');
                const temp = [U[2], U[5], U[8]];
                U[2] = F[2]; U[5] = F[5]; U[8] = F[8];
                F[2] = D[2]; F[5] = D[5]; F[8] = D[8];
                D[2] = B[6]; D[5] = B[3]; D[8] = B[0];
                B[6] = temp[0]; B[3] = temp[1]; B[0] = temp[2];
                break;
            }
            // Slices
            case 'M': {
                // Follows L direction (downward on F face)
                const temp = [U[1], U[4], U[7]];
                U[1] = B[7]; U[4] = B[4]; U[7] = B[1];
                B[7] = D[1]; B[4] = D[4]; B[1] = D[7];
                D[1] = F[1]; D[4] = F[4]; D[7] = F[7];
                F[1] = temp[0]; F[4] = temp[1]; F[7] = temp[2];
                break;
            }
            case 'E': {
                // Follows D direction
                const temp = [F[3], F[4], F[5]];
                F[3] = L[3]; F[4] = L[4]; F[5] = L[5];
                L[3] = B[3]; L[4] = B[4]; L[5] = B[5];
                B[3] = R[3]; B[4] = R[4]; B[5] = R[5];
                R[3] = temp[0]; R[4] = temp[1]; R[5] = temp[2];
                break;
            }
            case 'S': {
                // Follows F direction
                const temp = [U[3], U[4], U[5]];
                U[3] = L[7]; U[4] = L[4]; U[5] = L[1];
                L[1] = D[3]; L[4] = D[4]; L[7] = D[5];
                D[3] = R[7]; D[4] = R[4]; D[5] = R[1];
                R[1] = temp[0]; R[4] = temp[1]; R[7] = temp[2];
                break;
            }
            // Wide moves
            case 'r': {
                // R + M' (M' is 3 M)
                this.executeBasicMove('R');
                for (let i = 0; i < 3; i++) this.executeBasicMove('M');
                break;
            }
            case 'l': {
                // L + M
                this.executeBasicMove('L');
                this.executeBasicMove('M');
                break;
            }
            case 'u': {
                // U + E'
                this.executeBasicMove('U');
                for (let i = 0; i < 3; i++) this.executeBasicMove('E');
                break;
            }
            case 'd': {
                // D + E
                this.executeBasicMove('D');
                this.executeBasicMove('E');
                break;
            }
            case 'f': {
                // F + S
                this.executeBasicMove('F');
                this.executeBasicMove('S');
                break;
            }
            case 'b': {
                // B + S'
                this.executeBasicMove('B');
                for (let i = 0; i < 3; i++) this.executeBasicMove('S');
                break;
            }
            // Cube rotations
            case 'x': {
                // Rotate entire cube around R
                this.executeBasicMove('R');
                for (let i = 0; i < 3; i++) {
                    this.executeBasicMove('M');
                    this.executeBasicMove('L');
                }
                break;
            }
            case 'y': {
                // Rotate entire cube around U
                this.executeBasicMove('U');
                for (let i = 0; i < 3; i++) {
                    this.executeBasicMove('E');
                    this.executeBasicMove('D');
                }
                break;
            }
            case 'z': {
                // Rotate entire cube around F
                this.executeBasicMove('F');
                this.executeBasicMove('S');
                for (let i = 0; i < 3; i++) {
                    this.executeBasicMove('B');
                }
                break;
            }
        }
    }

    /**
     * Invert an array of normalized move tokens
     */
    static invertMoves(moves) {
        if (!Array.isArray(moves)) return [];
        return [...moves].reverse().map(tok => {
            if (tok.endsWith("2") || tok.endsWith("2'") || tok.endsWith("'2")) {
                return tok.replace("'2", "2").replace("2'", "2");
            }
            if (tok.endsWith("'")) return tok.slice(0, -1);
            return tok + "'";
        });
    }

    /**
     * Advanced Speedcubing Algorithm Parser
     * Supports:
     * - Standard moves, slice moves (M, E, S), wide moves (r, l, Rw, Lw...), rotations (x, y, z)
     * - Grouped repetitions: (R U R' U')3, (R U R' U')x3, (R U R' U')*3, (M' U)4, nested ((...)2 F)2
     * - Grouped inverses: (R U R' U')'
     * - Pre-AUF / setup brackets: [U], [U'], [U2], [y], [y']
     * - Commutators: [A, B] => A B A' B' (and repeated [A, B]2)
     * - Conjugates: [A: B] => A B A' (and repeated [A: B]2)
     * - Typographic quotes (’, ‘, ′) and compact spacing (RUR'U')
     */
    static parseAlgorithm(alg) {
        if (!alg || typeof alg !== 'string') return [];

        // Take primary algorithm before alternatives
        let src = alg.split(/\bhoặc\b|\bhay\b|\bor\b|\//i)[0];
        // Normalize typographic apostrophes/primes & curly braces
        src = src.replace(/[’‘′`]/g, "'").replace(/\{/g, '(').replace(/\}/g, ')').trim();
        if (!src) return [];

        let pos = 0;
        const len = src.length;

        const skipSpaces = () => {
            while (pos < len && /\s/.test(src[pos])) pos++;
        };

        // Parse optional post-group modifier: e.g., 3, x3, *3, ×3, ', 2', '2
        const parseGroupModifier = () => {
            const savedPos = pos;
            skipSpaces();
            let invert = false;
            let count = 1;

            // Optional leading prime: (R U R' U')' or (R U R' U')'2
            if (pos < len && src[pos] === "'") {
                invert = true;
                pos++;
                skipSpaces();
            }

            // Optional multiplier: 3, x3, *3, ×3
            // Carefully distinguish cube rotation 'x' from multiplier 'x3' (only match x when followed by digit)
            let multMatch = null;
            const rem = src.slice(pos);
            if (/^[xX×*]\s*\d+/.test(rem)) {
                multMatch = rem.match(/^[xX×*]\s*(\d+)/);
            } else if (/^\d+/.test(rem)) {
                multMatch = rem.match(/^(\d+)/);
            }

            if (multMatch) {
                count = Math.min(20, Math.max(0, parseInt(multMatch[1], 10)));
                pos += multMatch[0].length;
            }

            // Optional trailing prime after count: (R U)2'
            if (pos < len && src[pos] === "'") {
                invert = !invert;
                pos++;
            }

            if (!multMatch && !invert) {
                pos = savedPos;
            }

            return { count, invert };
        };

        const applyModifier = (moves, { count, invert }) => {
            if (count <= 0 || moves.length === 0) return [];
            const baseMoves = invert ? CubeModel.invertMoves(moves) : moves;
            const result = [];
            for (let i = 0; i < count; i++) {
                result.push(...baseMoves);
            }
            return result;
        };

        const parseSequence = (stopChars = '') => {
            const moves = [];
            while (pos < len) {
                skipSpaces();
                if (pos >= len) break;
                const ch = src[pos];
                if (stopChars.includes(ch)) break;

                if (ch === '(') {
                    pos++; // consume '('
                    const inner = parseSequence(')');
                    if (pos < len && src[pos] === ')') pos++; // consume ')'
                    const mod = parseGroupModifier();
                    moves.push(...applyModifier(inner, mod));
                } else if (ch === '[') {
                    pos++; // consume '['
                    const partA = parseSequence('],:');
                    let inner = partA;

                    if (pos < len && src[pos] === ',') {
                        // Commutator [A, B] = A B A' B'
                        pos++; // consume ','
                        const partB = parseSequence(']');
                        inner = [
                            ...partA,
                            ...partB,
                            ...CubeModel.invertMoves(partA),
                            ...CubeModel.invertMoves(partB)
                        ];
                    } else if (pos < len && src[pos] === ':') {
                        // Conjugate [A: B] = A B A'
                        pos++; // consume ':'
                        const partB = parseSequence(']');
                        inner = [
                            ...partA,
                            ...partB,
                            ...CubeModel.invertMoves(partA)
                        ];
                    }

                    if (pos < len && src[pos] === ']') pos++; // consume ']'
                    const mod = parseGroupModifier();
                    moves.push(...applyModifier(inner, mod));
                } else {
                    // Match a single move token (supports Rw/rw wide moves and standard 1-letter moves)
                    const rem = src.slice(pos);
                    const moveMatch = rem.match(/^(?:([RLUDFBrludfb])w|([UDFBLRlrudfbMESxyz]))(2'?|'2|2|')?/);
                    if (moveMatch) {
                        let base = moveMatch[1] ? moveMatch[1].toLowerCase() : moveMatch[2];
                        let mod = moveMatch[3] || '';
                        if (mod === "'2") mod = "2'";
                        moves.push(base + mod);
                        pos += moveMatch[0].length;
                    } else {
                        // Skip unrecognized character safely
                        pos++;
                    }
                }
            }
            return moves;
        };

        return parseSequence('');
    }

    /**
     * Parse and execute an algorithm string
     * e.g. "[U] F (R U R' U')3 F'" or "r U R' U' r' R U R U' R'"
     */
    applyAlgorithm(alg) {
        if (!alg) return;
        const tokens = CubeModel.parseAlgorithm(alg);
        for (const token of tokens) {
            this.executeMove(token);
        }
    }

    /**
     * Compute the inverse of an algorithm string (expands shorthand first!)
     * e.g. "[U] F (R U R' U')3 F'" -> "F U R U' R' U R U' R' U R U' R' F' U'"
     */
    static invertAlgorithm(alg) {
        if (!alg) return '';
        const tokens = CubeModel.parseAlgorithm(alg);
        return CubeModel.invertMoves(tokens).join(' ');
    }

    /**
     * Add a visual arrow overlay
     */
    addArrow(fromFace, fromIdx, toFace, toIdx, color = '#FDE047', label = '') {
        this.arrows.push({ fromFace, fromIdx, toFace, toIdx, color, label });
    }

    /**
     * Clear all arrows
     */
    clearArrows() {
        this.arrows = [];
    }
}

// Export for browser window
window.CubeModel = CubeModel;
