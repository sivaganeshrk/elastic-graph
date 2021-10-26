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

var ES_REF_URL = 'https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-geo-bounding-box-query.html';

var invalidTypeParam = invalidParam(ES_REF_URL, 'type', "'memory' or 'indexed'");

/**
 * A query allowing to filter hits based on a point location using a bounding box.
 *
 * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-geo-bounding-box-query.html)
 *
 * @example
 * // Format of point in Geohash
 * const qry = esb.geoBoundingBoxQuery('pin.location')
 *     .topLeft(esb.geoPoint().string('dr5r9ydj2y73'))
 *     .bottomRight(esb.geoPoint().string('drj7teegpus6'));
 *
 * @example
 * // Format of point with lat lon as properties
 * const qry = esb.geoBoundingBoxQuery()
 *     .field('pin.location')
 *     .topLeft(esb.geoPoint()
 *         .lat(40.73)
 *         .lon(-74.1))
 *     .bottomRight(esb.geoPoint()
 *         .lat(40.10)
 *         .lon(-71.12));
 *
 * @example
 * // Set bounding box values separately
 * const qry = esb.geoBoundingBoxQuery('pin.location')
 *     .top(40.73)
 *     .left(-74.1)
 *     .bottom(40.01)
 *     .right(-71.12);
 *
 * @param {string=} field
 *
 * @extends GeoQueryBase
 */

var GeoBoundingBoxQuery = function (_GeoQueryBase) {
    (0, _inherits3.default)(GeoBoundingBoxQuery, _GeoQueryBase);

    // eslint-disable-next-line require-jsdoc
    function GeoBoundingBoxQuery(field) {
        (0, _classCallCheck3.default)(this, GeoBoundingBoxQuery);
        return (0, _possibleConstructorReturn3.default)(this, (GeoBoundingBoxQuery.__proto__ || Object.getPrototypeOf(GeoBoundingBoxQuery)).call(this, 'geo_bounding_box', field));
    }

    /**
     * Sets the top left coordinate for the Geo bounding box filter for
     * querying documents
     *
     * @param {GeoPoint} point A valid `GeoPoint`
     * @returns {GeoBoundingBoxQuery} returns `this` so that calls can be chained.
     */


    (0, _createClass3.default)(GeoBoundingBoxQuery, [{
        key: 'topLeft',
        value: function topLeft(point) {
            checkType(point, GeoPoint);

            this._fieldOpts.top_left = point;
            return this;
        }

        /**
         * Sets the bottom right coordinate for the Geo bounding box filter for
         * querying documents
         *
         * @param {GeoPoint} point A valid `GeoPoint`
         * @returns {GeoBoundingBoxQuery} returns `this` so that calls can be chained.
         */

    }, {
        key: 'bottomRight',
        value: function bottomRight(point) {
            checkType(point, GeoPoint);

            this._fieldOpts.bottom_right = point;
            return this;
        }

        /**
         * Sets the top right coordinate for the Geo bounding box filter for
         * querying documents
         *
         * @param {GeoPoint} point A valid `GeoPoint`
         * @returns {GeoBoundingBoxQuery} returns `this` so that calls can be chained.
         */

    }, {
        key: 'topRight',
        value: function topRight(point) {
            checkType(point, GeoPoint);

            this._fieldOpts.top_right = point;
            return this;
        }

        /**
         * Sets the bottom left coordinate for the Geo bounding box filter for
         * querying documents
         *
         * @param {GeoPoint} point A valid `GeoPoint`
         * @returns {GeoBoundingBoxQuery} returns `this` so that calls can be chained.
         */

    }, {
        key: 'bottomLeft',
        value: function bottomLeft(point) {
            checkType(point, GeoPoint);

            this._fieldOpts.bottom_left = point;
            return this;
        }

        /**
         * Sets value for top of the bounding box.
         *
         * @param {number} val
         * @returns {GeoBoundingBoxQuery} returns `this` so that calls can be chained.
         */

    }, {
        key: 'top',
        value: function top(val) {
            this._fieldOpts.top = val;
            return this;
        }

        /**
         * Sets value for left of the bounding box.
         *
         * @param {number} val
         * @returns {GeoBoundingBoxQuery} returns `this` so that calls can be chained.
         */

    }, {
        key: 'left',
        value: function left(val) {
            this._fieldOpts.left = val;
            return this;
        }

        /**
         * Sets value for bottom of the bounding box.
         *
         * @param {number} val
         * @returns {GeoBoundingBoxQuery} returns `this` so that calls can be chained.
         */

    }, {
        key: 'bottom',
        value: function bottom(val) {
            this._fieldOpts.bottom = val;
            return this;
        }

        /**
         * Sets value for right of the bounding box.
         *
         * @param {number} val
         * @returns {GeoBoundingBoxQuery} returns `this` so that calls can be chained.
         */

    }, {
        key: 'right',
        value: function right(val) {
            this._fieldOpts.right = val;
            return this;
        }

        /**
         * Sets the type of execution for the bounding box query.
         * The type of the bounding box execution by default is set to memory,
         * which means in memory checks if the doc falls within the bounding
         * box range. In some cases, an indexed option will perform faster
         * (but note that the geo_point type must have lat and lon indexed in this case)
         *
         * @example
         *
         * const geoQry = esb.geoBoundingBoxQuery()
         *     .field('pin.location')
         *     .topLeft(esb.geoPoint()
         *         .lat(40.73)
         *         .lon(-74.1))
         *     .bottomRight(esb.geoPoint()
         *         .lat(40.10)
         *         .lon(-71.12))
         *     .type('indexed');
         *
         * @param {string} type Can either `memory` or `indexed`
         * @returns {GeoBoundingBoxQuery} returns `this` so that calls can be chained.
         */

    }, {
        key: 'type',
        value: function type(_type) {
            if (isNil(_type)) invalidTypeParam(_type);

            var typeLower = _type.toLowerCase();
            if (typeLower !== 'memory' && typeLower !== 'indexed') {
                invalidTypeParam(_type);
            }

            this._queryOpts.type = typeLower;
            return this;
        }
    }]);
    return GeoBoundingBoxQuery;
}(GeoQueryBase);

module.exports = GeoBoundingBoxQuery;