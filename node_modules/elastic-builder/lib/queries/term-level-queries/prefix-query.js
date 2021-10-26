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

var MultiTermQueryBase = require('./multi-term-query-base');

var _require = require('../helper'),
    validateRewiteMethod = _require.validateRewiteMethod;

var ES_REF_URL = 'https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-prefix-query.html';

/**
 * Matches documents that have fields containing terms with a specified prefix (**not analyzed**).
 *
 * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-prefix-query.html)
 *
 * @example
 * const qry = esb.prefixQuery('user', 'ki').boost(2.0);
 *
 * @param {string=} field
 * @param {string|number=} value
 *
 * @extends MultiTermQueryBase
 */

var PrefixQuery = function (_MultiTermQueryBase) {
    (0, _inherits3.default)(PrefixQuery, _MultiTermQueryBase);

    // eslint-disable-next-line require-jsdoc
    function PrefixQuery(field, value) {
        (0, _classCallCheck3.default)(this, PrefixQuery);
        return (0, _possibleConstructorReturn3.default)(this, (PrefixQuery.__proto__ || Object.getPrototypeOf(PrefixQuery)).call(this, 'prefix', field, value));
    }

    /**
     * Sets the rewrite method. Valid values are:
     * - `constant_score` - tries to pick the best constant-score rewrite
     *  method based on term and document counts from the query.
     *  Synonyms - `constant_score_auto`, `constant_score_filter`
     *
     * - `scoring_boolean` - translates each term into boolean should and
     *  keeps the scores as computed by the query
     *
     * - `constant_score_boolean` - same as `scoring_boolean`, expect no scores
     *  are computed.
     *
     * - `constant_score_filter` - first creates a private Filter, by visiting
     *  each term in sequence and marking all docs for that term
     *
     * - `top_terms_boost_N` - first translates each term into boolean should
     *  and scores are only computed as the boost using the top N
     *  scoring terms. Replace N with an integer value.
     *
     * - `top_terms_N` - first translates each term into boolean should
     *  and keeps the scores as computed by the query. Only the top N
     *  scoring terms are used. Replace N with an integer value.
     *
     * Default is `constant_score`.
     *
     * This is an advanced option, use with care.
     *
     * Note: The deprecated multi term rewrite parameters `constant_score_auto`,
     * `constant_score_filter` (synonyms for `constant_score`) have been removed
     * in elasticsearch 6.0.
     *
     * @param {string} method The rewrite method as a string.
     * @returns {PrefixQuery} returns `this` so that calls can be chained.
     * @throws {Error} If the given `rewrite` method is not valid.
     */


    (0, _createClass3.default)(PrefixQuery, [{
        key: 'rewrite',
        value: function rewrite(method) {
            validateRewiteMethod(method, 'rewrite', ES_REF_URL);

            this._queryOpts.rewrite = method;
            return this;
        }
    }]);
    return PrefixQuery;
}(MultiTermQueryBase);

module.exports = PrefixQuery;