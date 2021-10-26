'use strict';

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _require = require('util'),
    inspect = _require.inspect;

var isEmpty = require('lodash.isempty'),
    isNil = require('lodash.isnil'),
    isString = require('lodash.isstring'),
    isObject = require('lodash.isobject'),
    hasIn = require('lodash.hasin');

var has = require('lodash.has');

/**
 * Check if the object is instance of class type
 *
 * @private
 * @param {Object} instance
 * @param {Class} type
 * @throws {TypeError} Object must be an instance of class type
 */
exports.checkType = function checkType(instance, type) {
    if (!(instance instanceof type)) {
        if (isNil(instance)) {
            console.warn('Was expecting instance of ' + type.name + ' but got ' + instance + '!');
        } else console.warn(inspect(instance) + ' is of the type ' + (typeof instance === 'undefined' ? 'undefined' : (0, _typeof3.default)(instance)));

        throw new TypeError('Argument must be an instance of ' + type.name);
    }
};

/**
 * Wrapper for calling constructor with given parameters
 *
 * @private
 * @param {function(new:T, ...*)} Cls The class constructor.
 * @returns {function(...*): T} Wrapper of the class constructor which creates an instance of given Class
 * @template T
 */
exports.constructorWrapper = function constructorWrapper(Cls) {
    return function () {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return new (Function.prototype.bind.apply(Cls, [null].concat(args)))();
    };
};

/**
 * Check if the number is in the given range.
 * Returns `true` is number is less than or equal to min, max.
 *
 * @private
 * @param {number} num
 * @param {number} min
 * @param {number} max
 * @returns {boolean} `true` if in range, `false` otherwise
 */
function between(num, min, max) {
    return num >= min && num <= max;
}

/**
 * Finds and returns the first position of first digit in string
 *
 * @private
 * @param {string} str
 * @returns {number} Index of first digit in string.
 * `-1` if digit is not found in string
 */
exports.firstDigitPos = function firstDigitPos(str) {
    if (isEmpty(str)) return -1;

    var len = str.length;
    for (var idx = 0; idx < len; idx++) {
        // '0'.charCodeAt(0) => 48
        // '9'.charCodeAt(0) => 57
        if (between(str.charCodeAt(idx), 48, 57)) return idx;
    }

    return -1;
};

/**
 * Convert class object to JSON by recursively calling `toJSON` on the class members.
 *
 * @private
 * @param {*} obj
 * @returns {Object} JSON representation of class.
 */
exports.recursiveToJSON = function recursiveToJSON(obj) {
    // Strings, numbers, booleans
    if (!isObject(obj)) return obj;

    // Each element in array needs to be recursively JSONified
    if (Array.isArray(obj)) return obj.map(function (x) {
        return recursiveToJSON(x);
    });

    // If it is a native object, we'll not get anything different by calling toJSON
    // If it is a custom object, toJSON needs to be called
    // Custom object toJSON might return any datatype
    // So let us handle it recursively
    if (hasIn(obj, 'toJSON') && obj.constructor !== Object) {
        return recursiveToJSON(obj.toJSON());
    }

    // Custom object toJSON or native object might have values which need to be JSONified
    var json = {};
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = Object.keys(obj)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var key = _step.value;

            json[key] = recursiveToJSON(obj[key]);
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }

    return json;
};

/**
 * Helper function for creating function which will log warning and throw error
 * on receiving invalid parameter
 *
 * @private
 * @param {string} refUrl
 * @param {string} paramName
 * @param {*} validValues
 * @returns {function}
 */
exports.invalidParam = function invalidParam(refUrl, paramName, validValues) {
    return function (paramVal) {
        var referenceUrl = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : refUrl;

        referenceUrl && console.log('See ' + referenceUrl);
        console.warn('Got \'' + paramName + '\' - \'' + paramVal + '\'');

        var validValuesStr = isString(validValues) ? validValues : inspect(validValues);
        throw new Error('The \'' + paramName + '\' parameter should be one of ' + validValuesStr);
    };
};

/**
 * Set given default value on object if key is not present.
 *
 * @private
 * @param {Object} obj
 * @param {string} key
 * @param {*} value
 * @returns {boolean} `true` if the given object did not have `key` and `false` otherwise.
 */
exports.setDefault = function setDefault(obj, key, value) {
    var itHasNot = !has(obj, key);
    if (itHasNot) obj[key] = value;
    return itHasNot;
};