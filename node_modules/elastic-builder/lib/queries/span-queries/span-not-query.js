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
 * Removes matches which overlap with another span query. The span not query
 * maps to Lucene `SpanNotQuery`.
 *
 * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-span-not-query.html)
 *
 * @example
 * const spanQry = esb.spanNotQuery()
 *     .include(esb.spanTermQuery('field1', 'hoya'))
 *     .exclude(esb.spanNearQuery()
 *         .clauses([
 *             esb.spanTermQuery('field1', 'la'),
 *             esb.spanTermQuery('field1', 'hoya')
 *         ])
 *         .slop(0)
 *         .inOrder(true));
 *
 * @extends SpanQueryBase
 */

var SpanNotQuery = function (_SpanQueryBase) {
    (0, _inherits3.default)(SpanNotQuery, _SpanQueryBase);

    // eslint-disable-next-line require-jsdoc
    function SpanNotQuery() {
        (0, _classCallCheck3.default)(this, SpanNotQuery);
        return (0, _possibleConstructorReturn3.default)(this, (SpanNotQuery.__proto__ || Object.getPrototypeOf(SpanNotQuery)).call(this, 'span_not'));
    }

    /**
     * Sets the `include` clause which is the span query whose matches are filtered
     *
     * @param {SpanQueryBase} spanQry
     * @returns {SpanNotQuery} returns `this` so that calls can be chained.
     */


    (0, _createClass3.default)(SpanNotQuery, [{
        key: 'include',
        value: function include(spanQry) {
            checkType(spanQry, SpanQueryBase);

            this._queryOpts.include = spanQry;
            return this;
        }

        /**
         * Sets the `exclude` clause which is the span query whose matches must
         * not overlap those returned.
         *
         * @param {SpanQueryBase} spanQry
         * @returns {SpanNotQuery} returns `this` so that calls can be chained.
         */

    }, {
        key: 'exclude',
        value: function exclude(spanQry) {
            checkType(spanQry, SpanQueryBase);

            this._queryOpts.exclude = spanQry;
            return this;
        }

        /**
         * If set the amount of tokens before the include span can't have overlap with
         * the exclude span.
         *
         * @param {number} pre
         * @returns {SpanNotQuery} returns `this` so that calls can be chained.
         */

    }, {
        key: 'pre',
        value: function pre(_pre) {
            this._queryOpts.pre = _pre;
            return this;
        }

        /**
         * If set the amount of tokens after the include span can't have overlap with the exclude span.
         *
         * @param {number} post
         * @returns {SpanNotQuery} returns `this` so that calls can be chained.
         */

    }, {
        key: 'post',
        value: function post(_post) {
            this._queryOpts.post = _post;
            return this;
        }

        /**
         * If set the amount of tokens from within the include span can't have overlap
         * with the exclude span. Equivalent of setting both `pre` and `post`.
         *
         * @param {number} dist
         * @returns {SpanNotQuery} returns `this` so that calls can be chained.
         */

    }, {
        key: 'dist',
        value: function dist(_dist) {
            this._queryOpts.dist = _dist;
            return this;
        }
    }]);
    return SpanNotQuery;
}(SpanQueryBase);

module.exports = SpanNotQuery;