const isFunction = require('../prelude/isFunction')
const equal = require('../prelude/equal')
const isSameType = equal('Identity')

const _type = 'Identity'
const _of = Identity

// Identity :: a -> Identity a
function Identity(x) {
  if (!arguments.length) {
    throw new TypeError('Identity: Must be called with a value')
  }

  const constructor = Identity
  const type = _type
  const of = _of

  // map :: Functor F => F a ~> (a -> b) -> F b
  const map = f => {
    if (!isFunction(f)) {
      throw new TypeError('Identity.map: Must be called with a function')
    }

    return Identity(f(x))
  }

  // chain :: Chain M => M a ~> (a -> M b) -> M b
  const chain = f => {
    if (!isFunction(f)) {
      throw new TypeError('Identity.chain: Must be called with a function')
    }

    const m = f(x)

    if (!isSameType(m.type)) {
      throw new TypeError(
        'Identity.chain: Passed function must return an Identity'
      )
    }

    return m
  }

  // ap :: Apply F => F a ~> F (a -> b) -> F b
  const ap = m => {
    if (!isFunction(m.value())) {
      throw new TypeError('Identity.ap: Passed Apply must wrap a function')
    }

    if (!isSameType(m.type)) {
      throw new TypeError('Identity.ap: Passed Apply must be an Identity')
    }

    return Identity(m.value()(x))
  }

  // value :: () => a
  const value = () => x

  // show :: () -> String
  const show = () => `Identity(${x})`

  return Object.freeze({
    constructor,
    type,
    of,
    map,
    chain,
    ap,
    value,
    show,
    // alias
    valueOf: value,
    inspect: show
  })
}

Identity.of = _of
Identity.type = _type

module.exports = Identity
