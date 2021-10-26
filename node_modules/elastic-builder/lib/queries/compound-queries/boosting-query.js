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
    checkType = _require.util.checkType;

/**
 * The boosting query can be used to effectively demote results that match
 * a given query. Unlike the "NOT" clause in bool query, this still selects
 * documents that contain undesirable terms, but reduces their overall
 * score.
 *
 * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-boosting-query.html)
 *
 * @example
 * const qry = esb.boostingQuery(
 *     esb.termQuery('field1', 'value1'), // positiveQry
 *     esb.termQuery('field2', 'value2'), // negativeQry
 *     0.2 // negativeBoost
 * );
 *
 * @param {Query=} positiveQry A valid `Query` object.
 * @param {Query=} negativeQry A valid `Query` object.
 * @param {number=} negativeBoost A positive `double` value where `0 < n < 1`.
 *
 * @extends Query
 */


var BoostingQuery = function (_Query) {
    (0, _inherits3.default)(BoostingQuery, _Query);

    // eslint-disable-next-line require-jsdoc
    function BoostingQuery(positiveQry, negativeQry, negativeBoost) {
        (0, _classCallCheck3.default)(this, BoostingQuery);

        var _this = (0, _possibleConstructorReturn3.default)(this, (BoostingQuery.__proto__ || Object.getPrototypeOf(BoostingQuery)).call(this, 'boosting'));

        if (!isNil(positiveQry)) _this.positive(positiveQry);
        if (!isNil(negativeQry)) _this.negative(negativeQry);
        if (!isNil(negativeBoost)) _this._queryOpts.negative_boost = negativeBoost;
        return _this;
    }

    /**
     * Sets the "master" query that determines which results are returned.
     *
     * @param {Query} query A valid `Query` object.
     * @returns {BoostingQuery} returns `this` so that calls can be chained.
     */


    (0, _createClass3.default)(BoostingQuery, [{
        key: 'positive',
        value: function positive(query) {
            checkType(query, Query);

            this._queryOpts.positive = query;
            return this;
        }

        /**
         * Sets the query used to match documents in the `positive`
         * query that will be negatively boosted.
         *
         * @param {Query} query A valid `Query` object.
         * @returns {BoostingQuery} returns `this` so that calls can be chained.
         */

    }, {
        key: 'negative',
        value: function negative(query) {
            checkType(query, Query);

            this._queryOpts.negative = query;
            return this;
        }

        /**
         * Sets the negative boost value.
         *
         * @param {number} factor A positive `double` value where `0 < n < 1`.
         * @returns {BoostingQuery} returns `this` so that calls can be chained.
         */

    }, {
        key: 'negativeBoost',
        value: function negativeBoost(factor) {
            this._queryOpts.negative_boost = factor;
            return this;
        }
    }]);
    return BoostingQuery;
}(Query);

module.exports = BoostingQuery;