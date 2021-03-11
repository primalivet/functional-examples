const tap = require('tap')
const Any = require('./any')

tap.test('identity', t => {
  const found = Any.empty().fold(x => x)
  const wanted = true

  t.equal(found, wanted)
  t.end()
})

tap.test('associativity law', t => {
  // law: a.concat(b).concat(c) is equivalent to a.concat(b.concat(c))
  const a = Any.of(false)
    .concat(Any.of(true).concat(Any.of(false)))
    .fold(x => x)
  const b = Any.of(false)
    .concat(Any.of(true))
    .concat(Any.of(false))
    .fold(x => x)

  t.equal(a, b)
  t.end()
})

tap.test('map takes a function and wrapps the retun value in same type', t => {
  const found = Any.of(true)
    .concat(Any.of(false))
    .map(x => x)
    .fold(x => x)
  const wanted = true

  t.equal(found, wanted)
  t.end()
})

tap.test('chain takes a function and unwrapps a nested type', t => {
  const found = Any.of(true)
    .concat(Any.of(false))
    .chain(x => Any.of(x))
    .fold(x => x)
  const wanted = true

  t.equal(found, wanted)
  t.end()
})
