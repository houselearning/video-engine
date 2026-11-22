export class VideoDocument {
  constructor(definition) {
    if (!definition?.title || !Array.isArray(definition.scenes)) throw new Error('A video needs a title and scenes.');
    this.title = definition.title;
    this.subject = definition.subject || 'General';
    this.gradeRange = definition.gradeRange || '';
    this.description = definition.description || '';
    this.narrator = definition.narrator || 'houselearning-calm';
    this.scenes = definition.scenes;
    this.subtitles = definition.subtitles || [];
  }
  get duration() {
    return this.scenes.reduce((total, scene) => total + (scene.duration || 0), 0);
  }
  sceneAtTime(time) {
    let cursor = 0;
    for (let index = 0; index < this.scenes.length; index += 1) {
      const scene = this.scenes[index];
      if (time >= cursor && time < cursor + scene.duration) return { scene, index, sceneTime: time - cursor };
      cursor += scene.duration;
    }
    return { scene: this.scenes.at(-1), index: this.scenes.length - 1, sceneTime: this.scenes.at(-1)?.duration || 0 };
  }
}
