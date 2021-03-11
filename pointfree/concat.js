// concat :: (F a -> F b) -> F b -> F c
const concat = Fa => Fb => Fb.concat(Fa)

module.exports = concat
