import vue from './template/vue.js';
import entry from './template/entry.js';
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
const root = 'src/components';
const main = () => {
    const [, , title, name] = process.argv;
    if (!title) {
        throw new Error('第1个参数是中文名称，不能为空');
    }
    if (!name) {
        throw new Error('第2个参数是英文名称（文件夹名，横线分隔格式），不能为空');
    }
    const dir = `${root}/${name}`;
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }
    fs.writeFileSync(`${root}/${name}/${name}.vue`, replace(vue, title, name));
    fs.writeFileSync(`${root}/${name}/index.ts`, replace(entry, title, name));
    fs.writeFileSync(`${root}/${name}/types.ts`, `export {};\n`);
    fs.appendFileSync(`${root}/index.ts`, `export * from './${name}';\n`);
};
main();
