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

var PipelineAggregationBase = require('./pipeline-aggregation-base');

var ES_REF_URL = 'https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-pipeline-bucket-sort-aggregation.html';

/**
 * A parent pipeline aggregation which sorts the buckets of its parent
 * multi-bucket aggregation. Zero or more sort fields may be specified
 * together with the corresponding sort order. Each bucket may be sorted
 * based on its _key, _count or its sub-aggregations. In addition, parameters
 * from and size may be set in order to truncate the result buckets.
 *
 * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-pipeline-bucket-sort-aggregation.html)
 *
 * @example
 * const reqBody = esb.requestBodySearch()
 *     .agg(
 *         esb.bucketSortAggregation('sort')
 *             .sort([
 *                  esb.sort('user', 'desc')
 *              ])
 *              .from(5)
 *              .size(10)
 *         )
 *     );
 *
 * @param {string} name The name which will be used to refer to this aggregation.
 *
 * @extends PipelineAggregationBase
 */

var BucketSortAggregation = function (_PipelineAggregationB) {
    (0, _inherits3.default)(BucketSortAggregation, _PipelineAggregationB);

    // eslint-disable-next-line require-jsdoc
    function BucketSortAggregation(name) {
        (0, _classCallCheck3.default)(this, BucketSortAggregation);
        return (0, _possibleConstructorReturn3.default)(this, (BucketSortAggregation.__proto__ || Object.getPrototypeOf(BucketSortAggregation)).call(this, name, 'bucket_sort', ES_REF_URL));
    }

    /**
     * Sets the list of fields to sort on. Optional.
     *
     * @param {Array<Sort>} sort The list of fields to sort on
     * @returns {BucketSortAggregation} returns `this` so that calls can be chained
     */


    (0, _createClass3.default)(BucketSortAggregation, [{
        key: 'sort',
        value: function sort(_sort) {
            this._aggsDef.sort = _sort;
            return this;
        }

        /**
         * Sets the value buckets in positions prior to which will be truncated. Optional.
         *
         * @param {number} from Buckets in positions prior to the set value will be truncated.
         * @returns {BucketSortAggregation} returns `this` so that calls can be chained
         */

    }, {
        key: 'from',
        value: function from(_from) {
            this._aggsDef.from = _from;
            return this;
        }

        /**
         * Sets the number of buckets to return. Optional.
         *
         * @param {number} size The number of buckets to return.
         * @returns {BucketSortAggregation} returns `this` so that calls can be chained
         */

    }, {
        key: 'size',
        value: function size(_size) {
            this._aggsDef.size = _size;
            return this;
        }
    }]);
    return BucketSortAggregation;
}(PipelineAggregationBase);

module.exports = BucketSortAggregation;