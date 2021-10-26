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
 * Returns matches which enclose another span query. The span containing query
 * maps to Lucene `SpanContainingQuery`.
 *
 * Matching spans from big that contain matches from little are returned.
 *
 * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-span-containing-query.html)
 *
 * @example
 * const spanQry = esb.spanContainingQuery()
 *     .little(esb.spanTermQuery('field1', 'foo'))
 *     .big(esb.spanNearQuery()
 *         .clauses([
 *             esb.spanTermQuery('field1', 'bar'),
 *             esb.spanTermQuery('field1', 'baz')
 *         ])
 *         .slop(5)
 *         .inOrder(true))
 *
 * @extends SpanLittleBigQueryBase
 */

var SpanContainingQuery = function (_SpanLittleBigQueryBa) {
    (0, _inherits3.default)(SpanContainingQuery, _SpanLittleBigQueryBa);

    // eslint-disable-next-line require-jsdoc
    function SpanContainingQuery() {
        (0, _classCallCheck3.default)(this, SpanContainingQuery);
        return (0, _possibleConstructorReturn3.default)(this, (SpanContainingQuery.__proto__ || Object.getPrototypeOf(SpanContainingQuery)).call(this, 'span_containing'));
    }

    return SpanContainingQuery;
}(SpanLittleBigQueryBase);

module.exports = SpanContainingQuery;