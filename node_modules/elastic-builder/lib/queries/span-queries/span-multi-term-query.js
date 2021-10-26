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
    checkType = _require.util.checkType;

var _require2 = require('../term-level-queries'),
    MultiTermQueryBase = _require2.MultiTermQueryBase;

var SpanQueryBase = require('./span-query-base');

/**
 * The `span_multi` query allows you to wrap a `multi term query` (one of wildcard,
 * fuzzy, prefix, range or regexp query) as a `span query`, so it can be nested.
 *
 * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-span-multi-term-query.html)
 *
 * @example
 * const spanQry = esb.spanMultiTermQuery()
 *     .match(esb.prefixQuery('user', 'ki').boost(1.08));
 *
 * @param {MultiTermQueryBase=} multiTermQry One of wildcard, fuzzy, prefix, range or regexp query
 *
 * @extends SpanQueryBase
 */

var SpanMultiTermQuery = function (_SpanQueryBase) {
    (0, _inherits3.default)(SpanMultiTermQuery, _SpanQueryBase);

    // eslint-disable-next-line require-jsdoc
    function SpanMultiTermQuery(multiTermQry) {
        (0, _classCallCheck3.default)(this, SpanMultiTermQuery);

        var _this = (0, _possibleConstructorReturn3.default)(this, (SpanMultiTermQuery.__proto__ || Object.getPrototypeOf(SpanMultiTermQuery)).call(this, 'span_multi'));

        if (!isNil(multiTermQry)) _this.match(multiTermQry);
        return _this;
    }

    /**
     * Sets the multi term query.
     *
     * @param {MultiTermQueryBase} multiTermQry One of wildcard, fuzzy, prefix, range or regexp query
     * @returns {SpanMultiTermQuery} returns `this` so that calls can be chained.
     */


    (0, _createClass3.default)(SpanMultiTermQuery, [{
        key: 'match',
        value: function match(multiTermQry) {
            checkType(multiTermQry, MultiTermQueryBase);

            this._queryOpts.match = multiTermQry;
            return this;
        }
    }]);
    return SpanMultiTermQuery;
}(SpanQueryBase);

module.exports = SpanMultiTermQuery;