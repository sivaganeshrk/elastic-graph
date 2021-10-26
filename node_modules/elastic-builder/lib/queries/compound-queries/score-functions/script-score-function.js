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

var ScoreFunction = require('./score-function');

/**
 * The `script_score` function allows you to wrap another query and customize
 * the scoring of it optionally with a computation derived from other numeric
 * field values in the doc using a script expression.
 *
 * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-function-score-query.html#function-script-score)
 *
 * @example
 * const scoreFunc = esb.scriptScoreFunction(
 *     esb.script('inline', "_score * doc['my_numeric_field'].value")
 *         .lang('painless')
 * );
 *
 * @example
 * // Script with parameters
 * const scoreFunc = esb.scriptScoreFunction(
 *     esb.script(
 *         'inline',
 *         "_score * doc['my_numeric_field'].value / Math.pow(params.param1, params.param2)"
 *     )
 *         .lang('painless')
 *         .params({ param1: 'value1', param2: 'value2' })
 * );
 *
 * @param {Script|string} script
 *
 * @extends ScoreFunction
 */

var ScriptScoreFunction = function (_ScoreFunction) {
    (0, _inherits3.default)(ScriptScoreFunction, _ScoreFunction);

    // eslint-disable-next-line require-jsdoc
    function ScriptScoreFunction(script) {
        (0, _classCallCheck3.default)(this, ScriptScoreFunction);

        var _this = (0, _possibleConstructorReturn3.default)(this, (ScriptScoreFunction.__proto__ || Object.getPrototypeOf(ScriptScoreFunction)).call(this, 'script_score'));

        if (!isNil(script)) _this._opts.script = script;
        return _this;
    }

    /**
     *
     * @param {Script|string} script
     * @returns {ScriptScoreFunction} returns `this` so that calls can be chained.
     */


    (0, _createClass3.default)(ScriptScoreFunction, [{
        key: 'script',
        value: function script(_script) {
            this._opts.script = _script;
            return this;
        }
    }]);
    return ScriptScoreFunction;
}(ScoreFunction);

module.exports = ScriptScoreFunction;