// Pure Web Audio API Sound Effects (Zero External Audio File Downloads)
class SoundEffectsManager {
  private ctx: AudioContext | null = null
  private enabled: boolean = false

  private initCtx() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      if (AudioCtx) {
        this.ctx = new AudioCtx()
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      void this.ctx.resume()
    }
  }

  public toggleSound(): boolean {
    this.enabled = !this.enabled
    if (this.enabled) {
      this.initCtx()
      this.playChime()
    }
    return this.enabled
  }

  public isEnabled(): boolean {
    return this.enabled
  }

  public playHover() {
    if (!this.enabled) return
    this.initCtx()
    if (!this.ctx) return

    try {
      const osc = this.ctx.createOscillator()
      const gain = this.ctx.createGain()

      osc.type = 'sine'
      osc.frequency.setValueAtTime(440, this.ctx.currentTime)
      osc.frequency.exponentialRampToValueAtTime(880, this.ctx.currentTime + 0.04)

      gain.gain.setValueAtTime(0.015, this.ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.04)

      osc.connect(gain)
      gain.connect(this.ctx.destination)

      osc.start()
      osc.stop(this.ctx.currentTime + 0.04)
    } catch {
      // Audio fallback
    }
  }

  public playClick() {
    if (!this.enabled) return
    this.initCtx()
    if (!this.ctx) return

    try {
      const osc = this.ctx.createOscillator()
      const gain = this.ctx.createGain()

      osc.type = 'triangle'
      osc.frequency.setValueAtTime(587, this.ctx.currentTime)
      osc.frequency.exponentialRampToValueAtTime(293, this.ctx.currentTime + 0.08)

      gain.gain.setValueAtTime(0.03, this.ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.08)

      osc.connect(gain)
      gain.connect(this.ctx.destination)

      osc.start()
      osc.stop(this.ctx.currentTime + 0.08)
    } catch {
      // Audio fallback
    }
  }

  public playChime() {
    if (!this.enabled) return
    this.initCtx()
    if (!this.ctx) return

    try {
      const now = this.ctx.currentTime
      const notes = [523.25, 659.25, 783.99, 1046.5] // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        if (!this.ctx) return
        const osc = this.ctx.createOscillator()
        const gain = this.ctx.createGain()

        osc.type = 'sine'
        osc.frequency.setValueAtTime(freq, now + idx * 0.04)

        gain.gain.setValueAtTime(0.02, now + idx * 0.04)
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.04 + 0.15)

        osc.connect(gain)
        gain.connect(this.ctx.destination)

        osc.start(now + idx * 0.04)
        osc.stop(now + idx * 0.04 + 0.15)
      })
    } catch {
      // Audio fallback
    }
  }
}

export const soundFx = new SoundEffectsManager()
