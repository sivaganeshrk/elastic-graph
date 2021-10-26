'use strict';

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isObject = require('lodash.isobject');
var isNil = require('lodash.isnil');

var _require = require('./util'),
    checkType = _require.checkType;

/**
 * A `GeoPoint` object that can be used in queries and filters that
 * take a `GeoPoint`.  `GeoPoint` supports various input formats.
 *
 * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/geo-point.html)
 */


var GeoPoint = function () {
    // eslint-disable-next-line require-jsdoc
    function GeoPoint() {
        (0, _classCallCheck3.default)(this, GeoPoint);

        // Take optional parameter and call appropriate method?
        // Will have to check for string, object and array.
        // this will be set depending on subsequent method called
        this._point = null;
    }

    /**
     * Print warning message to console namespaced by class name.
     *
     * @param {string} msg
     * @private
     */


    (0, _createClass3.default)(GeoPoint, [{
        key: '_warn',
        value: function _warn(msg) {
            console.warn('[GeoPoint] ' + msg);
        }

        /**
         * Print warning messages to not mix Geo Point representations
         * @private
         */

    }, {
        key: '_warnMixedRepr',
        value: function _warnMixedRepr() {
            this._warn('Do not mix with other representation!');
            this._warn('Overwriting.');
        }

        /**
         * Check the instance for object representation of Geo Point.
         * If representation is null, new object is initialised.
         * If it is not null, warning is logged and point is overwritten.
         * @private
         */

    }, {
        key: '_checkObjRepr',
        value: function _checkObjRepr() {
            if (isNil(this._point)) this._point = {};else if (!isObject(this._point)) {
                this._warnMixedRepr();
                this._point = {};
            }
        }

        /**
         * Sets the latitude for the object representation.
         *
         * @param {number} lat Latitude
         * @returns {GeoPoint} returns `this` so that calls can be chained
         */

    }, {
        key: 'lat',
        value: function lat(_lat) {
            this._checkObjRepr();

            this._point.lat = _lat;
            return this;
        }

        /**
         * Sets the longitude for the object representation.
         *
         * @param {number} lon Longitude
         * @returns {GeoPoint} returns `this` so that calls can be chained
         */

    }, {
        key: 'lon',
        value: function lon(_lon) {
            this._checkObjRepr();

            this._point.lon = _lon;
            return this;
        }

        /**
         * Sets the Geo Point value expressed as an object,
         * with `lat` and `lon` keys.
         *
         * @param {Object} point
         * @returns {GeoPoint} returns `this` so that calls can be chained
         * @throws {TypeError} If `point` is not an instance of object
         */

    }, {
        key: 'object',
        value: function object(point) {
            checkType(point, Object);

            !isNil(this._point) && this._warnMixedRepr();

            this._point = point;
            return this; // This doesn't make much sense. What else are you gonna call?
        }

        /**
         * Sets the Geo Point value expressed as an array
         * with the format: `[ lon, lat ]`.
         *
         * @param {Array<number>} point Array in format `[ lon, lat ]`(`GeoJson` standard)
         * @returns {GeoPoint} returns `this` so that calls can be chained
         * @throws {TypeError} If `point` is not an instance of Array
         */

    }, {
        key: 'array',
        value: function array(point) {
            checkType(point, Array);

            !isNil(this._point) && this._warnMixedRepr();

            this._point = point;
            return this; // This doesn't make much sense. What else are you gonna call?
        }

        /**
         * Sets Geo-point expressed as a string with the format: `"lat,lon"`
         * or as a geo hash
         *
         * @param {string} point
         * @returns {GeoPoint} returns `this` so that calls can be chained
         */

    }, {
        key: 'string',
        value: function string(point) {
            !isNil(this._point) && this._warnMixedRepr();

            this._point = point;
            return this;
        }

        /**
         * Override default `toJSON` to return DSL representation for the `GeoPoint`
         *
         * @override
         * @returns {Object} returns an Object which maps to the elasticsearch query DSL
         */

    }, {
        key: 'toJSON',
        value: function toJSON() {
            return this._point;
        }
    }]);
    return GeoPoint;
}();

module.exports = GeoPoint;