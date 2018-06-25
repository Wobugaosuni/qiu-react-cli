'use strict'
const exec = require('child_process').exec
const co = require('co')
const prompt = require('co-prompt')
const chalk = require('chalk')

const templates = require('../templates')

module.exports = () => {
 co(function *() {
    // 处理用户输入
    // let tplName = yield prompt('Template name: ')
    let projectName = yield prompt('Project name: ')
    let gitUrl = 'https://github.com/Wobugaosuni/react-redux-app-base.git'

    // if (!templates.tpl[tplName]) {
    //     console.log(chalk.red('\n × Template does not exit!'))
    //     process.exit()
    // }
    // gitUrl = templates.tpl[tplName].url
    // branch = templates.tpl[tplName].branch

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
      // 遇到错误，输入错误，停止进程
      if (error) {
        console.log(error)
        process.exit()
      }

      // 成功构建
      console.log(chalk.green('\n √ Generation completed!'))
      console.log(`\n cd ${projectName} && npm install \n`)
      process.exit()
    })
  })
}
