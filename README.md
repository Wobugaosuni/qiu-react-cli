## react-redux-app-cli
A CLI for scaffolding React.js projects.

<br />

## Installation
`$ npm install -g react-redux-app-cli`

<br />

## Usage
```bash
## 1
react init

## 2
cd [projece name]

## 3
npm install

## 4
npm start
```


<br />

## Features
**Javascript**
- Language: ES6
- Loader: Babel
- Framework: React + Redux

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
