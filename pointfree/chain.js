// chain :: (a -> b) -> Fa -> b
const chain = f => Fa => Fa.chain(f)

module.exports = chain
