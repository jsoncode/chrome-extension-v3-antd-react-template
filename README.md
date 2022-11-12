# chrome-extension-v3-antd-react-template
第三版chrome插件开发源码模板。内置react+antd4+ts

Chrome Extensions Version 3.0

> Warning： 因为用的是v3版本的api, 所以Chrome版本必须大于97，否则不兼容。

> tips: 开发过程中，可以在浏览器打开http://127.0.0.1:4000/#/Other 直接看到预览效果。
> 但是，这只是在编写ui阶段。当接入chrome extensions api之后，就无法继续再通过http查看预览效果。
> 必须进行安装，然后再插件中进行预览。
### 预览图
![预览图](./preview/preview.png)

### useage

1. 克隆项目：
```shell
git clone https://github.com/jsoncode/chrome-extension-v3-antd-react-template.git
```

2. 进入到项目根目录
```shell
cd chrome-extension-v3-antd-react-template
```

3. 安装依赖

```shell
yarn install
```

4. 启动开发模式
```shell
yarn start
```

正式发布或打包插件时：使用yarn build ,然后使用build目录进行封装打包。

### 安装插件

1. 打开浏览器插件管理页面
2. 开启开发模式
3. 加载已解压的扩展插件

   ![第一步](./preview/step1.png)

4. 选择项目根目录下，刚生成的build目录，点击确定，即可安装成功。

   ![第二步](./preview/step2.png)

5. 就可以在地址栏右侧看到安装好的插件，点击这里，就可以进入预览效果了。

   ![第三步](./preview/step3.png)

![预览图](./preview/preview.png)

### 其他资料

[Ant Design 文档](https://ant.design)

[Chrome插件开发英文文档V3](https://developer.chrome.com/docs/extensions/mv3/)

[Chrome插件开发中文文档V3](https://doc.yilijishu.info/chrome/)


