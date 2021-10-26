'use strict';

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isEmpty = require('lodash.isempty');
var isNil = require('lodash.isnil');

var _require = require('../../../core'),
    _require$util = _require.util,
    invalidParam = _require$util.invalidParam,
    recursiveToJSON = _require$util.recursiveToJSON;

var invalidOrderParam = invalidParam('', 'order', "'asc' or 'desc'");

/**
 * Base class implementation for all Composite Aggregation values sources.
 *
 * **NOTE:** Instantiating this directly should not be required.
 *
 * @param {string} valueSrcType Type of value source
 * @param {string} refUrl Elasticsearch reference URL
 * @param {string} name
 * @param {string=} field The field to aggregate on
 *
 * @throws {Error} if `name` is empty
 * @throws {Error} if `valueSrcType` is empty
 */

var ValuesSourceBase = function () {
    // eslint-disable-next-line require-jsdoc
    function ValuesSourceBase(valueSrcType, refUrl, name, field) {
        (0, _classCallCheck3.default)(this, ValuesSourceBase);

        if (isEmpty(valueSrcType)) throw new Error('ValuesSourceBase `valueSrcType` cannot be empty');

        this._name = name;
        this._valueSrcType = valueSrcType;
        this._refUrl = refUrl;

        this._body = {};
        this._opts = this._body[valueSrcType] = {};

        if (!isNil(field)) this._opts.field = field;
    }

    /**
     * Field to use for this source.
     *
     * @param {string} field a valid field name
     * @returns {ValuesSourceBase} returns `this` so that calls can be chained
     */


    (0, _createClass3.default)(ValuesSourceBase, [{
        key: 'field',
        value: function field(_field) {
            this._opts.field = _field;
            return this;
        }

        /**
         * Script to use for this source.
         *
         * @param {Script|Object|string} script
         * @returns {ValuesSourceBase} returns `this` so that calls can be chained
         * @throws {TypeError} If `script` is not an instance of `Script`
         */

    }, {
        key: 'script',
        value: function script(_script) {
            this._opts.script = _script;
            return this;
        }

        /**
         * Specifies the type of values produced by this source, e.g. `string` or
         * `date`.
         *
         * @param {string} valueType
         * @returns {ValuesSourceBase} returns `this` so that calls can be chained
         */

    }, {
        key: 'valueType',
        value: function valueType(_valueType) {
            this._opts.value_type = _valueType;
            return this;
        }

        /**
         * Order specifies the order in the values produced by this source. It can
         * be either `asc` or `desc`.
         *
         * @param {string} order The `order` option can have the following values.
         * `asc`, `desc` to sort in ascending, descending order respectively.
         * @returns {ValuesSourceBase} returns `this` so that calls can be chained.
         */

    }, {
        key: 'order',
        value: function order(_order) {
            if (isNil(_order)) invalidOrderParam(_order, this._refUrl);

            var orderLower = _order.toLowerCase();
            if (orderLower !== 'asc' && orderLower !== 'desc') {
                invalidOrderParam(_order, this._refUrl);
            }

            this._opts.order = orderLower;
            return this;
        }

        /**
         * Missing specifies the value to use when the source finds a missing value
         * in a document.
         *
         * Note: This option was deprecated in
         * [Elasticsearch v6](https://www.elastic.co/guide/en/elasticsearch/reference/6.8/breaking-changes-6.0.html#_literal_missing_literal_is_deprecated_in_the_literal_composite_literal_aggregation).
         * From 6.4 and later, use `missing_bucket` instead.
         *
         * @param {string|number} value
         * @returns {ValuesSourceBase} returns `this` so that calls can be chained
         */

    }, {
        key: 'missing',
        value: function missing(value) {
            this._opts.missing = value;
            return this;
        }

        /**
         * Specifies whether to include documents without a value for a given source
         * in the response. Defaults to `false` (not included).
         *
         * Note: This method is incompatible with elasticsearch 6.3 and older.
         * Use it only with elasticsearch 6.4 and later.
         *
         * @param {boolean} value
         * @returns {ValuesSourceBase} returns `this` so that calls can be chained
         */

    }, {
        key: 'missingBucket',
        value: function missingBucket(value) {
            this._opts.missing_bucket = value;
            return this;
        }

        /**
         * Override default `toJSON` to return DSL representation for the Composite
         * Aggregation values source.
         *
         * @override
         * @returns {Object} returns an Object which maps to the elasticsearch query DSL
         */

    }, {
        key: 'toJSON',
        value: function toJSON() {
            return (0, _defineProperty3.default)({}, this._name, recursiveToJSON(this._body));
        }
    }]);
    return ValuesSourceBase;
}();

module.exports = ValuesSourceBase;