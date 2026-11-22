import { NarrationProvider } from './NarrationProvider.js';

export class BrowserSpeechProvider extends NarrationProvider {
  constructor(profile) { super(profile); this.volume = 0.9; this.currentUtterance = null; }
  setVolume(value) { this.volume = Math.max(0, Math.min(1, value)); }
  speak(text, options = {}) {
    if (!('speechSynthesis' in window)) return false;
    this.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    const voices = speechSynthesis.getVoices();
    const preferred = this.profile.voiceKeywords || [];
    utterance.voice = voices.find(voice => preferred.some(word => voice.name.toLowerCase().includes(word))) || voices.find(voice => voice.lang?.startsWith('en')) || null;
    utterance.rate = this.profile.rate || 0.96;
    utterance.pitch = this.profile.pitch || 1;
    utterance.volume = this.volume;
    if (options.onEnd) utterance.onend = options.onEnd;
    this.currentUtterance = utterance;
    speechSynthesis.speak(utterance);
    return true;
  }
  cancel() { if ('speechSynthesis' in window) speechSynthesis.cancel(); }
}
