const tap = require('tap')
const { Fake } = require('./mocks/type')
const { Right } = require('../data/either')
const $$ap = require('./ap')

tap.test('$$ap errors', t => {
  const fake1 = Fake(10)
  const ap1 = $$ap('Fake')(Fake)(fake1.value)

  t.throws(() => ap1(Fake(10)), {}, 'throws when not wrapping a function')

  const fake2 = Fake(x => x)
  const ap2 = $$ap('Fake')(Fake)(fake2.value)

  t.throws(
    () => ap2(Right(10)),
    {},
    'throws when not called with Apply of same type'
  )

  t.end()
})
