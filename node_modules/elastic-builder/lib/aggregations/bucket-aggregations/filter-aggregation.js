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

var BucketAggregationBase = require('./bucket-aggregation-base');

var ES_REF_URL = 'https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-filter-aggregation.html';

/**
 * Defines a single bucket of all the documents in the current document set
 * context that match a specified filter. Often this will be used to narrow down
 * the current aggregation context to a specific set of documents.
 *
 * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-filter-aggregation.html)
 *
 * @example
 * const reqBody = esb.requestBodySearch()
 *     .agg(
 *         esb.filterAggregation(
 *             't_shirts',
 *             esb.termQuery('type', 't-shirt')
 *         ).agg(esb.avgAggregation('avg_price', 'price'))
 *     )
 *     .size(0);
 *
 * @param {string} name The name which will be used to refer to this aggregation.
 * @param {Query=} filterQuery Query to filter on. Example - term query.
 *
 * @extends BucketAggregationBase
 */

var FilterAggregation = function (_BucketAggregationBas) {
    (0, _inherits3.default)(FilterAggregation, _BucketAggregationBas);

    // eslint-disable-next-line require-jsdoc
    function FilterAggregation(name, filterQuery) {
        (0, _classCallCheck3.default)(this, FilterAggregation);

        var _this = (0, _possibleConstructorReturn3.default)(this, (FilterAggregation.__proto__ || Object.getPrototypeOf(FilterAggregation)).call(this, name, 'filter'));

        if (!isNil(filterQuery)) _this.filter(filterQuery);
        return _this;
    }

    /**
     * @override
     * @throws {Error} This method cannot be called on FilterAggregation
     */


    (0, _createClass3.default)(FilterAggregation, [{
        key: 'field',
        value: function field() {
            console.log('Please refer ' + ES_REF_URL);
            throw new Error('field is not supported in FilterAggregation');
        }

        /**
         * @override
         * @throws {Error} This method cannot be called on FilterAggregation
         */

    }, {
        key: 'script',
        value: function script() {
            console.log('Please refer ' + ES_REF_URL);
            throw new Error('script is not supported in FilterAggregation');
        }

        // NOTE: Special case. filter does not set a key inside
        // this._aggsDef but sets the entire object itself
        // Generic getOpt will fail for this.
        // Just a simple override should handle it though

        /**
         * Set the filter query for Filter Aggregation.
         *
         * @param {Query} filterQuery Query to filter on. Example - term query.
         * @returns {FilterAggregation} returns `this` so that calls can be chained
         * @throws {TypeError} If `filterQuery` is not an instance of `Query`
         */

    }, {
        key: 'filter',
        value: function filter(filterQuery) {
            checkType(filterQuery, Query);
            this._aggsDef = this._aggs[this.aggType] = filterQuery;
            return this;
        }
    }]);
    return FilterAggregation;
}(BucketAggregationBase);

module.exports = FilterAggregation;