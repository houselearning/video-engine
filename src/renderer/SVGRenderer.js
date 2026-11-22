export class SVGRenderer {
  constructor(svg) { this.svg=svg; this.namespace='http://www.w3.org/2000/svg'; }
  clear() { this.svg.replaceChildren(); }
  render(document, time) {
    this.clear();
    const state=document.sceneAtTime(time);
    const rect=document.createElementNS(this.namespace,'rect');
    rect.setAttribute('x','0'); rect.setAttribute('y','0'); rect.setAttribute('width','1280'); rect.setAttribute('height','720'); rect.setAttribute('fill','#20232a'); this.svg.append(rect);
    const title=document.createElementNS(this.namespace,'text');
    title.setAttribute('x','640'); title.setAttribute('y','360'); title.setAttribute('text-anchor','middle'); title.setAttribute('fill','#61dafb'); title.setAttribute('font-family','Arial,sans-serif'); title.setAttribute('font-size','42'); title.textContent=state.scene.id==='triangle'?'Right Triangle':state.scene.id==='squares'?'Construct Squares':state.scene.id==='proof'?"a² + b² = c²":'Three—Four—Five'; this.svg.append(title);
  }
}
