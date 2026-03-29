import fs from 'fs'
import path from 'path'
import parseData from './parsers.js'
import genDiffTree from './genDiffTree.js'
import genFormat from './formatters/index.js'

const readFile = (filepath) => {
  return fs.readFileSync(path.resolve(process.cwd(), filepath), 'utf-8')
}

const gendiff = (filepath1, filepath2, format = 'stylish') => {
  const ext1 = path.extname(filepath1)
  const ext2 = path.extname(filepath2)
  const obj1 = parseData(readFile(filepath1), ext1)
  const obj2 = parseData(readFile(filepath2), ext2)

  const diff = genDiffTree(obj1, obj2)
  return genFormat(diff, format)
}

export default gendiff
