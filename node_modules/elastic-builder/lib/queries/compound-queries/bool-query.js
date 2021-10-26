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
var head = require('lodash.head');
var omit = require('lodash.omit');

var _require = require('../../core'),
    Query = _require.Query,
    _require$util = _require.util,
    checkType = _require$util.checkType,
    setDefault = _require$util.setDefault,
    recursiveToJSON = _require$util.recursiveToJSON;

/**
 * A query that matches documents matching boolean combinations of other queries.
 * The bool query maps to Lucene `BooleanQuery`. It is built using one or more
 * boolean clauses, each clause with a typed occurrence.
 *
 * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-bool-query.html)
 *
 * @example
 * const qry = esb.boolQuery()
 *     .must(esb.termQuery('user', 'kimchy'))
 *     .filter(esb.termQuery('tag', 'tech'))
 *     .mustNot(esb.rangeQuery('age').gte(10).lte(20))
 *     .should([
 *         esb.termQuery('tag', 'wow'),
 *         esb.termQuery('tag', 'elasticsearch')
 *     ])
 *     .minimumShouldMatch(1)
 *     .boost(1.0);
 *
 * @extends Query
 */


var BoolQuery = function (_Query) {
    (0, _inherits3.default)(BoolQuery, _Query);

    // eslint-disable-next-line require-jsdoc
    function BoolQuery() {
        (0, _classCallCheck3.default)(this, BoolQuery);
        return (0, _possibleConstructorReturn3.default)(this, (BoolQuery.__proto__ || Object.getPrototypeOf(BoolQuery)).call(this, 'bool'));
    }

    /**
     * Add given query to list of queries under given clause.
     *
     * @private
     * @param {string} clause
     * @param {Query} query
     * @throws {TypeError} If query is not an instance of `Query`
     */


    (0, _createClass3.default)(BoolQuery, [{
        key: '_addQuery',
        value: function _addQuery(clause, query) {
            checkType(query, Query);

            this._queryOpts[clause].push(query);
        }

        /**
         * Add given query array or query to list of queries under given clause.
         *
         * @private
         * @param {string} clause
         * @param {Array<Query>|Query} queries List of valid `Query` objects or a `Query` object
         * @throws {TypeError} If Array item or query is not an instance of `Query`
         */

    }, {
        key: '_addQueries',
        value: function _addQueries(clause, queries) {
            var _this2 = this;

            setDefault(this._queryOpts, clause, []);

            if (Array.isArray(queries)) queries.forEach(function (qry) {
                return _this2._addQuery(clause, qry);
            });else this._addQuery(clause, queries);
        }

        /**
         * Adds `must` query to boolean container.
         * The clause (query) **must** appear in matching documents and will contribute to the score.
         *
         * @param {Array<Query>|Query} queries List of valid `Query` objects or a `Query` object
         * @returns {BoolQuery} returns `this` so that calls can be chained.
         * @throws {TypeError} If Array item or query is not an instance of `Query`
         */

    }, {
        key: 'must',
        value: function must(queries) {
            this._addQueries('must', queries);
            return this;
        }

        /**
         * Adds `filter` query to boolean container.
         * The clause (query) **must** appear in matching documents. However unlike `must` the score
         * of the query will be ignored. Filter clauses are executed in filter context, meaning that
         * scoring is ignored and clauses are considered for caching.
         *
         * @example
         * // Assign score of `0` to all documents
         * const qry = esb.boolQuery().filter(esb.termQuery('status', 'active'));
         *
         * // Assign a score of `1.0` to all documents
         * const qry = esb.boolQuery()
         *     .must(esb.matchAllQuery())
         *     .filter(esb.termQuery('status', 'active'));
         *
         * @param {Array<Query>|Query} queries List of valid `Query` objects or a `Query` object
         * @returns {BoolQuery} returns `this` so that calls can be chained.
         * @throws {TypeError} If Array item or query is not an instance of `Query`
         */

    }, {
        key: 'filter',
        value: function filter(queries) {
            this._addQueries('filter', queries);
            return this;
        }

        /**
         * Adds `must_not` query to boolean container.
         * The clause (query) **must not** appear in the matching documents.
         * Clauses are executed in filter context meaning that scoring is ignored
         * and clauses are considered for caching. Because scoring is ignored,
         * a score of 0 for all documents is returned.
         *
         * @param {Array<Query>|Query} queries List of valid `Query` objects or a `Query` object
         * @returns {BoolQuery} returns `this` so that calls can be chained.
         * @throws {TypeError} If Array item or query is not an instance of `Query`
         */

    }, {
        key: 'mustNot',
        value: function mustNot(queries) {
            this._addQueries('must_not', queries);
            return this;
        }

        /**
         * Adds `should` query to boolean container.
         * The clause (query) **should** appear in the matching document. In a boolean query with
         * no must or filter clauses, one or more should clauses must match a document.
         * The minimum number of should clauses to match can be set using the
         * `minimum_should_match` parameter.
         *
         * @param {Array<Query>|Query} queries List of valid `Query` objects or a `Query` object
         * @returns {BoolQuery} returns `this` so that calls can be chained.
         * @throws {TypeError} If Array item or query is not an instance of `Query`
         */

    }, {
        key: 'should',
        value: function should(queries) {
            this._addQueries('should', queries);
            return this;
        }

        /**
         * Enables or disables similarity coordinate scoring of documents
         * commoning the `CommonTermsQuery`. Default: `false`.
         *
         * **NOTE**: This has been removed in elasticsearch 6.0. If provided,
         * it will be ignored and a deprecation warning will be issued.
         *
         * @param {boolean} enable
         * @returns {BoolQuery} returns `this` so that calls can be chained.
         */

    }, {
        key: 'disableCoord',
        value: function disableCoord(enable) {
            this._queryOpts.disable_coord = enable;
            return this;
        }

        /**
         * Sets the value controlling how many `should` clauses in the boolean
         * query should match. It can be an absolute value (2), a percentage (30%)
         * or a combination of both. By default no optional clauses are necessary for a match.
         * However, if the bool query is used in a filter context and it has `should` clauses then,
         * at least one `should` clause is required to match.
         *
         * @param {string|number} minimumShouldMatch An absolute value (2), a percentage (30%)
         * or a combination of both.
         * @returns {BoolQuery} returns `this` so that calls can be chained.
         */

    }, {
        key: 'minimumShouldMatch',
        value: function minimumShouldMatch(_minimumShouldMatch) {
            this._queryOpts.minimum_should_match = _minimumShouldMatch;
            return this;
        }

        /**
         * Sets if the `Query` should be enhanced with a `MatchAllQuery` in order
         * to act as a pure exclude when only negative (mustNot) clauses exist. Default: true.
         *
         * @param {boolean} enable
         * @returns {BoolQuery} returns `this` so that calls can be chained.
         */

    }, {
        key: 'adjustPureNegative',
        value: function adjustPureNegative(enable) {
            this._queryOpts.adjust_pure_negative = enable;
            return this;
        }

        /**
         * Override default `toJSON` to return DSL representation of the `bool` compound query
         * class instance.
         *
         * @override
         * @returns {Object} returns an Object which maps to the elasticsearch query DSL
         */

    }, {
        key: 'toJSON',
        value: function toJSON() {
            var _this3 = this;

            var clauseKeys = ['must', 'filter', 'must_not', 'should'];

            // Pick the clauses which have some queries
            var cleanQryOpts = clauseKeys.filter(function (clause) {
                return has(_this3._queryOpts, clause);
            }).reduce(
            // Unwrap array and put into qryOpts if required
            function (qryOpts, clause) {
                var clauseQueries = _this3._queryOpts[clause];
                qryOpts[clause] = recursiveToJSON(clauseQueries.length === 1 ? head(clauseQueries) : clauseQueries);
                return qryOpts;
            },
            // initial value - all key-value except clauses
            omit(this._queryOpts, clauseKeys));

            return (0, _defineProperty3.default)({}, this.queryType, cleanQryOpts);
        }
    }]);
    return BoolQuery;
}(Query);

module.exports = BoolQuery;