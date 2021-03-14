const tap = require('tap')
const Identity = require('./identity')
const { Left } = require('./either')

tap.test('Constructors', t => {
  t.equal(Identity(1).constructor, Identity, 'Identity is the constructor')
  t.equal(Identity.of(1).constructor, Identity, 'Identity is the constructor')
  t.equal(Identity(1).type, 'Identity', 'Identity: return Identity')
  t.equal(Identity.of(1).type, 'Identity', 'Identity: return Identity')
  t.end()
})

tap.test('Methods', t => {
  const a = Identity(1)
  t.equal(typeof a.of === 'function', true, 'Identity.of: is function')
  t.equal(typeof a.map === 'function', true, 'Identity.map: is function')
  t.equal(typeof a.chain === 'function', true, 'Identity.chain: is function')
  t.equal(typeof a.ap === 'function', true, 'Identity.ap: is function')
  t.equal(typeof a.show === 'function', true, 'Identity.show: is function')
  t.equal(typeof a.value === 'function', true, 'Identity.value: is function')

  t.equal(a.valueOf, a.value, 'Identity.valueOf: is an alias')
  t.equal(a.inspect, a.show, 'Identity.inspect: is an alias')
  t.end()
})

tap.test('Errors', t => {
  const a = Identity(1)
  /* eslint-disable prettier/prettier */
  t.throw(() => Identity(), {}, 'Identity: must be called with a value')
  t.throw(() => a.map(1), {}, 'Identity.map: must be called with a function')
  t.throw(() => a.chain(1), {}, 'Identity.chain: must be called with a function')
  t.throw(() => a.chain(x => x), {}, 'Identity.chain: passed function must return same type')
  t.throw(() => a.ap(Identity(1)), {}, 'Identity.ap: passed Apply must wrap a function')
  t.throw(() => a.ap(Left(x => x)), {}, 'Identity.ap: passed Apply must be an Identity')
  /* eslint-enable prettier/prettier */
  t.end()
})

tap.test('Type: Chain (Fantasy Land)', t => {
  const f = x => Identity(x)
  const g = x => Identity(x)

  const a = Identity(1).chain(f).chain(g)
  const b = Identity(1)
    .chain(x => f(x))
    .chain(g)

  t.equal(a.show(), b.show(), 'Associativity')
  t.end()
})

tap.test('Type: Functor (Fantasy Land)', t => {
  const f = x => x * 2
  const g = x => x + 1
  const a = Identity(1).map(x => x)
  const b = Identity(1)
  const c = Identity(1).map(x => f(g(x)))
  const d = Identity(1).map(g).map(f)

  t.equal(a.show(), b.show(), 'identity')
  t.equal(c.show(), d.show(), 'composition')
  t.end()
})

tap.test('Type: Apply (Fantasy Land)', t => {
  const id = x => x
  const compose = f => g => x => f(g(x))

  const a = Identity(10).ap(Identity(id).ap(Identity(id).map(compose)))
  const b = Identity(10).ap(Identity(id)).ap(Identity(id))

  t.equal(a.show(), b.show(), 'composition')

  t.end()
})

tap.test('Type: Applicative (Fantasy Land)', t => {
  const id = x => x
  const a = Identity(1).ap(Identity.of(id))
  const b = Identity(1)
  const c = Identity.of(1).ap(Identity.of(id))
  const d = Identity.of(id(1))
  const x = Identity.of(1).ap(Identity.of(id))
  const y = Identity.of(id).ap(Identity.of(f => f(1)))

  t.equal(a.show(), b.show(), 'identity')
  t.equal(c.show(), d.show(), 'homomorphism')
  t.equal(x.show(), y.show(), 'interchange')
  t.end()
})
