/* eslint-disable no-console */
import { DOMParser, XMLSerializer } from 'xmldom';
import fs from 'fs';
async function main() {
    const res = await fetch('https://element-plus.gitee.io/zh-CN/component/icon.html#icon-collection');
    const html = await res.text();
    const parser = new DOMParser({
        errorHandler: {
            warning() {
                //
            },
        },
    });
    const dom = parser.parseFromString(html, 'application/xhtml+xml');
    const serializer = new XMLSerializer();

    const rootDir = 'src/svg';

    const cateNames = [] as string[];
    const iconNames = [] as string[];

    const cates = Array.from(dom.getElementsByClassName('demo-icon-item'));
    cates.forEach((cate) => {
        const title = cate.getElementsByTagName('div').item(0)!.textContent!;
        cateNames.push(title);
        const dir = `${rootDir}/${title?.toLocaleLowerCase()}`;
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }
        const entry = `${dir}/index.ts`;
        fs.writeFileSync(entry, '');

        const list = Array.from(cate.getElementsByTagName('li'));
        list.forEach((icon) => {
            const iconName = icon.childNodes[0].childNodes[1].textContent!;
            iconNames.push(iconName);
            const svgEl = icon.childNodes[0].childNodes[0].childNodes[1] as Element;
            svgEl.removeAttribute(Array.from(svgEl.attributes).find((item) => item.name.startsWith('data-v-'))!.name);
            svgEl.setAttribute('width', '1em');
            svgEl.setAttribute('height', '1em');
            const svgStr = serializer.serializeToString(svgEl).replace('viewbox', 'viewBox');

            const fileName = `${iconName}.svg`;
            const filePath = `${dir}/${fileName}`;
            if (fs.existsSync(filePath)) {
                fs.rmSync(filePath);
            }
            fs.writeFileSync(filePath, svgStr);

            const exportStr = `export { default as ${iconName} } from './${fileName}';\n`;
            fs.appendFileSync(entry, exportStr);
        });
    });

    const main = 'src/icons.ts';
    fs.writeFileSync(main, '');
    fs.readdirSync(rootDir).forEach((dir) => {
        const entry = `./svg/${dir}`;
        fs.appendFileSync(main, `export * from '${entry.replace('src/', './')}';\n`);
    });

    console.info('分类：', cateNames, cateNames.length);
    console.info('图标：', iconNames, iconNames.length);
}
main();
