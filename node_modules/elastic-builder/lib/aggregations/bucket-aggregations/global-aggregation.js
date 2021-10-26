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

var ES_REF_URL = 'https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-global-aggregation.html';

/**
 * Defines a single bucket of all the documents within the search execution
 * context. This context is defined by the indices and the document types you’re
 * searching on, but is not influenced by the search query itself.
 *
 * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-global-aggregation.html)
 *
 * @example
 * const reqBody = esb.requestBodySearch()
 *     .query(esb.matchQuery('type', 't-shirt'))
 *     .agg(
 *         esb.globalAggregation('all_products').agg(
 *             esb.avgAggregation('avg_price', 'price')
 *         )
 *     )
 *     .agg(esb.avgAggregation('t_shirts', 'price'));
 *
 * @param {string} name The name which will be used to refer to this aggregation.
 *
 * @extends BucketAggregationBase
 */

var GlobalAggregation = function (_BucketAggregationBas) {
    (0, _inherits3.default)(GlobalAggregation, _BucketAggregationBas);

    // eslint-disable-next-line require-jsdoc
    function GlobalAggregation(name) {
        (0, _classCallCheck3.default)(this, GlobalAggregation);
        return (0, _possibleConstructorReturn3.default)(this, (GlobalAggregation.__proto__ || Object.getPrototypeOf(GlobalAggregation)).call(this, name, 'global'));
    }

    /**
     * @override
     * @throws {Error} This method cannot be called on GlobalAggregation
     */


    (0, _createClass3.default)(GlobalAggregation, [{
        key: 'field',
        value: function field() {
            console.log('Please refer ' + ES_REF_URL);
            throw new Error('field is not supported in GlobalAggregation');
        }

        /**
         * @override
         * @throws {Error} This method cannot be called on GlobalAggregation
         */

    }, {
        key: 'script',
        value: function script() {
            console.log('Please refer ' + ES_REF_URL);
            throw new Error('script is not supported in GlobalAggregation');
        }
    }]);
    return GlobalAggregation;
}(BucketAggregationBase);

module.exports = GlobalAggregation;