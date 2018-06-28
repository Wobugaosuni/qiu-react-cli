'use strict'
const exec = require('child_process').exec
const co = require('co')
const prompt = require('co-prompt')
const chalk = require('chalk')
const commander = require('commander')
const glob = require('glob')
const path = require('path')
const fs = require('fs')

const templates = require('../templates')

module.exports = () => {
 co(function *() {
    // 处理用户输入
    // let tplName = yield prompt('Template name: ')
    let projectName = yield prompt('Project name: ')
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

    // console.log('list:', list)
    // console.log('process.cwd():', process.cwd())  // /Users/qiuxia/code/react
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
    // let cmdString = `git clone ${gitUrl} ${projectName} && cd ${projectName} && rm -rf .git`
    let cmdString = `mkdir ${projectName} && cd ${projectName} && git clone ${gitUrl} .temporary && cd .temporary && rm -rf .git`

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


      // 成功构建
      console.log(chalk.green('\n √ Generation completed!'))
      console.log(`\n cd ${projectName} && npm install \n`)
      process.exit()
    })
  })
}
