const tap = require('tap')
const { Fake } = require('./mocks/type')
const { Right } = require('../data/either')
const $$chain = require('./chain')

const fake = Fake(10)

tap.test('$$chain errors', t => {
  const chain = $$chain('Fake')(Fake)(fake.value)
  t.throws(() => chain(30), {}, "throws when value isn't function")
  t.throws(
    () => chain(x => Right(x * 10)),
    {},
    'throws when function dont return same type'
  )

  t.end()
})
