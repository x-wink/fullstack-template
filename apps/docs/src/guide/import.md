# 引入依赖

## 全局引用

```ts
import { createApp } from 'vue';
import App from './App.vue';

const app = createApp(App);

import WinkUI from 'wink-ui';
app.use(WinkUI);

app.mount('#app');
```

## 局部引用

<<< @/examples/scrollbar/use6.vue
