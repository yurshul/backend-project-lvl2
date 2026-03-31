import fs from 'fs'
import { fileURLToPath } from 'url'
import path, { dirname } from 'path'
import { expect, test, describe } from '@jest/globals'
import gendiff from '../src/index.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const getFixturePath = filename => path.join(__dirname, '..', '__fixtures__', filename)
const readFixture = filepath => fs.readFileSync(getFixturePath(filepath), 'utf-8')

const cases = [
  ['stylish json', 'file1.json', 'file2.json', 'stylish', 'expected_stylish.txt'],
  ['stylish yml', 'file1.yml', 'file2.yml', 'stylish', 'expected_stylish.txt'],
  ['plain json', 'file1.json', 'file2.json', 'plain', 'expected_plain.txt'],
  ['plain yml', 'file1.yml', 'file2.yml', 'plain', 'expected_plain.txt'],
  ['json json', 'file1.json', 'file2.json', 'json', 'expected_json.txt'],
  ['json yml', 'file1.yml', 'file2.yml', 'json', 'expected_json.txt'],
  ['default format', 'file1.json', 'file2.json', undefined, 'expected_stylish.txt'],
]

test.each(cases)(
  '%s',
  (_, file1, file2, format, expectedFile) => {
    const path1 = getFixturePath(file1)
    const path2 = getFixturePath(file2)
    const expected = readFixture(expectedFile)

    expect(gendiff(path1, path2, format)).toEqual(expected)
  },
)

describe('borderline cases', () => {
  const file1Path = getFixturePath('file1.json')
  const file2Path = getFixturePath('file2.json')
  const stylishOutput = readFixture('expected_stylish.txt')

  test('throws on wrong extension', () => {
    expect(() => gendiff(stylishOutput, file2Path, 'stylish')).toThrow()
  })

  test('throws on wrong format', () => {
    expect(() => gendiff(file1Path, file2Path, 'style')).toThrow()
  })
})
