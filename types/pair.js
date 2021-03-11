const isFunction = require('../utilities/isFunction')
const equal = require('../utilities/equal')

const Pair = a => b => {
  const type = 'Pair'
  const isSameType = equal('Pair')

  const concat = m => {
    if (!isSameType(m.type)) {
      throw new TypeError('Pair.concat: must be called with another Pair')
    }

    return Pair(a.concat(m.a))(b.concat(m.b))
  }

  const equals = m => {
    if (!isSameType(m.type)) {
      throw new TypeError('Pair.equals: must be called with another Pair')
    }

    return a === m.a && b === m.b
  }

  const map = f => {
    if (!isFunction(f)) {
      throw new TypeError('Pair.map: must be called with a function')
    }

    return Pair(a, f(b))
  }

  const bimap = (f, g) => {
    if (!(isFunction(f) && isFunction(g))) {
      throw new TypeError('Pair.bimap: must be called with two function')
    }

    return Pair(g(a), f(b))
  }

  const chain = f => {
    if (!isFunction(f)) {
      throw new TypeError('Pair.chain: must be called with a function')
    }

    const m = f(b)

    if (!isSameType(m.type)) {
      throw new TypeError(
        'Pair.chain: must be called with a function that returns an Pair'
      )
    }

    return Pair(a.concat(m.a))(m.b)
  }

  const ap = m => {
    if (!isFunction(b)) {
      throw new TypeError(
        'Pair.ap: can only be called on a Pair that wraps a function as second: (Pair(a, f))'
      )
    }

    if (!isSameType(m.type)) {
      throw new TypeError('Pair.ap: must be called with another Pair')
    }

    return Pair(a.concat(m.a))(b(m.b))
  }

  const fst = () => a
  const snd = () => b
  const swap = () => Pair(b)(a)
  const inspect = () => `Pair(${a}, ${b})`

  return {
    type,
    a,
    b,
    concat,
    equals,
    map,
    bimap,
    chain,
    ap,
    fst,
    snd,
    swap,
    inspect
  }
}

module.exports = Pair
