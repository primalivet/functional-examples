const { $$map, $$chain, $$ap } = require('../internal')
const equal = require('../prelude/equal')
const isFunction = require('../prelude/isFunction')
const isSameType = equal('Either')

// Left :: a -> Left a
const Left = value =>
  Object.freeze({
    value,
    type: 'Either',
    isRight: false,
    map: () => Left(value),
    chain: () => Left(value),
    ap: () => Left(value),
    show: () => `Left(${value})`
  })

// Right :: a -> Right a
const Right = value =>
  Object.freeze({
    value,
    type: 'Either',
    isRight: true,
    map: f => $$map('Either')(Right)(value)(f),
    chain: f => $$chain('Either')(Right)(value)(f),
    ap: m => $$ap('Either')(Right)(value)(m),
    show: () => `Right(${value})`
  })

// fromNullable :: a -> Either a
const fromNullable = x => (x === null || x === undefined ? Left(x) : Right(x))

// fromNullable :: (a ->b) -> Either Error | b
const tryCatch = f => {
  try {
    return Right(f())
  } catch (e) {
    return Left(e)
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

  return ms.filter(m => !m.isRight).map(m => m.value)
}

// rights :: [Either a b] -> [b]
const rights = ms => {
  const allSameType = ms.every(m => isSameType(m.type))

  if (!allSameType) {
    throw new TypeError('rights: must be called with a list of only Eithers')
  }

  return ms.filter(m => m.isRight).map(m => m.value)
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

  return m.isRight ? g(m.value) : f(m.value)
}

// fromLeft :: a -> Either a b -> a
const fromLeft = x => m => {
  if (!isSameType(m.type)) {
    throw new TypeError(
      "fromLeft: must be called with an Either as it's last argument"
    )
  }

  return m.isRight ? x : m.value
}

// fromRight :: a -> Either a b -> a
const fromRight = x => m => {
  if (!isSameType(m.type)) {
    throw new TypeError(
      "fromRight: must be called with an Either as it's last argument"
    )
  }

  return m.isRight ? m.value : x
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
        ? [pair[0], [...pair[1], m.value]]
        : [[...pair[0], m.value], pair[1]],
    [[], []]
  )
}

module.exports = {
  // fantasy-land
  of: Right,
  // own
  fromNullable,
  tryCatch,
  // as haskell
  Left,
  Right,
  either,
  fromLeft,
  fromRight,
  isLeft,
  isRight,
  lefts,
  partitionEithers,
  rights
}
