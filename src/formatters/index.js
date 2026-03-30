import genStylishFormat from './stylish.js'
import genPlainFormat from './plain.js'

export default (data, format) => {
  switch (format) {
    case ('stylish'):
      return genStylishFormat(data)
    case ('plain'):
      return genPlainFormat(data)
    default:
      throw new Error(`${format} format is not support`)
  }
}
