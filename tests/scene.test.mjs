import test from 'node:test';
import assert from 'node:assert/strict';
import { PythagoreanScene } from '../src/scenes/PythagoreanScene.js';

test('Pythagorean scene supports all four scene ids',()=>{const scene=new PythagoreanScene();const fake={clearRect(){},fillRect(){},strokeRect(){},beginPath(){},moveTo(){},lineTo(){},closePath(){},fill(){},stroke(){},save(){},restore(){},translate(){},arc(){},fillText(){},createLinearGradient(){return{addColorStop(){}};},set globalAlpha(value){},set fillStyle(value){},set strokeStyle(value){},set lineWidth(value){},set font(value){},set textAlign(value){}};for(const id of ['triangle','squares','proof','example'])assert.doesNotThrow(()=>scene.render(fake,1280,720,id,2,.5));});
