import _ from 'lodash'

const genDiffTree = (obj1, obj2) => {
  const uniqKeys = _.sortBy(Object.keys({ ...obj1, ...obj2 }))
  const diffs = uniqKeys.map((key) => {
    const value1 = obj1[key]
    const value2 = obj2[key]

    if (_.isEqual(value1, value2)) {
      return { status: 'unchanged', key, value: value1 }
    }

    if (!Object.hasOwn(obj1, key)) {
      return { status: 'added', key, value: value2 }
    }

    if (!Object.hasOwn(obj2, key)) {
      return { status: 'removed', key, value: value1 }
    }

    if (_.isPlainObject(value1) && _.isPlainObject(value2)) {
      return { status: 'nested', key, children: genDiffTree(value1, value2) }
    }

    return { status: 'modified', key, value: { value1, value2 } }
  })

  return diffs
}

export default genDiffTree
