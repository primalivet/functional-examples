const isFunction = require('../prelude/isFunction')
const equal = require('../prelude/equal')

const $$chain = typeName => _ => x => {
  const isSameType = equal(typeName)

  // chain :: Chain M => M a ~> (a -> M b) -> M b
  return function chain(f) {
    if (!isFunction(f)) {
      throw new TypeError(`${typeName}.chain: must be called with a function`)
    }

    const m = f(x)

    if (!isSameType(m.type)) {
      throw new TypeError(
        `${typeName}.chain: must be called with a function that returns a ${typeName}`
      )
    }

    return m
  }
}

module.exports = $$chain
