const Product = x => ({
  x,
  chain: f => f(x),
  concat: ({ x: y }) => Product(x * y),
  fold: f => f(x),
  map: f => Product(f(x)),
  inpect: () => `Product(${x})`
})

Product.of = x => Product(x)
Product.empty = () => Product(1)

module.exports = Product
