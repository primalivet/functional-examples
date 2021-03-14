const equal = require('../prelude/equal')
const isFunction = require('../prelude/isFunction')
const isSameType = equal('Either')

const _type = 'Either'
const _of = Either

function Either(x) {
  if (!arguments.length) {
    throw new TypeError('Either: Must be called with a value')
  }

  return Either.Right(x)
}

// Left :: a -> Left a
Either.Left = function (x) {
  const constructor = Either
  const type = _type
  const of = Either.Left
  const isRight = false

  // map: Functor F => F a ~> () -> F a
  const map = () => Either.Left(x)

  // chain: Chain M => M a ~> () -> M a
  const chain = () => Either.Left(x)

  // ap :: Apply F => F a ~> () -> F a
  const ap = () => Either.Left(x)

  // value :: () => a
  const value = () => x

  // show :: () -> String
  const show = () => `Left(${x})`

  return Object.freeze({
    constructor,
    type,
    of,
    isRight,
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

// Right :: a -> Right a
Either.Right = function (x) {
  const constructor = Either
  const type = 'Either'
  const of = _of
  const isRight = true

  // map :: Functor F => F a ~> (a -> b) -> F b
  const map = f => {
    if (!isFunction(f)) {
      throw new TypeError('Either.map: Must be called with a function')
    }

    return Either.Right(f(x))
  }

  // chain :: Chain M => M a ~> (a -> M b) -> M b
  const chain = f => {
    if (!isFunction(f)) {
      throw new TypeError('Either.chain: Must be called with a function')
    }

    const m = f(x)

    if (!isSameType(m.type)) {
      throw new TypeError('Either.chain: Passed function must return an Either')
    }

    return m
  }

  // ap :: Apply F => F a ~> F (a -> b) -> F b
  const ap = m => {
    if (!isFunction(m.value())) {
      throw new TypeError('Either.ap: Passed Apply must wrap a function')
    }

    if (!isSameType(m.type)) {
      throw new TypeError('Either.ap: Passed Apply must be an Either')
    }

    return Either.Right(m.value()(x))
  }

  // value :: () => a
  const value = () => x

  // show :: () -> String
  const show = () => `Right(${x})`

  return Object.freeze({
    constructor,
    type,
    of,
    isRight,
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

// tryCatch :: (a ->b) -> Either Error | b
const tryCatch = f => {
  if (!isFunction(f)) {
    throw new TypeError('tryCatch: Must be called with a function')
  }

  // TODO: tryCatch should take a function which is a thunk ( no arguments )

  try {
    return Either.Right(f())
  } catch (e) {
    return Either.Left(e)
  }
}

// isLeft :: Either a b -> Bool
const isLeft = m => {
  if (!isSameType(m.type)) {
    throw new TypeError('isLeft: must be called with an Either')
  }

  return !m.isRight
}

// isRight :: Either a b -> Bool
const isRight = m => {
  if (!isSameType(m.type)) {
    throw new TypeError('isRight: must be called with an Either')
  }

  return m.isRight
}

// lefts :: [Either a b] -> [a]
const lefts = ms => {
  const allEithers = ms.every(m => isSameType(m.type))

  if (!allEithers) {
    throw new TypeError('lefts: must be called with a list of only Eithers')
  }

  return ms.filter(m => !m.isRight).map(m => m.value())
}

// rights :: [Either a b] -> [b]
const rights = ms => {
  const allSameType = ms.every(m => isSameType(m.type))

  if (!allSameType) {
    throw new TypeError('rights: must be called with a list of only Eithers')
  }

  return ms.filter(m => m.isRight).map(m => m.value())
}

// either :: (a -> c) -> (b -> c) -> Either a b -> c
const either = f => g => m => {
  if (!isFunction(f) || !isFunction(g)) {
    throw new TypeError(
      "either: must be called with two functions as it's first two arguments"
    )
  }

  if (!isSameType(m.type)) {
    throw new TypeError(
      "either: must be called with an Either as it's last argument"
    )
  }

  return m.isRight ? g(m.value()) : f(m.value())
}

// fromLeft :: a -> Either a b -> a
const fromLeft = x => m => {
  if (!isSameType(m.type)) {
    throw new TypeError(
      "fromLeft: must be called with an Either as it's last argument"
    )
  }

  return m.isRight ? x : m.value()
}

// fromRight :: a -> Either a b -> a
const fromRight = x => m => {
  if (!isSameType(m.type)) {
    throw new TypeError(
      "fromRight: must be called with an Either as it's last argument"
    )
  }

  return m.isRight ? m.value() : x
}
// partitionEithers :: [Either a b] -> [[a], [b]]
const partitionEithers = ms => {
  const allSameType = ms.every(m => isSameType(m.type))

  if (!allSameType) {
    throw new TypeError(
      'partitionEithers: must be called with a list of only Eithers'
    )
  }

  return ms.reduce(
    (pair, m) =>
      m.isRight
        ? [pair[0], [...pair[1], m.value()]]
        : [[...pair[0], m.value()], pair[1]],
    [[], []]
  )
}

Either.of = _of
Either.Right.of = _of
Either.Left.of = Either.Left
Either.tryCatch = tryCatch
Either.either = either
Either.isRight = isRight
Either.isLeft = isLeft
Either.fromLeft = fromLeft
Either.fromRight = fromRight
Either.lefts = lefts
Either.rights = rights
Either.partitionEithers = partitionEithers

module.exports = Either
