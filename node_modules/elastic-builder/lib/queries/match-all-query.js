'use strict';

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _require = require('../core'),
    Query = _require.Query;

/**
 * The most simple query, which matches all documents, giving them all a `_score` of `1.0`.
 *
 * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-match-all-query.html)
 *
 * @example
 * const qry = esb.matchAllQuery().boost(1.2);
 *
 * @extends Query
 */


var MatchAllQuery = function (_Query) {
    (0, _inherits3.default)(MatchAllQuery, _Query);

    // eslint-disable-next-line require-jsdoc
    function MatchAllQuery() {
        (0, _classCallCheck3.default)(this, MatchAllQuery);
        return (0, _possibleConstructorReturn3.default)(this, (MatchAllQuery.__proto__ || Object.getPrototypeOf(MatchAllQuery)).call(this, 'match_all'));
    }

    return MatchAllQuery;
}(Query);

module.exports = MatchAllQuery;