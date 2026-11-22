export class AnimationClock {
  constructor(documentDuration) {
    this.documentDuration = documentDuration;
    this.time = 0;
    this.running = false;
    this.lastTimestamp = null;
  }
  play() { this.running = true; this.lastTimestamp = null; }
  pause() { this.running = false; this.lastTimestamp = null; }
  seek(seconds) { this.time = Math.max(0, Math.min(this.documentDuration, Number(seconds) || 0)); }
  toggle() { this.running ? this.pause() : this.play(); return this.running; }
  tick(timestamp) {
    if (!this.running) { this.lastTimestamp = timestamp; return this.time; }
    if (this.lastTimestamp !== null) this.time += Math.min((timestamp - this.lastTimestamp) / 1000, 0.1);
    this.lastTimestamp = timestamp;
    if (this.time >= this.documentDuration) { this.time = this.documentDuration; this.running = false; }
    return this.time;
  }
}
