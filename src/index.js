import fs from 'fs'
import path from 'path'
import _ from 'lodash'
import parseData from './parsers.js'
const readFile = (filepath) => {
  return fs.readFileSync(path.resolve(process.cwd(), filepath), 'utf-8')
}

const getDiff = (obj1, obj2) => {
  const uniqKeys = _.sortBy(Object.keys({ ...obj1, ...obj2 }))
  const diffs = uniqKeys.map((key) => {
    if (!Object.hasOwn(obj1, key)) {
      return `  + ${key}: ${obj2[key]}`
    }

    if (!Object.hasOwn(obj2, key)) {
      return `  - ${key}: ${obj1[key]}`
    }

    if (obj1[key] === obj2[key]) {
      return `    ${key}: ${obj1[key]}`
    }

    return `  - ${key}: ${obj1[key]}\n  + ${key}: ${obj2[key]}`
  })

  return diffs
}

const gendiff = (filepath1, filepath2) => {
  const ext1 = path.extname(filepath1)
  const ext2 = path.extname(filepath2)
  const obj1 = parseData(readFile(filepath1), ext1)
  const obj2 = parseData(readFile(filepath2), ext2)

  const diff = getDiff(obj1, obj2)
  return `{\n${diff.join('\n')}\n}`
}

export default gendiff
