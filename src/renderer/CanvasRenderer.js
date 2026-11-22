import { PythagoreanScene } from '../scenes/PythagoreanScene.js';

export class CanvasRenderer {
  constructor(canvas) { this.canvas=canvas; this.context=canvas.getContext('2d',{alpha:false}); this.scene=new PythagoreanScene(); this.resizeObserver=new ResizeObserver(()=>this.resize()); this.resizeObserver.observe(canvas); this.resize(); }
  resize(){const rect=this.canvas.getBoundingClientRect();const ratio=Math.min(window.devicePixelRatio||1,2);this.canvas.width=Math.max(320,Math.round(rect.width*ratio));this.canvas.height=Math.max(180,Math.round(rect.height*ratio));this.context.setTransform(ratio,0,0,ratio,0,0);}
  render(document, time){const state=document.sceneAtTime(time);this.scene.render(this.context,this.canvas.width/(window.devicePixelRatio||1),this.canvas.height/(window.devicePixelRatio||1),state.scene.id,state.sceneTime, state.scene?Math.max(0,Math.min(1,state.sceneTime/state.scene.duration)):1);}
  destroy(){this.resizeObserver?.disconnect();}
}
