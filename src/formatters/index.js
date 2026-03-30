import genStylishFormat from './stylish.js'
import genPlainFormat from './plain.js'
import genJsonFormat from './json.js'

export default (data, format) => {
  switch (format) {
    case ('stylish'):
      return genStylishFormat(data)
    case ('plain'):
      return genPlainFormat(data)
    case ('json'):
      return genJsonFormat(data)
    default:
      throw new Error(`${format} format is not support`)
  }
}
