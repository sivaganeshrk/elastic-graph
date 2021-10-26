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

var ES_REF_URL = 'https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-parent-aggregation.html';

/**
 * A special single bucket aggregation that enables aggregating
 * from buckets on child document types to buckets on parent documents.
 *
 * This aggregation relies on the `_parent` field in the mapping.
 *
 * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-parent-aggregation.html)
 *
 * @example
 * const reqBody = esb.requestBodySearch()
 *     .agg(
 *         esb.termsAggregation('top-names', 'owner.display_name.keyword')
 *             .size(10)
 *             .agg(
 *                 esb.parentAggregation('to-questions')
 *                     .type('answer')
 *                     .agg(
 *                         esb.termsAggregation(
 *                             'top-tags',
 *                             'tags.keyword'
 *                         ).size(10)
 *                     )
 *             )
 *     )
 *     .size(0);
 *
 * @param {string} name The name which will be used to refer to this aggregation.
 * @param {string=} type The type of the child document.
 *
 * @extends BucketAggregationBase
 */

var ParentAggregation = function (_BucketAggregationBas) {
    (0, _inherits3.default)(ParentAggregation, _BucketAggregationBas);

    // eslint-disable-next-line require-jsdoc
    function ParentAggregation(name, type) {
        (0, _classCallCheck3.default)(this, ParentAggregation);

        var _this = (0, _possibleConstructorReturn3.default)(this, (ParentAggregation.__proto__ || Object.getPrototypeOf(ParentAggregation)).call(this, name, 'parent'));

        if (!isNil(type)) _this.type(type);
        return _this;
    }

    /**
     * @override
     * @throws {Error} This method cannot be called on ParentAggregation
     */


    (0, _createClass3.default)(ParentAggregation, [{
        key: 'field',
        value: function field() {
            console.log('Please refer ' + ES_REF_URL);
            throw new Error('field is not supported in ParentAggregation');
        }

        /**
         * @override
         * @throws {Error} This method cannot be called on ParentAggregation
         */

    }, {
        key: 'script',
        value: function script() {
            console.log('Please refer ' + ES_REF_URL);
            throw new Error('script is not supported in ParentAggregation');
        }

        /**
         * Sets the child type/mapping for aggregation.
         *
         * @param {string} type The child type that the buckets in the parent space should be mapped to.
         * @returns {ParentAggregation} returns `this` so that calls can be chained
         */

    }, {
        key: 'type',
        value: function type(_type) {
            this._aggsDef.type = _type;
            return this;
        }
    }]);
    return ParentAggregation;
}(BucketAggregationBase);

module.exports = ParentAggregation;