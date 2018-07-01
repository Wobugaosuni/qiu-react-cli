'use strict'
const exec = require('child_process').exec
const co = require('co')
const prompt = require('co-prompt')
const chalk = require('chalk')
const commander = require('commander')
const glob = require('glob')
const path = require('path')
const fs = require('fs')
const Metalsmith = require('metalsmith')
const Handlebars = require('handlebars')

const templates = require('../templates')

module.exports = () => {
 co(function *() {
    /**
     * 处理用户输入
     */
    // 项目名
    let projectName = yield prompt('Project name: ')
    // 项目描述
    let projectDescribe = yield prompt('project describe: ')

    let gitUrl = 'https://github.com/Wobugaosuni/react-redux-app-base.git'

    // 不输入，提示必输
    if (!projectName) {
      commander.help()
    }

    /**
     * 当前目录为空和不为空的判断处理
     * 不为空的，如果已经存在一样的目录名，提示
     */
    // 遍历当前目录
    const list = glob.sync('*')
    // 获取执行当前命令的文件夹的名称字符串（父目录）
    const rootName = path.basename(process.cwd())

    // console.log('process.cwd():', process.cwd())  // /Users/qiuxia/code/react/react-redux-app-cli
    // console.log('process.argv:', process.argv)
    // console.log('__dirname:', __dirname)
    // console.log('__filename:', __filename)
    // console.log('path.resolve(./):', path.resolve('./'))  // /Users/qiuxia/code/react/

    // console.log('list:', list)
    // console.log('rootName:', rootName) // react
    // console.log('projectName:', projectName)
    if (list.length) {
      // 不为空
      list.forEach(item => {
        const fileWD = path.resolve(process.cwd(), item)
        const isDirectory = fs.statSync(fileWD).isDirectory()
        // console.log('fileName:', fileName)
        // console.log('isDirectory:', isDirectory)

        if (projectName === item && isDirectory) {
          // 目录重名了
          console.log(chalk.red(`项目${projectName}已经存在`));
          process.exit()
        }

      })
    }

    // git命令，远程拉取项目并自定义项目名
    let cmdString = `git clone ${gitUrl} ${projectName} && cd ${projectName} && rm -rf .git`

    // 终端白色字体输出
    console.log(chalk.white('\n Start generating...'))

    /**
     * node 模块下
     * 创建子进程
     * http://nodejs.cn/api/child_process.html#child_process_child_process_exec_command_options_callback
     */
    exec(cmdString, (error, stdout, stderr) => {
      // 遇到错误，输入错误，结束进程
      if (error) {
        console.log(error)
        process.exit()
      }

      // 处理模板
      const metaObject = {
        projectName,
        projectDescribe,
      }
      // console.log('__dirname:', __dirname)
      // console.log('source:', `${projectName}/.temporary`)
      // console.log('target:', projectName)
      // console.log('metadata:', meta)
      // console.log('process.cwd():', process.cwd())

      return new Promise((resolve, reject) => {
        Metalsmith(process.cwd())
          .metadata(metaObject)  // 要填充的元数据 <object>
          .clean(false) // 是否清除
          .source(projectName)  // 源模板
          .destination(projectName)  // 拷贝到所在的目录
          .use((files, metalsmith, done) => {  // 模板变量处理

            // console.log('files:', files)  // object
            // console.log('Object.keys(files):', Object.keys(files))  // list of filename

            // 仅限`package.json`的。不然会覆盖其他的
            Object.keys(files).filter(filename => filename === 'package.json').forEach(fileName => {
              const content = files[fileName].contents.toString()
              files[fileName].contents = new Buffer(Handlebars.compile(content)(metaObject))
            })

            done()
          })
          .build(err => {  // 编译
            err ? reject(err) : resolve()
          })
      }).then(() => {
        // 成功构建
        console.log(chalk.green('\n √ Generation completed!'))
        console.log(`\n cd ${projectName} && npm install \n`)
        process.exit()
      })
    })
  })
}
