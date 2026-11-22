export class AudioMixer {
  constructor() {
    this.context = null; this.master = null;
    this.channels = { narration:null, music:null, effects:null, overall:null };
  }
  async init() {
    if (this.context) return;
    const Context = window.AudioContext || window.webkitAudioContext;
    if (!Context) return false;
    this.context = new Context();
    if (this.context.state === 'suspended') await this.context.resume();
    this.mediaDestination = typeof this.context.createMediaStreamDestination==='function' ? this.context.createMediaStreamDestination() : null;
    this.master = this.context.createGain();
    this.channels.overall = this.master;
    this.channels.narration = this.context.createGain();
    this.channels.music = this.context.createGain();
    this.channels.effects = this.context.createGain();
    this.channels.narration.connect(this.master); this.channels.music.connect(this.master); this.channels.effects.connect(this.master); this.master.connect(this.context.destination); if(this.mediaDestination)this.master.connect(this.mediaDestination);
    this.setVolume('overall',0.8); this.setVolume('narration',0.9); this.setVolume('music',0.18); this.setVolume('effects',0.55);
    return true;
  }
  async loadAndScheduleMusic(path) {
    if (!await this.init()) return false;
    if (!this.musicBuffer) { const response=await fetch(path); if(!response.ok)return false; this.musicBuffer=await this.context.decodeAudioData(await response.arrayBuffer()); }
    this.musicSource?.stop?.();
    this.musicSource=this.context.createBufferSource(); this.musicSource.buffer=this.musicBuffer; this.musicSource.loop=true; this.musicSource.connect(this.channels.music); this.musicSource.start(); return true;
  }
  async scheduleExportNarration(narration, sceneStarts) {
    if (!await this.init()) return false;
    if (this.context.state === 'suspended') await this.context.resume();
    await narration.scheduleFromStart(this,sceneStarts); return true;
  }
  setVolume(channel, value) {
    const gain = channel === 'overall' ? this.master : this.channels[channel];
    if (gain) gain.gain.setTargetAtTime(Math.max(0,Math.min(1,value)), this.context?.currentTime || 0, 0.02);
  }
  async tone(frequency=440,duration=0.12) {
    if (!await this.init()) return;
    const oscillator=this.context.createOscillator(); const gain=this.context.createGain(); oscillator.type='sine'; oscillator.frequency.value=frequency; gain.gain.setValueAtTime(0.0001,this.context.currentTime); gain.gain.exponentialRampToValueAtTime(0.12,this.context.currentTime+0.01); gain.gain.exponentialRampToValueAtTime(0.0001,this.context.currentTime+duration); oscillator.connect(gain); gain.connect(this.channels.effects); oscillator.start(); oscillator.stop(this.context.currentTime+duration);
  }
}
