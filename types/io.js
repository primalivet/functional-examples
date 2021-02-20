const isFunction = require ('../utilities/isFunction')
const equal = require ('../utilities/equal')

const IO = run => {
  if (!isFunction (run)) {
    throw new TypeError ('IO: must be called with a function')
  }

  const type = 'IO'
  const isSameType = equal ('IO')

  const map = f => {
    if (!isFunction (f)) {
      throw new TypeError ('IO.map: must be called with a function')
    }
    return IO (() => f (run ()))
  }

  const chain = f => {
    if (!isFunction (f)) {
      throw new TypeError ('IO.chain: must be called with a function')
    }

    const m = f (run ())

    if (!isSameType (m.type)) {
      throw new TypeError (
        'IO.chain: must be called with a function that returns an IO'
      )
    }

    return IO (() => m.run ())
  }

  const ap = m => {
    if (!isFunction (run ())) {
      throw new TypeError (
        'IO.ap: can only be called on IO that wraps a function'
      )
    }

    if (!isSameType (m.type)) {
      throw new TypeError ('IO.ap: must be called with another IO')
    }

    return IO (() => run () (m.run ()))
  }

  const fold = f => {
    if (!isFunction (f)) {
      throw new TypeError ('IO.fold: must be called with a function')
    }

    return f (run ())
  }

  const inspect = () => `IO(${run ()})`

  return { run, type, map, chain, ap, fold, inspect }
}

IO.of = x => IO (() => x)

module.exports = IO
