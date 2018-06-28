// npm i handlebars metalsmith -D
const Metalsmith = require('metalsmith')
const Handlebars = require('handlebars')
const rm = require('rimraf').sync

module.exports = function (metadata = {}, src='/ddd/', dest = '/ddd/') {

  if (!src) {
    return Promise.reject(new Error(`无效的source：${src}`))
  }

  console.log('src:', src)
  console.log('process.cwd():', process.cwd())

  return new Promise((resolve, reject) => {
    Metalsmith(process.cwd())
      .metadata(metadata)
      .clean(false)
      .source(src)
      .destination(dest)
      .use((files, metalsmith, done) => {
        console.log('files:', files)

        const meta = metalsmith.metadata()
        Object.keys(files).forEach(fileName => {
          const t = files[fileName].contents.toString()
          files[fileName].contents = new Buffer(Handlebars.compile(t)(meta))
        })
      	done()
      }).build(err => {
      	rm(src)
      	err ? reject(err) : resolve()
      })
  })
}
