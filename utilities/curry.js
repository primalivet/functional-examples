const curry = fn => (...x) =>
  x.length >= fn.length ? fn(...x) : (...y) => curry(fn)(...x, ...y)

module.exports = curry
