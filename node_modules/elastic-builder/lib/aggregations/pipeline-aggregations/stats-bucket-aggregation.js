'use strict';

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PipelineAggregationBase = require('./pipeline-aggregation-base');

var ES_REF_URL = 'https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-pipeline-stats-bucket-aggregation.html';

/**
 * A sibling pipeline aggregation which calculates a variety of stats across
 * all bucket of a specified metric in a sibling aggregation. The specified
 * metric must be numeric and the sibling aggregation must be a multi-bucket
 * aggregation.
 *
 * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-pipeline-stats-bucket-aggregation.html)
 *
 * @example
 * const reqBody = esb.requestBodySearch()
 *     .agg(
 *         esb.dateHistogramAggregation('sales_per_month', 'date')
 *             .interval('month')
 *             .agg(esb.sumAggregation('sales', 'price'))
 *     )
 *     .agg(
 *         // Calculates stats for monthly sales
 *         esb.statsBucketAggregation(
 *             'stats_monthly_sales',
 *             'sales_per_month>sales'
 *         )
 *     )
 *     .size(0);
 *
 * @param {string} name The name which will be used to refer to this aggregation.
 * @param {string=} bucketsPath The relative path of metric to aggregate over
 *
 * @extends PipelineAggregationBase
 */

var StatsBucketAggregation = function (_PipelineAggregationB) {
    (0, _inherits3.default)(StatsBucketAggregation, _PipelineAggregationB);

    // eslint-disable-next-line require-jsdoc
    function StatsBucketAggregation(name, bucketsPath) {
        (0, _classCallCheck3.default)(this, StatsBucketAggregation);
        return (0, _possibleConstructorReturn3.default)(this, (StatsBucketAggregation.__proto__ || Object.getPrototypeOf(StatsBucketAggregation)).call(this, name, 'stats_bucket', ES_REF_URL, bucketsPath));
    }

    return StatsBucketAggregation;
}(PipelineAggregationBase);

module.exports = StatsBucketAggregation;