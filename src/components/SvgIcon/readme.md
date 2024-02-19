# 环境 vite+vue3+ts

## 安装依赖

```text
pnpn install vite-plugin-svg-icons -D
```


## 配置vite.configStore.ts  文件

```js
//引入依赖
import path from "path";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
 
//启用插件
createSvgIconsPlugin({
  // 指定图标文件夹，绝对路径（NODE代码）
  iconDirs: [path.resolve(process.cwd(), "src/svgs")],
})
```

## 创建图标库

在src文件下新建一个文件加, 里面存放svg图标


## 封装SvgIcon组件


## 全局引入

在main.ts中对组件进行全局的引入
```js

// 引入Svg组件
import "virtual:svg-icons-register";
import SvgIcon from "./components/SvgIcon.vue";

// 全局使用
app.component('SvgIcon',SvgIcon)
```

## 使用

```html
<SvgIcon name="[这里是的名称,按照模板的写法文件的名称即可]"></SvgIcon>
```

[参考链接](https://blog.csdn.net/qq_34205305/article/details/128963722)
