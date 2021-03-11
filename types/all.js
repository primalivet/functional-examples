const All = x => ({
  x,
  chain: f => f(x),
  concat: ({ x: y }) => All(x && y),
  fold: f => f(x),
  map: f => All(f(x)),
  inpect: () => `All(${x})`
})

All.empty = () => All(true)
All.of = x => All(x)

module.exports = All
