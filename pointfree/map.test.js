const tap = require('tap')
const map = require('./map')
const Sum = require('../types/sum')

const double = x => x * 2
const found = map(double)(Sum.of(4)).fold(x => x)
const wanted = 8

tap.equal(found, wanted)
