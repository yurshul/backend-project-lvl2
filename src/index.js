import fs from 'fs'
import path from 'path'
import _ from 'lodash'
const readFile = (filepath) => {
  return fs.readFileSync(path.resolve(process.cwd(), filepath), 'utf-8')
}

const getDiff = (file1, file2) => {
  const obj1 = JSON.parse(file1)
  const obj2 = JSON.parse(file2)
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
  const file1 = readFile(filepath1)
  const file2 = readFile(filepath2)

  const diff = getDiff(file1, file2)
  return `{\n${diff.join('\n')}\n}`
}

export default gendiff
