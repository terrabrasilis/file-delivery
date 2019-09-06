import fs from 'fs'
import path from 'path'
const extname = path.extname

export async function index (ctx, next) {
  const filePath = path.join(__dirname, './file-example.zip')
  const fstat = fs.statSync(filePath)

  if (fstat.isFile()) {
    ctx.type = extname(filePath)
    ctx.body = fs.createReadStream(filePath)
  }
}
