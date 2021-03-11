const trace = label => x => {
  console.log(`${label}: ${x}`)
  return x
}
module.exports = trace
