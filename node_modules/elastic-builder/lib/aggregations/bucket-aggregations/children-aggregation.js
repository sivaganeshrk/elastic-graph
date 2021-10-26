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

var ES_REF_URL = 'https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-children-aggregation.html';

/**
 * A special single bucket aggregation that enables aggregating
 * from buckets on parent document types to buckets on child documents.
 *
 * This aggregation relies on the `_parent` field in the mapping.
 *
 * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-children-aggregation.html)
 *
 * @example
 * const reqBody = esb.requestBodySearch()
 *     .agg(
 *         esb.termsAggregation('top-tags', 'tags.keyword')
 *             .size(10)
 *             .agg(
 *                 esb.childrenAggregation('to-answers')
 *                     .type('answer')
 *                     .agg(
 *                         esb.termsAggregation(
 *                             'top-names',
 *                             'owner.display_name.keyword'
 *                         ).size(10)
 *                     )
 *             )
 *     )
 *     .size(0);
 *
 * @param {string} name The name which will be used to refer to this aggregation.
 *
 * @extends BucketAggregationBase
 */

var ChildrenAggregation = function (_BucketAggregationBas) {
    (0, _inherits3.default)(ChildrenAggregation, _BucketAggregationBas);

    // eslint-disable-next-line require-jsdoc
    function ChildrenAggregation(name) {
        (0, _classCallCheck3.default)(this, ChildrenAggregation);
        return (0, _possibleConstructorReturn3.default)(this, (ChildrenAggregation.__proto__ || Object.getPrototypeOf(ChildrenAggregation)).call(this, name, 'children'));
    }

    /**
     * @override
     * @throws {Error} This method cannot be called on ChildrenAggregation
     */


    (0, _createClass3.default)(ChildrenAggregation, [{
        key: 'field',
        value: function field() {
            console.log('Please refer ' + ES_REF_URL);
            throw new Error('field is not supported in ChildrenAggregation');
        }

        /**
         * @override
         * @throws {Error} This method cannot be called on ChildrenAggregation
         */

    }, {
        key: 'script',
        value: function script() {
            console.log('Please refer ' + ES_REF_URL);
            throw new Error('script is not supported in ChildrenAggregation');
        }

        /**
         * Sets the child type/mapping for aggregation.
         *
         * @param {string} type The child type that the buckets in the parent space should be mapped to.
         * @returns {ChildrenAggregation} returns `this` so that calls can be chained
         */

    }, {
        key: 'type',
        value: function type(_type) {
            this._aggsDef.type = _type;
            return this;
        }
    }]);
    return ChildrenAggregation;
}(BucketAggregationBase);

module.exports = ChildrenAggregation;