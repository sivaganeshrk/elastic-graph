'use strict';

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SpanLittleBigQueryBase = require('./span-little-big-query-base');

/**
 * Returns matches which are enclosed inside another span query. The span within
 * query maps to Lucene `SpanWithinQuery`.
 *
 * Matching spans from `little` that are enclosed within `big` are returned.
 *
 * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-span-containing-query.html)
 *
 * @example
 * const spanQry = esb.spanWithinQuery()
 *     .little(esb.spanTermQuery('field1', 'foo'))
 *     .big(esb.spanNearQuery()
 *         .clauses([
 *             esb.spanTermQuery('field1', 'bar'),
 *             esb.spanTermQuery('field1', 'baz')
 *         ])
 *         .slop(5)
 *         .inOrder(true));
 *
 * @extends SpanLittleBigQueryBase
 */

var SpanWithinQuery = function (_SpanLittleBigQueryBa) {
    (0, _inherits3.default)(SpanWithinQuery, _SpanLittleBigQueryBa);

    // eslint-disable-next-line require-jsdoc
    function SpanWithinQuery() {
        (0, _classCallCheck3.default)(this, SpanWithinQuery);
        return (0, _possibleConstructorReturn3.default)(this, (SpanWithinQuery.__proto__ || Object.getPrototypeOf(SpanWithinQuery)).call(this, 'span_within'));
    }

    return SpanWithinQuery;
}(SpanLittleBigQueryBase);

module.exports = SpanWithinQuery;