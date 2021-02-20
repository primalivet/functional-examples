const liftA3 = f => Fa => Fb => Fc =>
  Fa.map (f)
    .ap (Fb)
    .ap (Fc)

module.exports = liftA3
