// fold :: (a -> b) -> F a -> b
const fold = f => Fa => Fa.fold(f)

module.exports = fold
