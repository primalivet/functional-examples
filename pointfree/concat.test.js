const tap = require('tap')
const concat = require('./concat')
const All = require('../types/all')

const found = concat(All.of(false))(All.of(true)).fold(x => x)
const wanted = false
tap.equal(found, wanted)
