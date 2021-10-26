'use strict';

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MatchPhraseQueryBase = require('./match-phrase-query-base');

var ES_REF_URL = 'https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-match-query-phrase.html';

/**
 * The `match_phrase` query analyzes the text and creates a `phrase` query out of
 * the analyzed text.
 *
 * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-match-query-phrase.html)
 *
 * @example
 * const qry = esb.matchPhraseQuery('message', 'to be or not to be');
 *
 * @param {string=} field The document field to query against
 * @param {string=} queryString The query string
 *
 * @extends MatchPhraseQueryBase
 */

var MatchPhraseQuery = function (_MatchPhraseQueryBase) {
    (0, _inherits3.default)(MatchPhraseQuery, _MatchPhraseQueryBase);

    // eslint-disable-next-line require-jsdoc
    function MatchPhraseQuery(field, queryString) {
        (0, _classCallCheck3.default)(this, MatchPhraseQuery);
        return (0, _possibleConstructorReturn3.default)(this, (MatchPhraseQuery.__proto__ || Object.getPrototypeOf(MatchPhraseQuery)).call(this, 'match_phrase', ES_REF_URL, field, queryString));
    }

    return MatchPhraseQuery;
}(MatchPhraseQueryBase);

module.exports = MatchPhraseQuery;