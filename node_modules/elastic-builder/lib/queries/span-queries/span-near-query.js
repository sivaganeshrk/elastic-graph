'use strict';

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _require = require('../../core'),
    checkType = _require.util.checkType;

var SpanQueryBase = require('./span-query-base');

/**
 * Matches spans which are near one another. One can specify `slop`, the maximum
 * number of intervening unmatched positions, as well as whether matches are
 * required to be in-order. The span near query maps to Lucene `SpanNearQuery`.
 *
 * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-span-near-query.html)
 *
 * @example
 * const spanQry = esb.spanNearQuery()
 *     .clauses([
 *         esb.spanTermQuery('field', 'value1'),
 *         esb.spanTermQuery('field', 'value2'),
 *         esb.spanTermQuery('field', 'value3')
 *     ])
 *     .slop(12)
 *     .inOrder(false);
 *
 * @extends SpanQueryBase
 */

var SpanNearQuery = function (_SpanQueryBase) {
    (0, _inherits3.default)(SpanNearQuery, _SpanQueryBase);

    // eslint-disable-next-line require-jsdoc
    function SpanNearQuery() {
        (0, _classCallCheck3.default)(this, SpanNearQuery);
        return (0, _possibleConstructorReturn3.default)(this, (SpanNearQuery.__proto__ || Object.getPrototypeOf(SpanNearQuery)).call(this, 'span_near'));
    }

    /**
     * Sets the clauses element which is a list of one or more other span type queries.
     *
     * @param {Array<SpanQueryBase>} clauses
     * @returns {SpanNearQuery} returns `this` so that calls can be chained.
     * @throws {TypeError} If parameter `clauses` is not an instance of Array or if
     * any member of the array is not an instance of `SpanQueryBase`.
     */


    (0, _createClass3.default)(SpanNearQuery, [{
        key: 'clauses',
        value: function clauses(_clauses) {
            checkType(_clauses, Array);
            _clauses.forEach(function (clause) {
                return checkType(clause, SpanQueryBase);
            });

            this._queryOpts.clauses = _clauses;
            return this;
        }

        /**
         * Configures the `slop`(default is 0), the maximum number of intervening
         * unmatched positions permitted.
         *
         * @param {number} slop A positive integer value, defaults is 0.
         * @returns {SpanNearQuery} returns `this` so that calls can be chained.
         */

    }, {
        key: 'slop',
        value: function slop(_slop) {
            this._queryOpts.slop = _slop;
            return this;
        }

        // TODO: Add documentation for inOrder

        /**
         *
         * @param {boolean} enable
         * @returns {SpanNearQuery} returns `this` so that calls can be chained.
         */

    }, {
        key: 'inOrder',
        value: function inOrder(enable) {
            this._queryOpts.in_order = enable;
            return this;
        }
    }]);
    return SpanNearQuery;
}(SpanQueryBase);

module.exports = SpanNearQuery;