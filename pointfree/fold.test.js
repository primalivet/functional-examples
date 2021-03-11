const tap = require('tap')
const fold = require('./fold')
const Product = require('../types/product')

const double = x => x * 2
const found = fold(double)(Product.of(4))
const wanted = 8

tap.equal(found, wanted)
