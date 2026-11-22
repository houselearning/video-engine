export class NewtonScene {
  render(ctx,width,height,sceneId,sceneTime,progress){
    ctx.clearRect(0,0,width,height);const gradient=ctx.createLinearGradient(0,0,width,height);gradient.addColorStop(0,'#151c2c');gradient.addColorStop(1,'#292f45');ctx.fillStyle=gradient;ctx.fillRect(0,0,width,height);
    ctx.strokeStyle='#61dafb';ctx.globalAlpha=.18;ctx.lineWidth=1;for(let x=0;x<width;x+=50){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,height);ctx.stroke();}for(let y=0;y<height;y+=50){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(width,y);ctx.stroke();}ctx.globalAlpha=1;
    if(sceneId==='inertia')this.drawInertia(ctx,width,height,progress);
    else if(sceneId==='acceleration')this.drawAcceleration(ctx,width,height,progress);
    else this.drawReaction(ctx,width,height,progress);
  }
  drawInertia(ctx,width,height,p){const x=width*(.18+.48*Math.min(1,p));ctx.fillStyle='#61dafb';ctx.fillRect(x-height*.16,height*.58,height*.18,height*.18);ctx.fillStyle='#fff';ctx.font=`700 ${Math.max(18,width*.022)}px Arial`;ctx.fillText('An object keeps its state of motion',width*.5,height*.24);ctx.fillText('until a net force acts',width*.5,height*.31);}
  drawAcceleration(ctx,width,height,p){const cx=width*.44,cy=height*.62;ctx.fillStyle='#ffc75c';ctx.fillRect(cx-height*.12,cy-height*.12,height*.24,height*.24);ctx.strokeStyle='#61dafb';ctx.lineWidth=8;ctx.beginPath();ctx.moveTo(cx+height*.12,cy);ctx.lineTo(cx+height*.12+width*.18*Math.min(1,p),cy);ctx.stroke();ctx.fillStyle='#fff';ctx.textAlign='center';ctx.font=`700 ${Math.max(18,width*.022)}px Arial`;ctx.fillText('Fnet = ma',width*.5,height*.24);ctx.fillText('More force produces more acceleration',width*.5,height*.31);}
  drawReaction(ctx,width,height,p){const cx=width*.5,cy=height*.58;ctx.fillStyle='#61dafb';ctx.fillRect(cx-height*.32,cy-height*.12,height*.24,height*.24);ctx.fillStyle='#ff8a80';ctx.fillRect(cx+height*.08,cy-height*.12,height*.24,height*.24);ctx.strokeStyle='#fff';ctx.lineWidth=6;ctx.beginPath();ctx.moveTo(cx-height*.08,cy);ctx.lineTo(cx-height*.38,cy);ctx.moveTo(cx+height*.08,cy);ctx.lineTo(cx+height*.38,cy);ctx.stroke();ctx.fillStyle='#fff';ctx.textAlign='center';ctx.font=`700 ${Math.max(18,width*.022)}px Arial`;ctx.fillText('Equal forces',width*.5,height*.24);ctx.fillText('Opposite directions',width*.5,height*.31);}
}
