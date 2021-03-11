const tap = require('tap')
const liftA2 = require('./liftA2')
const Identity = require('../types/identity')

const add = x => y => x + y
const found = liftA2(add)(Identity.of(3))(Identity.of(3)).fold(x => x)
const wanted = 6

tap.equal(found, wanted)
