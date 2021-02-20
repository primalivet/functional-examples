const isFunction = require ('../utilities/isFunction')
const equal = require ('../utilities/equal')

const Left = x => {
  const type = 'Either'

  const map = () => Left (x)

  const chain = () => Left (x)

  const ap = () => Left (x)

  const fold = (f, g) => {
    if (!isFunction (f) && !isFunction (g)) {
      throw new TypeError ('Either.fold: must be called with two functions')
    }

    return f (x)
  }

  const inspect = () => `Left(${x})`

  return { type, map, chain, ap, fold, inspect }
}

const Right = x => {
  const type = 'Either'
  const isSameType = equal ('Either')

  const map = f => {
    if (!isFunction (f)) {
      throw new TypeError ('Either.map: must be called with a function')
    }

    return Right (f (x))
  }
  const chain = f => {
    if (!isFunction (f)) {
      throw new TypeError ('Either.chain: must be called with a function')
    }

    const m = f (x)

    if (!isSameType (m.type)) {
      throw new TypeError (
        'Either.chain: must be called with a function that returns an Either'
      )
    }

    return m
  }

  const ap = m => {
    if (!isFunction (x)) {
      throw new TypeError (
        'Either.ap: can only be called on Either that wraps a function'
      )
    }

    if (!isSameType (m.type)) {
      throw new TypeError ('Either.ap: must be called with another Either')
    }

    return Right (x (m.x))
  }

  const fold = (f, g) => {
    if (!isFunction (f) && !isFunction (g)) {
      throw new TypeError ('Either.fold: must be called with two functions')
    }

    return g (x)
  }

  const inspect = () => `Right(${x})`

  return {
    x,
    type,
    map,
    chain,
    ap,
    fold,
    inspect
  }
}

const Either = {}

Either.Left = Left
Either.Right = Right

Either.of = x => Right (x)
Either.fromNullable = x => (x === null || x === undefined ? Left (x) : Right (x))
Either.tryCatch = f => {
  try {
    return Right (f ())
  } catch (e) {
    return Left (e)
  }
}

module.exports = Either
