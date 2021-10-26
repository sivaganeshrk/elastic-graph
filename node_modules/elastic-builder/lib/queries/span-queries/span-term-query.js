'use strict';

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var has = require('lodash.has');
var isNil = require('lodash.isnil');

var SpanQueryBase = require('./span-query-base');

/**
 * Matches spans containing a term. The span term query maps to Lucene `SpanTermQuery`.
 *
 * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-span-term-query.html)
 *
 * @example
 * const qry = esb.spanTermQuery('user', 'kimchy');
 *
 * @example
 * const qry = esb.spanTermQuery()
 *     .field('user')
 *     .value('kimchy')
 *     .boost(2.0);
 *
 * @param {string=} field The document field to query against
 * @param {string|number=} value The query string
 *
 * @extends SpanQueryBase
 */

var SpanTermQuery = function (_SpanQueryBase) {
    (0, _inherits3.default)(SpanTermQuery, _SpanQueryBase);

    // This is extremely similar to ValueTermQueryBase
    // Maybe rename, move and reuse it?

    // eslint-disable-next-line require-jsdoc
    function SpanTermQuery(field, value) {
        (0, _classCallCheck3.default)(this, SpanTermQuery);

        var _this = (0, _possibleConstructorReturn3.default)(this, (SpanTermQuery.__proto__ || Object.getPrototypeOf(SpanTermQuery)).call(this, 'span_term'));

        if (!isNil(field)) _this._field = field;
        if (!isNil(value)) _this._queryOpts.value = value;
        return _this;
    }

    /**
     * Sets the field to search on.
     *
     * @param {string} field
     * @returns {SpanTermQuery} returns `this` so that calls can be chained.
     */


    (0, _createClass3.default)(SpanTermQuery, [{
        key: 'field',
        value: function field(_field) {
            this._field = _field;
            return this;
        }

        /**
         * Sets the query string.
         *
         * @param {string|number} queryVal
         * @returns {SpanTermQuery} returns `this` so that calls can be chained.
         */

    }, {
        key: 'value',
        value: function value(queryVal) {
            this._queryOpts.value = queryVal;
            return this;
        }

        /**
         * Override default `toJSON` to return DSL representation of the Span term query
         * class instance.
         *
         * @override
         * @returns {Object} returns an Object which maps to the elasticsearch query DSL
         */

    }, {
        key: 'toJSON',
        value: function toJSON() {
            // recursiveToJSON doesn't seem to be required here.

            // Revisit this.. Smells a little bit
            if (!has(this._queryOpts, 'value')) {
                throw new Error('Value is required for Span term query!');
            }

            var qryOpts = Object.keys(this._queryOpts).length === 1 ? this._queryOpts.value : this._queryOpts;
            return (0, _defineProperty3.default)({}, this.queryType, (0, _defineProperty3.default)({}, this._field, qryOpts));
        }
    }]);
    return SpanTermQuery;
}(SpanQueryBase);

module.exports = SpanTermQuery;