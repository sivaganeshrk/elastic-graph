'use strict';

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isNil = require('lodash.isnil');
var has = require('lodash.has');

var _require = require('./util'),
    checkType = _require.checkType,
    invalidParam = _require.invalidParam;

var _require2 = require('./consts'),
    GEO_SHAPE_TYPES = _require2.GEO_SHAPE_TYPES;

var ES_REF_URL = 'https://www.elastic.co/guide/en/elasticsearch/reference/current/geo-shape.html';

var invalidTypeParam = invalidParam(ES_REF_URL, 'type', GEO_SHAPE_TYPES);

/**
 * Shape object that can be used in queries and filters that
 * take a Shape. Shape uses the GeoJSON format.
 *
 * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/geo-shape.html)
 *
 * @example
 * // Pass options using method
 * const shape = esb.geoShape()
 *     .type('linestring')
 *     .coordinates([[-77.03653, 38.897676], [-77.009051, 38.889939]]);
 *
 * @example
 * // Pass parameters using contructor
 * const shape = esb.geoShape('multipoint', [[102.0, 2.0], [103.0, 2.0]])
 *
 * @param {string=} type A valid shape type.
 * Can be one of `point`, `linestring`, `polygon`, `multipoint`, `multilinestring`,
 * `multipolygon`, `geometrycollection`, `envelope` and `circle`
 * @param {Array=} coords A valid coordinat definition for the given shape.
 */

var GeoShape = function () {
    // eslint-disable-next-line require-jsdoc
    function GeoShape(type, coords) {
        (0, _classCallCheck3.default)(this, GeoShape);

        this._body = {};

        if (!isNil(type)) this.type(type);
        if (!isNil(coords)) this.coordinates(coords);
    }

    /**
     * Sets the GeoJSON format type used to represent shape.
     *
     * @example
     * const shape = esb.geoShape()
     *     .type('envelope')
     *     .coordinates([[-45.0, 45.0], [45.0, -45.0]])
     *
     * @param {string} type A valid shape type.
     * Can be one of `point`, `linestring`, `polygon`, `multipoint`, `multilinestring`,
     * `multipolygon`, `geometrycollection`, `envelope`, `circle`
     * @returns {GeoShape} returns `this` so that calls can be chained.
     */


    (0, _createClass3.default)(GeoShape, [{
        key: 'type',
        value: function type(_type) {
            if (isNil(_type)) invalidTypeParam(_type);

            var typeLower = _type.toLowerCase();
            if (!GEO_SHAPE_TYPES.has(typeLower)) invalidTypeParam(_type);

            this._body.type = typeLower;
            return this;
        }

        /**
         * Sets the coordinates for the shape definition. Note, the coordinates
         * are not validated in this api. Please see [GeoJSON](http://geojson.org/geojson-spec.html#geometry-objects)
         * and [ElasticSearch documentation](https://www.elastic.co/guide/en/elasticsearch/reference/current/geo-shape.html#input-structure) for correct coordinate definitions.
         *
         * @example
         * const shape = esb.geoShape()
         *     .type('point')
         *     .coordinates([-77.03653, 38.897676])
         *
         * @param {Array<Array<number>>|Array<number>} coords
         * @returns {GeoShape} returns `this` so that calls can be chained.
         */

    }, {
        key: 'coordinates',
        value: function coordinates(coords) {
            checkType(coords, Array);

            this._body.coordinates = coords;
            return this;
        }

        /**
         * Sets the radius for parsing a circle `GeoShape`.
         *
         * @example
         * const shape = esb.geoShape()
         *     .type('circle')
         *     .coordinates([-45.0, 45.0])
         *     .radius('100m')
         *
         * @param {string|number} radius The radius for shape circle.
         * @returns {GeoShape} returns `this` so that calls can be chained.
         */

    }, {
        key: 'radius',
        value: function radius(_radius) {
            // Should this have a validation for circle shape type?
            this._body.radius = _radius;
            return this;
        }

        /**
         * Override default `toJSON` to return DSL representation of the geo shape
         * class instance.
         *
         * @override
         * @returns {Object} returns an Object which maps to the elasticsearch query DSL
         */

    }, {
        key: 'toJSON',
        value: function toJSON() {
            if (!has(this._body, 'type') || !has(this._body, 'coordinates')) {
                throw new Error('For all types, both the inner `type` and `coordinates` fields are required.');
            }
            return this._body;
        }
    }]);
    return GeoShape;
}();

module.exports = GeoShape;