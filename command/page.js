'use strict'
const exec = require('child_process').exec
const co = require('co')
const prompt = require('co-prompt')
const chalk = require('chalk')

const templates = require('../templates')

module.exports = pageName => {
  // 返回node进程当前工作的目录
  const path = process.cwd()
  console.log(chalk.green(pageName));
  console.log(chalk.green(path));
}
