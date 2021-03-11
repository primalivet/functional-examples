const isFunction = require('../prelude/isFunction')
const equal = require('../prelude/equal')

exports.$$map = typeName => Constructor => x => {
  // map :: Functor F => F a ~> (a -> b) -> F b
  return function map(f) {
    if (!isFunction(f)) {
      throw new TypeError(`${typeName}.map: must be called with a function`)
    }

    return Constructor(f(x))
  }
}

exports.$$chain = typeName => _ => x => {
  const isSameType = equal('Either')

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

exports.$$ap = typeName => Constructor => x => {
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
