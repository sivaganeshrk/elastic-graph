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

var BucketAggregationBase = require('./bucket-aggregation-base');

var ES_REF_URL = 'https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-geohashgrid-aggregation.html';

/**
 * A multi-bucket aggregation that works on geo_point fields and groups points
 * into buckets that represent cells in a grid. The resulting grid can be sparse
 * and only contains cells that have matching data. Each cell is labeled using a
 * geohash which is of user-definable precision.

 * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-geohashgrid-aggregation.html)
 *
 * @example
 * const agg = esb.geoHashGridAggregation('large-grid', 'location').precision(3);
 *
 * @param {string} name The name which will be used to refer to this aggregation.
 * @param {string=} field The field to aggregate on
 *
 * @extends BucketAggregationBase
 */

var GeoHashGridAggregation = function (_BucketAggregationBas) {
    (0, _inherits3.default)(GeoHashGridAggregation, _BucketAggregationBas);

    // eslint-disable-next-line require-jsdoc
    function GeoHashGridAggregation(name, field) {
        (0, _classCallCheck3.default)(this, GeoHashGridAggregation);
        return (0, _possibleConstructorReturn3.default)(this, (GeoHashGridAggregation.__proto__ || Object.getPrototypeOf(GeoHashGridAggregation)).call(this, name, 'geohash_grid', field));
    }

    /**
     * @override
     * @throws {Error} This method cannot be called on GeoHashGridAggregation
     */


    (0, _createClass3.default)(GeoHashGridAggregation, [{
        key: 'format',
        value: function format() {
            console.log('Please refer ' + ES_REF_URL);
            throw new Error('format is not supported in GeoHashGridAggregation');
        }

        /**
         * @override
         * @throws {Error} This method cannot be called on GeoHashGridAggregation
         */

    }, {
        key: 'script',
        value: function script() {
            console.log('Please refer ' + ES_REF_URL);
            throw new Error('script is not supported in GeoHashGridAggregation');
        }

        /**
         * Sets the precision for the generated geohash.
         *
         * @param {number} precision Precision can be between 1 and 12
         * @returns {GeoHashGridAggregation} returns `this` so that calls can be chained
         * @throws {Error} If precision is not between 1 and 12.
         */

    }, {
        key: 'precision',
        value: function precision(_precision) {
            if (isNil(_precision) || _precision < 1 || _precision > 12) {
                throw new Error('`precision` can only be value from 1 to 12.');
            }

            this._aggsDef.precision = _precision;
            return this;
        }

        /**
         * Sets the maximum number of geohash buckets to return.
         * When results are trimmed, buckets are prioritised
         * based on the volumes of documents they contain.
         *
         * @param {number} size Optional. The maximum number of geohash
         * buckets to return (defaults to 10,000).
         * @returns {GeoHashGridAggregation} returns `this` so that calls can be chained
         */

    }, {
        key: 'size',
        value: function size(_size) {
            this._aggsDef.size = _size;
            return this;
        }

        /**
         * Determines how many geohash_grid the coordinating node
         * will request from each shard.
         *
         * @param {number} shardSize Optional.
         * @returns {GeoHashGridAggregation} returns `this` so that calls can be chained
         */

    }, {
        key: 'shardSize',
        value: function shardSize(_shardSize) {
            this._aggsDef.shard_size = _shardSize;
            return this;
        }
    }]);
    return GeoHashGridAggregation;
}(BucketAggregationBase);

module.exports = GeoHashGridAggregation;