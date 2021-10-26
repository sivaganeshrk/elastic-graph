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
    Query = _require.Query,
    _require$util = _require.util,
    checkType = _require$util.checkType,
    setDefault = _require$util.setDefault;

/**
 * A query that generates the union of documents produced by its subqueries,
 * and that scores each document with the maximum score for that document
 * as produced by any subquery, plus a tie breaking increment for
 * any additional matching subqueries.
 *
 * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-dis-max-query.html)
 *
 * @example
 * const qry = esb.disMaxQuery()
 *     .queries([esb.termQuery('age', 34), esb.termQuery('age', 35)])
 *     .tieBreaker(0.7)
 *     .boost(1.2);
 *
 * @example
 * const qry = esb.disMaxQuery()
 *     .queries([
 *         esb.matchQuery('subject', 'brown fox'),
 *         esb.matchQuery('message', 'brown fox')
 *     ])
 *     .tieBreaker(0.3);
 *
 * @extends Query
 */


var DisMaxQuery = function (_Query) {
    (0, _inherits3.default)(DisMaxQuery, _Query);

    // eslint-disable-next-line require-jsdoc
    function DisMaxQuery() {
        (0, _classCallCheck3.default)(this, DisMaxQuery);
        return (0, _possibleConstructorReturn3.default)(this, (DisMaxQuery.__proto__ || Object.getPrototypeOf(DisMaxQuery)).call(this, 'dis_max'));
    }

    /**
     * Add given query to list of queries under given clause.
     *
     * @private
     * @param {Query} query
     * @throws {TypeError} If query is not an instance of `Query`
     */


    (0, _createClass3.default)(DisMaxQuery, [{
        key: '_addQuery',
        value: function _addQuery(query) {
            checkType(query, Query);

            this._queryOpts.queries.push(query);
        }

        /**
         * The tie breaker value. The tie breaker capability allows results
         * that include the same term in multiple fields to be judged better than
         * results that include this term in only the best of those multiple
         * fields, without confusing this with the better case of two different
         * terms in the multiple fields. Default: `0.0`.
         *
         * @param {number} factor
         * @returns {DisMaxQuery} returns `this` so that calls can be chained.
         */

    }, {
        key: 'tieBreaker',
        value: function tieBreaker(factor) {
            this._queryOpts.tie_breaker = factor;
            return this;
        }

        /**
         * Add given query array or query to list of queries
         *
         * @param {Array<Query>|Query} queries Array of valid `Query` objects or a `Query` object
         * @returns {DisMaxQuery} returns `this` so that calls can be chained.
         */

    }, {
        key: 'queries',
        value: function queries(_queries) {
            var _this2 = this;

            setDefault(this._queryOpts, 'queries', []);

            if (Array.isArray(_queries)) _queries.forEach(function (qry) {
                return _this2._addQuery(qry);
            });else this._addQuery(_queries);

            return this;
        }
    }]);
    return DisMaxQuery;
}(Query);

module.exports = DisMaxQuery;