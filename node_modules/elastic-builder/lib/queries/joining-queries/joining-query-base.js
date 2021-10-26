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
    Query = _require.Query,
    InnerHits = _require.InnerHits,
    _require$util = _require.util,
    checkType = _require$util.checkType,
    invalidParam = _require$util.invalidParam,
    NESTED_SCORE_MODE_SET = _require.consts.NESTED_SCORE_MODE_SET;

var invalidScoreModeParam = invalidParam('', 'score_mode', NESTED_SCORE_MODE_SET);
/**
 * The `JoiningQueryBase` class provides support for common options used across
 * various joining query implementations.
 *
 * **NOTE:** Instantiating this directly should not be required.
 * However, if you wish to add a custom implementation for whatever reason,
 * this class could be extended.
 *
 * @param {string} queryType
 * @param {string} refUrl
 * @param {Query=} qry A valid `Query` object
 *
 * @extends Query
 */

var JoiningQueryBase = function (_Query) {
    (0, _inherits3.default)(JoiningQueryBase, _Query);

    // eslint-disable-next-line require-jsdoc
    function JoiningQueryBase(queryType, refUrl, qry) {
        (0, _classCallCheck3.default)(this, JoiningQueryBase);

        var _this = (0, _possibleConstructorReturn3.default)(this, (JoiningQueryBase.__proto__ || Object.getPrototypeOf(JoiningQueryBase)).call(this, queryType));

        _this.refUrl = refUrl;

        if (!isNil(qry)) _this.query(qry);
        return _this;
    }

    /**
     * Sets the nested query to be executed.
     *
     * @param {Query} qry A valid `Query` object
     * @returns {JoiningQueryBase} returns `this` so that calls can be chained.
     */


    (0, _createClass3.default)(JoiningQueryBase, [{
        key: 'query',
        value: function query(qry) {
            checkType(qry, Query);

            this._queryOpts.query = qry;
            return this;
        }

        /**
         * Sets the scoring method.
         *
         * Valid values are:
         * - `none` - no scoring
         * - `max` - the highest score of all matched child documents is used
         * - `min` - the lowest score of all matched child documents is used
         * - `sum` - the sum the all the matched child documents is used
         * - `avg` - the default, the average of all matched child documents is used
         *
         * @example
         * const qry = esb.hasChildQuery(
         *     esb.termQuery('tag', 'something'),
         *     'blog_tag'
         * ).scoreMode('min');
         *
         * @param {string} mode Can be one of `none`, `sum`, `min`, `max`, `avg`.
         * Defaults to `avg` for `NestedQuery`, `none` for `HasChildQuery`.
         * @returns {JoiningQueryBase} returns `this` so that calls can be chained.
         */

    }, {
        key: 'scoreMode',
        value: function scoreMode(mode) {
            if (isNil(mode)) invalidScoreModeParam(mode);

            var modeLower = mode.toLowerCase();
            if (!NESTED_SCORE_MODE_SET.has(modeLower)) {
                invalidScoreModeParam(mode);
            }

            this._queryOpts.score_mode = modeLower;
            return this;
        }

        /**
         * When set to `true` will ignore an unmapped `path` and will not match any
         * documents for this query. When set to `false` (the default value) the query
         * will throw an exception if the path is not mapped.
         *
         * @param {boolean} enable `true` or `false`, `false` by default.
         * @returns {JoiningQueryBase} returns `this` so that calls can be chained.
         */

    }, {
        key: 'ignoreUnmapped',
        value: function ignoreUnmapped(enable) {
            this._queryOpts.ignore_unmapped = enable;
            return this;
        }

        /**
         * Sets the inner hits options
         *
         * @param {InnerHits} innerHits A valid `InnerHits` object
         * @returns {JoiningQueryBase} returns `this` so that calls can be chained.
         */

    }, {
        key: 'innerHits',
        value: function innerHits(_innerHits) {
            checkType(_innerHits, InnerHits);

            this._queryOpts.inner_hits = _innerHits;
            return this;
        }
    }]);
    return JoiningQueryBase;
}(Query);

module.exports = JoiningQueryBase;