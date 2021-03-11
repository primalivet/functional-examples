const tap = require ('tap')
const equal = require ('./equal')

const found = equal ('hello') ('hello')
const wanted = true

tap.equal (found, wanted)
