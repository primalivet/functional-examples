const isFunction = require('../utilities/isFunction')
const equal = require('../utilities/equal')

const Nothing = () => {
  return {
    isNothing: () => true,
    isJust: () => false,
    chain: () => Nothing(),
    map: () => Nothing(),
    concat: () => Nothing(),
    ap: () => Nothing(),
    orElse: y => y,
    inspect: () => `Nothing()`
  }
}

const Just = x => {
  const type = 'Maybe'
  const isSameType = equal('Maybe')

  const isNothing = () => false
  const isJust = () => true

  const map = f => {
    if (!isFunction(f)) {
      throw new TypeError('Maybe.map: must be called with a function')
    }

    return Just(f(x))
  }

  const chain = f => {
    if (!isFunction(f)) {
      throw new TypeError('Maybe.chain: must be called with a function')
    }

    const m = f(x)

    if (!isSameType(m.type)) {
      throw new TypeError(
        'Maybe.chain: must be called with a function that returns an Maybe'
      )
    }
    return m
  }

  const concat = ({ x: y }) => {
    return Just(x.concat(y))
  }

  const ap = m => {
    if (!isFunction(x)) {
      throw new TypeError(
        'Maybe.ap: can only be called on Identity that wraps a function'
      )
    }

    if (!isSameType(m.type)) {
      throw new TypeError('Maybe.ap: must be called with another Either')
    }

    return Just(x(m.x))
  }

  const orElse = () => x

  const inspect = () => `Just(${x})`

  return {
    x,
    type,
    isNothing,
    isJust,
    chain,
    map,
    concat,
    ap,
    orElse,
    inspect
  }
}

const Maybe = {}

Maybe.Nothing = Nothing
Maybe.Just = Just

Maybe.of = x => Just(x)
/* eslint-disable eqeqeq */
Maybe.fromFalsy = x =>
  x == false || isNaN(x) || x == null || x == undefined ? Nothing() : Just(x)
/* eslint-enable eqeqeq */
Maybe.fromNullable = x => (x === null || x === undefined ? Nothing() : Just(x))

module.exports = Maybe
