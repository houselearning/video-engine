import test from 'node:test';
import assert from 'node:assert/strict';
import { demoCatalog } from '../src/definitions/demos.js';
import { CellScene } from '../src/scenes/CellScene.js';
import { NewtonScene } from '../src/scenes/NewtonScene.js';

const fakeContext = { clearRect(){},createRadialGradient(){return{addColorStop(){}}},createLinearGradient(){return{addColorStop(){}}},fillRect(){},beginPath(){},ellipse(){},arc(){},fill(){},stroke(){},translate(){},save(){},restore(){},moveTo(){},lineTo(){},fillText(){},set fillStyle(v){},set strokeStyle(v){},set lineWidth(v){},set font(v){},set textAlign(v){},set globalAlpha(v){},set globalCompositeOperation(v){}};

test('demo catalog contains three complete demos',()=>{assert.equal(Object.keys(demoCatalog).length,3);assert(demoCatalog.pythagorean.scenes.length>=3);assert(demoCatalog.cell.scenes.length>=3);assert(demoCatalog.newton.scenes.length>=3);});
test('cell scene renders named scenes',()=>{const scene=new CellScene();for(const id of ['cell','organelles','protein'])assert.doesNotThrow(()=>scene.render(fakeContext,1280,720,id,2,.5));});
test('Newton scene renders all laws',()=>{const scene=new NewtonScene();for(const id of ['inertia','acceleration','reaction'])assert.doesNotThrow(()=>scene.render(fakeContext,1280,720,id,2,.5));});
