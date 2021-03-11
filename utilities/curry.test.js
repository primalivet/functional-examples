const tap = require('tap')
const curry = require('./curry')

const add = (x, y) => x + y
const add2 = curry(add)(2)
const found = add2(2)
const wanted = 4

tap.equal(found, wanted)
