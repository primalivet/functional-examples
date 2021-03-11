const tap = require('tap')
const { Fake } = require('./mocks/type')
const $$map = require('./map')

const fake = Fake(10)

tap.test('$$map errors', t => {
  const map = $$map('Fake')(Fake)(fake.value)
  t.throws(() => map(30), {}, "throws when value isn't function")
  t.end()
})
