'use strict'
const exec = require('child_process').exec
const co = require('co')
const prompt = require('co-prompt')
const chalk = require('chalk')

const templates = require('../templates')

module.exports = pageName => {
  console.log(chalk.green(pageName));
}
