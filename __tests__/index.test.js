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
  ['stylish', 'file1.json', 'file2.json', 'stylish', 'expected_stylish.txt'],
  ['stylish', 'file1.yml', 'file2.yml', 'stylish', 'expected_stylish.txt'],
  ['plain', 'file1.json', 'file2.json', 'plain', 'expected_plain.txt'],
  ['plain', 'file1.yml', 'file2.yml', 'plain', 'expected_plain.txt'],
])('%s: %s %s', (_, filepath1, filepath2, format, expectedFile) => {
  const fullpath1 = getFixturePath(filepath1)
  const fullpath2 = getFixturePath(filepath2)

  expect(gendiff(fullpath1, fullpath2, format)).toEqual(readFixture(expectedFile))
})
