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

var _require = require('../core'),
    _require$consts = _require.consts,
    SUGGEST_MODE_SET = _require$consts.SUGGEST_MODE_SET,
    STRING_DISTANCE_SET = _require$consts.STRING_DISTANCE_SET,
    invalidParam = _require.util.invalidParam;

var AnalyzedSuggesterBase = require('./analyzed-suggester-base');

var ES_REF_URL = 'https://www.elastic.co/guide/en/elasticsearch/reference/current/search-suggesters-term.html';

var invalidSortParam = invalidParam(ES_REF_URL, 'sort', "'score' or 'frequency'");
var invalidSuggestModeParam = invalidParam(ES_REF_URL, 'suggest_mode', SUGGEST_MODE_SET);
var invalidStringDistanceParam = invalidParam(ES_REF_URL, 'string_distance', STRING_DISTANCE_SET);

/**
 * The term suggester suggests terms based on edit distance.
 * The provided suggest text is analyzed before terms are suggested.
 * The suggested terms are provided per analyzed suggest text token.
 * The term suggester doesn’t take the query into account that is part of request.
 *
 * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-suggesters-term.html)
 *
 * @example
 * const suggest = esb.termSuggester(
 *     'my-suggestion',
 *     'message',
 *     'tring out Elasticsearch'
 * );
 *
 * @param {string} name The name of the Suggester, an arbitrary identifier
 * @param {string=} field The field to fetch the candidate suggestions from.
 * @param {string=} txt A string to get suggestions for.
 *
 * @throws {Error} if `name` is empty
 *
 * @extends AnalyzedSuggesterBase
 */

var TermSuggester = function (_AnalyzedSuggesterBas) {
    (0, _inherits3.default)(TermSuggester, _AnalyzedSuggesterBas);

    // eslint-disable-next-line require-jsdoc
    function TermSuggester(name, field, txt) {
        (0, _classCallCheck3.default)(this, TermSuggester);
        return (0, _possibleConstructorReturn3.default)(this, (TermSuggester.__proto__ || Object.getPrototypeOf(TermSuggester)).call(this, 'term', name, field, txt));
    }

    /**
     * Sets the sort to control how suggestions should be sorted per
     * suggest text term.
     *
     * Two possible values:
     *   - `score`: Sort by score first, then document frequency and
     *     then the term itself.
     *   - `frequency`: Sort by document frequency first, then similarity
     *     score and then the term itself.
     *
     * @param {string} sort Can be `score` or `frequency`
     * @returns {TermSuggester} returns `this` so that calls can be chained.
     * @throws {Error} If `sort` is neither `score` nor `frequency`.
     */


    (0, _createClass3.default)(TermSuggester, [{
        key: 'sort',
        value: function sort(_sort) {
            if (isNil(_sort)) invalidSortParam(_sort);

            var sortLower = _sort.toLowerCase();
            if (sortLower !== 'score' && sortLower !== 'frequency') {
                invalidSortParam(_sort);
            }

            this._suggestOpts.sort = sortLower;
            return this;
        }

        /**
         * Sets the suggest mode which controls what suggestions are included
         * or controls for what suggest text terms, suggestions should be suggested.
         *
         * Three possible values can be specified:
         *   - `missing`: Only provide suggestions for suggest text terms that
         *     are not in the index. This is the default.
         *   - `popular`:  Only suggest suggestions that occur in more docs
         *     than the original suggest text term.
         *   - `always`: Suggest any matching suggestions based on terms in the suggest text.
         *
         * @param {string} mode Can be `missing`, `popular` or `always`
         * @returns {TermSuggester} returns `this` so that calls can be chained.
         * @throws {Error} If `mode` is not one of `missing`, `popular` or `always`.
         */

    }, {
        key: 'suggestMode',
        value: function suggestMode(mode) {
            if (isNil(mode)) invalidSuggestModeParam(mode);

            var modeLower = mode.toLowerCase();
            if (!SUGGEST_MODE_SET.has(modeLower)) {
                invalidSuggestModeParam(mode);
            }

            this._suggestOpts.suggest_mode = modeLower;
            return this;
        }

        /**
         * Sets the maximum edit distance candidate suggestions can have
         * in order to be considered as a suggestion. Can only be a value
         * between 1 and 2. Any other value result in an bad request
         * error being thrown. Defaults to 2.
         *
         * @param {number} maxEdits Value between 1 and 2. Defaults to 2.
         * @returns {TermSuggester} returns `this` so that calls can be chained.
         */

    }, {
        key: 'maxEdits',
        value: function maxEdits(_maxEdits) {
            this._suggestOpts.max_edits = _maxEdits;
            return this;
        }

        /**
         * Sets the number of minimal prefix characters that must match in order
         * to be a candidate suggestions. Defaults to 1.
         *
         * Increasing this number improves spellcheck performance.
         * Usually misspellings don't occur in the beginning of terms.
         *
         * @param {number} len The number of minimal prefix characters that must match in order
         * to be a candidate suggestions. Defaults to 1.
         * @returns {TermSuggester} returns `this` so that calls can be chained.
         */

    }, {
        key: 'prefixLength',
        value: function prefixLength(len) {
            this._suggestOpts.prefix_length = len;
            return this;
        }

        /**
         * Sets the minimum length a suggest text term must have in order to be included.
         * Defaults to 4.
         *
         * @param {number} len The minimum length a suggest text term must have in order
         * to be included. Defaults to 4.
         * @returns {TermSuggester} returns `this` so that calls can be chained.
         */

    }, {
        key: 'minWordLength',
        value: function minWordLength(len) {
            this._suggestOpts.min_word_length = len;
            return this;
        }

        /**
         * Sets factor that is used to multiply with the `shards_size` in order to inspect
         * more candidate spell corrections on the shard level.
         * Can improve accuracy at the cost of performance. Defaults to 5.
         *
         * @param {number} maxInspections Factor used to multiple with `shards_size` in
         * order to inspect more candidate spell corrections on the shard level.
         * Defaults to 5
         * @returns {TermSuggester} returns `this` so that calls can be chained.
         */

    }, {
        key: 'maxInspections',
        value: function maxInspections(_maxInspections) {
            this._suggestOpts.max_inspections = _maxInspections;
            return this;
        }

        /**
         * Sets the minimal threshold in number of documents a suggestion should appear in.
         * This can be specified as an absolute number or as a relative percentage of
         * number of documents. This can improve quality by only suggesting high
         * frequency terms. Defaults to 0f and is not enabled. If a value higher than 1
         * is specified then the number cannot be fractional. The shard level document
         * frequencies are used for this option.
         *
         * @param {number} limit Threshold in number of documents a suggestion
         * should appear in. Defaults to 0f and is not enabled.
         * @returns {TermSuggester} returns `this` so that calls can be chained.
         */

    }, {
        key: 'minDocFreq',
        value: function minDocFreq(limit) {
            this._suggestOpts.min_doc_freq = limit;
            return this;
        }

        /**
         * Sets the maximum threshold in number of documents a suggest text token can
         * exist in order to be included. Can be a relative percentage number (e.g 0.4)
         * or an absolute number to represent document frequencies. If an value higher
         * than 1 is specified then fractional can not be specified. Defaults to 0.01f.
         * This can be used to exclude high frequency terms from being spellchecked.
         * High frequency terms are usually spelled correctly on top of this also
         * improves the spellcheck performance. The shard level document frequencies are
         * used for this option.
         *
         * @param {number} limit Maximum threshold in number of documents a suggest text
         * token can exist in order to be included. Defaults to 0.01f.
         * @returns {TermSuggester} returns `this` so that calls can be chained.
         */

    }, {
        key: 'maxTermFreq',
        value: function maxTermFreq(limit) {
            this._suggestOpts.max_term_freq = limit;
            return this;
        }

        /**
         * Sets the string distance implementation to use for comparing how similar
         * suggested terms are.
         *
         * Five possible values can be specified:
         *   - `internal`: The default based on `damerau_levenshtein` but highly optimized for
         *     comparing string distance for terms inside the index.
         *   - `damerau_levenshtein`: String distance algorithm based on Damerau-Levenshtein
         *     algorithm.
         *   - `levenstein`: String distance algorithm based on Levenstein edit distance
         *     algorithm.
         *   - `jarowinkler`: String distance algorithm based on Jaro-Winkler algorithm.
         *   - `ngram`: String distance algorithm based on character n-grams.
         *
         * @param {string} implMethod One of `internal`, `damerau_levenshtein`, `levenstein`,
         * `jarowinkler`, `ngram`
         * @returns {TermSuggester} returns `this` so that calls can be chained.
         * @throws {Error} If `implMethod` is not one of `internal`, `damerau_levenshtein`,
         * `levenstein`, `jarowinkler` or ngram`.
         */

    }, {
        key: 'stringDistance',
        value: function stringDistance(implMethod) {
            if (isNil(implMethod)) invalidStringDistanceParam(implMethod);

            var implMethodLower = implMethod.toLowerCase();
            if (!STRING_DISTANCE_SET.has(implMethodLower)) {
                invalidStringDistanceParam(implMethod);
            }

            this._suggestOpts.string_distance = implMethodLower;
            return this;
        }
    }]);
    return TermSuggester;
}(AnalyzedSuggesterBase);

module.exports = TermSuggester;