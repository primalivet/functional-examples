const Any = x => ({
  x,
  chain: f => f(x),
  concat: ({ x: y }) => Any(x || y),
  fold: f => f(x),
  map: f => Any(f(x)),
  inspect: () => `Any(${x})`
})

Any.empty = () => Any(true)
Any.of = x => Any(x)

module.exports = Any
