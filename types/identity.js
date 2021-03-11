const isFunction = require('../utilities/isFunction')
const equal = require('../utilities/equal')

const Identity = x => {
  if (!arguments.length) {
    throw new TypeError('Identity: must be called with a value')
  }

  const type = 'Identity'
  const isSameType = equal('Identity')

  const map = f => {
    if (!isFunction(f)) {
      throw new TypeError('Identity.map: must be called with a function')
    }

    return Identity(f(x))
  }

  const chain = f => {
    if (!isFunction(f)) {
      throw new TypeError('Identity.chain: must be called with a function')
    }

    const m = f(x)

    if (!isSameType(m.type)) {
      throw new TypeError(
        'Identity.chain: must be called with a function that returns an Identity'
      )
    }

    return m
  }

  const ap = m => {
    if (!isFunction(x)) {
      throw new TypeError(
        'Identity.ap: can only be called on Identity that wraps a function'
      )
    }

    if (!isSameType(m.type)) {
      throw new TypeError('Identity.ap: must be called with another Identity')
    }

    return Identity(x(m.x))
  }

  const fold = f => {
    if (!isFunction(f)) {
      throw new TypeError('Identity.fold: must be called with a function')
    }

    return f(x)
  }

  const inspect = () => `Identity(${x})`

  return { x, type, map, chain, ap, fold, inspect }
}

Identity.of = x => Identity(x)

module.exports = Identity
