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

var QueryStringQueryBase = require('./query-string-query-base');

var ES_REF_URL = 'https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-simple-query-string-query.html';

/**
 * A query that uses the `SimpleQueryParser` to parse its context.
 * Unlike the regular `query_string` query, the `simple_query_string` query
 * will never throw an exception, and discards invalid parts of the query.
 *
 * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-simple-query-string-query.html)
 *
 * @example
 * const qry = esb.simpleQueryStringQuery(
 *     '"fried eggs" +(eggplant | potato) -frittata'
 * )
 *     .analyzer('snowball')
 *     .fields(['body^5', '_all'])
 *     .defaultOperator('and');
 *
 * @param {string=} queryString The query string
 *
 * @extends QueryStringQueryBase
 */

var SimpleQueryStringQuery = function (_QueryStringQueryBase) {
    (0, _inherits3.default)(SimpleQueryStringQuery, _QueryStringQueryBase);

    // eslint-disable-next-line require-jsdoc
    function SimpleQueryStringQuery(queryString) {
        (0, _classCallCheck3.default)(this, SimpleQueryStringQuery);
        return (0, _possibleConstructorReturn3.default)(this, (SimpleQueryStringQuery.__proto__ || Object.getPrototypeOf(SimpleQueryStringQuery)).call(this, 'simple_query_string', ES_REF_URL, queryString));
    }

    /**
     * `simple_query_string` support multiple flags to specify which parsing features
     * should be enabled. It is specified as a `|`-delimited string.
     *
     * @example
     * const qry = esb.simpleQueryStringQuery('foo | bar + baz*')
     *     .flags('OR|AND|PREFIX');
     *
     * @param {string} flags `|` delimited string. The available flags are: `ALL`, `NONE`,
     * `AND`, `OR`, `NOT`, `PREFIX`, `PHRASE`, `PRECEDENCE`, `ESCAPE`, `WHITESPACE`,
     * `FUZZY`, `NEAR`, and `SLOP`.
     * @returns {SimpleQueryStringQuery} returns `this` so that calls can be chained.
     */


    (0, _createClass3.default)(SimpleQueryStringQuery, [{
        key: 'flags',
        value: function flags(_flags) {
            this._queryOpts.flags = _flags;
            return this;
        }
    }]);
    return SimpleQueryStringQuery;
}(QueryStringQueryBase);

module.exports = SimpleQueryStringQuery;