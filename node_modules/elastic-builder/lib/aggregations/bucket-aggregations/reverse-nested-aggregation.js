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

var ES_REF_URL = 'https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-reverse-nested-aggregation.html';

/**
 * A special single bucket aggregation that enables aggregating
 * on parent docs from nested documents. Effectively this
 * aggregation can break out of the nested block structure and
 * link to other nested structures or the root document,
 * which allows nesting other aggregations that aren’t part of
 * the nested object in a nested aggregation.
 *
 * The `reverse_nested` aggregation must be defined inside a nested aggregation.
 *
 * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-reverse-nested-aggregation.html)
 *
 * @example
 * const reqBody = esb.requestBodySearch()
 *     .query(esb.matchQuery('name', 'led tv'))
 *     .agg(
 *         esb.nestedAggregation('comments', 'comments').agg(
 *             esb.termsAggregation('top_usernames', 'comments.username').agg(
 *                 esb.reverseNestedAggregation('comment_to_issue').agg(
 *                     esb.termsAggregation('top_tags_per_comment', 'tags')
 *                 )
 *             )
 *         )
 *     );
 *
 * @param {string} name The name which will be used to refer to this aggregation.
 * @param {string=} path Defines to what nested object field should be joined back.
 * The default is empty, which means that it joins back to the root / main document
 * level.
 *
 * @extends BucketAggregationBase
 */

var ReverseNestedAggregation = function (_BucketAggregationBas) {
    (0, _inherits3.default)(ReverseNestedAggregation, _BucketAggregationBas);

    // eslint-disable-next-line require-jsdoc
    function ReverseNestedAggregation(name, path) {
        (0, _classCallCheck3.default)(this, ReverseNestedAggregation);

        var _this = (0, _possibleConstructorReturn3.default)(this, (ReverseNestedAggregation.__proto__ || Object.getPrototypeOf(ReverseNestedAggregation)).call(this, name, 'reverse_nested'));

        if (!isNil(path)) _this._aggsDef.path = path;
        return _this;
    }

    /**
     * @override
     * @throws {Error} This method cannot be called on ReverseNestedAggregation
     */


    (0, _createClass3.default)(ReverseNestedAggregation, [{
        key: 'field',
        value: function field() {
            console.log('Please refer ' + ES_REF_URL);
            throw new Error('field is not supported in ReverseNestedAggregation');
        }

        /**
         * @override
         * @throws {Error} This method cannot be called on ReverseNestedAggregation
         */

    }, {
        key: 'script',
        value: function script() {
            console.log('Please refer ' + ES_REF_URL);
            throw new Error('script is not supported in ReverseNestedAggregation');
        }

        /**
         * Sets the level to join back for subsequent aggregations in a multiple
         * layered nested object types
         *
         * @param {string} path Defines to what nested object field should be joined back.
         * The default is empty, which means that it joins back to the root / main document
         * level.
         * @returns {ReverseNestedAggregation} returns `this` so that calls can be chained
         */

    }, {
        key: 'path',
        value: function path(_path) {
            this._aggsDef.path = _path;
            return this;
        }
    }]);
    return ReverseNestedAggregation;
}(BucketAggregationBase);

module.exports = ReverseNestedAggregation;