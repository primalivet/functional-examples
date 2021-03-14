module.exports = {
  Either: require('./lib/data/either'),
  Identity: require('./lib/data/identity'),

  isFunction: require('./lib/prelude/isFunction'),
  equal: require('./lib/prelude/equal'),

  compose: require('./utilities/compose'),
  curry: require('./utilities/curry'),
  pipe: require('./utilities/pipe'),
  trace: require('./utilities/trace'),

  All: require('./types/all'),
  Any: require('./types/any'),
  Product: require('./types/product'),
  Sum: require('./types/sum'),
  Maybe: require('./types/maybe'),
  IO: require('./types/io'),
  LazyPromise: require('./types/lazy-promise'),

  map: require('./pointfree/map'),
  chain: require('./pointfree/chain'),
  fold: require('./pointfree/fold'),
  fork: require('./pointfree/fork'),
  concat: require('./pointfree/concat'),
  liftA2: require('./pointfree/liftA2'),
  liftA3: require('./pointfree/liftA3')
}
