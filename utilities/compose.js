const compose = (...fs) => x => fs.reduceRight((y, f) => f(y), x)

module.exports = compose
