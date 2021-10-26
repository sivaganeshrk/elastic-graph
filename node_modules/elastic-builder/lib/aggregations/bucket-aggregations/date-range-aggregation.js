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

var RangeAggregationBase = require('./range-aggregation-base');

/**
 * A range aggregation that is dedicated for date values. The main difference
 * between this aggregation and the normal range aggregation is that the from
 * and to values can be expressed in Date Math expressions, and it is also
 * possible to specify a date format by which the from and to response fields
 * will be returned.
 *
 * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-daterange-aggregation.html)
 *
 * @example
 * const agg = esb.dateRangeAggregation('range', 'date')
 *     .format('MM-yyy')
 *     .ranges([{ to: 'now-10M/M' }, { from: 'now-10M/M' }]);
 *
 * @param {string} name The name which will be used to refer to this aggregation.
 * @param {string=} field The field to aggregate on
 *
 * @extends RangeAggregationBase
 */

var DateRangeAggregation = function (_RangeAggregationBase) {
    (0, _inherits3.default)(DateRangeAggregation, _RangeAggregationBase);

    // eslint-disable-next-line require-jsdoc
    function DateRangeAggregation(name, field) {
        (0, _classCallCheck3.default)(this, DateRangeAggregation);
        return (0, _possibleConstructorReturn3.default)(this, (DateRangeAggregation.__proto__ || Object.getPrototypeOf(DateRangeAggregation)).call(this, name, 'date_range', field));
    }

    /**
     * Sets the date time zone.
     * Date-times are stored in Elasticsearch in UTC.
     * By default, all bucketing and rounding is also done in UTC.
     * The `time_zone` parameter can be used to indicate that
     * bucketing should use a different time zone.
     *
     * @example
     * const agg = esb.dateRangeAggregation('range', 'date')
     *     .timeZone('CET')
     *     .ranges([
     *         { to: '2016/02/01' },
     *         { from: '2016/02/01', to: 'now/d' },
     *         { from: 'now/d' }
     *     ]);
     *
     * @param {string} tz Time zone. Time zones may either be specified
     * as an ISO 8601 UTC offset (e.g. +01:00 or -08:00) or as a timezone id,
     * an identifier used in the TZ database like America/Los_Angeles.
     * @returns {DateRangeAggregation} returns `this` so that calls can be chained
     */


    (0, _createClass3.default)(DateRangeAggregation, [{
        key: 'timeZone',
        value: function timeZone(tz) {
            this._aggsDef.time_zone = tz;
            return this;
        }
    }]);
    return DateRangeAggregation;
}(RangeAggregationBase);

module.exports = DateRangeAggregation;