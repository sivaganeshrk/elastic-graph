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

var ES_REF_URL = 'https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-has-parent-query.html';

/**
 * The `has_parent` query accepts a query and a parent type. The query is
 * executed in the parent document space, which is specified by the parent
 * type. This query returns child documents which associated parents have
 * matched.
 *
 * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-has-parent-query.html)
 *
 * @example
 * const qry = esb.hasParentQuery(esb.termQuery('tag', 'something'), 'blog');
 *
 * @example
 * // Sorting tags by parent documents' `view_count` field
 * const qry = esb.hasParentQuery()
 *     .parentType('blog')
 *     .score(true)
 *     .query(
 *         esb.functionScoreQuery().function(
 *             esb.scriptScoreFunction("_score * doc['view_count'].value")
 *         )
 *     );
 *
 * @param {Query=} qry A valid `Query` object
 * @param {string=} type The parent type
 *
 * @extends JoiningQueryBase
 */

var HasParentQuery = function (_JoiningQueryBase) {
    (0, _inherits3.default)(HasParentQuery, _JoiningQueryBase);

    // eslint-disable-next-line require-jsdoc
    function HasParentQuery(qry, type) {
        (0, _classCallCheck3.default)(this, HasParentQuery);

        var _this = (0, _possibleConstructorReturn3.default)(this, (HasParentQuery.__proto__ || Object.getPrototypeOf(HasParentQuery)).call(this, 'has_parent', ES_REF_URL, qry));

        if (!isNil(type)) _this._queryOpts.parent_type = type;
        return _this;
    }

    /**
     * @throws {Error} `score_mode` is deprecated. Use `score` instead.
     * @override
     */


    (0, _createClass3.default)(HasParentQuery, [{
        key: 'scoreMode',
        value: function scoreMode() {
            console.log('`score_mode` is deprecated. Use `score` instead');
            console.log('Please refer ' + ES_REF_URL);
            throw new Error('scoreMode is not supported in HasParentQuery');
        }

        /**
         * Sets the child document type to search against
         * Alias for method `parentType`
         *
         * @param {string} type A valid doc type name
         * @returns {HasParentQuery} returns `this` so that calls can be chained.
         */

    }, {
        key: 'type',
        value: function type(_type) {
            return this.parentType(_type);
        }

        /**
         * Sets the child document type to search against
         *
         * @param {string} type A valid doc type name
         * @returns {HasParentQuery} returns `this` so that calls can be chained.
         */

    }, {
        key: 'parentType',
        value: function parentType(type) {
            this._queryOpts.parent_type = type;
            return this;
        }

        /**
         * By default, scoring is `false` which ignores the score from the parent document.
         * The score is in this case equal to the boost on the `has_parent` query (Defaults to 1).
         * If the score is set to `true`, then the score of the matching parent document is
         * aggregated into the child documents belonging to the matching parent document.
         *
         * @example
         * const qry = esb.hasParentQuery(
         *     esb.termQuery('tag', 'something'),
         *     'blog'
         * ).score(true);
         *
         * @param {boolean} enable `true` to enable scoring, `false` to disable.
         * `false` by default.
         * @returns {HasParentQuery} returns `this` so that calls can be chained.
         */

    }, {
        key: 'score',
        value: function score(enable) {
            this._queryOpts.score = enable;
            return this;
        }
    }]);
    return HasParentQuery;
}(JoiningQueryBase);

module.exports = HasParentQuery;