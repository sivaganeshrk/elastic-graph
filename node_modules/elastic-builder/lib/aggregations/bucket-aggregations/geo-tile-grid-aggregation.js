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
    GeoPoint = _require.GeoPoint,
    _require$util = _require.util,
    checkType = _require$util.checkType,
    setDefault = _require$util.setDefault;

var BucketAggregationBase = require('./bucket-aggregation-base');

var ES_REF_URL = 'https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-geotilegrid-aggregation.html';

/**
 * A multi-bucket aggregation that works on geo_point fields and groups points
 * into buckets that represent cells in a grid. The resulting grid can be sparse
 * and only contains cells that have matching data. Each cell corresponds to a
 * map tile as used by many online map sites. Each cell is labeled using a
 * "{zoom}/{x}/{y}" format, where zoom is equal to the user-specified precision.

 * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-geotilegrid-aggregation.html)
 *
 * NOTE: This query was added in elasticsearch v7.0.
 *
 * @example
 * const agg = esb.geoTileGridAggregation('large-grid', 'location').precision(8);
 *
 * @param {string} name The name which will be used to refer to this aggregation.
 * @param {string=} field The field to aggregate on
 *
 * @extends BucketAggregationBase
 */

var GeoTileGridAggregation = function (_BucketAggregationBas) {
    (0, _inherits3.default)(GeoTileGridAggregation, _BucketAggregationBas);

    // eslint-disable-next-line require-jsdoc
    function GeoTileGridAggregation(name, field) {
        (0, _classCallCheck3.default)(this, GeoTileGridAggregation);
        return (0, _possibleConstructorReturn3.default)(this, (GeoTileGridAggregation.__proto__ || Object.getPrototypeOf(GeoTileGridAggregation)).call(this, name, 'geotile_grid', field));
    }

    /**
     * @override
     * @throws {Error} This method cannot be called on GeoTileGridAggregation
     */


    (0, _createClass3.default)(GeoTileGridAggregation, [{
        key: 'format',
        value: function format() {
            console.log('Please refer ' + ES_REF_URL);
            throw new Error('format is not supported in GeoTileGridAggregation');
        }

        /**
         * @override
         * @throws {Error} This method cannot be called on GeoTileGridAggregation
         */

    }, {
        key: 'script',
        value: function script() {
            console.log('Please refer ' + ES_REF_URL);
            throw new Error('script is not supported in GeoTileGridAggregation');
        }

        /**
         * The integer zoom of the key used to define cells/buckets in the results.
         * Defaults to 7.
         *
         * @param {number} precision Precision can be between 0 and 29
         * @returns {GeoTileGridAggregation} returns `this` so that calls can be chained
         * @throws {Error} If precision is not between 0 and 29.
         */

    }, {
        key: 'precision',
        value: function precision(_precision) {
            if (isNil(_precision) || _precision < 0 || _precision > 29) {
                throw new Error('`precision` can only be value from 0 to 29.');
            }

            this._aggsDef.precision = _precision;
            return this;
        }

        /**
         * Sets the maximum number of geotile buckets to return.
         * When results are trimmed, buckets are prioritised
         * based on the volumes of documents they contain.
         *
         * @param {number} size Optional. The maximum number of geotile
         * buckets to return (defaults to 10,000).
         * @returns {GeoTileGridAggregation} returns `this` so that calls can be chained
         */

    }, {
        key: 'size',
        value: function size(_size) {
            this._aggsDef.size = _size;
            return this;
        }

        /**
         * Determines how many geotile_grid buckets the coordinating node
         * will request from each shard. To allow for more accurate counting of the
         * top cells returned in the final result the aggregation defaults to
         * returning `max(10,(size x number-of-shards))` buckets from each shard.
         * If this heuristic is undesirable, the number considered from each shard
         * can be over-ridden using this parameter.
         *
         * @param {number} shardSize Optional.
         * @returns {GeoTileGridAggregation} returns `this` so that calls can be chained
         */

    }, {
        key: 'shardSize',
        value: function shardSize(_shardSize) {
            this._aggsDef.shard_size = _shardSize;
            return this;
        }

        /**
         * Sets the top left coordinate for the bounding box used to filter the
         * points in the bucket.
         *
         * @param {GeoPoint} point A valid `GeoPoint`
         * @returns {GeoTileGridAggregation} returns `this` so that calls can be chained.
         */

    }, {
        key: 'topLeft',
        value: function topLeft(point) {
            checkType(point, GeoPoint);
            setDefault(this._aggsDef, 'bounds', {});
            this._aggsDef.bounds.top_left = point;
            return this;
        }

        /**
         * Sets the bottom right coordinate for the bounding box used to filter the
         * points in the bucket.
         *
         * @param {GeoPoint} point A valid `GeoPoint`
         * @returns {GeoTileGridAggregation} returns `this` so that calls can be chained.
         */

    }, {
        key: 'bottomRight',
        value: function bottomRight(point) {
            checkType(point, GeoPoint);
            setDefault(this._aggsDef, 'bounds', {});
            this._aggsDef.bounds.bottom_right = point;
            return this;
        }

        /**
         * Sets the top right coordinate for the bounding box used to filter the
         * points in the bucket.
         *
         * @param {GeoPoint} point A valid `GeoPoint`
         * @returns {GeoTileGridAggregation} returns `this` so that calls can be chained.
         */

    }, {
        key: 'topRight',
        value: function topRight(point) {
            checkType(point, GeoPoint);
            setDefault(this._aggsDef, 'bounds', {});
            this._aggsDef.bounds.top_right = point;
            return this;
        }

        /**
         * Sets the bottom left coordinate for the bounding box used to filter the
         * points in the bucket.
         *
         * @param {GeoPoint} point A valid `GeoPoint`
         * @returns {GeoTileGridAggregation} returns `this` so that calls can be chained.
         */

    }, {
        key: 'bottomLeft',
        value: function bottomLeft(point) {
            checkType(point, GeoPoint);
            setDefault(this._aggsDef, 'bounds', {});
            this._aggsDef.bounds.bottom_left = point;
            return this;
        }

        /**
         * Sets value for top of the bounding box.
         *
         * @param {number} val
         * @returns {GeoTileGridAggregation} returns `this` so that calls can be chained.
         */

    }, {
        key: 'top',
        value: function top(val) {
            setDefault(this._aggsDef, 'bounds', {});
            this._aggsDef.bounds.top = val;
            return this;
        }

        /**
         * Sets value for left of the bounding box.
         *
         * @param {number} val
         * @returns {GeoTileGridAggregation} returns `this` so that calls can be chained.
         */

    }, {
        key: 'left',
        value: function left(val) {
            setDefault(this._aggsDef, 'bounds', {});
            this._aggsDef.bounds.left = val;
            return this;
        }

        /**
         * Sets value for bottom of the bounding box.
         *
         * @param {number} val
         * @returns {GeoTileGridAggregation} returns `this` so that calls can be chained.
         */

    }, {
        key: 'bottom',
        value: function bottom(val) {
            setDefault(this._aggsDef, 'bounds', {});
            this._aggsDef.bounds.bottom = val;
            return this;
        }

        /**
         * Sets value for right of the bounding box.
         *
         * @param {number} val
         * @returns {GeoTileGridAggregation} returns `this` so that calls can be chained.
         */

    }, {
        key: 'right',
        value: function right(val) {
            setDefault(this._aggsDef, 'bounds', {});
            this._aggsDef.bounds.right = val;
            return this;
        }
    }]);
    return GeoTileGridAggregation;
}(BucketAggregationBase);

module.exports = GeoTileGridAggregation;