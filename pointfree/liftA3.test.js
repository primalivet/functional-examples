const tap = require('tap')
const liftA3 = require('./liftA3')
const Identity = require('../types/identity')

const m3 = w => h => d => `${w * h * d} m3`
const found = liftA3(m3)(Identity.of(3))(Identity.of(3))(Identity.of(3)).fold(
  x => x
)
const wanted = '27 m3'

tap.equal(found, wanted)
