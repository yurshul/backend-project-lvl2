import fs from 'fs'
import { fileURLToPath } from 'url'
import path, { dirname } from 'path'
import { expect, test } from '@jest/globals'
import gendiff from '../src/index.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const getFixturePath = filename => path.join(__dirname, '..', '__fixtures__', filename)

test('plain', () => {
  const expected = fs.readFileSync(getFixturePath('expected_file.json'), 'utf-8')
  const filepath1 = getFixturePath('file1.json')
  const filepath2 = getFixturePath('file2.json')
  expect(gendiff(filepath1, filepath2)).toEqual(expected)
})
