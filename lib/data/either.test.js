const tap = require('tap')
const {
  of,
  fromNullable,
  tryCatch,
  Left,
  Right,
  either,
  fromLeft,
  fromRight,
  isLeft,
  isRight,
  lefts,
  partitionEithers,
  rights
} = require('./either')
const { Fake } = require('../internal/mock')

tap.test('Basic contructors', t => {
  t.equal(of().isRight, true, 'of return  of')
  t.equal(Right().isRight, true, 'Right return Right')
  t.equal(Left().isRight, false, 'Left return Left')

  t.end()
})

tap.todo('Contructor errors')

tap.test('Only map over value on Right', t => {
  t.equal(
    Left(1)
      .map(x => x + 1)
      .show(),
    'Left(1)'
  )
  t.equal(
    Right(1)
      .map(x => x + 1)
      .show(),
    'Right(2)'
  )

  t.end()
})

tap.test('Only chain over value on Right', t => {
  const inc = x => Right(x + 1)

  t.equal(Left(1).chain(inc).show(), 'Left(1)')
  t.equal(Right(1).chain(inc).show(), 'Right(2)')

  t.end()
})

tap.test('Only apply over value on Right', t => {
  const inc = x => x * 2
  t.equal(Right(inc).ap(Right(10)).show(), 'Right(20)')
  t.equal(Left(inc).ap(Right(10)).show(), 'Left(x => x * 2)')

  t.end()
})

tap.test('Identity', t => {
  const f = x => of(x + 1)
  const g = x => of(x * 2)
  const h = x => x / 2
  const i = x => x * x
  const id = x => x

  t.equal(
    of(2).chain(f).chain(g).show(),
    of(2)
      .chain(x => f(x))
      .chain(g)
      .show(),
    'fantasy-land (Chain) associativity'
  )

  t.equal(of(1).map(id).show(), of(1).show(), 'fantasy-land (Functor) identity')

  t.equal(
    of(1)
      .map(x => i(h(x)))
      .show(),
    of(1).map(h).map(i).show(),
    'fantasy-land (Functor) composition'
  )

  t.equal(
    of(1).chain(f).show(),
    f(1).show(),
    'fantasy-land (Monad) left identity'
  )

  t.equal(
    of(1).chain(of).show(),
    of(1).show(),
    'fantasy-land (Monad) right identity'
  )

  // t.equal (
  //   of (10)
  //     .ap (of (h)
  //       .ap ( of (i)
  //         .map (f => g => x => f (g (x)))
  //       )
  //     )
  //     .show (),
  //   of (10)
  //     .ap ( of (h))
  //     .ap ( of (i).map (f => g => x => f (g (x))))
  //     .show (),
  //   'fantasy-land (Apply) composition'
  // )

  t.end()
})

tap.test('tryCatch', t => {
  t.equal(
    tryCatch(() => JSON.parse('not = correct = json')).isRight,
    false,
    'Left on error (f throws)'
  )

  t.equal(
    tryCatch(() => JSON.parse('{"hello": "world"}')).isRight,
    true,
    'Right on success'
  )

  t.end()
})

tap.test('fromNullable return Left on falsy', t => {
  t.equal(fromNullable(null).isRight, false, 'Left on null')
  t.equal(fromNullable(undefined).isRight, false, 'Left on undefined')
  t.equal(fromNullable().isRight, false, 'Left on undefined (implicit)')
  t.end()
})

tap.test('fromNullable return Right on truthy', t => {
  t.equal(fromNullable(true).isRight, true, 'Right on true')
  t.equal(fromNullable(false).isRight, true, 'Right on false')
  t.equal(fromNullable('').isRight, true, 'Right on string')
  t.equal(fromNullable([]).isRight, true, 'Right on array')
  t.equal(fromNullable({}).isRight, true, 'Right on object')
  t.equal(fromNullable(new Map()).isRight, true, 'Right on map')
  t.equal(fromNullable(new Set()).isRight, true, 'Right on Set')
  t.equal(fromNullable(1).isRight, true, 'Right on integer')
  t.equal(fromNullable(0.4).isRight, true, 'Right on float')
  t.equal(fromNullable(new Date()).isRight, true, 'Right on date')

  t.end()
})

tap.test('isLeft', t => {
  t.equal(isLeft(Right(1)), false)
  t.equal(isLeft(Left(1)), true)

  t.end()
})

tap.test('isRight', t => {
  t.equal(isRight(Right(1)), true)
  t.equal(isRight(Left(1)), false)

  t.end()
})

tap.test('either', t => {
  const onError = x => `error: ${x}`
  const onSuccess = x => `success: ${x}`

  t.equal(either(onError)(onSuccess)(Left('message')), 'error: message')
  t.equal(either(onError)(onSuccess)(Right('message')), 'success: message')

  t.end()
})

tap.test('fromLeft', t => {
  t.equal(
    fromLeft('fallback message')(Left('actual message')),
    'actual message'
  )

  t.equal(
    fromLeft('fallback message')(Right('actual message')),
    'fallback message'
  )

  t.end()
})

tap.test('fromRight', t => {
  t.equal(
    fromRight('fallback message')(Left('actual message')),
    'fallback message'
  )

  t.equal(
    fromRight('fallback message')(Right('actual message')),
    'actual message'
  )

  t.end()
})

tap.test('lefts', t => {
  const ms = [Left(1), Right(2), Left(3), Right(4)]
  const found = lefts(ms)
  const wanted = [1, 3]

  t.deepEqual(found, wanted)
  t.end()
})

tap.test('rights', t => {
  const ms = [Left(1), Right(2), Left(3), Right(4)]
  const found = rights(ms)
  const wanted = [2, 4]

  t.deepEqual(found, wanted)
  t.end()
})

tap.test('partitionEithers', t => {
  const ms = [Left(1), Right(2), Left(3), Right(4)]
  const found = partitionEithers(ms)
  const wanted = [
    [1, 3],
    [2, 4]
  ]

  t.deepEqual(found, wanted)
  t.end()
})
