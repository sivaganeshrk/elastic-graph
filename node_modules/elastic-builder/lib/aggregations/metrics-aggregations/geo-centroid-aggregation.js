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

var ES_REF_URL = 'https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-metrics-geocentroid-aggregation.html';

/**
 * A metric aggregation that computes the weighted centroid
 * from all coordinate values for a Geo-point datatype field.
 *
 * [Elasticsearchreference](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-metrics-geocentroid-aggregation.html)
 *
 * @example
 * const agg = esb.geoCentroidAggregation('centroid', 'location');
 *
 * @example
 * // Combined as a sub-aggregation to other bucket aggregations
 * const reqBody = esb.requestBodySearch()
 *     .query(esb.matchQuery('crime', 'burglary'))
 *     .agg(
 *         esb.termsAggregation('towns', 'town').agg(
 *             esb.geoCentroidAggregation('centroid', 'location')
 *         )
 *     );
 *
 * @param {string} name The name which will be used to refer to this aggregation.
 * @param {string=} field The field to aggregate on. field must be a Geo-point datatype type
 *
 * @extends MetricsAggregationBase
 */

var GeoCentroidAggregation = function (_MetricsAggregationBa) {
    (0, _inherits3.default)(GeoCentroidAggregation, _MetricsAggregationBa);

    // eslint-disable-next-line require-jsdoc
    function GeoCentroidAggregation(name, field) {
        (0, _classCallCheck3.default)(this, GeoCentroidAggregation);
        return (0, _possibleConstructorReturn3.default)(this, (GeoCentroidAggregation.__proto__ || Object.getPrototypeOf(GeoCentroidAggregation)).call(this, name, 'geo_centroid', field));
    }

    /**
     * @override
     * @throws {Error} This method cannot be called on GeoCentroidAggregation
     */


    (0, _createClass3.default)(GeoCentroidAggregation, [{
        key: 'format',
        value: function format() {
            console.log('Please refer ' + ES_REF_URL);
            throw new Error('format is not supported in GeoCentroidAggregation');
        }
    }]);
    return GeoCentroidAggregation;
}(MetricsAggregationBase);

module.exports = GeoCentroidAggregation;