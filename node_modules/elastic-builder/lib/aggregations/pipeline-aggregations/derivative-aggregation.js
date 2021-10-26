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

var ES_REF_URL = 'https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-pipeline-derivative-aggregation.html';

/**
 * A parent pipeline aggregation which calculates the derivative of a
 * specified metric in a parent histogram (or date_histogram) aggregation.
 * The specified metric must be numeric and the enclosing histogram must
 * have min_doc_count set to 0 (default for histogram aggregations).
 *
 * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-pipeline-derivative-aggregation.html)
 *
 * @example
 * const reqBody = esb.requestBodySearch()
 *     .agg(
 *         esb.dateHistogramAggregation('sales_per_month', 'date')
 *             .interval('month')
 *             .agg(esb.sumAggregation('sales', 'price'))
 *             .agg(esb.derivativeAggregation('sales_deriv', 'sales'))
 *     )
 *     .size(0);
 *
 * @example
 * // First and second order derivative of the monthly sales
 * const reqBody = esb.requestBodySearch()
 *     .agg(
 *         esb.dateHistogramAggregation('sales_per_month', 'date')
 *             .interval('month')
 *             .agg(esb.sumAggregation('sales', 'price'))
 *             .agg(esb.derivativeAggregation('sales_deriv', 'sales'))
 *             .agg(esb.derivativeAggregation('sales_2nd_deriv', 'sales_deriv'))
 *     )
 *     .size(0);
 *
 * @param {string} name The name which will be used to refer to this aggregation.
 * @param {string=} bucketsPath The relative path of metric to aggregate over
 *
 * @extends PipelineAggregationBase
 */

var DerivativeAggregation = function (_PipelineAggregationB) {
    (0, _inherits3.default)(DerivativeAggregation, _PipelineAggregationB);

    // eslint-disable-next-line require-jsdoc
    function DerivativeAggregation(name, bucketsPath) {
        (0, _classCallCheck3.default)(this, DerivativeAggregation);
        return (0, _possibleConstructorReturn3.default)(this, (DerivativeAggregation.__proto__ || Object.getPrototypeOf(DerivativeAggregation)).call(this, name, 'derivative', ES_REF_URL, bucketsPath));
    }

    /**
     * Set the units of the derivative values. `unit` specifies what unit to use for
     * the x-axis of the derivative calculation
     *
     * @example
     * const reqBody = esb.requestBodySearch()
     *     .agg(
     *         esb.dateHistogramAggregation('sales_per_month', 'date')
     *             .interval('month')
     *             .agg(esb.sumAggregation('sales', 'price'))
     *             .agg(esb.derivativeAggregation('sales_deriv', 'sales').unit('day'))
     *     )
     *     .size(0);
     *
     * @param {string} unit `unit` specifies what unit to use for
     * the x-axis of the derivative calculation
     * @returns {DerivativeAggregation} returns `this` so that calls can be chained
     */


    (0, _createClass3.default)(DerivativeAggregation, [{
        key: 'unit',
        value: function unit(_unit) {
            this._aggsDef.unit = _unit;
            return this;
        }
    }]);
    return DerivativeAggregation;
}(PipelineAggregationBase);

module.exports = DerivativeAggregation;