import test from 'node:test';
import assert from 'node:assert/strict';
import { AnimationClock } from '../src/core/AnimationClock.js';
import { VideoDocument } from '../src/core/VideoDocument.js';
import { SubtitleTrack } from '../src/subtitles/SubtitleTrack.js';

test('VideoDocument calculates duration and scene lookup',()=>{const video=new VideoDocument({title:'Test',scenes:[{id:'a',duration:5,narration:'A'},{id:'b',duration:7,narration:'B'}]});assert.equal(video.duration,12);assert.equal(video.sceneAtTime(6).scene.id,'b');assert.equal(video.sceneAtTime(6).sceneTime,1);});
test('AnimationClock seeks and pauses',()=>{const clock=new AnimationClock(10);clock.seek(8);assert.equal(clock.time,8);clock.seek(20);assert.equal(clock.time,10);clock.seek(8);clock.play();clock.tick(1000);clock.tick(1500);assert.equal(clock.running,true);assert(clock.time>8);clock.pause();assert.equal(clock.running,false);});
test('SubtitleTrack finds only active segment',()=>{const track=new SubtitleTrack([{start:0,end:2,text:'One'},{start:2,end:4,text:'Two'}]);assert.equal(track.at(1),'One');assert.equal(track.at(3),'Two');assert.equal(track.at(10),'');});
