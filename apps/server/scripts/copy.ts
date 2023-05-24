import fs from 'fs';
import path from 'path';
let [from, to] = process.argv.slice(2);
from = path.resolve(process.cwd(), from);
to = path.resolve(process.cwd(), to);
// eslint-disable-next-line no-console
console.log('复制文件', from, to);
fs.cpSync(from, to, { recursive: true });
