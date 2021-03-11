const tap = require('tap')
const compose = require('./compose')

const double = x => x * 2
const square = x => x * x
const found = compose(square, double)(2)
const wanted = 16

tap.equal(found, wanted)
