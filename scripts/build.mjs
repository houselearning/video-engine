import { cp, rm, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
await rm(dist, { recursive:true, force:true });
await mkdir(dist, { recursive:true });
for (const item of ['index.html','src','public']) await cp(path.join(root,item),path.join(dist,item),{recursive:true});
console.log('Built video-engine to dist/');
