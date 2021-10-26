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

var HistogramAggregationBase = require('./histogram-aggregation-base');

/**
 * A multi-bucket aggregation similar to the histogram except it can only be applied on date values.
 * The interval can be specified by date/time expressions.
 *
 * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-datehistogram-aggregation.html#_scripts)
 *
 * @example
 * const agg = esb.dateHistogramAggregation('sales_over_time', 'date', 'month');
 *
 * @example
 * const agg = esb.dateHistogramAggregation(
 *     'sales_over_time',
 *     'date',
 *     '1M'
 * ).format('yyyy-MM-dd');
 *
 * @param {string} name The name which will be used to refer to this aggregation.
 * @param {string=} field The field to aggregate on
 * @param {string=} interval Interval to generate histogram over.
 * Available expressions for interval: year, quarter, month, week, day, hour, minute, second
 *
 * @extends HistogramAggregationBase
 */

var DateHistogramAggregation = function (_HistogramAggregation) {
    (0, _inherits3.default)(DateHistogramAggregation, _HistogramAggregation);

    // eslint-disable-next-line require-jsdoc
    function DateHistogramAggregation(name, field, interval) {
        (0, _classCallCheck3.default)(this, DateHistogramAggregation);
        return (0, _possibleConstructorReturn3.default)(this, (DateHistogramAggregation.__proto__ || Object.getPrototypeOf(DateHistogramAggregation)).call(this, name, 'date_histogram', field, interval));
    }

    /**
     * Date-times are stored in Elasticsearch in UTC.
     * By default, all bucketing and rounding is also done in UTC.
     * The `time_zone` parameter can be used to indicate that bucketing should use a different time zone.
     * Sets the date time zone
     *
     * @example
     * const agg = esb.dateHistogramAggregation('by_day', 'date', 'day').timeZone(
     *     '-01:00'
     * );
     *
     * @param {string} tz Time zone. Time zones may either be specified
     * as an ISO 8601 UTC offset (e.g. +01:00 or -08:00) or as a timezone id,
     * an identifier used in the TZ database like America/Los_Angeles.
     * @returns {DateHistogramAggregation} returns `this` so that calls can be chained
     */


    (0, _createClass3.default)(DateHistogramAggregation, [{
        key: 'timeZone',
        value: function timeZone(tz) {
            this._aggsDef.time_zone = tz;
            return this;
        }

        /**
         * Calendar-aware intervals are configured with the calendarInterval parameter.
         * The combined interval field for date histograms is deprecated from ES 7.2.
         *
         * @example
         * const agg = esb.dateHistogramAggregation('by_month', 'date').calendarInterval(
         *     'month'
         * );
         *
         * @param {string} interval Interval to generate histogram over.
         * You can specify calendar intervals using the unit name, such as month, or as
         * a single unit quantity, such as 1M. For example, day and 1d are equivalent.
         * Multiple quantities, such as 2d, are not supported.
         * @returns {DateHistogramAggregation} returns `this` so that calls can be chained
         */

    }, {
        key: 'calendarInterval',
        value: function calendarInterval(interval) {
            this._aggsDef.calendar_interval = interval;
            return this;
        }

        /**
         * Fixed intervals are configured with the fixedInterval parameter.
         * The combined interval field for date histograms is deprecated from ES 7.2.
         *
         * @param {string} interval Interval to generate histogram over.
         * Intervals are a fixed number of SI units and never deviate, regardless
         * of where they fall on the calendar. However, it means fixed intervals
         * cannot express other units such as months, since the duration of a
         * month is not a fixed quantity.
         *
         * @example
         * const agg = esb.dateHistogramAggregation('by_minute', 'date').calendarInterval(
         *     '60s'
         * );
         *
         * The accepted units for fixed intervals are:
         * millseconds (ms), seconds (s), minutes (m), hours (h) and days (d).
         * @returns {DateHistogramAggregation} returns `this` so that calls can be chained
         */

    }, {
        key: 'fixedInterval',
        value: function fixedInterval(interval) {
            this._aggsDef.fixed_interval = interval;
            return this;
        }
    }]);
    return DateHistogramAggregation;
}(HistogramAggregationBase);

module.exports = DateHistogramAggregation;