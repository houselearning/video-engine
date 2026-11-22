export class SubtitleTrack {
  constructor(segments) { this.segments = segments || []; }
  at(time) {
    const segment = this.segments.find(item => time >= item.start && time <= item.end);
    return segment ? segment.text : '';
  }
}
