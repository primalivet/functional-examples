const tap = require ('tap')
const isFunction = require ('./isFunction')

const f = () => {}

const found = isFunction (f)
const wanted = true

tap.equal (found, wanted)
