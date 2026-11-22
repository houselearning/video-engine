export class MediaRecorderExporter {
  async export(canvas, duration, onProgress, renderFrame, audioStream) {
    if (!canvas.captureStream) return { ok:false, reason:'Canvas captureStream is not supported by this browser.' };
    if (!window.MediaRecorder) return { ok:false, reason:'MediaRecorder is not supported by this browser.' };
    const stream=canvas.captureStream(30);
    if (audioStream) for (const track of audioStream.getTracks()) stream.addTrack(track);
    const mimeTypes=['video/webm;codecs=vp9','video/webm;codecs=vp8','video/webm'];
    const mimeType=mimeTypes.find(type=>MediaRecorder.isTypeSupported(type));
    if(!mimeType)return{ok:false,reason:'No supported WebM recording format was found.'};
    const recorder=new MediaRecorder(stream,{mimeType,videoBitsPerSecond:6_000_000});
    const chunks=[];
    recorder.addEventListener('dataavailable',event=>{if(event.data.size)chunks.push(event.data);});
    const stopped=new Promise(resolve=>recorder.addEventListener('stop',resolve,{once:true}));
    recorder.start(250);
    const started=performance.now();
    while(performance.now()-started<duration*1000){const elapsed=(performance.now()-started)/1000;const progress=Math.min(1,elapsed/duration);onProgress?.(progress);renderFrame?.(elapsed);await new Promise(resolve=>setTimeout(resolve,50));}
    renderFrame?.(duration);
    recorder.stop(); await stopped;
    const blob=new Blob(chunks,{type:mimeType});
    if(!blob.size)return{ok:false,reason:'The recording contained no video data.'};
    const audioTrackCount=stream.getAudioTracks().length;
    if(audioTrackCount===0)return{ok:false,reason:'No capturable audio track was available. The recording was discarded to avoid a silent export.'};
    return{ok:true,blob,url:URL.createObjectURL(blob),audioIncluded:true,audioTrackCount:stream.getAudioTracks().length,videoTrackCount:stream.getVideoTracks().length};
  }
}
