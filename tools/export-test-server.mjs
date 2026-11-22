import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const port = 4176;
const types = { '.html':'text/html', '.js':'text/javascript', '.css':'text/css', '.wav':'audio/wav', '.json':'application/json', '.svg':'image/svg+xml' };

http.createServer(async (request,response)=>{
  response.setHeader('Access-Control-Allow-Origin','*');
  response.setHeader('Access-Control-Allow-Headers','Content-Type');
  if(request.method==='OPTIONS'){response.writeHead(204);response.end();return;}
  if(request.method==='POST'&&request.url==='/.export-test/save'){const chunks=[];for await(const chunk of request)chunks.push(chunk);const data=Buffer.concat(chunks);await fs.writeFile('/Users/admin/Desktop/pythagorean-theorem.webm',data);response.writeHead(200,{'Content-Type':'application/json'});response.end(JSON.stringify({ok:true,size:data.length}));return;}
  const requestPath=request.url==='/'?'index.html':decodeURIComponent(request.url.split('?')[0].replace(/^\//,''));
  const file=path.join(root,requestPath);
  if(!file.startsWith(root)){response.writeHead(403);response.end();return;}
  try{const data=await fs.readFile(file);response.writeHead(200,{'Content-Type':types[path.extname(file)]||'application/octet-stream'});response.end(data);}catch{response.writeHead(404);response.end('Not found');}
}).listen(port,()=>console.log(`Export test server: http://localhost:${port}`));
