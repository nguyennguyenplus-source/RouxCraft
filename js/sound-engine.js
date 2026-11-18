/**
 * RouxCraft - Procedural Web Audio Sound Engine
 * Synthesizes realistic, subtle mechanical Rubik's cube turn clicks and clicks
 * without requiring any external audio files.
 */

class SoundEngine {
    constructor() {
        this.enabled = true;
        this.audioCtx = null;
    }

    init() {
        if (!this.audioCtx && typeof window.AudioContext !== 'undefined') {
            const AudioCtx = window.AudioContext || window.webkitAudioContext;
            this.audioCtx = new AudioCtx();
        }
        if (this.audioCtx && this.audioCtx.state === 'suspended') {
            this.audioCtx.resume();
        }
    }

    toggle() {
        this.enabled = !this.enabled;
        return this.enabled;
    }

    /**
     * Play a short mechanical plastic snap/click sound
     */
    playClick() {
        if (!this.enabled) return;
        this.init();
        if (!this.audioCtx) return;

        try {
            const now = this.audioCtx.currentTime;
            
            // Noise burst for mechanical friction
            const bufferSize = this.audioCtx.sampleRate * 0.04; // 40ms
            const buffer = this.audioCtx.createBuffer(1, bufferSize, this.audioCtx.sampleRate);
            const data = buffer.getChannelData(0);
            for (let i = 0; i < bufferSize; i++) {
                data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.3));
            }

            const noise = this.audioCtx.createBufferSource();
            noise.buffer = buffer;

            // Bandpass filter for plastic timbre
            const filter = this.audioCtx.createBiquadFilter();
            filter.type = 'bandpass';
            filter.frequency.setValueAtTime(1400 + Math.random() * 300, now);
            filter.Q.setValueAtTime(3.5, now);

            // Envelope
            const gain = this.audioCtx.createGain();
            gain.gain.setValueAtTime(0.18, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

            noise.connect(filter);
            filter.connect(gain);
            gain.connect(this.audioCtx.destination);

            noise.start(now);
            noise.stop(now + 0.05);

            // Subtle low thud
            const osc = this.audioCtx.createOscillator();
            const oscGain = this.audioCtx.createGain();
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(120, now);
            osc.frequency.exponentialRampToValueAtTime(40, now + 0.03);

            oscGain.gain.setValueAtTime(0.12, now);
            oscGain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);

            osc.connect(oscGain);
            oscGain.connect(this.audioCtx.destination);

            osc.start(now);
            osc.stop(now + 0.04);
        } catch (e) {
            // Audio context failed or blocked by autoplay policy
        }
    }

    /**
     * Play paint sound effect
     */
    playPaint() {
        if (!this.enabled) return;
        this.init();
        if (!this.audioCtx) return;

        try {
            const now = this.audioCtx.currentTime;
            const osc = this.audioCtx.createOscillator();
            const gain = this.audioCtx.createGain();

            osc.type = 'sine';
            osc.frequency.setValueAtTime(520, now);
            osc.frequency.exponentialRampToValueAtTime(780, now + 0.06);

            gain.gain.setValueAtTime(0.08, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

            osc.connect(gain);
            gain.connect(this.audioCtx.destination);

            osc.start(now);
            osc.stop(now + 0.07);
        } catch (e) {}
    }

    /**
     * Play success sound
     */
    playSuccess() {
        if (!this.enabled) return;
        this.init();
        if (!this.audioCtx) return;

        try {
            const notes = [440, 554, 659];
            notes.forEach((freq, idx) => {
                const now = this.audioCtx.currentTime + idx * 0.08;
                const osc = this.audioCtx.createOscillator();
                const gain = this.audioCtx.createGain();

                osc.type = 'sine';
                osc.frequency.setValueAtTime(freq, now);

                gain.gain.setValueAtTime(0.12, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

                osc.connect(gain);
                gain.connect(this.audioCtx.destination);

                osc.start(now);
                osc.stop(now + 0.2);
            });
        } catch (e) {}
    }
}

window.SoundEngine = new SoundEngine();
