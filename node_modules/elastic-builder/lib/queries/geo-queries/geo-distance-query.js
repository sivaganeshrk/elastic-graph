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

var _require = require('../../core'),
    GeoPoint = _require.GeoPoint,
    _require$util = _require.util,
    checkType = _require$util.checkType,
    invalidParam = _require$util.invalidParam;

var GeoQueryBase = require('./geo-query-base');

var ES_REF_URL = 'https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-geo-distance-query.html';

var invalidDistanceTypeParam = invalidParam(ES_REF_URL, 'distance_type', "'plane' or 'arc'");

/**
 * Filters documents that include only hits that exists within a specific distance from a geo point.
 *
 * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-geo-distance-query.html)
 *
 * @example
 * const qry = esb.geoDistanceQuery('pin.location', esb.geoPoint().lat(40).lon(-70))
 *     .distance('12km');
 *
 * const qry = esb.geoDistanceQuery()
 *     .field('pin.location')
 *     .distance('200km')
 *     .geoPoint(esb.geoPoint().lat(40).lon(-70));
 *
 * @param {string=} field
 * @param {GeoPoint=} point Geo point used to measure and filter documents based on distance from it.
 *
 * @extends GeoQueryBase
 */

var GeoDistanceQuery = function (_GeoQueryBase) {
    (0, _inherits3.default)(GeoDistanceQuery, _GeoQueryBase);

    // eslint-disable-next-line require-jsdoc
    function GeoDistanceQuery(field, point) {
        (0, _classCallCheck3.default)(this, GeoDistanceQuery);

        var _this = (0, _possibleConstructorReturn3.default)(this, (GeoDistanceQuery.__proto__ || Object.getPrototypeOf(GeoDistanceQuery)).call(this, 'geo_distance', field));

        if (!isNil(point)) _this.geoPoint(point);
        return _this;
    }

    /**
     * Sets the radius of the circle centred on the specified location. Points which
     * fall into this circle are considered to be matches. The distance can be specified
     * in various units.
     *
     * @param {string|number} distance Radius of circle centred on specified location.
     * @returns {GeoDistanceQuery} returns `this` so that calls can be chained.
     */


    (0, _createClass3.default)(GeoDistanceQuery, [{
        key: 'distance',
        value: function distance(_distance) {
            this._queryOpts.distance = _distance;
            return this;
        }

        /**
         * Sets the distance calculation mode, `arc` or `plane`.
         * The `arc` calculation is the more accurate.
         * The `plane` is the faster but least accurate.
         *
         * @param {string} type
         * @returns {GeoDistanceQuery} returns `this` so that calls can be chained
         * @throws {Error} If `type` is neither `plane` nor `arc`.
         */

    }, {
        key: 'distanceType',
        value: function distanceType(type) {
            if (isNil(type)) invalidDistanceTypeParam(type);

            var typeLower = type.toLowerCase();
            if (typeLower !== 'plane' && typeLower !== 'arc') invalidDistanceTypeParam(type);

            this._queryOpts.distance_type = typeLower;
            return this;
        }

        /**
         * Sets the point to filter documents based on the distance from it.
         *
         * @param {GeoPoint} point Geo point used to measure and filter documents based on distance from it.
         * @returns {GeoDistanceQuery} returns `this` so that calls can be chained
         * @throws {TypeError} If parameter `point` is not an instance of `GeoPoint`
         */

    }, {
        key: 'geoPoint',
        value: function geoPoint(point) {
            checkType(point, GeoPoint);

            this._fieldOpts = point;
            return this;
        }
    }]);
    return GeoDistanceQuery;
}(GeoQueryBase);

module.exports = GeoDistanceQuery;