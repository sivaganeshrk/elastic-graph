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

var MonoFieldQueryBase = require('./mono-field-query-base');

/**
 * The `MatchPhraseQueryBase` provides support for common options used across
 * various bucket match phrase query implementations.
 *
 * **NOTE:** Instantiating this directly should not be required.
 * However, if you wish to add a custom implementation for whatever reason,
 * this class could be extended.
 *
 * @param {string} queryType
 * @param {string} refUrl
 * @param {string=} field The document field to query against
 * @param {string=} queryString The query string
 *
 * @extends MonoFieldQueryBase
 */

var MatchPhraseQueryBase = function (_MonoFieldQueryBase) {
    (0, _inherits3.default)(MatchPhraseQueryBase, _MonoFieldQueryBase);

    // eslint-disable-next-line require-jsdoc
    function MatchPhraseQueryBase(queryType, refUrl, field, queryString) {
        (0, _classCallCheck3.default)(this, MatchPhraseQueryBase);

        var _this = (0, _possibleConstructorReturn3.default)(this, (MatchPhraseQueryBase.__proto__ || Object.getPrototypeOf(MatchPhraseQueryBase)).call(this, queryType, field, queryString));

        _this._refUrl = refUrl;
        return _this;
    }

    /**
     * @override
     * @throws {Error} This method cannot be called on `MatchPhraseQueryBase`
     */


    (0, _createClass3.default)(MatchPhraseQueryBase, [{
        key: 'minimumShouldMatch',
        value: function minimumShouldMatch() {
            console.log('Please refer ' + this._refUrl);
            throw new Error('minimumShouldMatch is not supported in ' + this.constructor.name);
        }

        /**
         * Configures the `slop`(default is 0) for matching terms in any order.
         * Transposed terms have a slop of 2.
         *
         * @param {number} slop A positive integer value, defaults is 0.
         * @returns {MatchPhraseQueryBase} returns `this` so that calls can be chained.
         */

    }, {
        key: 'slop',
        value: function slop(_slop) {
            this._queryOpts.slop = _slop;
            return this;
        }
    }]);
    return MatchPhraseQueryBase;
}(MonoFieldQueryBase);

module.exports = MatchPhraseQueryBase;