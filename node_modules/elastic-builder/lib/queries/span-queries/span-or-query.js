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
 * Matches the union of its span clauses. The span or query maps to Lucene `SpanOrQuery`.
 *
 * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-span-or-query.html)
 *
 * @example
 * const spanQry = esb.spanOrQuery()
 *     .clauses([
 *         esb.spanTermQuery('field', 'value1'),
 *         esb.spanTermQuery('field', 'value2'),
 *         esb.spanTermQuery('field', 'value3')
 *     ]);
 *
 * @extends SpanQueryBase
 */

var SpanOrQuery = function (_SpanQueryBase) {
    (0, _inherits3.default)(SpanOrQuery, _SpanQueryBase);

    // eslint-disable-next-line require-jsdoc
    function SpanOrQuery() {
        (0, _classCallCheck3.default)(this, SpanOrQuery);
        return (0, _possibleConstructorReturn3.default)(this, (SpanOrQuery.__proto__ || Object.getPrototypeOf(SpanOrQuery)).call(this, 'span_or'));
    }

    /**
     * Sets the clauses element which is a list of one or more other span type queries.
     *
     * @param {Array<SpanQueryBase>} clauses
     * @returns {SpanOrQuery} returns `this` so that calls can be chained.
     * @throws {TypeError} If parameter `clauses` is not an instance of Array or if
     * any member of the array is not an instance of `SpanQueryBase`.
     */


    (0, _createClass3.default)(SpanOrQuery, [{
        key: 'clauses',
        value: function clauses(_clauses) {
            checkType(_clauses, Array);
            _clauses.forEach(function (clause) {
                return checkType(clause, SpanQueryBase);
            });

            this._queryOpts.clauses = _clauses;
            return this;
        }
    }]);
    return SpanOrQuery;
}(SpanQueryBase);

module.exports = SpanOrQuery;