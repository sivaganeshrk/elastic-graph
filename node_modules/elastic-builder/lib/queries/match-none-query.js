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
 * The inverse of the `match_all` query, which matches no documents.
 *
 * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-match-all-query.html)
 *
 * @example
 * const qry = esb.matchNoneQuery();
 *
 * @extends Query
 */


var MatchNoneQuery = function (_Query) {
    (0, _inherits3.default)(MatchNoneQuery, _Query);

    // eslint-disable-next-line require-jsdoc
    function MatchNoneQuery() {
        (0, _classCallCheck3.default)(this, MatchNoneQuery);
        return (0, _possibleConstructorReturn3.default)(this, (MatchNoneQuery.__proto__ || Object.getPrototypeOf(MatchNoneQuery)).call(this, 'match_none'));
    }

    return MatchNoneQuery;
}(Query);

module.exports = MatchNoneQuery;