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

var isNil = require('lodash.isnil');

var ValuesSourceBase = require('./values-source-base');

var REF_URL = 'https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-composite-aggregation.html#_histogram';

/**
 * `HistogramValuesSource` is a source for the `CompositeAggregation` that handles
 * histograms. It works very similar to a histogram aggregation with a slightly
 * different syntax.
 *
 * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-composite-aggregation.html#_histogram)
 *
 * @example
 * const valueSrc = esb.CompositeAggregation.histogramValuesSource(
 *   'histo', // name
 *   'price', // field
 *   5 // interval
 * );
 *
 * @param {string} name
 * @param {string=} field The field to aggregate on
 * @param {number=} interval Interval to generate histogram over.
 *
 * @extends ValuesSourceBase
 */

var HistogramValuesSource = function (_ValuesSourceBase) {
    (0, _inherits3.default)(HistogramValuesSource, _ValuesSourceBase);

    // eslint-disable-next-line require-jsdoc
    function HistogramValuesSource(name, field, interval) {
        (0, _classCallCheck3.default)(this, HistogramValuesSource);

        var _this = (0, _possibleConstructorReturn3.default)(this, (HistogramValuesSource.__proto__ || Object.getPrototypeOf(HistogramValuesSource)).call(this, 'histogram', REF_URL, name, field));

        if (!isNil(interval)) _this._opts.interval = interval;
        return _this;
    }

    /**
     * Sets the histogram interval. Buckets are generated based on this interval value.
     *
     * @param {number} interval Interval to generate histogram over.
     * @returns {HistogramValuesSource} returns `this` so that calls can be chained
     */


    (0, _createClass3.default)(HistogramValuesSource, [{
        key: 'interval',
        value: function interval(_interval) {
            this._opts.interval = _interval;
            return this;
        }
    }]);
    return HistogramValuesSource;
}(ValuesSourceBase);

module.exports = HistogramValuesSource;