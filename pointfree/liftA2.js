const liftA2 = f => Fa => Fb => Fa.map(f).ap(Fb)

module.exports = liftA2
