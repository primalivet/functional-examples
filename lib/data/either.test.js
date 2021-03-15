const tap = require('tap')
const Either = require('./either')
const Identity = require('./identity')

const {
  Right,
  Left,
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

const Laws = Type => {
  const f = x => Type.of(x + 1)
  const g = x => Type.of(x * 2)
  const h = x => x / 2
  const i = x => x * x
  const id = x => x
  const compose = f => g => x => f(g(x))

  const laws = {
    'functor-identity': Type => {
      const a = Type.of(1).map(id).show()
      const b = Type.of(1).show()

      return a === b
    },
    'functor-composition': Type => {
      const a = Type.of(1)
        .map(x => i(h(x)))
        .show()
      const b = Type.of(1).map(h).map(i).show()

      return a === b
    },
    'apply-composition': Type => {
      const a = Type(10)
        .ap(Type(id).ap(Type(id).map(compose)))
        .show()
      const b = Type(10).ap(Type(id)).ap(Type(id)).show()

      return a === b
    },
    'chain-associativity': Type => {
      const a = Type.of(2).chain(f).chain(g).show()
      const b = Type.of(2)
        .chain(x => f(x))
        .chain(g)
        .show()

      return a === b
    },
    'applicative-identity': Type => {
      const a = Type(1).ap(Type.of(id)).show()
      const b = Type(1).show()

      return a === b
    },
    'applicative-homomorphism': Type => {
      const a = Type.of(1).ap(Type.of(id)).show()
      const b = Type.of(id(1)).show()

      return a === b
    },
    'applicative-interchange': Type => {
      const A = Type
      const u = Type.of(id)
      const y = 1

      const a = A.of(y).ap(u)
      const b = u.ap(A.of(f => f(y)))

      return a.show() === b.show()
    },
    'monad-left-identity': Type => {
      const a = Type.of(1).chain(Type.of).show()
      const b = Type.of(1).show()

      return a === b
    },
    'monad-right-identity': Type => {
      const a = Type.of(1).chain(Type.of).show()
      const b = Type.of(1).show()

      return a === b
    }
  }

  const passes = law => {
    return laws[law](Type)
  }

  return { passes }
}

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

tap.test('Fantasy Land Laws', t => {
  const LL = Laws(Left)
  const LR = Laws(Right)

  /* eslint-disable prettier/prettier */
  t.equals(LL.passes('functor-identity'),         true, 'Left:   Functor identity')
  t.equals(LR.passes('functor-identity'),         true, 'Right:  Functor identity')

  t.equals(LL.passes('functor-composition'),      true, 'Left:   Functor composition')
  t.equals(LR.passes('functor-composition'),      true, 'Right:  Functor composition')

  t.equals(LL.passes('apply-composition'),        true, 'Left:   Apply composition')
  t.equals(LR.passes('apply-composition'),        true, 'Right:  Apply composition')

  t.equals(LL.passes('chain-associativity'),      true, 'Left:   Chain composition')
  t.equals(LR.passes('chain-associativity'),      true, 'Right:  Chain composition')

  t.equals(LL.passes('applicative-identity'),     true, 'Left:   Applicative identity')
  t.equals(LR.passes('applicative-identity'),     true, 'Right:  Applicative identity')

  t.equals(LL.passes('applicative-homomorphism'), true, 'Left:   Applicative homomorphism')
  t.equals(LR.passes('applicative-homomorphism'), true, 'Right:  Applicative homomorphism')

  // Left cant obey applicative-interchange as Left(x => x) will forever be a
  // Left(x => x) since Left.ap will always return it's value "x => x"
  t.equals(LR.passes('applicative-interchange'),  true, 'Right:  Applicative interchange')

  t.equals(LL.passes('monad-left-identity'),      true, 'Left:   Monad left identity')
  t.equals(LR.passes('monad-left-identity'),      true, 'Right:  Monad left identity')

  t.equals(LL.passes('monad-right-identity'),     true, 'right:  Monad right identity')
  t.equals(LR.passes('monad-right-identity'),     true, 'Right:  Monad right identity')
  /* eslint-enable prettier/prettier */

  t.end()
})

tap.test('tryCatch', t => {
  const a = tryCatch(() => JSON.parse('not = correct = json'))
  const b = tryCatch(() => JSON.parse('{"hello": "world"}'))

  t.equal(a.isRight, false, 'Left on error (f throws)')
  t.equal(b.isRight, true, 'Right on success')

  t.throw(() => tryCatch(10), {}, 'tryCatch must be called with a function')

  t.end()
})

tap.test('isLeft', t => {
  t.equal(isLeft(Right(1)), false)
  t.equal(isLeft(Left(1)), true)

  t.throws(
    () => isLeft(Identity(10)),
    {},
    'isLeft throws when argument is not of type Either'
  )

  t.end()
})

tap.test('isRight', t => {
  t.equal(isRight(Right(1)), true)
  t.equal(isRight(Left(1)), false)

  t.throws(
    () => isRight(Identity(10)),
    {},
    'isRight throws when argument is not of type Either'
  )

  t.end()
})

tap.test('either', t => {
  const onError = x => `error: ${x}`
  const onSuccess = x => `success: ${x}`

  t.equal(either(onError)(onSuccess)(Left('message')), 'error: message')
  t.equal(either(onError)(onSuccess)(Right('message')), 'success: message')

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

tap.test('fromLeft', t => {
  t.equal(
    fromLeft('fallback message')(Left('actual message')),
    'actual message'
  )

  t.equal(
    fromLeft('fallback message')(Right('actual message')),
    'fallback message'
  )

  t.throws(
    () => fromLeft('fallback message')(Identity(10)),
    {},
    'fromLeft throws when not called on an Either'
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

  t.throws(
    () => fromRight('fallback message')(Identity(10)),
    {},
    'fromRight throws when not called on an Either'
  )

  t.end()
})

tap.test('lefts', t => {
  const as = [Left(1), Right(2), Left(3), Right(4)]
  const bs = [Left(1), false, Right(2), Left(3), Right(4)]

  const found = lefts(as)
  const wanted = [1, 3]

  t.deepEqual(found, wanted)
  t.throws(() => lefts(bs), {}, 'lefts throw on array with not only Eithers')

  t.end()
})

tap.test('rights', t => {
  const as = [Left(1), Right(2), Left(3), Right(4)]
  const bs = [Left(1), false, Right(2), Left(3), Right(4)]

  const found = rights(as)
  const wanted = [2, 4]

  t.deepEqual(found, wanted)
  t.throws(() => rights(bs), {}, 'rights throw on array with not only Eithers')

  t.end()
})

tap.test('partitionEithers', t => {
  const as = [Left(1), Right(2), Left(3), Right(4)]
  const bs = [Left(1), false, Right(2), Left(3), Right(4)]

  const found = partitionEithers(as)
  const wanted = [
    [1, 3],
    [2, 4]
  ]

  t.deepEqual(found, wanted)
  t.throws(
    () => partitionEithers(bs),
    {},
    'partitionEithers throw on array with not only Eithers'
  )

  t.end()
})
