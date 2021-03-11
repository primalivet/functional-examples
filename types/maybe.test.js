const tap = require('tap')
const Maybe = require('./maybe')

tap.test('left identity', t => {
  const f = x => Maybe.of(x * 2)
  const left = Maybe.of(10).chain(f)
  const right = f(10)
  const found = left.inspect() === right.inspect()
  const wanted = true

  t.equal(found, wanted)
  t.end()
})

tap.test('right identity', t => {
  const left = Maybe.of(10).chain(Maybe.of)
  const right = Maybe.of(10)
  const found = left.inspect() === right.inspect()
  const wanted = true

  t.equal(found, wanted)
  t.end()
})

tap.test('associativity', t => {
  const f = x => Maybe.of(x * 2)
  const g = x => Maybe.of(x + 1)
  const left = Maybe.of(10).chain(f).chain(g)
  const right = Maybe.of(10).chain(x => f(x).chain(g))
  const found = left.inspect() === right.inspect()
  const wanted = true

  t.equal(found, wanted)
  t.end()
})

tap.test('Maybe.of creates a Just()', t => {
  const found = Maybe.of('hello').inspect()
  const wanted = 'Just(hello)'
  t.equal(found, wanted)
  t.end()
})

tap.test('Maybe.fromNullable creates a Nothing() on a null value', t => {
  const found = Maybe.fromNullable(null).inspect()
  const wanted = 'Nothing()'
  t.equal(found, wanted)
  t.end()
})

tap.test('Maybe.fromNullable creates a Nothing() on a undefined value', t => {
  const found = Maybe.fromNullable(undefined).inspect()
  const wanted = 'Nothing()'
  t.equal(found, wanted)
  t.end()
})

tap.test('Maybe.fromNullable creates a Just() on a not null value', t => {
  const found = Maybe.fromNullable([1, 2, 3]).inspect()
  const wanted = 'Just(1,2,3)'
  t.equal(found, wanted)
  t.end()
})

tap.test("Maybe.fromFalsy creates a Nothing() on a falsy value: ''", t => {
  const found = Maybe.fromFalsy('').inspect()
  const wanted = 'Nothing()'
  t.equal(found, wanted)
  t.end()
})

tap.test('Maybe.fromFalsy creates a Nothing() on a falsy value: []', t => {
  const found = Maybe.fromFalsy([]).inspect()
  const wanted = 'Nothing()'
  t.equal(found, wanted)
  t.end()
})

tap.test('Maybe.fromFalsy creates a Nothing() on a falsy value: NaN', t => {
  const found = Maybe.fromFalsy(NaN).inspect()
  const wanted = 'Nothing()'
  t.equal(found, wanted)
  t.end()
})

tap.test('Maybe.fromFalsy creates a Nothing() on a falsy value: null', t => {
  const found = Maybe.fromFalsy(null).inspect()
  const wanted = 'Nothing()'
  t.equal(found, wanted)
  t.end()
})

tap.test(
  'Maybe.fromFalsy creates a Nothing() on a falsy value: undefined',
  t => {
    const found = Maybe.fromFalsy(undefined).inspect()
    const wanted = 'Nothing()'
    t.equal(found, wanted)
    t.end()
  }
)

tap.test('Maybe is applicative', t => {
  const found = Maybe.of(x => y => x + y)
    .ap(Maybe.of(3))
    .ap(Maybe.of(4))
    .inspect()
  const wanted = 'Just(7)'
  t.equal(found, wanted)
  t.end()
})
