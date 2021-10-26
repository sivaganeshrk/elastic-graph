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

var _require = require('../../../core'),
    recursiveToJSON = _require.util.recursiveToJSON;

/**
 * The `weight` score allows you to multiply the score by the provided `weight`.
 * This can sometimes be desired since boost value set on specific queries gets
 * normalized, while for this score function it does not.
 * The number value is of type float.
 *
 * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-function-score-query.html#function-weight)
 *
 * @example
 * const scoreFunc = esb.weightScoreFunction(42);
 *
 * @param {number=} weight The weight of this score function.
 * @extends ScoreFunction
 */


var WeightScoreFunction = function (_ScoreFunction) {
    (0, _inherits3.default)(WeightScoreFunction, _ScoreFunction);

    // eslint-disable-next-line require-jsdoc
    function WeightScoreFunction(weight) {
        (0, _classCallCheck3.default)(this, WeightScoreFunction);

        var _this = (0, _possibleConstructorReturn3.default)(this, (WeightScoreFunction.__proto__ || Object.getPrototypeOf(WeightScoreFunction)).call(this, null));
        /*
            null to `super` is intentional.
            The following is a valid score function
            It doesn't have a name field
            {
                "filter": { "match": { "test": "cat" } },
                "weight": 42
            }
        */


        if (!isNil(weight)) _this._body.weight = weight;
        return _this;
    }

    /**
     * Overrides default `toJSON` to return DSL representation of the score function
     * class instance.
     *
     * @override
     * @returns {Object} returns an Object which maps to the elasticsearch query DSL
     */


    (0, _createClass3.default)(WeightScoreFunction, [{
        key: 'toJSON',
        value: function toJSON() {
            return recursiveToJSON(this._body);
        }
    }]);
    return WeightScoreFunction;
}(ScoreFunction);

module.exports = WeightScoreFunction;