const fs = require('fs')
const path = require('path')

// トランスパイル後のディレクトリを指定
const directory = './dist'

function replaceRequireSqlite3Binding(dir) {
  const files = fs.readdirSync(dir)

  files.forEach((file) => {
    const filePath = path.join(dir, file)
    const stat = fs.statSync(filePath)

    // ディレクトリの場合は再帰的に処理
    if (stat.isDirectory()) {
      replaceRequireSqlite3Binding(filePath)
    }
    // JavaScriptファイルのみ処理
    else if (file.endsWith('.js')) {
      let content = fs.readFileSync(filePath, 'utf-8')

      // `require_sqlite3_binding()` を `require('sqlite3')` に置換
      const updatedContent = content.replace(/require_sqlite3_binding\(\)/g, "require('sqlite3')")

      // ファイルが変更された場合のみ上書き保存
      if (content !== updatedContent) {
        fs.writeFileSync(filePath, updatedContent, 'utf-8')
        console.log(`Updated: ${filePath}`)
      }
    }
  })
}

// スクリプトの実行
replaceRequireSqlite3Binding(directory)
