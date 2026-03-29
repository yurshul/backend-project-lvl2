import fs from 'fs'
import { fileURLToPath } from 'url'
import path, { dirname } from 'path'
import { expect, test } from '@jest/globals'
import gendiff from '../src/index.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const getFixturePath = filename => path.join(__dirname, '..', '__fixtures__', filename)
const readFixture = filepath => fs.readFileSync(getFixturePath(filepath), 'utf-8')

test.each([
  ['nesting', 'file1.json', 'file2.json', 'expected_nested.txt'],
  ['nesting', 'file1.yml', 'file2.yml', 'expected_nested.txt'],
])('%s: %s %s', (_, filepath1, filepath2, expectedFile) => {
  const fullpath1 = getFixturePath(filepath1)
  const fullpath2 = getFixturePath(filepath2)

  expect(gendiff(fullpath1, fullpath2)).toEqual(readFixture(expectedFile))
})
