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

var ES_REF_URL = 'https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-missing-aggregation.html';

/**
 * A field data based single bucket aggregation, that creates a bucket of all
 * documents in the current document set context that are missing a field value
 * (effectively, missing a field or having the configured NULL value set).
 *
 * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-missing-aggregation.html)
 *
 * @example
 * const agg = esb.missingAggregation('products_without_a_price', 'price');
 *
 * @param {string} name The name which will be used to refer to this aggregation.
 * @param {string=} field The field to aggregate on
 *
 * @extends BucketAggregationBase
 */

var MissingAggregation = function (_BucketAggregationBas) {
    (0, _inherits3.default)(MissingAggregation, _BucketAggregationBas);

    // eslint-disable-next-line require-jsdoc
    function MissingAggregation(name, field) {
        (0, _classCallCheck3.default)(this, MissingAggregation);
        return (0, _possibleConstructorReturn3.default)(this, (MissingAggregation.__proto__ || Object.getPrototypeOf(MissingAggregation)).call(this, name, 'missing', field));
    }

    /**
     * @override
     * @throws {Error} This method cannot be called on MissingAggregation
     */


    (0, _createClass3.default)(MissingAggregation, [{
        key: 'script',
        value: function script() {
            console.log('Please refer ' + ES_REF_URL);
            throw new Error('script is not supported in MissingAggregation');
        }
    }]);
    return MissingAggregation;
}(BucketAggregationBase);

module.exports = MissingAggregation;