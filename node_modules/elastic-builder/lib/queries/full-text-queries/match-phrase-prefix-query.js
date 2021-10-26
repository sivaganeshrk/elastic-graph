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

var MatchPhraseQueryBase = require('./match-phrase-query-base');

var ES_REF_URL = 'https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-match-query-phrase-prefix.html';

/**
 * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-match-query-phrase-prefix.html)
 *
 * @example
 * const qry = esb.matchPhrasePrefixQuery('message', 'quick brown f');
 *
 * @param {string=} field The document field to query against
 * @param {string=} queryString The query string
 *
 * @extends MatchPhraseQueryBase
 */

var MatchPhrasePrefixQuery = function (_MatchPhraseQueryBase) {
    (0, _inherits3.default)(MatchPhrasePrefixQuery, _MatchPhraseQueryBase);

    // eslint-disable-next-line require-jsdoc
    function MatchPhrasePrefixQuery(field, queryString) {
        (0, _classCallCheck3.default)(this, MatchPhrasePrefixQuery);
        return (0, _possibleConstructorReturn3.default)(this, (MatchPhrasePrefixQuery.__proto__ || Object.getPrototypeOf(MatchPhrasePrefixQuery)).call(this, 'match_phrase_prefix', ES_REF_URL, field, queryString));
    }

    /**
     * Control to how many prefixes the last term will be expanded.
     *
     * @example
     * const qry = esb.matchPhrasePrefixQuery('message', 'quick brown f')
     *     .maxExpansions(10);
     *
     * @param {number} limit Defaults to 50.
     * @returns {MatchPhrasePrefixQuery} returns `this` so that calls can be chained.
     */


    (0, _createClass3.default)(MatchPhrasePrefixQuery, [{
        key: 'maxExpansions',
        value: function maxExpansions(limit) {
            this._queryOpts.max_expansions = limit;
            return this;
        }
    }]);
    return MatchPhrasePrefixQuery;
}(MatchPhraseQueryBase);

module.exports = MatchPhrasePrefixQuery;