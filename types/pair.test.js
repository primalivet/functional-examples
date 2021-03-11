const tap = require('tap')
const Pair = require('./Pair')

// this might be incorrect way to test left identity on pair, see sancuary
tap.skip('left identity', t => {
  const f = x => y => Pair(x)(y.toUpperCase())
  const left = Pair('abc')('def').chain(f('abc'))
  const right = f('abcabc')('def')
  const found = left.inspect() === right.inspect()
  const wanted = true

  t.equal(found, wanted)
  t.end()
})

tap.skip('right identity')
