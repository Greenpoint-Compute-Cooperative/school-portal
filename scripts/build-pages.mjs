// Stages the files Cloudflare Pages should serve into dist/. The repository
// root also holds the README, design notes and scripts; none of that belongs
// on the public origin, so Pages never deploys the root directly.
import { cp, mkdir, rm } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const output = path.join(root, 'dist');
if (!output.startsWith(`${root}${path.sep}`)) throw new Error('Unsafe output path');

await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
for (const entry of ['index.html', '_headers', 'public']) {
  await cp(path.join(root, entry), path.join(output, entry), { recursive: true });
}
console.log('Staged dist/ for Cloudflare Pages: index.html, _headers, public/');
