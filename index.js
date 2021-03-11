module.exports = {
  compose: require ('./utilities/compose'),
  curry: require ('./utilities/curry'),
  pipe: require ('./utilities/pipe'),
  trace: require ('./utilities/trace'),
  isFunction: require ('./lib/prelude/isFunction'),
  equal: require ('./lib/utilities/equal'),

  All: require ('./types/all'),
  Any: require ('./types/any'),
  Either: require ('./lib/data/either'),
  Product: require ('./types/product'),
  Sum: require ('./types/sum'),
  Maybe: require ('./types/maybe'),
  IO: require ('./types/io'),
  LazyPromise: require ('./types/lazy-promise'),
  Identity: require ('./types/identity'),

  map: require ('./pointfree/map'),
  chain: require ('./pointfree/chain'),
  fold: require ('./pointfree/fold'),
  fork: require ('./pointfree/fork'),
  concat: require ('./pointfree/concat'),
  liftA2: require ('./pointfree/liftA2'),
  liftA3: require ('./pointfree/liftA3')
}
