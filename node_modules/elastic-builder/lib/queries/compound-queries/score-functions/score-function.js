'use strict';

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _require = require('../../../core'),
    Query = _require.Query,
    _require$util = _require.util,
    checkType = _require$util.checkType,
    recursiveToJSON = _require$util.recursiveToJSON;

/**
 * `ScoreFunction` provides support for common options used across
 * various `ScoreFunction` implementations.
 *
 * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-function-score-query.html#score-functions)
 *
 * **NOTE:** Instantiating this directly should not be required.
 * However, if you wish to add a custom implementation for whatever reason,
 * this class could be extended.
 *
 * @param {string} name
 */


var ScoreFunction = function () {
    // eslint-disable-next-line require-jsdoc
    function ScoreFunction(name) {
        (0, _classCallCheck3.default)(this, ScoreFunction);

        this._name = name;

        // Filter, weight go here
        this._body = {};
        // Score Function specific options go here
        this._opts = {};
    }

    /**
     * Adds a filter query whose matching documents will have the score function applied.
     *
     * @param {Query} filterQry A valid `Query` object.
     * @returns {ScoreFunction} returns `this` so that calls can be chained.
     */


    (0, _createClass3.default)(ScoreFunction, [{
        key: 'filter',
        value: function filter(filterQry) {
            checkType(filterQry, Query);

            this._body.filter = filterQry;
            return this;
        }

        /**
         * Sets the weight of the score function
         *
         * @param {number} weight The weight of this score function.
         * @returns {ScoreFunction} returns `this` so that calls can be chained.
         */

    }, {
        key: 'weight',
        value: function weight(_weight) {
            this._body.weight = _weight;
            return this;
        }

        /**
         * Overrides default `toJSON` to return DSL representation of the score function
         * class instance.
         *
         * @override
         * @returns {Object} returns an Object which maps to the elasticsearch query DSL
         */

    }, {
        key: 'toJSON',
        value: function toJSON() {
            var repr = Object.assign((0, _defineProperty3.default)({}, this._name, this._opts), this._body);
            return recursiveToJSON(repr);
        }
    }]);
    return ScoreFunction;
}();

module.exports = ScoreFunction;