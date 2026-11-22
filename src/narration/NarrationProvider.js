export class NarrationProvider {
  constructor(profile) { this.profile = profile || {}; }
  speak() { throw new Error('NarrationProvider.speak must be implemented'); }
  cancel() {}
  setVolume() {}
}
