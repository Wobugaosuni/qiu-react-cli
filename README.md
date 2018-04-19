## react-redux-app-cli

A CLI for scaffolding React.js projects.

<br />

## Installation

`$ npm install -g react-redux-app-cli`

<br />

## Usage

```bash
    ## 1. 脚手架初始化
    react-redux-app init

    ## 2. 建立自己的项目
    cd [projece name]

    ## 3. 安装项目依赖
    npm install

    ## 4. 开启mock服务，使用的是3000的端口
    npm run mock

    ## 5. 启动项目，使用的是8000的端口
    npm start
```


<br />

## Features

**Javascript**
- Language: ES6
- Loader: Babel
- Framework: React + Redux + React-router-dom

**CSS/Preprocessors**
- Stylus
- Postcss
- Normalize.css

**Module loader**
- Webpack

**Package manage**
- npm

**Others**
- Eslint

<br />

## Directory structure

```
    .
    └── app
    │   ├── reducers
        ├── actions
        ├── store
        ├── common
       │   └── js
       │   └── fonts
       │   └── stylus
       │       ├── base.styl
       │       ├── iconfont.styl
       │       ├── index.styl
       │       └── mixin.styl
       ├── components
       │   ├── Input
       │   │   ├── index.js
       │   │   └── index.styl
       ├── containers
       │   └── Todo
       │       ├── index.js
       │       └── index.styl
        ├── index.js
        ├── index.tmpl.html
    ├── .babelrc
    ├── .postcssrc.js
    ├── .eslintrc
    ├── .eslintignore
    ├── .gitignore
    ├── .editorconfig
    ├── LICENSE
    ├── package.json
    ├── README.md
    ├── webpack.config.js
    └── webpack.production.config.js
```
