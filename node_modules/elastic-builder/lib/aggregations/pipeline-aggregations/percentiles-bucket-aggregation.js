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

var PipelineAggregationBase = require('./pipeline-aggregation-base');

var ES_REF_URL = 'https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-pipeline-percentiles-bucket-aggregation.html';

/**
 * A sibling pipeline aggregation which calculates percentiles across all
 * bucket of a specified metric in a sibling aggregation. The specified
 * metric must be numeric and the sibling aggregation must be a multi-bucket
 * aggregation.
 *
 * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-pipeline-percentiles-bucket-aggregation.html)
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
 *         esb.percentilesBucketAggregation(
 *             'percentiles_monthly_sales',
 *             'sales_per_month>sales'
 *         ).percents([25.0, 50.0, 75.0])
 *     )
 *     .size(0);
 *
 * @param {string} name The name which will be used to refer to this aggregation.
 * @param {string=} bucketsPath The relative path of metric to aggregate over
 *
 * @extends PipelineAggregationBase
 */

var PercentilesBucketAggregation = function (_PipelineAggregationB) {
    (0, _inherits3.default)(PercentilesBucketAggregation, _PipelineAggregationB);

    // eslint-disable-next-line require-jsdoc
    function PercentilesBucketAggregation(name, bucketsPath) {
        (0, _classCallCheck3.default)(this, PercentilesBucketAggregation);
        return (0, _possibleConstructorReturn3.default)(this, (PercentilesBucketAggregation.__proto__ || Object.getPrototypeOf(PercentilesBucketAggregation)).call(this, name, 'percentiles_bucket', ES_REF_URL, bucketsPath));
    }

    /**
     * Sets the list of percentiles to calculate
     *
     * @param {Array<number>} percents The list of percentiles to calculate
     * @returns {PercentilesBucketAggregation} returns `this` so that calls can be chained
     */


    (0, _createClass3.default)(PercentilesBucketAggregation, [{
        key: 'percents',
        value: function percents(_percents) {
            checkType(_percents, Array);

            this._aggsDef.percents = _percents;
            return this;
        }
    }]);
    return PercentilesBucketAggregation;
}(PipelineAggregationBase);

module.exports = PercentilesBucketAggregation;