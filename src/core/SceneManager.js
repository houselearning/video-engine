export class SceneManager {
  constructor(document) { this.document = document; }
  getScene(time) { return this.document.sceneAtTime(time); }
  transitionFor(time) {
    const current = this.getScene(time);
    const progress = current.scene ? Math.max(0, Math.min(1, current.sceneTime / current.scene.duration)) : 0;
    return { ...current, progress };
  }
}
