const tap = require('tap')
const chain = require('./chain')
const Identity = require('../types/identity')

const found = chain(x => Identity.of(x))(Identity.of(3)).fold(x => x)
const wanted = 3

tap.equal(found, wanted)
