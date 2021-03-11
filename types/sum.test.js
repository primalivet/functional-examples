const tap = require('tap')
const Sum = require('./sum')

tap.test('identity', t => {
  const found = Sum.empty(0).fold(x => x)
  const wanted = 0

  t.equal(found, wanted)
  t.end()
})

tap.test('associativity law', t => {
  // law: a.concat(b).concat(c) is equivalent to a.concat(b.concat(c))
  const a = Sum.of(10)
    .concat(Sum.of(5).concat(Sum.of(10)))
    .fold(x => x)
  const b = Sum.of(10)
    .concat(Sum.of(5))
    .concat(Sum.of(10))
    .fold(x => x)

  t.equal(a, b)
  t.end()
})

tap.test('map takes a function and wrapps the retun value in same type', t => {
  const found = Sum.of(10)
    .concat(Sum.of(90))
    .map(x => x)
    .fold(x => x)
  const wanted = 100

  t.equal(found, wanted)
  t.end()
})

tap.test('chain takes a function and unwrapps a nested type', t => {
  const found = Sum.of(10)
    .concat(Sum.of(80))
    .chain(x => Sum.of(x).concat(Sum(10)))
    .fold(x => x)
  const wanted = 100

  t.equal(found, wanted)
  t.end()
})
