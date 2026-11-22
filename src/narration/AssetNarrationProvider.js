import { NarrationProvider } from './NarrationProvider.js';

export class AssetNarrationProvider extends NarrationProvider {
  constructor(profile, paths, fallback) {
    super(profile);
    this.paths = paths || [];
    this.fallback = fallback || null;
    this.buffers = [];
    this.sources = [];
    this.volume = 0.9;
    this.loaded = false;
  }
  setVolume(value) { this.volume = Math.max(0, Math.min(1, value)); }
  async load(context) {
    if (this.loaded) return true;
    const buffers = [];
    for (const path of this.paths) {
      const response = await fetch(path);
      if (!response.ok) return false;
      buffers.push(await context.decodeAudioData(await response.arrayBuffer()));
    }
    this.buffers = buffers;
    this.loaded = true;
    return true;
  }
  async speak(text, options = {}) {
    if (!options.mixer?.context) return false;
    if (!(await this.load(options.mixer.context))) return this.fallback ? this.fallback.speak(text, options) : false;
    this.cancel();
    const index = options.sceneIndex ?? 0;
    const buffer = this.buffers.length===1 ? this.buffers[0] : this.buffers[index];
    if (!buffer) return false;
    const mixer = options.mixer;
    const source = mixer.context.createBufferSource();
    const gain = mixer.context.createGain();
    gain.gain.value = this.volume;
    source.buffer = buffer;
    source.connect(gain);
    gain.connect(mixer.channels.narration);
    const sceneStarts = [0,9,19,30];
    const offset = this.buffers.length===1 ? (sceneStarts[index] + (options.sceneTime||0)) : (options.sceneTime||0);
    source.start(mixer.context.currentTime, Math.min(offset, buffer.duration));
    this.sources.push(source);
    return true;
  }
  async scheduleFromStart(mixer, sceneStarts) {
    await this.load(mixer.context);
    this.cancel();
    if (this.buffers.length===1) {
      const source = mixer.context.createBufferSource();
      const gain = mixer.context.createGain(); gain.gain.value=this.volume;
      source.buffer=this.buffers[0]; source.connect(gain); gain.connect(mixer.channels.narration); source.start(mixer.context.currentTime); this.sources.push(source); return;
    }
    for (let index = 0; index < this.buffers.length; index += 1) {
      const source = mixer.context.createBufferSource();
      const gain = mixer.context.createGain();
      gain.gain.value = this.volume;
      source.buffer = this.buffers[index];
      source.connect(gain); gain.connect(mixer.channels.narration);
      source.start(mixer.context.currentTime + sceneStarts[index]);
      this.sources.push(source);
    }
  }
  cancel() { for (const source of this.sources) { try { source.stop(); } catch (_) {} } this.sources = []; if(this.fallback)this.fallback.cancel(); }
}
