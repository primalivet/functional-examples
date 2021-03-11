const isFunction = require('../prelude/isFunction')
const equal = require('../prelude/equal')

const $$ap = typeName => Constructor => x => {
  const isSameType = equal(typeName)

  // ap :: Apply F => F (a -> b) ~> F a -> F b
  return function ap(m) {
    if (!isFunction(x)) {
      throw new TypeError(
        `${typeName}.ap: can only be called on a ${typeName} that wraps a function`
      )
    }

    if (!isSameType(m.type)) {
      throw new TypeError(`${typeName}.ap: must be called with a ${typeName}`)
    }

    return Constructor(x(m.value))
  }
}

module.exports = $$ap
