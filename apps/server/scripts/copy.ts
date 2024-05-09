import fs from 'fs';
const [from, to] = process.argv.slice(2);
// eslint-disable-next-line no-console
console.log('复制文件', from, to);
fs.cpSync(from, to, { recursive: true });
