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

var BucketAggregationBase = require('./bucket-aggregation-base');

var ES_REF_URL = 'https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-sampler-aggregation.html';

/**
 * A filtering aggregation used to limit any sub aggregations'
 * processing to a sample of the top-scoring documents.
 *
 * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-sampler-aggregation.html)
 *
 * @example
 * const reqBody = esb.requestBodySearch()
 *     .query(esb.queryStringQuery('tags:kibana OR tags:javascript'))
 *     .agg(
 *         esb.samplerAggregation('sample')
 *             .shardSize(200)
 *             .agg(
 *                 esb.significantTermsAggregation(
 *                     'keywords',
 *                     'tags'
 *                 ).exclude(['kibana', 'javascript'])
 *             )
 *     );
 *
 * @param {string} name The name which will be used to refer to this aggregation.
 * @param {string=} field The field to aggregate on
 *
 * @extends BucketAggregationBase
 */

var SamplerAggregation = function (_BucketAggregationBas) {
    (0, _inherits3.default)(SamplerAggregation, _BucketAggregationBas);

    // eslint-disable-next-line require-jsdoc
    function SamplerAggregation(name) {
        (0, _classCallCheck3.default)(this, SamplerAggregation);
        return (0, _possibleConstructorReturn3.default)(this, (SamplerAggregation.__proto__ || Object.getPrototypeOf(SamplerAggregation)).call(this, name, 'sampler'));
    }

    /**
     * @override
     * @throws {Error} This method cannot be called on SamplerAggregation
     */


    (0, _createClass3.default)(SamplerAggregation, [{
        key: 'field',
        value: function field() {
            console.log('Please refer ' + ES_REF_URL);
            throw new Error('field is not supported in SamplerAggregation');
        }

        /**
         * @override
         * @throws {Error} This method cannot be called on SamplerAggregation
         */

    }, {
        key: 'script',
        value: function script() {
            console.log('Please refer ' + ES_REF_URL);
            throw new Error('script is not supported in SamplerAggregation');
        }

        /**
         * The shard_size parameter limits how many top-scoring documents
         * are collected in the sample processed on each shard. The default value is 100.
         *
         * @param {number} size Maximum number of documents to return from each shard(Integer)
         * @returns {SamplerAggregation} returns `this` so that calls can be chained
         */

    }, {
        key: 'shardSize',
        value: function shardSize(size) {
            this._aggsDef.shard_size = size;
            return this;
        }
    }]);
    return SamplerAggregation;
}(BucketAggregationBase);

module.exports = SamplerAggregation;