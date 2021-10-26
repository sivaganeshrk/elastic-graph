'use strict';

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var HistogramAggregationBase = require('./histogram-aggregation-base');

/**
 * A multi-bucket values source based aggregation that can be applied on
 * numeric values extracted from the documents. It dynamically builds fixed
 * size (a.k.a. interval) buckets over the values.
 *
 * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-histogram-aggregation.html)
 *
 * @param {string} name The name which will be used to refer to this aggregation.
 * @param {string=} field The field to aggregate on
 * @param {number=} interval Interval to generate histogram over.
 *
 * @example
 * const agg = esb.histogramAggregation('prices', 'price', 50);
 *
 * @example
 * const agg = esb.histogramAggregation('prices', 'price', 50).minDocCount(1);
 *
 * @example
 * const agg = esb.histogramAggregation('prices', 'price', 50)
 *     .extendedBounds(0, 500);
 *
 * @example
 * const agg = esb.histogramAggregation('quantity', 'quantity', 10).missing(0);
 *
 * @extends HistogramAggregationBase
 */

var HistogramAggregation = function (_HistogramAggregation) {
    (0, _inherits3.default)(HistogramAggregation, _HistogramAggregation);

    // eslint-disable-next-line require-jsdoc
    function HistogramAggregation(name, field, interval) {
        (0, _classCallCheck3.default)(this, HistogramAggregation);
        return (0, _possibleConstructorReturn3.default)(this, (HistogramAggregation.__proto__ || Object.getPrototypeOf(HistogramAggregation)).call(this, name, 'histogram', field, interval));
    }

    return HistogramAggregation;
}(HistogramAggregationBase);

module.exports = HistogramAggregation;