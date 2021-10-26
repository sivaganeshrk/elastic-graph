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

var SpanQueryBase = require('./span-query-base');

/**
 * Base class for span queries with `little`, `big` clauses.
 *
 * **NOTE:** Instantiating this directly should not be required.
 * However, if you wish to add a custom implementation for whatever reason,
 * this class could be extended.
 *
 * @extends SpanQueryBase
 */

var SpanLittleBigQueryBase = function (_SpanQueryBase) {
    (0, _inherits3.default)(SpanLittleBigQueryBase, _SpanQueryBase);

    function SpanLittleBigQueryBase() {
        (0, _classCallCheck3.default)(this, SpanLittleBigQueryBase);
        return (0, _possibleConstructorReturn3.default)(this, (SpanLittleBigQueryBase.__proto__ || Object.getPrototypeOf(SpanLittleBigQueryBase)).apply(this, arguments));
    }

    (0, _createClass3.default)(SpanLittleBigQueryBase, [{
        key: 'little',

        /**
         * Sets the `little` clause.
         *
         * @param {SpanQueryBase} spanQry Any span type query
         * @returns {SpanLittleBigQueryBase} returns `this` so that calls can be chained.
         */
        value: function little(spanQry) {
            checkType(spanQry, SpanQueryBase);

            this._queryOpts.little = spanQry;
            return this;
        }

        /**
         * Sets the `big` clause.
         *
         * @param {SpanQueryBase} spanQry Any span type query
         * @returns {SpanLittleBigQueryBase} returns `this` so that calls can be chained.
         */

    }, {
        key: 'big',
        value: function big(spanQry) {
            checkType(spanQry, SpanQueryBase);

            this._queryOpts.big = spanQry;
            return this;
        }
    }]);
    return SpanLittleBigQueryBase;
}(SpanQueryBase);

module.exports = SpanLittleBigQueryBase;