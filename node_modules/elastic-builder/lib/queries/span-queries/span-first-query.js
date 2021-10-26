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

var SpanQueryBase = require('./span-query-base');

/**
 * Matches spans near the beginning of a field. The span first query maps to Lucene `SpanFirstQuery`.
 *
 * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-span-first-query.html)
 *
 * @example
 * const spanQry = esb.spanFirstQuery()
 *     .match(esb.spanTermQuery('user', 'kimchy'))
 *     .end(3);
 *
 * @param {SpanQueryBase=} spanQry Any other span type query
 *
 * @extends SpanQueryBase
 */

var SpanFirstQuery = function (_SpanQueryBase) {
    (0, _inherits3.default)(SpanFirstQuery, _SpanQueryBase);

    // eslint-disable-next-line require-jsdoc
    function SpanFirstQuery(spanQry) {
        (0, _classCallCheck3.default)(this, SpanFirstQuery);

        var _this = (0, _possibleConstructorReturn3.default)(this, (SpanFirstQuery.__proto__ || Object.getPrototypeOf(SpanFirstQuery)).call(this, 'span_first'));

        if (!isNil(spanQry)) _this.match(spanQry);
        return _this;
    }

    /**
     * Sets the `match` clause which can be any other span type query.
     *
     * @param {SpanQueryBase} spanQry
     * @returns {SpanFirstQuery} returns `this` so that calls can be chained.
     */


    (0, _createClass3.default)(SpanFirstQuery, [{
        key: 'match',
        value: function match(spanQry) {
            checkType(spanQry, SpanQueryBase);

            this._queryOpts.match = spanQry;
            return this;
        }

        /**
         * Sets the maximum end position permitted in a match.
         *
         * @param {number} limit The maximum end position permitted in a match.
         * @returns {SpanFirstQuery} returns `this` so that calls can be chained.
         */

    }, {
        key: 'end',
        value: function end(limit) {
            this._queryOpts.end = limit;
            return this;
        }
    }]);
    return SpanFirstQuery;
}(SpanQueryBase);

module.exports = SpanFirstQuery;