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

var ES_REF_URL = 'https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-nested-aggregation.html';

/**
 * A special single bucket aggregation that enables aggregating nested
 * documents.
 *
 * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-nested-aggregation.html)
 *
 * @example
 * const reqBody = esb.requestBodySearch()
 *     .query(esb.matchQuery('name', 'led tv'))
 *     .agg(
 *         esb.nestedAggregation('resellers', 'resellers').agg(
 *             esb.minAggregation('min_price', 'resellers.price')
 *         )
 *     );
 *
 * @param {string} name The name which will be used to refer to this aggregation.
 * @param {string=} path `path` of the nested document
 *
 * @extends BucketAggregationBase
 */

var NestedAggregation = function (_BucketAggregationBas) {
    (0, _inherits3.default)(NestedAggregation, _BucketAggregationBas);

    // eslint-disable-next-line require-jsdoc
    function NestedAggregation(name, path) {
        (0, _classCallCheck3.default)(this, NestedAggregation);

        var _this = (0, _possibleConstructorReturn3.default)(this, (NestedAggregation.__proto__ || Object.getPrototypeOf(NestedAggregation)).call(this, name, 'nested'));

        if (!isNil(path)) _this._aggsDef.path = path;
        return _this;
    }

    /**
     * @override
     * @throws {Error} This method cannot be called on NestedAggregation
     */


    (0, _createClass3.default)(NestedAggregation, [{
        key: 'field',
        value: function field() {
            console.log('Please refer ' + ES_REF_URL);
            throw new Error('field is not supported in NestedAggregation');
        }

        /**
         * @override
         * @throws {Error} This method cannot be called on NestedAggregation
         */

    }, {
        key: 'script',
        value: function script() {
            console.log('Please refer ' + ES_REF_URL);
            throw new Error('script is not supported in NestedAggregation');
        }

        /**
         * Sets the nested path
         *
         * @param {string} path `path` of the nested document
         * @returns {NestedAggregation} returns `this` so that calls can be chained
         */

    }, {
        key: 'path',
        value: function path(_path) {
            this._aggsDef.path = _path;
            return this;
        }
    }]);
    return NestedAggregation;
}(BucketAggregationBase);

module.exports = NestedAggregation;