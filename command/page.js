'use strict'
const exec = require('child_process').exec
const co = require('co')
const prompt = require('co-prompt')
const chalk = require('chalk')
const commander = require('commander')
const Metalsmith = require('metalsmith')
const Handlebars = require('handlebars')

const templates = require('../templates')

module.exports = pageName => {
  // console.log('pageName:', pageName);
  // 必输
  if (typeof(pageName) !== 'string') {
    console.log('\n Usage: qiu page <name> \n')
    process.exit()
  }

  // 首字母大写
  const arr = pageName.split('')
  arr[0] = arr[0].toUpperCase()
  pageName = arr.join('')

  // 处理模板
  const meta = {
    pageName,
  }

  return new Promise((resolve, reject) => {
    Metalsmith(process.cwd())
      .metadata(meta)  // 要填充的元数据 <object>
      .clean(false) // 是否清除
      .source('template/page')  // 源模板
      .destination(`app/containers/${pageName}`)  // 拷贝到所在的目录
      .use((files, metalsmith, done) => {  // 模板变量处理
        Object.keys(files).forEach(fileName => {
          const content = files[fileName].contents.toString()
          files[fileName].contents = new Buffer(Handlebars.compile(content)(meta))
        })

        done()
      })
      .build(err => {  // 编译
        err ? reject(err) : resolve()
      })
  }).then(() => {
    // 成功构建
    console.log(chalk.green(`\n √ Page ${pageName} Generation completed!`))
    process.exit()
  })
}
