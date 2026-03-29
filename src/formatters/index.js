import genStylishFormat from './stylish.js'

export default (data, format) => {
  switch (format) {
    case ('stylish'):
      return genStylishFormat(data)
    default:
      throw new Error(`${format} format is not support`)
  }
}
