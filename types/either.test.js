const tap = require ('tap')
const Either = require ('./either')

tap.test ('left identity', t => {
  const f = x => Either.of (x * 2)
  const left = Either.of (10).chain (f)
  const right = f (10)
  const found = left.inspect () === right.inspect ()
  const wanted = true

  t.equal (found, wanted)
  t.end ()
})

tap.test ('right identity', t => {
  const left = Either.of (10).chain (Either.of)
  const right = Either.of (10)
  const found = left.inspect () === right.inspect ()
  const wanted = true

  t.equal (found, wanted)
  t.end ()
})

tap.test ('associativity', t => {
  const f = x => Either.of (x * 2)
  const g = x => Either.of (x + 1)
  const left = Either.of (10)
    .chain (f)
    .chain (g)
  const right = Either.of (10).chain (x => f (x).chain (g))
  const found = left.inspect () === right.inspect ()
  const wanted = true

  t.equal (found, wanted)
  t.end ()
})

tap.test ('Either fromNullable fold Left on null', t => {
  const found = Either.fromNullable (null).inspect ()
  const wanted = 'Left(null)'

  t.equal (found, wanted)
  t.end ()
})

tap.test ('Either fromNullable fold Left on undefined', t => {
  const found = Either.fromNullable (undefined).inspect ()
  const wanted = 'Left(undefined)'

  t.equal (found, wanted)
  t.end ()
})

tap.test ('Either fromNullable fold Right on not null', t => {
  const found = Either.fromNullable ('success').inspect ()
  const wanted = 'Right(success)'

  t.equal (found, wanted)
  t.end ()
})

tap.test ('Either tryCatch fold Right on success', t => {
  const f = () => 'success'
  const found = Either.tryCatch (f).inspect ()
  const wanted = 'Right(success)'

  t.equal (found, wanted)
  t.end ()
})

tap.test ('Either tryCatch fold Left on error', t => {
  const f = () => { throw new Error ('failure') }
  const found = Either.tryCatch (f).inspect ()
  const wanted = 'Left(Error: failure)'

  t.equal (found, wanted)
  t.end ()
})

tap.test ('Either of fold Right', t => {
  const found = Either.of ('success').inspect ()
  const wanted = 'Right(success)'

  t.equal (found, wanted)
  t.end ()
})

tap.test ('Either Left fold Left', t => {
  const found = Either.Left (null).inspect ()
  const wanted = 'Left(null)'

  t.equal (found, wanted)
  t.end ()
})

tap.test ('Either Right fold Right', t => {
  const found = Either.Right (null).inspect ()
  const wanted = 'Right(null)'

  t.equal (found, wanted)
  t.end ()
})

tap.test ('Either Right map method does run', t => {
  const found = Either.Right (10)
    .map (x => x * 10)
    .inspect ()
  const wanted = 'Right(100)'

  t.equal (found, wanted)
  t.end ()
})

tap.test ('Either Left map method is does NOT run', t => {
  const found = Either.Left (10)
    .map (x => x * 10)
    .inspect ()
  const wanted = 'Left(10)'

  t.equal (found, wanted)
  t.end ()
})

tap.test ('Either Right chain method does run and unfolds nested type', t => {
  const found = Either.Right (10)
    .chain (x => Either.fromNullable (x * 10))
    .inspect ()
  const wanted = 'Right(100)'

  t.equal (found, wanted)
  t.end ()
})

tap.test ('Either Left chain method does NOT run', t => {
  const found = Either.Left (10)
    .chain (x => Either.fromNullable (x * 10))
    .inspect ()
  const wanted = 'Left(10)'

  t.equal (found, wanted)
  t.end ()
})

tap.test ('Either Left ap method does NOT run', t => {
  const found = Either.Left (x => x * 2)
    .ap (Either.of (10))
    .inspect ()
  const wanted = 'Left(x => x * 2)'

  t.equal (found, wanted)
  t.end ()
})

tap.test ('Either Right ap method does run', t => {
  const found = Either.Right (x => x * 2)
    .ap (Either.of (10))
    .inspect ()
  const wanted = 'Right(20)'

  t.equal (found, wanted)
  t.end ()
})
