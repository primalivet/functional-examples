const tap = require('tap')
const trace = require('./trace')

const found = trace('label')('hello world')
const wanted = 'hello world'

tap.equal(found, wanted)
