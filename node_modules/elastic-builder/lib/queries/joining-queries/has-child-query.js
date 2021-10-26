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

var JoiningQueryBase = require('./joining-query-base');

var ES_REF_URL = 'https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-has-child-query.html';

/**
 * The `has_child` filter accepts a query and the child type to run against, and
 * results in parent documents that have child docs matching the query.
 *
 * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-has-child-query.html)
 *
 * @example
 * // Scoring support
 * const qry = esb.hasChildQuery(
 *     esb.termQuery('tag', 'something'),
 *     'blog_tag'
 * ).scoreMode('min');
 *
 * @example
 * // Sort by child documents' `click_count` field
 * const qry = esb.hasChildQuery()
 *     .query(
 *         esb.functionScoreQuery().function(
 *             esb.scriptScoreFunction("_score * doc['click_count'].value")
 *         )
 *     )
 *     .type('blog_tag')
 *     .scoreMode('max');
 *
 * @param {Query=} qry A valid `Query` object
 * @param {string=} type The child type
 *
 * @extends JoiningQueryBase
 */

var HasChildQuery = function (_JoiningQueryBase) {
    (0, _inherits3.default)(HasChildQuery, _JoiningQueryBase);

    // eslint-disable-next-line require-jsdoc
    function HasChildQuery(qry, type) {
        (0, _classCallCheck3.default)(this, HasChildQuery);

        var _this = (0, _possibleConstructorReturn3.default)(this, (HasChildQuery.__proto__ || Object.getPrototypeOf(HasChildQuery)).call(this, 'has_child', ES_REF_URL, qry));

        if (!isNil(type)) _this._queryOpts.type = type;
        return _this;
    }

    /**
     * Sets the child document type to search against.
     * Alias for method `childType`.
     *
     * @param {string} type A valid doc type name
     * @returns {HasChildQuery} returns `this` so that calls can be chained.
     */


    (0, _createClass3.default)(HasChildQuery, [{
        key: 'type',
        value: function type(_type) {
            this._queryOpts.type = _type;
            return this;
        }

        /**
         * Sets the child document type to search against
         *
         * @param {string} type A valid doc type name
         * @returns {HasChildQuery} returns `this` so that calls can be chained.
         */

    }, {
        key: 'childType',
        value: function childType(type) {
            console.warn('[HasChildQuery] Field `child_type` is deprecated. Use `type` instead.');
            return this.type(type);
        }

        /**
         * Specify the minimum number of children are required to match
         * for the parent doc to be considered a match
         *
         * @example
         * const qry = esb.hasChildQuery(esb.termQuery('tag', 'something'), 'blog_tag')
         *     .minChildren(2)
         *     .maxChildren(10)
         *     .scoreMode('min');
         *
         * @param {number} limit A positive `integer` value.
         * @returns {HasChildQuery} returns `this` so that calls can be chained.
         */

    }, {
        key: 'minChildren',
        value: function minChildren(limit) {
            this._queryOpts.min_children = limit;
            return this;
        }

        /**
         * Specify the maximum number of children are required to match
         * for the parent doc to be considered a match
         *
         * @example
         * const qry = esb.hasChildQuery(esb.termQuery('tag', 'something'), 'blog_tag')
         *     .minChildren(2)
         *     .maxChildren(10)
         *     .scoreMode('min');
         *
         * @param {number} limit A positive `integer` value.
         * @returns {HasChildQuery} returns `this` so that calls can be chained.
         */

    }, {
        key: 'maxChildren',
        value: function maxChildren(limit) {
            this._queryOpts.max_children = limit;
            return this;
        }
    }]);
    return HasChildQuery;
}(JoiningQueryBase);

module.exports = HasChildQuery;