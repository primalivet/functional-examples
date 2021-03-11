const Sum = x => ({
  x,
  chain: f => f(x),
  concat: ({ x: y }) => Sum(x + y),
  fold: f => f(x),
  map: f => Sum(f(x)),
  inpect: () => `Sum(${x})`
})

Sum.empty = () => Sum(0)
Sum.of = x => Sum(x)

module.exports = Sum
