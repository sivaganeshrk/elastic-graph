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

var ScoreFunction = require('./score-function');

/**
 * The `random_score` generates scores using a hash of the `_uid` field,
 * with a `seed` for variation. If `seed` is not specified, the current time is used.
 *
 * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-function-score-query.html#function-random)
 *
 * @example
 * const scoreFunc = esb.randomScoreFunction().seed(299792458);
 *
 * @extends ScoreFunction
 */

var RandomScoreFunction = function (_ScoreFunction) {
    (0, _inherits3.default)(RandomScoreFunction, _ScoreFunction);

    // eslint-disable-next-line require-jsdoc
    function RandomScoreFunction() {
        (0, _classCallCheck3.default)(this, RandomScoreFunction);
        return (0, _possibleConstructorReturn3.default)(this, (RandomScoreFunction.__proto__ || Object.getPrototypeOf(RandomScoreFunction)).call(this, 'random_score'));
    }

    /**
     * Sets random seed value.
     *
     * @param {number} seed A seed value.
     * @returns {RandomScoreFunction} returns `this` so that calls can be chained.
     */


    (0, _createClass3.default)(RandomScoreFunction, [{
        key: 'seed',
        value: function seed(_seed) {
            this._opts.seed = _seed;
            return this;
        }
    }]);
    return RandomScoreFunction;
}(ScoreFunction);

module.exports = RandomScoreFunction;