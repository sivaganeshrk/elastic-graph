'use strict';

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PipelineAggregationBase = require('./pipeline-aggregation-base');

var ES_REF_URL = 'https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-pipeline-avg-bucket-aggregation.html';

/**
 * A sibling pipeline aggregation which calculates the (mean) average value
 * of a specified metric in a sibling aggregation. The specified metric must
 * be numeric and the sibling aggregation must be a multi-bucket aggregation.
 *
 * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-pipeline-avg-bucket-aggregation.html)
 *
 * @example
 * const reqBody = esb.requestBodySearch()
 *     .agg(
 *         esb.dateHistogramAggregation('sales_per_month', 'date')
 *             .interval('month')
 *             .agg(esb.sumAggregation('sales', 'price'))
 *     )
 *     .agg(
 *         esb.avgBucketAggregation(
 *             'avg_monthly_sales',
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

var AvgBucketAggregation = function (_PipelineAggregationB) {
    (0, _inherits3.default)(AvgBucketAggregation, _PipelineAggregationB);

    // eslint-disable-next-line require-jsdoc
    function AvgBucketAggregation(name, bucketsPath) {
        (0, _classCallCheck3.default)(this, AvgBucketAggregation);
        return (0, _possibleConstructorReturn3.default)(this, (AvgBucketAggregation.__proto__ || Object.getPrototypeOf(AvgBucketAggregation)).call(this, name, 'avg_bucket', ES_REF_URL, bucketsPath));
    }

    return AvgBucketAggregation;
}(PipelineAggregationBase);

module.exports = AvgBucketAggregation;