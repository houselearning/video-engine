import { VideoDocument } from './core/VideoDocument.js';
import { AnimationClock } from './core/AnimationClock.js';
import { SceneManager } from './core/SceneManager.js';
import { CanvasRenderer } from './renderer/CanvasRenderer.js';
import { PythagoreanScene } from './scenes/PythagoreanScene.js';
import { SubtitleTrack } from './subtitles/SubtitleTrack.js';
import { BrowserSpeechProvider } from './narration/BrowserSpeechProvider.js';
import { AssetNarrationProvider } from './narration/AssetNarrationProvider.js';
import { narrationProfiles } from './subtitles/narrationProfiles.js';
import { AudioMixer } from './audio/AudioMixer.js';
import { PlayerController } from './player/PlayerController.js';
import { MediaRecorderExporter } from './export/MediaRecorderExporter.js';
import { FirebaseAuthAdapter } from './auth/FirebaseAuthAdapter.js';
import { demoCatalog } from './definitions/demos.js';

const selectedDemo = ['pythagorean','cell','newton'].includes(new URLSearchParams(location.search).get('video')) ? new URLSearchParams(location.search).get('video') : 'pythagorean';
const video = new VideoDocument(demoCatalog[selectedDemo]);
const canvas = document.querySelector('#video-canvas');
const renderer = new CanvasRenderer(canvas);
const clock = new AnimationClock(video.duration);
const sceneManager = new SceneManager(video);
const subtitleTrack = new SubtitleTrack(video.subtitles);
const browserNarration = new BrowserSpeechProvider(narrationProfiles[video.narrator]);
const narrationPaths = selectedDemo==='cell'
  ? ['./public/audio/narration/full-cell.wav']
  : selectedDemo==='newton'
    ? ['./public/audio/narration/full-newton.wav']
    : ['./public/audio/narration/full-pythagorean.wav'];
const narration = new AssetNarrationProvider(narrationProfiles[video.narrator], narrationPaths, browserNarration);
const mixer = new AudioMixer();
const exporter = new MediaRecorderExporter();
const auth = new FirebaseAuthAdapter({ testUser: new URLSearchParams(location.search).get('testAuth') === '1', signInUrl:'https://www.houselearning.org/auth/' });

renderer.setScene(selectedDemo);

document.querySelector('#video-title').textContent=video.title;

document.querySelector('#video-canvas').setAttribute('aria-label',`${video.title} animated educational lesson`);

const ui = {
  shell: document.querySelector('#video-shell'), canvas,
  play: document.querySelector('#play-button'), center: document.querySelector('#center-play'),
  progress: document.querySelector('#progress'), current: document.querySelector('#current-time'), duration: document.querySelector('#duration'),
  subtitle: document.querySelector('#subtitle'), mute: document.querySelector('#mute-button'), fullscreen: document.querySelector('#fullscreen-button'),
  download: document.querySelector('#download-button'), subtitleToggle: document.querySelector('#subtitle-toggle'), menu: document.querySelector('#context-menu'),
  menuDownload: document.querySelector('#menu-download'), menuPlay: document.querySelector('#menu-play'),
  mixerReset: document.querySelector('#mixer-reset'), theme: document.querySelector('#theme-toggle'), demoSelect: document.querySelector('#demo-select')
};

function formatTime(seconds) { const safe=Math.max(0,Math.floor(seconds)); return `${Math.floor(safe/60)}:${String(safe%60).padStart(2,'0')}`; }

const player = new PlayerController({ clock, renderer, document:video, subtitleTrack, narration, mixer, onState:({time,running,subtitle})=>{
  ui.current.textContent=formatTime(time);
  ui.duration.textContent=formatTime(video.duration);
  ui.progress.value=Math.round((time/video.duration)*1000);
  ui.subtitle.textContent=subtitle;
  ui.play.textContent=running?'Pause':'Play'; ui.center.textContent=running?'Pause':'Play'; ui.center.hidden=running;
}});

ui.play.addEventListener('click',()=>player.toggle());
ui.center.addEventListener('click',()=>player.toggle());
ui.canvas.addEventListener('click',()=>player.toggle());
ui.progress.addEventListener('input',()=>player.seek((Number(ui.progress.value)/1000)*video.duration));
ui.fullscreen.addEventListener('click',()=>ui.shell.requestFullscreen?.());
ui.subtitleToggle.addEventListener('click',()=>{const visible=ui.subtitle.style.display!=='none';ui.subtitle.style.display=visible?'none':'';ui.subtitleToggle.setAttribute('aria-pressed',String(!visible));ui.subtitleToggle.setAttribute('aria-label',visible?'Show subtitles':'Hide subtitles');});

let muted=false;
ui.mute.addEventListener('click',()=>{muted=!muted;narration.setVolume(muted?0:0.9);mixer.setVolume('overall',muted?0:0.8);ui.mute.textContent=muted?'Unmute':'Mute';});

for(const id of ['narration','music','effects','overall']){
  const input=document.querySelector(`#${id}-volume`); input.addEventListener('input',()=>{
    const value=Number(input.value);
    mixer.setVolume(id,value); if(id==='narration')narration.setVolume(value);
  });
}
ui.mixerReset.addEventListener('click',()=>{const defaults={narration:.9,music:.18,effects:.55,overall:.8};for(const [id,value] of Object.entries(defaults)){const input=document.querySelector(`#${id}-volume`);input.value=value;mixer.setVolume(id,value);if(id==='narration')narration.setVolume(value);} });
ui.demoSelect.value=selectedDemo;ui.demoSelect.addEventListener('change',()=>{const url=new URL(location.href);url.searchParams.set('video',ui.demoSelect.value);location.assign(url.toString());});
ui.theme.addEventListener('click',()=>{document.body.classList.toggle('light');const light=document.body.classList.contains('light');ui.theme.setAttribute('aria-label',light?'Toggle dark theme':'Toggle light theme');});

async function downloadVideo(){
  if(!(await auth.isSignedIn())){await auth.signInPrompt();return;}
  const fallbackPath=selectedDemo==='pythagorean'?'./public/exports/pythagorean-theorem-fallback.webm':null;
  const response=fallbackPath?await fetch(fallbackPath):null;
  if(response?.ok){const blob=await response.blob();const link=document.createElement('a');link.href=URL.createObjectURL(blob);link.download='pythagorean-theorem.webm';document.body.appendChild(link);link.click();link.remove();return;}
  player.pause();
  await mixer.init();
  await mixer.scheduleExportNarration(narration,selectedDemo==='cell'?[0,10,22]:selectedDemo==='newton'?[0,12,24]:[0,9,19,30]);
  const audioStream=mixer.mediaDestination?.stream;
  const result=await exporter.export(canvas,video.duration,(progress)=>{ui.download.textContent=`Recording ${Math.round(progress*100)}%`;},(time)=>renderer.render(video,time),audioStream);
  ui.download.textContent='Download';
  if(!result.ok){window.alert(result.reason);return;}
  if(!result.audioIncluded){window.alert('Recording completed without narration audio and was not offered for download.');return;}
  const link=document.createElement('a');link.href=result.url;link.download='pythagorean-theorem.webm';document.body.appendChild(link);link.click();link.remove();
}
ui.download.addEventListener('click',downloadVideo);
ui.menuDownload.addEventListener('click',()=>{ui.menu.hidden=true;downloadVideo();});
ui.menuPlay.addEventListener('click',()=>{ui.menu.hidden=true;player.toggle();});
ui.canvas.addEventListener('contextmenu',(event)=>{event.preventDefault();ui.menu.hidden=false;ui.menu.style.left=`${Math.min(event.clientX,window.innerWidth-200)}px`;ui.menu.style.top=`${Math.min(event.clientY,window.innerHeight-100)}px`;});
document.addEventListener('click',(event)=>{if(!ui.menu.contains(event.target)&&event.target!==ui.canvas)ui.menu.hidden=true;});
document.addEventListener('keydown',(event)=>{if(event.altKey&&event.key.toLowerCase()==='d'){event.preventDefault();downloadVideo();} if(event.code==='Space'&&event.target===document.body){event.preventDefault();player.toggle();} if(event.code==='ArrowRight'){player.seek(clock.time+5);} if(event.code==='ArrowLeft'){player.seek(clock.time-5);} });
document.addEventListener('visibilitychange',()=>{if(document.hidden&&clock.running)player.pause();});

window.addEventListener('beforeunload',()=>player.destroy());
player.render(0);
mixer.init();
const exportStarts=selectedDemo==='cell'?[0,10,22]:selectedDemo==='newton'?[0,12,24]:[0,9,19,30];
if(auth.options?.testUser){window.__videoEngineTest={mixer,narration,exporter,canvas,exportNarrationOnlySave:async()=>{await mixer.init();await mixer.context.resume();await mixer.scheduleExportNarration(narration,exportStarts);return await exporter.export(canvas,video.duration,()=>{},(time)=>renderer.render(video,time),mixer.mediaDestination.stream).then(async result=>{if(!result.ok)return result;if(!result.audioIncluded)return{ok:false,reason:'No audio track'};await fetch('http://localhost:4176/.export-test/save',{method:'POST',headers:{'Content-Type':result.blob.type},body:result.blob});return{ok:true,size:result.blob.size,type:result.blob.type,audioIncluded:true};});},exportAndSave:async()=>{player.pause();await mixer.init();await mixer.scheduleExportNarration(narration,exportStarts);const audioStream=mixer.mediaDestination?.stream;return await exporter.export(canvas,video.duration,(progress)=>{ui.download.textContent=`Recording ${Math.round(progress*100)}%`;},(time)=>renderer.render(video,time),audioStream).then(async result=>{ui.download.textContent='Download';if(!result.ok)return result;if(!result.audioIncluded)return{ok:false,reason:'No narration audio was included.'};const response=await fetch('http://localhost:4176/.export-test/save',{method:'POST',headers:{'Content-Type':result.blob.type},body:result.blob});const saved=await response.json();return{ok:true,saved,size:result.blob.size,type:result.blob.type,audioIncluded:true};});}}};
