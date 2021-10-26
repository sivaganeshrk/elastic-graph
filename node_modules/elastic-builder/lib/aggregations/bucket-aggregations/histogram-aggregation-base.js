'use strict';

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var has = require('lodash.has');
var isNil = require('lodash.isnil');

var _require = require('../../core'),
    invalidParam = _require.util.invalidParam;

var BucketAggregationBase = require('./bucket-aggregation-base');

var invalidDirectionParam = invalidParam('', 'direction', "'asc' or 'desc'");

/**
 * The `HistogramAggregationBase` provides support for common options used across
 * various histogram `Aggregation` implementations like Histogram Aggregation,
 * Date Histogram aggregation.
 *
 * **NOTE:** Instantiating this directly should not be required.
 * However, if you wish to add a custom implementation for whatever reason,
 * this class could be extended.
 *
 * @param {string} name The name which will be used to refer to this aggregation.
 * @param {string} aggType Type of aggregation
 * @param {string=} field The field to aggregate on
 * @param {string|number=} interval Interval to generate histogram over.
 *
 * @extends BucketAggregationBase
 */

var HistogramAggregationBase = function (_BucketAggregationBas) {
    (0, _inherits3.default)(HistogramAggregationBase, _BucketAggregationBas);

    // eslint-disable-next-line require-jsdoc
    function HistogramAggregationBase(name, aggType, field, interval) {
        (0, _classCallCheck3.default)(this, HistogramAggregationBase);

        var _this = (0, _possibleConstructorReturn3.default)(this, (HistogramAggregationBase.__proto__ || Object.getPrototypeOf(HistogramAggregationBase)).call(this, name, aggType, field));

        if (!isNil(interval)) _this._aggsDef.interval = interval;
        return _this;
    }

    /**
     * Sets the histogram interval. Buckets are generated based on this interval value.
     *
     * @param {string} interval Interval to generate histogram over.
     * For date histograms, available expressions for interval:
     * year, quarter, month, week, day, hour, minute, second
     * @returns {HistogramAggregationBase} returns `this` so that calls can be chained
     */


    (0, _createClass3.default)(HistogramAggregationBase, [{
        key: 'interval',
        value: function interval(_interval) {
            this._aggsDef.interval = _interval;
            return this;
        }

        /**
         * Sets the format expression for `key_as_string` in response buckets.
         * If no format is specified, then it will use the first format specified in the field mapping.
         *
         * @example
         * const agg = esb.dateHistogramAggregation(
         *     'sales_over_time',
         *     'date',
         *     '1M'
         * ).format('yyyy-MM-dd');
         *
         * @param {string} fmt Format mask to apply on aggregation response. Example: ####.00.
         * For Date Histograms, supports expressive [date format pattern](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-daterange-aggregation.html#date-format-pattern)
         * @returns {HistogramAggregationBase} returns `this` so that calls can be chained
         */

    }, {
        key: 'format',
        value: function format(fmt) {
            this._aggsDef.format = fmt;
            return this;
        }

        /**
         * The offset parameter is used to change the start value of each bucket
         * by the specified positive (+) or negative offset (-).
         * Negative offset is not applicable on HistogramAggregation.
         * In case of DateHistogramAggregation, duration can be
         * a value such as 1h for an hour, or 1d for a day.
         *
         * @example
         * const agg = esb.dateHistogramAggregation('by_day', 'date', 'day').offset('6h');
         *
         * @param {string} offset Time or bucket key offset for bucketing.
         * @returns {HistogramAggregationBase} returns `this` so that calls can be chained
         */

    }, {
        key: 'offset',
        value: function offset(_offset) {
            this._aggsDef.offset = _offset;
            return this;
        }

        /**
         * Sets the ordering for buckets
         *
         * @example
         * const agg = esb.histogramAggregation('prices', 'price', 50)
         *     .order('_count', 'desc');
         *
         * @example
         * const agg = esb.histogramAggregation('prices', 'price', 50)
         *     .order('promoted_products>rating_stats.avg', 'desc')
         *     .agg(
         *         esb.filterAggregation('promoted_products')
         *             .filter(esb.termQuery('promoted', 'true'))
         *             .agg(esb.statsAggregation('rating_stats', 'rating'))
         *     );
         *
         * @param {string} key
         * @param {string} direction `asc` or `desc`
         * @returns {HistogramAggregationBase} returns `this` so that calls can be chained
         */

    }, {
        key: 'order',
        value: function order(key) {
            var direction = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'desc';

            if (isNil(direction)) invalidDirectionParam(direction);

            var directionLower = direction.toLowerCase();
            if (directionLower !== 'asc' && directionLower !== 'desc') {
                invalidDirectionParam(direction);
            }

            if (has(this._aggsDef, 'order')) {
                if (!Array.isArray(this._aggsDef.order)) {
                    this._aggsDef.order = [this._aggsDef.order];
                }

                this._aggsDef.order.push((0, _defineProperty3.default)({}, key, directionLower));
            } else {
                this._aggsDef.order = (0, _defineProperty3.default)({}, key, directionLower);
            }

            return this;
        }

        /**
         * Sets the minimum number of matching documents in range to return the bucket.
         *
         * @example
         * const agg = esb.histogramAggregation('prices', 'price', 50).minDocCount(1);
         *
         * @param {number} minDocCnt Integer value for minimum number of documents
         * required to return bucket in response
         * @returns {HistogramAggregationBase} returns `this` so that calls can be chained
         */

    }, {
        key: 'minDocCount',
        value: function minDocCount(minDocCnt) {
            this._aggsDef.min_doc_count = minDocCnt;
            return this;
        }

        /**
         * Set's the range/bounds for the histogram aggregation.
         * Useful when you want to include buckets that might be
         * outside the bounds of indexed documents.
         *
         * @example
         * const agg = esb.histogramAggregation('prices', 'price', 50).extendedBounds(0, 500);
         *
         * @param {number|string} min Start bound / minimum bound value
         * For histogram aggregation, Integer value can be used.
         * For Date histogram, date expression can be used.
         * Available expressions for interval:
         * year, quarter, month, week, day, hour, minute, second
         * @param {number|string} max End bound / maximum bound value
         * For histogram aggregation, Integer value can be used.
         * For Date histogram, date expression can be used.
         * Available expressions for interval:
         * year, quarter, month, week, day, hour, minute, second
         * @returns {HistogramAggregationBase} returns `this` so that calls can be chained
         */

    }, {
        key: 'extendedBounds',
        value: function extendedBounds(min, max) {
            this._aggsDef.extended_bounds = { min: min, max: max };
            return this;
        }

        /**
         * Sets the missing parameter which defines how documents
         * that are missing a value should be treated.
         *
         * @example
         * const agg = esb.histogramAggregation('quantity', 'quantity', 10).missing(0);
         *
         * @param {string} value
         * @returns {HistogramAggregationBase} returns `this` so that calls can be chained
         */

    }, {
        key: 'missing',
        value: function missing(value) {
            this._aggsDef.missing = value;
            return this;
        }

        /**
         * Enable the response to be returned as a keyed object where the key is the
         * bucket interval.
         *
         * @example
         * const agg = esb.dateHistogramAggregation('sales_over_time', 'date', '1M')
         *     .keyed(true)
         *     .format('yyyy-MM-dd');
         *
         * @param {boolean} keyed To enable keyed response or not.
         * @returns {HistogramAggregationBase} returns `this` so that calls can be chained
         */

    }, {
        key: 'keyed',
        value: function keyed(_keyed) {
            this._aggsDef.keyed = _keyed;
            return this;
        }
    }]);
    return HistogramAggregationBase;
}(BucketAggregationBase);

module.exports = HistogramAggregationBase;