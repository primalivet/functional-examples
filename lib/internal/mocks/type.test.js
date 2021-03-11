const tap = require('tap')
const { of, Fake } = require('./type')

tap.test('Fake implements of', t => {
  t.equal(of(10).show(), 'Fake(10)')

  t.end()
})

tap.test('Fake implements map', t => {
  t.equal(
    Fake(10)
      .map(x => x * 2)
      .show(),
    'Fake(20)'
  )

  t.end()
})

tap.test('Fake implements chain', t => {
  t.equal(
    Fake(10)
      .chain(x => Fake(x * 2))
      .show(),
    'Fake(20)'
  )

  t.end()
})

tap.test('Fake implements ap', t => {
  t.equal(
    Fake(x => x * 2)
      .ap(Fake(10))
      .show(),
    'Fake(20)'
  )

  t.end()
})
