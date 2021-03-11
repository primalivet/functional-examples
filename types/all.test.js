const tap = require('tap')
const All = require('./all')

tap.test('identity', t => {
  const found = All.empty().fold(x => x)
  const wanted = true

  t.equal(found, wanted)
  t.end()
})

tap.test('associativity law', t => {
  // law: a.concat(b).concat(c) is equivalent to a.concat(b.concat(c))
  const a = All.of(true)
    .concat(All.of(true).concat(All.of(true)))
    .fold(x => x)
  const b = All.of(true)
    .concat(All.of(true))
    .concat(All.of(true))
    .fold(x => x)

  t.equal(a, b)
  t.end()
})

tap.test('map takes a function and wrapps the retun value in same type', t => {
  const found = All.of(true)
    .map(x => !x)
    .fold(x => x)
  const wanted = false

  t.equal(found, wanted)
  t.end()
})

tap.test('chain takes a function and unwrapps a nested type', t => {
  const found = All.of(true)
    .chain(x => All.of(!x))
    .fold(x => x)
  const wanted = false

  t.equal(found, wanted)
  t.end()
})
