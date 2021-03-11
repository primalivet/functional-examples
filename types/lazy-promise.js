const isFunction = require('../utilities/isFunction')
const equal = require('../utilities/equal')

const LazyPromise = run => {
  if (!isFunction) {
    throw new TypeError(
      'LazyPromise: must be called with a Promise returning function'
    )
  }

  const type = 'LazyPromise'
  const isSameType = equal('LazyPromise')

  const map = f => {
    if (!isFunction(f)) {
      throw new TypeError('LazyPromise.map: must be called with a function')
    }
    return LazyPromise(() => Promise.resolve(run()).then(f))
  }

  const chain = f => {
    // if (!isFunction (f)) {
    //   throw new TypeError ('LazyPromise.chain: must be called with a function')
    // }

    // const m = f (run ())

    // if (!isSameType (m.type)) {
    //   throw new TypeError (
    //     'LazyPromise.chain: must be called with a function that returns an LazyPromise'
    //   )
    // }
    // TODO: implement
    throw new Error('Not yet implemented')
  }

  const ap = m => {
    // if (!isFunction (run ())) {
    //   throw new TypeError (
    //     'LazyPromise.ap: can only be called on LazyPromise that wraps a function'
    //   )
    // }

    // if (!isSameType (m.type)) {
    //   throw new TypeError ('LazyPromise.ap: must be called with another LazyPromise')
    // }

    // return LazyPromise (() => run () (m.run ()))
    //
    // TODO: implement
    throw new Error('Not yet implemented')
  }

  const fork = (f, g) => {
    if (!isFunction(f) && !isFunction(g)) {
      throw new TypeError('LazyPromise.fold: must be called with two function')
    }

    return Promise.resolve(run().then(g).catch(f))
  }

  const inspect = () => `LazyPromise(${run()})`

  return { run, type, map, chain, ap, fork, inspect }
}

LazyPromise.of = run => LazyPromise(run())

module.exports = LazyPromise
