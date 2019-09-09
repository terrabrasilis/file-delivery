import fs from 'fs'
import path from 'path'

const Utils = {
  readDockerSecret (path) {
  	const FILE_EXISTS = fs.existsSync(path)
	if (!FILE_EXISTS) { return }
	return fs.readFileSync(path, 'utf8').trim()
  }
}

export default Utils
