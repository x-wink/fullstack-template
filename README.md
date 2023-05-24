<h1 align="center">欢迎使用全栈项目模板 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000" />
  <a href="https://github.com/x-wink/fullstack-template#readme" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
</p>

> `monorepo`风格项目  
> 后端使用`express`、`mysql`  
> 前端使用`vue3`、`vite`

## ⬇️ 使用方式

```cmd
npx degit x-wink/fullstack-template#main my-project
cd my-project
pnpm install
```

## 🎯 框架依赖

-   [mysql](https://github.com/mysqljs/mysql) `MySQL`数据库协议
-   [wink-dao](https://github.com/x-wink/wink-dao) 数据持久层框架
-   [express](https://expressjs.com/) `HTTP`服务框架
-   [dotenv](https://github.com/motdotla/dotenv)配置文件
-   [lodash](https://github.com/lodash/lodash)工具库
-   [log4js](https://github.com/log4js-node/log4js-node)日志
-   [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)`JWT`身份令牌

---

-   [Vue3](https://cn.vuejs.org/) 渐进式 JavaScript 框架
-   [Vite](https://cn.vitejs.dev/) 脚手架

---

-   [Pnpm](https://pnpm.io/installation) 快速的，节省磁盘空间的包管理工具
-   [Typescript](https://www.tslang.cn) JavaScript 的超集
-   [Eslint](https://eslint.bootcss.com/) 可组装的 JavaScript 和 JSX 检查工具
-   [Prettier](https://prettier.io/) 代码格式化程序
-   [LintStaged](https://github.com/okonet/lint-staged#readme) 针对暂存的 git 文件运行检查
-   [Husky](https://typicode.github.io/husky) 改善你的提交
-   [CommitLint](https://github.com/conventional-changelog/commitlint#readme) 检查代码提交消息

## 👍 使用说明

-   项目分为前端和后端两个项目，分别是`apps/client`和`apps/server`
-   后端实体类、持久层、服务层、控制层分别对应文件夹`entity`、`dao`、`service`、`controller`
-   `.env`文件为配置文件，因开源原因开发环境会使用`.env.local`文件（不会上传到`git`），可在`utils/config.ts`中修改
-   配置文件中全部都是字符串，目前会自动将数值转为数字类型，目录（属性名以`dir.`开头）会相对于`.env`文件补全路径，`xxx.xxx=xxx`形式的属性会解析成对象结构
-   前端项目编译后生成产物到`dist/client`目录，会被后端服务当做静态资源，可直接部署不需要`nginx`
-   后端项目编译后会将`ssl`文件夹下的证书、`.env.production`生产环境配置、`scripts/run.sh`启动脚本复制到产物`dist/server`目录
-   编译完成后通过`sftp`上传到远程服务器，配置文件为项目根目录`sftp.json`

## 👤 Author

**向文可**

-   Email: 13202090601@163.com
-   Github: [@x-wink](https://github.com/x-wink)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/x-wink/fullstack-template/issues).

## Show your support

Give a ⭐️ if this project helped you!

---

_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
