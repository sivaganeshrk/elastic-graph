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

var MetricsAggregationBase = require('./metrics-aggregation-base');

var ES_REF_URL = 'https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-metrics-geobounds-aggregation.html';

/**
 * A metric aggregation that computes the bounding box
 * containing all geo_point values for a field.
 *
 * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-metrics-geobounds-aggregation.html)
 *
 * @example
 * const agg = esb.geoBoundsAggregation('viewport', 'location').wrapLongitude(true);
 *
 * @param {string} name The name which will be used to refer to this aggregation.
 * @param {string=} field The field to aggregate on
 *
 * @extends MetricsAggregationBase
 */

var GeoBoundsAggregation = function (_MetricsAggregationBa) {
    (0, _inherits3.default)(GeoBoundsAggregation, _MetricsAggregationBa);

    // eslint-disable-next-line require-jsdoc
    function GeoBoundsAggregation(name, field) {
        (0, _classCallCheck3.default)(this, GeoBoundsAggregation);
        return (0, _possibleConstructorReturn3.default)(this, (GeoBoundsAggregation.__proto__ || Object.getPrototypeOf(GeoBoundsAggregation)).call(this, name, 'geo_bounds', field));
    }

    // TODO: Override missing and take only GeoPoint as parameter

    /**
     * @override
     * @throws {Error} This method cannot be called on GeoBoundsAggregation
     */


    (0, _createClass3.default)(GeoBoundsAggregation, [{
        key: 'format',
        value: function format() {
            console.log('Please refer ' + ES_REF_URL);
            throw new Error('format is not supported in GeoBoundsAggregation');
        }

        /**
         * @override
         * @throws {Error} This method cannot be called on GeoBoundsAggregation
         */

    }, {
        key: 'script',
        value: function script() {
            console.log('Please refer ' + ES_REF_URL);
            throw new Error('script is not supported in GeoBoundsAggregation');
        }

        /**
         *
         * @param {boolean} allowOverlap Optional parameter which specifies whether
         * the bounding box should be allowed to overlap the international date line.
         * The default value is true
         * @returns {GeoBoundsAggregation} returns `this` so that calls can be chained
         */

    }, {
        key: 'wrapLongitude',
        value: function wrapLongitude(allowOverlap) {
            this._aggsDef.wrap_longitude = allowOverlap;
            return this;
        }
    }]);
    return GeoBoundsAggregation;
}(MetricsAggregationBase);

module.exports = GeoBoundsAggregation;