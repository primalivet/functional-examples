const tap = require('tap')
const Product = require('./product')

tap.test('identity', t => {
  const found = Product.empty().fold(x => x)
  const wanted = 1

  t.equal(found, wanted)
  t.end()
})

tap.test('associativity law', t => {
  // law: a.concat(b).concat(c) is equivalent to a.concat(b.concat(c))
  const a = Product.of(10)
    .concat(Product.of(5).concat(Product.of(10)))
    .fold(x => x)
  const b = Product.of(10)
    .concat(Product.of(5))
    .concat(Product.of(10))
    .fold(x => x)

  t.equal(a, b)
  t.end()
})

tap.test('map takes a function and wrapps the retun value in same type', t => {
  const found = Product.of(10)
    .concat(Product.of(10))
    .map(x => x)
    .fold(x => x)
  const wanted = 100

  t.equal(found, wanted)
  t.end()
})

tap.test('chain takes a function and unwrapps a nested type', t => {
  const found = Product.of(10)
    .concat(Product.of(10))
    .chain(x => Product.of(x))
    .fold(x => x)
  const wanted = 100

  t.equal(found, wanted)
  t.end()
})
