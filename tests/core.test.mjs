import assert from 'node:assert/strict';import {normalizePath,validateManifest,compareVersions,crc32,createStoreZip,parseZip} from '../src/core.mjs';
assert.equal(normalizePath('./a/../b/index.html'),'b/index.html');assert.throws(()=>normalizePath('../x'));
assert.equal(validateManifest({id:'demo.app',name:'Demo'}).entry,'index.html');assert.throws(()=>validateManifest({id:'!',name:'x'}));
assert.equal(compareVersions('1.2.0','1.1.9'),1);assert.equal(compareVersions('1.0.0','1.0.0'),0);
assert.equal(crc32(new TextEncoder().encode('123456789')),0xcbf43926);
const blob=createStoreZip([{path:'manifest.json',data:'{"id":"demo.app","name":"Demo"}'},{path:'index.html',data:'<h1>ok</h1>'}]);const parsed=await parseZip(await blob.arrayBuffer());assert.equal(parsed.length,2);assert.equal(new TextDecoder().decode(parsed[1].data),'<h1>ok</h1>');
console.log('core tests: OK');
