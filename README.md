# vue-tpl

> fork 自 [vuejs-templates/webpack](https://github.com/vuejs-templates/webpack)修改而来。

## 说明

1.  添加了大量的说明,去除了不必要的功能与命令
2.  删除了目录*static*与插件*copy-webpack-plugin*
3.  删除*config*目录 将变量设置*config/index.js*改名为*config.js*并移入*build*目录
4.  将*check-versions.js*合并到*build.js*
5.  将*vue-loader.conf.js*合并到*webpack.base.conf.js*
6.  整合了单页面应用与多页面应用
    -   *config.js*中`singlePage`可设置是否单页面应用`true`与`false`
    -   多页面项目时`moduleName`可设置根目录 默认为`page`
    -   `dev`环境默认关闭自动打开页面,服务启动后会打印启动页面,点击打开
7.  目前暂不采用 vw 方案 继续 rem 方案解决移动适配问题
8.  项目使用*vue*与*less*
9.  默认使用 ui 模板为 iPhone7 `375`宽度 `1rem = 100px`,非移动端项目请注销`common.js`内移动端相关代码
10. 参考 normal.css 与常用选项配置了一份初始化 css
11. 移动端禁用 img 标签点击事件,防止一些系统弹窗问题
12. 全面使用 vw 布局

## 基本用法

```bash
$ npm install -g vue-cli
$ vue init yuni-tech/vue-tpl my-project
$ cd my-project
$ npm install
$ npm run dev
```
