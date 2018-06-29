'use strict'
const path = require('path')

module.exports = () => {
  console.log('process.cwd():', process.cwd())  // /Users/qiuxia/code/react/react-redux-app-cli
  console.log('process.argv:', process.argv)
  console.log('__dirname:', __dirname)
  console.log('__filename:', __filename)
  console.log('path.resolve(./):', path.resolve('./'))  // /Users/qiuxia/code/react/
}
