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
    _require$util = _require.util,
    checkType = _require$util.checkType,
    invalidParam = _require$util.invalidParam,
    _require$consts = _require.consts,
    SCORE_MODE_SET = _require$consts.SCORE_MODE_SET,
    BOOST_MODE_SET = _require$consts.BOOST_MODE_SET;

var _require2 = require('./score-functions'),
    ScoreFunction = _require2.ScoreFunction;

var ES_REF_URL = 'https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-function-score-query.html';

var invalidScoreModeParam = invalidParam(ES_REF_URL, 'score_mode', SCORE_MODE_SET);
var invalidBoostModeParam = invalidParam(ES_REF_URL, 'boost_mode', BOOST_MODE_SET);

/**
 * The `function_score` allows you to modify the score of documents that are
 * retrieved by a query. This can be useful if, for example, a score function
 * is computationally expensive and it is sufficient to compute the score on
 * a filtered set of documents.
 *
 * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-function-score-query.html)
 *
 * @example
 * // `function_score` with only one function
 * const qry = esb.functionScoreQuery()
 *     .query(esb.matchAllQuery())
 *     .function(esb.randomScoreFunction())
 *     .boostMode('multiply')
 *     .boost('5');
 *
 * @example
 * // Several functions combined
 * const qry = esb.functionScoreQuery()
 *     .query(esb.matchAllQuery())
 *     .functions([
 *         esb.randomScoreFunction()
 *             .filter(esb.matchQuery('test', 'bar'))
 *             .weight(23),
 *         esb.weightScoreFunction()
 *             .filter(esb.matchQuery('test', 'cat'))
 *             .weight(42)
 *     ])
 *     .maxBoost(42)
 *     .scoreMode('max')
 *     .boostMode('multiply')
 *     .minScore(42)
 *     .boost('5');
 *
 * @example
 * // Combine decay functions
 * const qry = esb.functionScoreQuery()
 *     .functions([
 *         esb.decayScoreFunction('gauss', 'price').origin('0').scale('20'),
 *         esb.decayScoreFunction('gauss', 'location')
 *             .origin('11, 12')
 *             .scale('2km')
 *     ])
 *     .query(esb.matchQuery('properties', 'balcony'))
 *     .scoreMode('multiply');
 *
 * @extends Query
 */

var FunctionScoreQuery = function (_Query) {
    (0, _inherits3.default)(FunctionScoreQuery, _Query);

    // eslint-disable-next-line require-jsdoc
    function FunctionScoreQuery() {
        (0, _classCallCheck3.default)(this, FunctionScoreQuery);

        var _this = (0, _possibleConstructorReturn3.default)(this, (FunctionScoreQuery.__proto__ || Object.getPrototypeOf(FunctionScoreQuery)).call(this, 'function_score'));

        _this._queryOpts.functions = [];
        return _this;
    }

    /**
     * Sets the source query.
     *
     * @param {Query} query A valid `Query` object
     * @returns {FunctionScoreQuery} returns `this` so that calls can be chained.
     */


    (0, _createClass3.default)(FunctionScoreQuery, [{
        key: 'query',
        value: function query(_query) {
            checkType(_query, Query);

            this._queryOpts.query = _query;
            return this;
        }

        /**
         * Controls the way the scores are combined.
         *
         * @param {string} mode Can be one of `multiply`, `sum`, `first`, `min`, `max`, `avg`.
         * Defaults to `multiply`.
         * @returns {FunctionScoreQuery} returns `this` so that calls can be chained.
         */

    }, {
        key: 'scoreMode',
        value: function scoreMode(mode) {
            if (isNil(mode)) invalidScoreModeParam(mode);

            var modeLower = mode.toLowerCase();
            if (!SCORE_MODE_SET.has(modeLower)) {
                invalidScoreModeParam(mode);
            }

            this._queryOpts.score_mode = mode;
            return this;
        }

        /**
         * Controls the way the query and function scores are combined.
         *
         * @param {string} mode Can be one of `multiply`, `replace`, `sum`, `avg`, `max`, `min`.
         * Defaults to `multiply`.
         * @returns {FunctionScoreQuery} returns `this` so that calls can be chained.
         */

    }, {
        key: 'boostMode',
        value: function boostMode(mode) {
            if (isNil(mode)) invalidBoostModeParam(mode);

            var modeLower = mode.toLowerCase();
            if (!BOOST_MODE_SET.has(modeLower)) {
                invalidBoostModeParam(mode);
            }

            this._queryOpts.boost_mode = modeLower;
            return this;
        }

        /**
         * Restricts new score to not exceed given limit. The default for `max_boost` is `FLT_MAX`.
         *
         * @param {number} limit
         * @returns {FunctionScoreQuery} returns `this` so that calls can be chained.
         */

    }, {
        key: 'maxBoost',
        value: function maxBoost(limit) {
            this._queryOpts.max_boost = limit;
            return this;
        }

        /**
         * Sets the minimum score limit for documents to be included in search result.
         *
         * @param {number} limit Minimum score threshold
         * @returns {FunctionScoreQuery} returns `this` so that calls can be chained.
         */

    }, {
        key: 'minScore',
        value: function minScore(limit) {
            this._queryOpts.min_score = limit;
            return this;
        }

        /**
         * Add a single score function to the list of existing functions.
         *
         * @param {ScoreFunction} func A valid `ScoreFunction` object.
         * @returns {FunctionScoreQuery} returns `this` so that calls can be chained.
         */

    }, {
        key: 'function',
        value: function _function(func) {
            checkType(func, ScoreFunction);

            this._queryOpts.functions.push(func);
            return this;
        }

        /**
         * Adds array of score functions to the list of existing functions.
         *
         * @param {Array<ScoreFunction>} funcs An array of valid `ScoreFunction` objects
         * @returns {FunctionScoreQuery} returns `this` so that calls can be chained.
         */

    }, {
        key: 'functions',
        value: function functions(funcs) {
            var _this2 = this;

            checkType(funcs, Array);

            funcs.forEach(function (func) {
                return _this2.function(func);
            });
            return this;
        }
    }]);
    return FunctionScoreQuery;
}(Query);

module.exports = FunctionScoreQuery;