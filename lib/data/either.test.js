const tap = require('tap')
const Either = require('./either')
const Identity = require('./identity')

const {
  Right,
  Left,
  fromNullable,
  tryCatch,
  either,
  fromLeft,
  fromRight,
  isLeft,
  isRight,
  lefts,
  partitionEithers,
  rights
} = Either

tap.test('Constructors', t => {
  t.equal(Either(1).constructor, Either, 'Either: Either is the constructor')
  t.equal(Either.of(1).constructor, Either, 'Either: Either is the constructor')
  t.equal(Right(1).constructor, Either, 'Right: Either is the constrcutor')
  t.equal(Left(1).constructor, Either, 'Left: Either is the constrcutor')

  t.equal(Either(1).type, 'Either', 'Either: return Either')
  t.equal(Either.of(1).type, 'Either', 'Either: return Either')
  t.equal(Right(1).type, 'Either', 'Right: return Either')
  t.equal(Left(1).type, 'Either', 'Left: return Either')

  t.equal(Right(1).isRight, true, 'Right: return Either Right')
  t.equal(Left(1).isRight, false, 'Left: return Either Left')

  t.end()
})

tap.test('Methods', t => {
  const a = Left(1)
  const b = Right(1)

  t.equal(typeof a.of === 'function', true, 'Left.of: is function')
  t.equal(typeof a.map === 'function', true, 'Left.map: is function')
  t.equal(typeof a.chain === 'function', true, 'Left.chain: is function')
  t.equal(typeof a.ap === 'function', true, 'Left.ap: is function')
  t.equal(typeof a.show === 'function', true, 'Left.show: is function')
  t.equal(typeof a.value === 'function', true, 'Left.value: is function')

  t.equal(a.valueOf, a.value, 'Left.valueOf: is an alias')
  t.equal(a.inspect, a.show, 'Left.inspect: is an alias')

  t.equal(typeof b.of === 'function', true, 'Right.of: is function')
  t.equal(typeof b.map === 'function', true, 'Right.map: is function')
  t.equal(typeof b.chain === 'function', true, 'Right.chain: is function')
  t.equal(typeof b.ap === 'function', true, 'Right.ap: is function')
  t.equal(typeof b.show === 'function', true, 'Right.show: is function')
  t.equal(typeof b.value === 'function', true, 'Right.value: is function')

  t.equal(b.valueOf, b.value, 'Right.valueOf: is an alias')
  t.equal(b.inspect, b.show, 'Right.inspect: is an alias')
  t.end()
})

tap.test('Errors', t => {
  const a = Left(1)
  const b = Right(1)

  /* eslint-disable prettier/prettier */
  t.throw(() => Either(), {}, 'Identity: must be called with a value')

  t.throw(() => b.map(1), {}, 'Right.map: must be called with a function')
  t.throw(() => b.chain(1), {}, 'Right.chain: must be called with a function')
  t.throw(() => b.chain(x => x), {}, 'Right.chain: passed function must return same type')
  t.throw(() => b.ap(Right(1)), {}, 'Right.ap: passed Apply must wrap a function')
  t.throw(() => b.ap(Identity(x => x)), {}, 'Right.ap: passed Apply must be an Either')
  /* eslint-enable prettier/prettier */
  t.end()
})

tap.todo('Type: Chain (Fantasy Land)', t => {
  t.end()
})

tap.todo('Type: Chain (Fantasy Land)', t => {
  t.end()
})

tap.todo('Type: Chain (Fantasy Land)', t => {
  t.end()
})

tap.todo('Only map over value on Right', t => {
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

tap.todo('Only chain over value on Right', t => {
  const inc = x => Right(x + 1)

  t.equal(Left(1).chain(inc).show(), 'Left(1)')
  t.equal(Right(1).chain(inc).show(), 'Right(2)')

  t.end()
})

tap.todo('Right errors', t => {
  const a = Right(1)
  const b = Right(2)
  const c = x => Identity(x * 2)
  const d = Identity(x => x * 2)

  t.throw(() => a.map(2), {}, 'map: throw when arg is no function')
  t.throw(() => a.chain(2), {}, 'chain: throw when arg is no function')
  t.throw(() => a.chain(c), {}, 'chain: throw when arg dont return same type')
  t.throws(() => a.ap(b), {}, 'ap: throw when arg dont wrap function')
  t.throws(() => a.ap(d), {}, 'ap: throw when arg is not of same type')

  t.end()
})

tap.todo('Only apply over value on Right', t => {
  const inc = x => x * 2
  t.equal(Right(10).ap(Right(inc)).show(), 'Right(20)')
  t.equal(Left(10).ap(Right(inc)).show(), 'Left(10)')

  t.end()
})

tap.todo('Identity', t => {
  const f = x => of(x + 1)
  const g = x => of(x * 2)
  const h = x => x / 2
  const i = x => x * x
  const id = x => x
  const compose = f => g => x => f(g(x))

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

  const a = Right(10).ap(Right(id).ap(Right(id).map(compose)))
  const b = Right(10).ap(Right(id)).ap(Right(id))

  t.equal(a.show(), b.show(), 'fantasy-land (Apply) composition')

  t.end()
})

tap.todo('tryCatch', t => {
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

tap.todo('fromNullable return Left on falsy', t => {
  t.equal(fromNullable(null).isRight, false, 'Left on null')
  t.equal(fromNullable(undefined).isRight, false, 'Left on undefined')
  t.equal(fromNullable().isRight, false, 'Left on undefined (implicit)')
  t.end()
})

tap.todo('fromNullable return Right on truthy', t => {
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

tap.todo('isLeft', t => {
  t.equal(isLeft(Right(1)), false)
  t.equal(isLeft(Left(1)), true)

  t.end()
})

tap.todo('isLeft errors', t => {
  t.throws(
    () => isLeft(Identity(10)),
    {},
    'isLeft throws when argument is not of type Either'
  )

  t.end()
})

tap.todo('isRight', t => {
  t.equal(isRight(Right(1)), true)
  t.equal(isRight(Left(1)), false)

  t.end()
})

tap.todo('isRight errors', t => {
  t.throws(
    () => isRight(Identity(10)),
    {},
    'isRight throws when argument is not of type Either'
  )

  t.end()
})

tap.todo('either', t => {
  const onError = x => `error: ${x}`
  const onSuccess = x => `success: ${x}`

  t.equal(either(onError)(onSuccess)(Left('message')), 'error: message')
  t.equal(either(onError)(onSuccess)(Right('message')), 'success: message')

  t.end()
})
tap.todo('either errors', t => {
  const onError = x => `error: ${x}`
  const onSuccess = x => `success: ${x}`

  t.throws(
    () => either(10)(onSuccess)(Right(10)),
    {},
    'throws when first argument is not a function'
  )

  t.throws(
    () => either(onError)(10)(Right(10)),
    {},
    'throws when second argument is not a function'
  )

  t.throws(
    () => either(onError)(onSuccess)(Identity(10)),
    {},
    'throws when last argument is not of same type'
  )

  t.end()
})

tap.todo('fromLeft', t => {
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

tap.todo('fromLeft errors', t => {
  t.throws(
    () => fromLeft('fallback message')(Identity(10)),
    {},
    'fromLeft throws when not called on an Either'
  )

  t.end()
})

tap.todo('fromRight', t => {
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

tap.todo('fromRight errors', t => {
  t.throws(
    () => fromRight('fallback message')(Identity(10)),
    {},
    'fromRight throws when not called on an Either'
  )

  t.end()
})

tap.todo('lefts', t => {
  const ms = [Left(1), Right(2), Left(3), Right(4)]
  const found = lefts(ms)
  const wanted = [1, 3]

  t.deepEqual(found, wanted)
  t.end()
})

tap.todo('lefts errors', t => {
  const ms = [Left(1), false, Right(2), Left(3), Right(4)]

  t.throws(() => lefts(ms), {}, 'lefts throw on array with not only Eithers')

  t.end()
})

tap.todo('rights', t => {
  const ms = [Left(1), Right(2), Left(3), Right(4)]
  const found = rights(ms)
  const wanted = [2, 4]

  t.deepEqual(found, wanted)
  t.end()
})

tap.todo('rights errors', t => {
  const ms = [Left(1), false, Right(2), Left(3), Right(4)]

  t.throws(() => rights(ms), {}, 'rights throw on array with not only Eithers')

  t.end()
})

tap.todo('partitionEithers', t => {
  const ms = [Left(1), Right(2), Left(3), Right(4)]
  const found = partitionEithers(ms)
  const wanted = [
    [1, 3],
    [2, 4]
  ]

  t.deepEqual(found, wanted)
  t.end()
})

tap.todo('partitionEithers errors', t => {
  const ms = [Left(1), false, Right(2), Left(3), Right(4)]

  t.throws(
    () => partitionEithers(ms),
    {},
    'partitionEithers throw on array with not only Eithers'
  )

  t.end()
})
