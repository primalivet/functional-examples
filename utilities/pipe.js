const pipe = (...fs) => x => fs.reduce((y, f) => f(y), x)

module.exports = pipe
