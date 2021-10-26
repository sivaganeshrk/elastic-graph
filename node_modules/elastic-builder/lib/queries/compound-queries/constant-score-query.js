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
    checkType = _require.util.checkType;

/**
 * A query that wraps another query and simply returns a constant score
 * equal to the query boost for every document in the filter.
 * Maps to Lucene `ConstantScoreQuery`.
 *
 * Constructs a query where each documents returned by the internal
 * query or filter have a constant score equal to the boost factor.
 *
 * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-constant-score-query.html)
 *
 * @example
 * const qry = esb.constantScoreQuery(esb.termQuery('user', 'kimchy')).boost(1.2);
 *
 * @param {Query=} filterQuery Query to filter on.
 *
 * @extends Query
 */


var ConstantScoreQuery = function (_Query) {
    (0, _inherits3.default)(ConstantScoreQuery, _Query);

    // eslint-disable-next-line require-jsdoc
    function ConstantScoreQuery(filterQuery) {
        (0, _classCallCheck3.default)(this, ConstantScoreQuery);

        var _this = (0, _possibleConstructorReturn3.default)(this, (ConstantScoreQuery.__proto__ || Object.getPrototypeOf(ConstantScoreQuery)).call(this, 'constant_score'));

        if (!isNil(filterQuery)) _this.filter(filterQuery);
        return _this;
    }

    /**
     * Adds the query to apply a constant score to.
     *
     * @param {Query} filterQuery  Query to filter on.
     * @returns {ConstantScoreQuery} returns `this` so that calls can be chained.
     */


    (0, _createClass3.default)(ConstantScoreQuery, [{
        key: 'filter',
        value: function filter(filterQuery) {
            checkType(filterQuery, Query);

            this._queryOpts.filter = filterQuery;
            return this;
        }

        /**
         * Adds the query to apply a constant score to.
         * Alias for method `filter`.
         *
         * Note: This parameter has been removed in elasticsearch 6.0. Use `filter` instead.
         *
         * @param {Query} filterQuery  Query to filter on.
         * @returns {ConstantScoreQuery} returns `this` so that calls can be chained.
         */

    }, {
        key: 'query',
        value: function query(filterQuery) {
            return this.filter(filterQuery);
        }
    }]);
    return ConstantScoreQuery;
}(Query);

module.exports = ConstantScoreQuery;