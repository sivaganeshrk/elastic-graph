'use strict';

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isNil = require('lodash.isnil');

var Query = require('./query');

var _require = require('./util'),
    checkType = _require.checkType,
    invalidParam = _require.invalidParam,
    recursiveToJSON = _require.recursiveToJSON;

var _require2 = require('./consts'),
    RESCORE_MODE_SET = _require2.RESCORE_MODE_SET;

var ES_REF_URL = 'https://www.elastic.co/guide/en/elasticsearch/reference/current/search-request-rescore.html';

var invalidScoreModeParam = invalidParam(ES_REF_URL, 'score_mode', RESCORE_MODE_SET);

/**
 * A `rescore` request can help to improve precision by reordering just
 * the top (eg 100 - 500) documents returned by the `query` and `post_filter`
 * phases, using a secondary (usually more costly) algorithm, instead of
 * applying the costly algorithm to all documents in the index.
 *
 * The rescore phase is not executed when sort is used.
 *
 * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-request-rescore.html)
 *
 * @example
 * const reqBody = esb.requestBodySearch()
 *     .query(esb.matchQuery('message', 'the quick brown').operator('or'))
 *     .rescore(
 *         esb.rescore(
 *             50,
 *             esb.matchPhraseQuery('message', 'the quick brown').slop(2)
 *         )
 *             .queryWeight(0.7)
 *             .rescoreQueryWeight(1.2)
 *     );
 *
 * @example
 * const rescore = esb.rescore(
 *     10,
 *     esb.functionScoreQuery().function(
 *         esb.scriptScoreFunction(
 *             esb.script('inline', 'Math.log10(doc.likes.value + 2)')
 *         )
 *     )
 * ).scoreMode('multiply');
 *
 * @param {number=} windowSize
 * @param {Query=} rescoreQuery
 */

var Rescore = function () {
    // eslint-disable-next-line require-jsdoc
    function Rescore(windowSize, rescoreQuery) {
        (0, _classCallCheck3.default)(this, Rescore);

        this._body = {};
        this._rescoreOpts = this._body.query = {};

        if (!isNil(windowSize)) this._body.window_size = windowSize;
        if (!isNil(rescoreQuery)) this.rescoreQuery(rescoreQuery);
    }

    /**
     * The number of docs which will be examined on each shard can be controlled
     * by the window_size parameter, which defaults to `from` and `size`.
     *
     * @param {number} windowSize
     * @returns {Rescore} returns `this` so that calls can be chained.
     */


    (0, _createClass3.default)(Rescore, [{
        key: 'windowSize',
        value: function windowSize(_windowSize) {
            this._body.window_size = _windowSize;
            return this;
        }

        /**
         * The query to execute on the Top-K results by the `query` and `post_filter` phases.
         *
         * @param {Query} rescoreQuery
         * @returns {Rescore} returns `this` so that calls can be chained.
         * @throws {TypeError} If `rescoreQuery` is not an instance of `Query`
         */

    }, {
        key: 'rescoreQuery',
        value: function rescoreQuery(_rescoreQuery) {
            checkType(_rescoreQuery, Query);

            this._rescoreOpts.rescore_query = _rescoreQuery;
            return this;
        }

        /**
         * Control the relative importance of the original query.
         *
         * @param {number} weight Defaults to 1
         * @returns {Rescore} returns `this` so that calls can be chained.
         */

    }, {
        key: 'queryWeight',
        value: function queryWeight(weight) {
            this._rescoreOpts.query_weight = weight;
            return this;
        }

        /**
         * Control the relative importance of the rescore query.
         *
         * @param {number} weight Defaults to 1
         * @returns {Rescore} returns `this` so that calls can be chained.
         */

    }, {
        key: 'rescoreQueryWeight',
        value: function rescoreQueryWeight(weight) {
            this._rescoreOpts.rescore_query_weight = weight;
            return this;
        }

        /**
         * Controls the way the scores are combined.
         *
         * @param {string} mode Can be one of `total`, `multiply`, `min`, `max`, `avg`.
         * Defaults to `total`.
         * @returns {Rescore} returns `this` so that calls can be chained.
         */

    }, {
        key: 'scoreMode',
        value: function scoreMode(mode) {
            if (isNil(mode)) invalidScoreModeParam(mode);

            var modeLower = mode.toLowerCase();
            if (!RESCORE_MODE_SET.has(modeLower)) {
                invalidScoreModeParam(mode);
            }

            this._rescoreOpts.score_mode = modeLower;
            return this;
        }

        /**
         * Override default `toJSON` to return DSL representation for `rescore` request
         *
         * @override
         * @returns {Object} returns an Object which maps to the elasticsearch query DSL
         */

    }, {
        key: 'toJSON',
        value: function toJSON() {
            return recursiveToJSON(this._body);
        }
    }]);
    return Rescore;
}();

module.exports = Rescore;