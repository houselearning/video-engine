export class CellScene {
  render(ctx,width,height,sceneId,sceneTime,progress){
    ctx.clearRect(0,0,width,height); const gradient=ctx.createRadialGradient(width*.5,height*.52,20,width*.5,height*.52,Math.max(width,height)*.55);gradient.addColorStop(0,'#17354a');gradient.addColorStop(1,'#0d151e');ctx.fillStyle=gradient;ctx.fillRect(0,0,width,height);
    const cx=width*.5, cy=height*.52, rx=Math.min(width*.31,height*.34), ry=Math.min(height*.36,width*.24);
    ctx.save();ctx.translate(cx,cy);ctx.fillStyle='rgba(129,218,218,.18)';ctx.strokeStyle='#61dafb';ctx.lineWidth=Math.max(4,width*.006);ctx.beginPath();ctx.ellipse(0,0,rx,ry,0,0,Math.PI*2);ctx.fill();ctx.stroke();
    ctx.fillStyle='#4d8fda';ctx.strokeStyle='#b9d7ff';ctx.beginPath();ctx.ellipse(-rx*.12,-ry*.08,rx*.28,ry*.34,-.2,0,Math.PI*2);ctx.fill();ctx.stroke();ctx.fillStyle='#d8ecff';ctx.beginPath();ctx.arc(-rx*.12,-ry*.08,rx*.08,0,Math.PI*2);ctx.fill();
    const organelles=[[-.58,.08,42,'Mitochondria','#ffc766'],[-.32,.42,28,'Golgi','#e9a0ff'],[.28,.38,24,'Ribosomes','#8ff3c7'],[.52,-.18,34,'Vacuole','#75bfff']];
    for(const [x,y,r,label,color] of organelles){ctx.fillStyle=color;ctx.strokeStyle='#fff';ctx.lineWidth=2;ctx.beginPath();ctx.ellipse(rx*x,ry*y,r,r*.55,x*.3,0,Math.PI*2);ctx.fill();ctx.stroke();}
    ctx.fillStyle='#fff';ctx.textAlign='center';ctx.font=`700 ${Math.max(15,width*.017)}px Arial`;ctx.fillText('Nucleus',-rx*.12,-ry*.08+ry*.5);ctx.restore();
    ctx.fillStyle='#61dafb';ctx.font=`700 ${Math.max(14,width*.016)}px Arial`;ctx.fillText('Inside an Animal Cell',40,46);
    ctx.fillStyle='#d7e8f3';ctx.textAlign='left';ctx.font=`700 ${Math.max(16,width*.018)}px Arial`;ctx.fillText(sceneId==='organelles'?'Organelles keep the cell organized':sceneId==='protein'?'Ribosomes assemble proteins':'The cell is a coordinated system',width*.08,height*.86);
  }
}
