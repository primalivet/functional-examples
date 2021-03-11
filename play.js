console.clear ();

const { map, compose, fork, LazyPromise, Maybe } = require ('./')

////////////////////////////////////////////////////////////////////////////////
// Dummies
////////////////////////////////////////////////////////////////////////////////

	const identityDelayed = x => {
		console.log ('get called')
		return new Promise ((res) => setTimeout (()=> res (x),2000))
	}

const inc = (x) => {
	console.log ('inc called')
	return new Promise ((res) =>
		setTimeout (()=> res (x+1),2000))
}

const double = (x) => {
	console.log ('double called')
	return new Promise ((res) =>
		setTimeout (()=> res (x*2),2000))
}

const half = x => {
	console.log ('half called')
	return x / 2
}

const error = () => {
	console.log ('error called')
	return new Promise ((_, rej) =>
		setTimeout (()=> rej ('an error'),1000))
}

const app = compose (
	map (half),
	map (inc),
	map (error),
	map (double)
) (LazyPromise (() => identityDelayed (250)))


// app.fork (
// 	(error) => console.error ({
// 		alt: 2,
// 		error,
// 		message: 'An error occured while starting the app'
// 	}),
// 	(value) => console.log ({
// 		alt: 2,
// 		value,
// 		message: 'Successfully started the app'
// 	})
// )

// Predicates for primitive types
// ----------------------------------------------------------------------------

// isNull :: a -> Bool
const isNull = x => (x === null)

// isUndefined :: a -> Bool
const isUndefined = x => typeof x === 'undefined'

// isBoolean :: a -> Bool
const isBoolean = x => typeof x === 'boolean'

// isString :: a -> Bool
const isString = x => typeof x === 'string'

// isNumber :: a -> Bool
const isNumber = x => typeof x === 'number'

// isInteger :: a -> Bool
const isInteger = x => typeof x === 'number' && (Number.isInteger (x) && !isNaN (x))

// isFloat :: a -> Bool
const isFloat = x => typeof x === 'number' && !isInteger (x) && !isNaN (x)

// isBigInteger :: a -> Bool
const isBigInteger = x => typeof x === 'bigint'

// isNaN :: a -> Bool
// Native in Javascript

// Predicates for complex types
// ----------------------------------------------------------------------------

// isObject :: a -> Bool
const isObject = x => ((!!x) && x.toString () === '[object Object]')

// isDate :: a -> Bool
const isDate = x => x instanceof Date && Object.prototype.toString.call (x) === '[object Date]'

// isArray :: a -> Bool
const isArray = x => Array.isArray (x)

// isFunction :: a -> Bool
const isFunction = x =>  typeof x === 'function'

// isMap :: a -> Bool
const isMap = x => ((!!x) && x.toString () === '[object Map]')

// isSet :: a -> Bool
const isSet = x => ((!!x) && x.toString () === '[object Set]')

// Get Properties
// ----------------------------------------------------------------------------

// length :: a -> Int
const length = x => {
	if (isArray (x) || isString (x)) {
		return x.length
	} else if (isObject (x)) {
		return Object.keys (x).length
	} else if (isMap (x) || isSet (x)) {
		return x.size
	} else {
		return 0
	}
}

// type :: a -> String
const type = x => {
	if (isBoolean (x)) {
		return 'Boolean'
	} else if (isNull (x)) {
		return 'Null'
	} else if (isDate (x)) {
		return 'Date'
	} else if (isUndefined (x)) {
		return 'Undefined'
	} else if (isString (x)) {
		return 'String'
	} else if (isFunction (x)) {
		return 'Function'
	} else if (isSet (x)) {
		return 'Set'
	} else if (isMap (x)) {
		return 'Map'
	} else if (isObject (x)) {
		return 'Object'
	} else if (isArray (x)) {
		return 'Array'
	} else if (isBigInteger (x)) {
		return 'BigInteger'
	} else if (isInteger (x)) {
		return 'Integer'
	} else if (isFloat (x)){
		return 'Float'
	} else if (isNumber (x) && isNaN (x)) {
		return 'NaN'
	} else {
		return 'Unknown'
	}
}

// console.log (
// 	'\n type ---\n',
// 	type (new Map ()),
// 	type (new Set ()),
// 	type (() => false),
// 	type (new Date ()),
// 	type ({}),
// 	type ({x: 'y', a: 'b'}),
// 	type ([]),
// 	type ('ad'),
// 	type ('adsdasdasdasdasdasd'),
// 	type (true),
// 	type (false),
// 	type (null),
// 	type (1),
// 	type (0.4),
// 	type (BigInt (9007199254740991)),
// 	type (NaN),
// 	type (undefined),
// 	type (),
// 	'\n length ---\n',
// 	length (new Map ([['key1', 'value1'], ['key2', 'value2']])),
// 	length (new Map ()),
// 	length (new Set ([['key1', 'value1'], ['key2', 'value2']])),
// 	length (new Set ()),
// 	length (() => false),
// 	length  (new Date ()),
// 	length  ({}),
// 	length ({x: 'y', a: 'b'}),
// 	length  ([]),
// 	length  ([1,2,3]),
// 	length  ([1]),
// 	length  ('ad'),
// 	length ('adsdasdasdasdasdasd'),
// 	length  (true),
// 	length  (false),
// 	length  (null),
// 	length  (1),
// 	length  (0.4),
// 	length  (BigInt (9007199254740991)),
// 	length  (NaN),
// 	length  (undefined),
// 	length  (),
// 	'\n ---\n'
// )

