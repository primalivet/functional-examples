const isFunction = require('../prelude/isFunction')

const $$map = typeName => Constructor => x => {
  // map :: Functor F => F a ~> (a -> b) -> F b
  return function map(f) {
    if (!isFunction(f)) {
      throw new TypeError(`${typeName}.map: must be called with a function`)
    }

    return Constructor(f(x))
  }
}

module.exports = $$map
