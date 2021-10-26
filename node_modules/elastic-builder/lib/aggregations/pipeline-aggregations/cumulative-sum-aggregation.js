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

var ES_REF_URL = 'https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-pipeline-cumulative-sum-aggregation.html';

/**
 * A parent pipeline aggregation which calculates the cumulative sum of
 * a specified metric in a parent histogram (or date_histogram) aggregation.
 * The specified metric must be numeric and the enclosing histogram must
 * have min_doc_count set to 0 (default for histogram aggregations).
 *
 * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-pipeline-cumulative-sum-aggregation.html)
 *
 * @example
 * const reqBody = esb.requestBodySearch()
 *     .agg(
 *         esb.dateHistogramAggregation('sales_per_month', 'date', 'month')
 *             .agg(esb.sumAggregation('sales', 'price'))
 *             .agg(esb.cumulativeSumAggregation('cumulative_sales', 'sales'))
 *     )
 *     .size(0);
 *
 * @param {string} name The name which will be used to refer to this aggregation.
 * @param {string=} bucketsPath The relative path of metric to aggregate over
 *
 * @extends PipelineAggregationBase
 */

var CumulativeSumAggregation = function (_PipelineAggregationB) {
    (0, _inherits3.default)(CumulativeSumAggregation, _PipelineAggregationB);

    // eslint-disable-next-line require-jsdoc
    function CumulativeSumAggregation(name, bucketsPath) {
        (0, _classCallCheck3.default)(this, CumulativeSumAggregation);
        return (0, _possibleConstructorReturn3.default)(this, (CumulativeSumAggregation.__proto__ || Object.getPrototypeOf(CumulativeSumAggregation)).call(this, name, 'cumulative_sum', ES_REF_URL, bucketsPath));
    }

    /**
     * @override
     * @throws {Error} This method cannot be called on CumulativeSumAggregation
     */


    (0, _createClass3.default)(CumulativeSumAggregation, [{
        key: 'gapPolicy',
        value: function gapPolicy() {
            console.log('Please refer ' + ES_REF_URL);
            throw new Error('gapPolicy is not supported in CumulativeSumAggregation');
        }
    }]);
    return CumulativeSumAggregation;
}(PipelineAggregationBase);

module.exports = CumulativeSumAggregation;