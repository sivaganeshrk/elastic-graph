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
    Suggester = _require.Suggester;

/**
 * The `AnalyzedSuggesterBase` provides support for common options used
 * in `TermSuggester` and `PhraseSuggester`.
 *
 * **NOTE:** Instantiating this directly should not be required.
 * However, if you wish to add a custom implementation for whatever reason,
 * this class could be extended.
 *
 * @param {string} suggesterType The type of suggester.
 * Can be one of `term`, `phrase`
 * @param {string} name The name of the Suggester, an arbitrary identifier
 * @param {string=} field The field to fetch the candidate suggestions from.
 * @param {string=} txt A string to get suggestions for.
 *
 * @throws {Error} if `name` is empty
 * @throws {Error} if `suggesterType` is empty
 *
 * @extends Suggester
 */


var AnalyzedSuggesterBase = function (_Suggester) {
    (0, _inherits3.default)(AnalyzedSuggesterBase, _Suggester);

    // eslint-disable-next-line require-jsdoc
    function AnalyzedSuggesterBase(suggesterType, name, field, txt) {
        (0, _classCallCheck3.default)(this, AnalyzedSuggesterBase);

        var _this = (0, _possibleConstructorReturn3.default)(this, (AnalyzedSuggesterBase.__proto__ || Object.getPrototypeOf(AnalyzedSuggesterBase)).call(this, suggesterType, name, field));

        if (!isNil(txt)) _this._opts.text = txt;
        return _this;
    }

    /**
     * Sets the text to get suggestions for. If not set, the global
     * suggestion text will be used.
     *
     * @param {string} txt A string to get suggestions for.
     * @returns {AnalyzedSuggesterBase} returns `this` so that calls can be chained.
     */


    (0, _createClass3.default)(AnalyzedSuggesterBase, [{
        key: 'text',
        value: function text(txt) {
            this._opts.text = txt;
            return this;
        }

        /**
         * Sets the analyzer to analyse the suggest text with. Defaults to
         * the search analyzer of the suggest field.
         *
         * @param {string} analyzer The analyzer to analyse the suggest text with.
         * @returns {AnalyzedSuggesterBase} returns `this` so that calls can be chained.
         */

    }, {
        key: 'analyzer',
        value: function analyzer(_analyzer) {
            this._suggestOpts.analyzer = _analyzer;
            return this;
        }

        /**
         * Sets the maximum number of suggestions to be retrieved from each individual shard.
         * During the reduce phase only the top N suggestions are returned based on the `size`
         * option. Defaults to the `size` option. Setting this to a value higher than the `size`
         * can be useful in order to get a more accurate document frequency for spelling
         * corrections at the cost of performance. Due to the fact that terms are partitioned
         * amongst shards, the shard level document frequencies of spelling corrections
         * may not be precise. Increasing this will make these document frequencies
         * more precise.
         *
         * @param {number} size
         * @returns {AnalyzedSuggesterBase} returns `this` so that calls can be chained.
         */

    }, {
        key: 'shardSize',
        value: function shardSize(size) {
            this._suggestOpts.shard_size = size;
            return this;
        }
    }]);
    return AnalyzedSuggesterBase;
}(Suggester);

module.exports = AnalyzedSuggesterBase;