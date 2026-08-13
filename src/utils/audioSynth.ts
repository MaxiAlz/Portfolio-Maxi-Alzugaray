// Web Audio API Synthesizer for realistic drum & music preview playback

class AudioEngine {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private intervalId: number | null = null;
  private currentStep: number = 0;
  private bpm: number = 120;
  private currentGenre: string = 'Rock';
  private onTimeUpdateCallback: ((time: number) => void) | null = null;
  private elapsedTime: number = 0;
  private gainNode: GainNode | null = null;
  private isMuted: boolean = false;
  private volume: number = 0.8;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.gainNode = this.ctx.createGain();
      this.gainNode.gain.setValueAtTime(this.volume, this.ctx.currentTime);
      this.gainNode.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setVolume(vol: number) {
    this.volume = vol;
    if (this.gainNode && this.ctx) {
      this.gainNode.gain.setValueAtTime(this.isMuted ? 0 : vol, this.ctx.currentTime);
    }
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    this.setVolume(this.volume);
    return this.isMuted;
  }

  public playTrack(genre: string = 'Rock', bpm: number = 120, onTimeUpdate?: (time: number) => void) {
    this.initContext();
    this.stop();

    this.isPlaying = true;
    this.bpm = bpm || 120;
    this.currentGenre = genre;
    this.onTimeUpdateCallback = onTimeUpdate || null;
    this.elapsedTime = 0;
    this.currentStep = 0;

    const stepDuration = (60 / this.bpm) / 4; // 16th notes

    this.intervalId = window.setInterval(() => {
      if (!this.isPlaying) return;
      this.triggerStep(this.currentStep, this.currentGenre);
      this.currentStep = (this.currentStep + 1) % 16;
      this.elapsedTime += stepDuration;

      if (this.onTimeUpdateCallback) {
        this.onTimeUpdateCallback(this.elapsedTime);
      }
    }, stepDuration * 1000);
  }

  public stop() {
    this.isPlaying = false;
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    this.elapsedTime = 0;
  }

  public pause() {
    this.isPlaying = false;
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  public resume() {
    if (!this.isPlaying && this.currentGenre) {
      this.playTrack(this.currentGenre, this.bpm, this.onTimeUpdateCallback || undefined);
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  private triggerStep(step: number, genre: string) {
    if (!this.ctx || !this.gainNode) return;

    const now = this.ctx.currentTime;

    // Pattern logic based on step (0 to 15)
    let playKick = step % 4 === 0;
    let playSnare = step === 4 || step === 12;
    let playHiHat = step % 2 === 0;
    let playTom = false;

    if (genre.includes('Metal') || genre.includes('Prog')) {
      playKick = step % 2 === 0 || step === 7 || step === 15;
      playSnare = step === 4 || step === 12;
      playHiHat = true; // fast hihat/ride
      if (step === 14 || step === 15) playTom = true;
    } else if (genre.includes('Pop') || genre.includes('Indie')) {
      playKick = step === 0 || step === 10;
      playSnare = step === 4 || step === 12;
      playHiHat = step % 2 === 0;
    } else if (genre.includes('Funk')) {
      playKick = step === 0 || step === 6 || step === 10;
      playSnare = step === 4 || step === 9 || step === 12;
      playHiHat = true;
    }

    if (playKick) this.playKickSound(now);
    if (playSnare) this.playSnareSound(now);
    if (playHiHat) this.playHiHatSound(now, step % 4 === 0);
    if (playTom) this.playTomSound(now);
  }

  private playKickSound(time: number) {
    if (!this.ctx || !this.gainNode) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.frequency.setValueAtTime(150, time);
    osc.frequency.exponentialRampToValueAtTime(30, time + 0.12);

    gain.gain.setValueAtTime(1, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.3);

    osc.connect(gain);
    gain.connect(this.gainNode);

    osc.start(time);
    osc.stop(time + 0.3);
  }

  private playSnareSound(time: number) {
    if (!this.ctx || !this.gainNode) return;

    // Tone body
    const osc = this.ctx.createOscillator();
    const oscGain = this.ctx.createGain();
    osc.frequency.setValueAtTime(220, time);
    osc.frequency.exponentialRampToValueAtTime(110, time + 0.1);
    oscGain.gain.setValueAtTime(0.7, time);
    oscGain.gain.exponentialRampToValueAtTime(0.01, time + 0.15);
    osc.connect(oscGain);
    oscGain.connect(this.gainNode);
    osc.start(time);
    osc.stop(time + 0.15);

    // Snare wires noise
    const bufferSize = this.ctx.sampleRate * 0.2;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const noiseFilter = this.ctx.createBiquadFilter();
    noiseFilter.type = 'highpass';
    noiseFilter.frequency.value = 1000;

    const noiseGain = this.ctx.createGain();
    noiseGain.gain.setValueAtTime(0.8, time);
    noiseGain.gain.exponentialRampToValueAtTime(0.01, time + 0.2);

    noise.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(this.gainNode);

    noise.start(time);
    noise.stop(time + 0.2);
  }

  private playHiHatSound(time: number, isOpen: boolean) {
    if (!this.ctx || !this.gainNode) return;

    const bufferSize = this.ctx.sampleRate * (isOpen ? 0.25 : 0.05);
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.value = 7000;

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(isOpen ? 0.4 : 0.25, time);
    gain.gain.exponentialRampToValueAtTime(0.01, time + (isOpen ? 0.25 : 0.05));

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.gainNode);

    noise.start(time);
    noise.stop(time + (isOpen ? 0.25 : 0.05));
  }

  private playTomSound(time: number) {
    if (!this.ctx || !this.gainNode) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.frequency.setValueAtTime(180, time);
    osc.frequency.exponentialRampToValueAtTime(80, time + 0.2);

    gain.gain.setValueAtTime(0.8, time);
    gain.gain.exponentialRampToValueAtTime(0.01, time + 0.25);

    osc.connect(gain);
    gain.connect(this.gainNode);

    osc.start(time);
    osc.stop(time + 0.25);
  }
}

export const audioEngine = new AudioEngine();
