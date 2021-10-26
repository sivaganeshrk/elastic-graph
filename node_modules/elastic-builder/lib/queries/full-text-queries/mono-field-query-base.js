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

var FullTextQueryBase = require('./full-text-query-base');

/**
 * The `MonoFieldQueryBase` provides support for common options used across
 * various full text query implementations with single search field.
 *
 * **NOTE:** Instantiating this directly should not be required.
 * However, if you wish to add a custom implementation for whatever reason,
 * this class could be extended.
 *
 * @param {string} queryType
 * @param {string=} field The document field to query against
 * @param {string=} queryString The query string
 *
 * @extends FullTextQueryBase
 */

var MonoFieldQueryBase = function (_FullTextQueryBase) {
    (0, _inherits3.default)(MonoFieldQueryBase, _FullTextQueryBase);

    // eslint-disable-next-line require-jsdoc
    function MonoFieldQueryBase(queryType, field, queryString) {
        (0, _classCallCheck3.default)(this, MonoFieldQueryBase);

        var _this = (0, _possibleConstructorReturn3.default)(this, (MonoFieldQueryBase.__proto__ || Object.getPrototypeOf(MonoFieldQueryBase)).call(this, queryType, queryString));

        if (!isNil(field)) _this._field = field;
        return _this;
    }

    /**
     * Sets the field to search on.
     *
     * @param {string} field
     * @returns {MonoFieldQueryBase} returns `this` so that calls can be chained.
     */


    (0, _createClass3.default)(MonoFieldQueryBase, [{
        key: 'field',
        value: function field(_field) {
            this._field = _field;
            return this;
        }

        /**
         * Override default `toJSON` to return DSL representation of the Full text query
         * class instance.
         *
         * @override
         * @returns {Object} returns an Object which maps to the elasticsearch query DSL
         */

    }, {
        key: 'toJSON',
        value: function toJSON() {
            // recursiveToJSON doesn't seem to be required here.

            // Revisit this.. Smells a little bit
            if (!has(this._queryOpts, 'query')) {
                throw new Error('Query string is required for full text query!');
            }

            var queryOptKeys = Object.keys(this._queryOpts);
            var qryOpts = queryOptKeys.length === 1 ? this._queryOpts.query : this._queryOpts;

            var repr = (0, _defineProperty3.default)({}, this.queryType, (0, _defineProperty3.default)({}, this._field, qryOpts));
            return repr;
        }
    }]);
    return MonoFieldQueryBase;
}(FullTextQueryBase);

module.exports = MonoFieldQueryBase;