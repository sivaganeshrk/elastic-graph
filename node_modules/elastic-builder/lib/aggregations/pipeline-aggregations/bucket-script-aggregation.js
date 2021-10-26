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

var PipelineAggregationBase = require('./pipeline-aggregation-base');

var ES_REF_URL = 'https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-pipeline-bucket-script-aggregation.html';

/**
 * A parent pipeline aggregation which executes a script which can perform
 * per bucket computations on specified metrics in the parent multi-bucket
 * aggregation. The specified metric must be numeric and the script must
 * return a numeric value.
 *
 * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-pipeline-bucket-script-aggregation.html)
 *
 * @example
 * const reqBody = esb.requestBodySearch()
 *     .agg(
 *         esb.dateHistogramAggregation('sales_per_month', 'date', 'month')
 *             .agg(esb.sumAggregation('total_sales', 'price'))
 *             .agg(
 *                 esb.filterAggregation('t-shirts')
 *                     .filter(esb.termQuery('type', 't-shirt'))
 *                     .agg(esb.sumAggregation('sales', 'price'))
 *             )
 *             .agg(
 *                 esb.bucketScriptAggregation('t-shirt-percentage')
 *                     .bucketsPath({
 *                         tShirtSales: 't-shirts>sales',
 *                         totalSales: 'total_sales'
 *                     })
 *                     .script('params.tShirtSales / params.totalSales * 100')
 *             )
 *     )
 *     .size(0);
 *
 * @param {string} name The name which will be used to refer to this aggregation.
 * @param {string=} bucketsPath The relative path of metric to aggregate over
 *
 * @extends PipelineAggregationBase
 */

var BucketScriptAggregation = function (_PipelineAggregationB) {
    (0, _inherits3.default)(BucketScriptAggregation, _PipelineAggregationB);

    // eslint-disable-next-line require-jsdoc
    function BucketScriptAggregation(name, bucketsPath) {
        (0, _classCallCheck3.default)(this, BucketScriptAggregation);
        return (0, _possibleConstructorReturn3.default)(this, (BucketScriptAggregation.__proto__ || Object.getPrototypeOf(BucketScriptAggregation)).call(this, name, 'bucket_script', ES_REF_URL, bucketsPath));
    }

    /**
     * Sets script parameter for aggregation.
     *
     * @param {Script|string} script
     * @returns {BucketScriptAggregation} returns `this` so that calls can be chained
     * @throws {TypeError} If `script` is not an instance of `Script`
     */


    (0, _createClass3.default)(BucketScriptAggregation, [{
        key: 'script',
        value: function script(_script) {
            this._aggsDef.script = _script;
            return this;
        }
    }]);
    return BucketScriptAggregation;
}(PipelineAggregationBase);

module.exports = BucketScriptAggregation;