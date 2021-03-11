// map :: (a -> b) -> F a -> F b
const map = f => Fa => Fa.map(f)

module.exports = map
