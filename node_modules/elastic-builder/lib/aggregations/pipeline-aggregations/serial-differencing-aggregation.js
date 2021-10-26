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

var ES_REF_URL = 'https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-pipeline-serialdiff-aggregation.html';

/**
 * Serial differencing is a technique where values in a time series are
 * subtracted from itself at different time lags or periods.
 *
 * Serial differences are built by first specifying a `histogram` or `date_histogram` over a field.
 *
 * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-pipeline-serialdiff-aggregation.html)
 *
 * @example
 * const reqBody = esb.requestBodySearch()
 *     .agg(
 *         esb.dateHistogramAggregation('my_date_histo', 'timestamp')
 *             .interval('day')
 *             .agg(esb.sumAggregation('the_sum', 'lemmings'))
 *             .agg(
 *                 esb.serialDifferencingAggregation(
 *                     'thirtieth_difference',
 *                     'the_sum'
 *                 ).lag(30)
 *             )
 *     )
 *     .size(0);
 *
 * @param {string} name The name which will be used to refer to this aggregation.
 * @param {string=} bucketsPath The relative path of metric to aggregate over
 *
 * @extends PipelineAggregationBase
 */

var SerialDifferencingAggregation = function (_PipelineAggregationB) {
    (0, _inherits3.default)(SerialDifferencingAggregation, _PipelineAggregationB);

    // eslint-disable-next-line require-jsdoc
    function SerialDifferencingAggregation(name, bucketsPath) {
        (0, _classCallCheck3.default)(this, SerialDifferencingAggregation);
        return (0, _possibleConstructorReturn3.default)(this, (SerialDifferencingAggregation.__proto__ || Object.getPrototypeOf(SerialDifferencingAggregation)).call(this, name, 'serial_diff', ES_REF_URL, bucketsPath));
    }

    /**
     * The historical bucket to subtract from the current value.
     * Optional.
     *
     * @param {number} lag Default is 1.
     * @returns {SerialDifferencingAggregation} returns `this` so that calls can be chained
     */


    (0, _createClass3.default)(SerialDifferencingAggregation, [{
        key: 'lag',
        value: function lag(_lag) {
            this._aggsDef.lag = _lag;
            return this;
        }
    }]);
    return SerialDifferencingAggregation;
}(PipelineAggregationBase);

module.exports = SerialDifferencingAggregation;