export class PlayerController {
  constructor({clock,renderer,document,subtitleTrack,narration,onState,mixer}) {
    this.clock=clock; this.renderer=renderer; this.document=document; this.subtitleTrack=subtitleTrack; this.narration=narration; this.onState=onState; this.options={mixer}; this.frame=null; this.lastScene=-1;
  }
  play(){if(this.clock.time>=this.document.duration)this.clock.seek(0);this.clock.play();this.start();}
  pause(){this.clock.pause();this.narration.cancel();this.emit();}
  seek(seconds){this.clock.seek(seconds);this.narration.cancel();this.emit();this.render();}
  toggle(){this.clock.running?this.pause():this.play();}
  start(){if(this.frame)return;const loop=(timestamp)=>{const time=this.clock.tick(timestamp);this.render(time);if(this.clock.running)this.frame=requestAnimationFrame(loop);else{this.frame=null;this.emit();}};this.frame=requestAnimationFrame(loop);}
  render(time=this.clock.time){const state=this.document.sceneAtTime(time);if(state.index!==this.lastScene){this.lastScene=state.index;this.narration.speak(state.scene.narration,{sceneIndex:state.index,sceneTime:state.sceneTime,mixer:this.options?.mixer});}this.renderer.render(this.document,time);this.emit(time,this.subtitleTrack.at(time));}
  emit(time=this.clock.time,subtitle=this.subtitleTrack.at(time)){this.onState?.({time,running:this.clock.running,subtitle});}
  destroy(){if(this.frame)cancelAnimationFrame(this.frame);this.narration.cancel();}
}
