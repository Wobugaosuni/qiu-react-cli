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
  // 必输
  if (!pageName) {
    commander.help()
  }

  return new Promise((resolve, reject) => {
    Metalsmith(process.cwd())
      .metadata({
        pageName,
      })  // 要填充的元数据 <object>
      .clean(false) // 是否清除
      .source('template/page')  // 源模板
      .destination(`app/containers/${pageName}`)  // 拷贝到所在的目录
      .use((files, metalsmith, done) => {  // 模板变量处理
        const meta = metalsmith.metadata()
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
