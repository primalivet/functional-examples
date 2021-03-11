// fork :: (a -> b) -> F a -> b
const fork = (f, g) => Fa => Fa.fork(f, g)

module.exports = fork
