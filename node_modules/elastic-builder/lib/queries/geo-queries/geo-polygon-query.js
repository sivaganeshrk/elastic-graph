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

var _require = require('../../core'),
    checkType = _require.util.checkType;

var GeoQueryBase = require('./geo-query-base');

/**
 * A query allowing to include hits that only fall within a polygon of points.
 *
 * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-geo-polygon-query.html)
 *
 * @example
 * const geoQry = esb.geoPolygonQuery('person.location')
 *     .points([
 *         {"lat" : 40, "lon" : -70},
 *         {"lat" : 30, "lon" : -80},
 *         {"lat" : 20, "lon" : -90}
 *     ]);
 *
 * @param {string=} field
 *
 * @extends GeoQueryBase
 */

var GeoPolygonQuery = function (_GeoQueryBase) {
    (0, _inherits3.default)(GeoPolygonQuery, _GeoQueryBase);

    // eslint-disable-next-line require-jsdoc
    function GeoPolygonQuery(field) {
        (0, _classCallCheck3.default)(this, GeoPolygonQuery);
        return (0, _possibleConstructorReturn3.default)(this, (GeoPolygonQuery.__proto__ || Object.getPrototypeOf(GeoPolygonQuery)).call(this, 'geo_polygon', field));
    }

    /**
     * Sets the points which form the polygon.
     * Points can be instances of `GeoPoint`, Object with `lat`, `lon` keys,
     * `GeoJSON` array representation or string(`geohash`/`lat, lon`)
     *
     * @example
     * // Format in `[lon, lat]`
     * const qry = esb.geoPolygonQuery('person.location').points([
     *     [-70, 40],
     *     [-80, 30],
     *     [-90, 20]
     * ]);
     *
     * @example
     * // Format in lat,lon
     * const qry = esb.geoPolygonQuery('person.location').points([
     *     '40, -70',
     *     '30, -80',
     *     '20, -90'
     * ]);
     *
     * @example
     * // Geohash
     * const qry = esb.geoPolygonQuery('person.location').points([
     *     'drn5x1g8cu2y',
     *     '30, -80',
     *     '20, -90'
     * ]);
     *
     * @param {Array<*>} points
     * @returns {GeoPolygonQuery} returns `this` so that calls can be chained
     * @throws {TypeError} If `points` parameter is not an instance of `Array`.
     */


    (0, _createClass3.default)(GeoPolygonQuery, [{
        key: 'points',
        value: function points(_points) {
            checkType(_points, Array);

            this._fieldOpts.points = _points;
            return this;
        }
    }]);
    return GeoPolygonQuery;
}(GeoQueryBase);

module.exports = GeoPolygonQuery;