const { $$map, $$chain, $$ap } = require('./')
const Fake = value =>
  Object.freeze({
    value,
    type: 'Fake',
    map: f => $$map('Fake')(Fake)(value)(f),
    chain: f => $$chain('Fake')(Fake)(value)(f),
    ap: m => $$ap('Fake')(Fake)(value)(m),
    show: `Fake(${value})`
  })

module.exports = {
  of: Fake,
  Fake
}
