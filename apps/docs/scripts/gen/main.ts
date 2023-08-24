import md from './template/md.js';
import use from './template/use1.js';
import fs from 'fs';
const name2Code = (name: string): string => {
    return name
        .split(/[_-]+/)
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join('');
};
const replace = (source: string, title: string, name: string) => {
    return source.replaceAll('@@title', title).replaceAll('@@name', name).replaceAll('@@code', name2Code(name));
};
const root = '../../src/examples';
const main = () => {
    const [, , title, name] = process.argv;
    fs.writeFileSync(`${root}/${name}/index.md`, replace(md, title, name));
    fs.writeFileSync(`${root}/${name}/use1.vue`, replace(use, title, name));
};
main();
