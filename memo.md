## 本地开发调试

```json
  # 为了避免跟npm包命令混淆，先在package.json把全局命令修改下。例如
  "bin": {
    "qiu-test": "bin/start"
  },
```

```bash
  # 在全局的node_modules模块目录内，生成一个符号链接文件.在本地根目录下：
  npm link

  # 就可以在任何项目下进行调试了，例如
  qiu-test page Test
```