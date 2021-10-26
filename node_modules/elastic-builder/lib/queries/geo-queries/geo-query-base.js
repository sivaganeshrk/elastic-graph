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

var isNil = require('lodash.isnil');

var _require = require('../../core'),
    Query = _require.Query,
    _require$util = _require.util,
    invalidParam = _require$util.invalidParam,
    recursiveToJSON = _require$util.recursiveToJSON;

var invalidValidationMethod = invalidParam('', 'validation_method', "'IGNORE_MALFORMED', 'COERCE' or 'STRICT'");

/**
 * The `GeoQueryBase` provides support for common options used across
 * various geo query implementations.
 *
 * **NOTE:** Instantiating this directly should not be required.
 * However, if you wish to add a custom implementation for whatever reason,
 * this class could be extended.
 *
 * @param {string} queryType
 * @param {string=} field
 *
 * @extends Query
 */

var GeoQueryBase = function (_Query) {
    (0, _inherits3.default)(GeoQueryBase, _Query);

    // eslint-disable-next-line require-jsdoc
    function GeoQueryBase(queryType, field) {
        (0, _classCallCheck3.default)(this, GeoQueryBase);

        var _this = (0, _possibleConstructorReturn3.default)(this, (GeoQueryBase.__proto__ || Object.getPrototypeOf(GeoQueryBase)).call(this, queryType));

        _this._field = null;
        _this._fieldOpts = {};

        if (!isNil(field)) _this._field = field;
        return _this;
    }

    /**
     * Sets the field to run the geo query on.
     *
     * @param {string} field
     * @returns {GeoQueryBase} returns `this` so that calls can be chained.
     */


    (0, _createClass3.default)(GeoQueryBase, [{
        key: 'field',
        value: function field(_field) {
            this._field = _field;
            return this;
        }

        /**
         * Sets the `validation_method` parameter. Can be set to `IGNORE_MALFORMED` to accept
         * geo points with invalid latitude or longitude, `COERCE` to try and infer correct latitude
         * or longitude, or `STRICT` (default is `STRICT`).
         *
         * Note: The `ignore_malformed` and `coerce` parameters have been removed
         * from `geo_bounding_box`, `geo_polygon`, and `geo_distance` queries in
         * elasticsearch 6.0.
         *
         * @param {string} method One of `IGNORE_MALFORMED`, `COERCE` or `STRICT`(default)
         * @returns {GeoQueryBase} returns `this` so that calls can be chained.
         * @throws {Error} If `method` parameter is not one of `IGNORE_MALFORMED`, `COERCE` or `STRICT`
         */

    }, {
        key: 'validationMethod',
        value: function validationMethod(method) {
            if (isNil(method)) invalidValidationMethod(method);

            var methodUpper = method.toUpperCase();
            if (methodUpper !== 'IGNORE_MALFORMED' && methodUpper !== 'COERCE' && methodUpper !== 'STRICT') {
                invalidValidationMethod(method);
            }

            this._queryOpts.validation_method = methodUpper;
            return this;
        }

        /**
         * Override default `toJSON` to return DSL representation of the geo query
         * class instance.
         *
         * @override
         * @returns {Object} returns an Object which maps to the elasticsearch query DSL
         */

    }, {
        key: 'toJSON',
        value: function toJSON() {
            return recursiveToJSON((0, _defineProperty3.default)({}, this.queryType, Object.assign((0, _defineProperty3.default)({}, this._field, this._fieldOpts), this._queryOpts)));
        }
    }]);
    return GeoQueryBase;
}(Query);

module.exports = GeoQueryBase;