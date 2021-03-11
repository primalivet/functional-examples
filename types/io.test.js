const tap = require('tap')
const IO = require('./io')

tap.test('left identity', t => {
  const f = x => IO.of(x * 2)
  const left = IO.of(10).chain(f)
  const right = f(10)
  const found = left.inspect() === right.inspect()
  const wanted = true

  t.equal(found, wanted)
  t.end()
})

tap.test('right identity', t => {
  const left = IO.of(10).chain(IO.of)
  const right = IO.of(10)
  const found = left.inspect() === right.inspect()
  const wanted = true

  t.equal(found, wanted)
  t.end()
})

tap.test('associativity', t => {
  const f = x => IO.of(x * 2)
  const g = x => IO.of(x + 1)
  const left = IO.of(10).chain(f).chain(g)
  const right = IO.of(10).chain(x => f(x).chain(g))
  const found = left.inspect() === right.inspect()
  const wanted = true

  t.equal(found, wanted)
  t.end()
})

tap.test(
  'IO map takes a function which lazily works on the return value of the wrapped function',
  t => {
    const found = IO(() => 10)
      .map(x => x * 2)
      .inspect()
    const wanted = 'IO(20)'

    t.equal(found, wanted)
    t.end()
  }
)

tap.test(
  'IO chain takes a function which returns a IO type and unwraps one level',
  t => {
    const found = IO(() => 3)
      .chain(x => IO(() => x * 2))
      .inspect()
    const wanted = 'IO(6)'

    t.equal(found, wanted)
    t.end()
  }
)

tap.test('IO ap applies the value of a IO type to the wrapped function', t => {
  const found = IO.of(x => y => x * y)
    .ap(IO.of(3))
    .ap(IO.of(4))
    .inspect()
  const wanted = 'IO(12)'

  t.equal(found, wanted)
  t.end()
})

tap.test('IO fold takes a function and unwraps the value', t => {
  const found = IO.of(10).fold(x => x)
  const wanted = 10

  t.equal(found, wanted)
  t.end()
})
