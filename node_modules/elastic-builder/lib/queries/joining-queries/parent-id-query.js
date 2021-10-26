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
    Query = _require.Query;

/**
 * The `parent_id` query can be used to find child documents which belong to a particular parent.
 *
 * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-parent-id-query.html)
 *
 * @example
 * const qry = esb.parentIdQuery('blog_tag', 1);
 *
 * @param {string=} type The **child** type. This must be a type with `_parent` field.
 * @param {string|number=} id The required parent id select documents must refer to.
 *
 * @extends Query
 */


var ParentIdQuery = function (_Query) {
    (0, _inherits3.default)(ParentIdQuery, _Query);

    // eslint-disable-next-line require-jsdoc
    function ParentIdQuery(type, id) {
        (0, _classCallCheck3.default)(this, ParentIdQuery);

        var _this = (0, _possibleConstructorReturn3.default)(this, (ParentIdQuery.__proto__ || Object.getPrototypeOf(ParentIdQuery)).call(this, 'parent_id'));

        if (!isNil(type)) _this._queryOpts.type = type;
        if (!isNil(id)) _this._queryOpts.id = id;
        return _this;
    }

    /**
     * Sets the child type.
     *
     * @param {string} type The **child** type. This must be a type with `_parent` field.
     * @returns {ParentIdQuery} returns `this` so that calls can be chained.
     */


    (0, _createClass3.default)(ParentIdQuery, [{
        key: 'type',
        value: function type(_type) {
            this._queryOpts.type = _type;
            return this;
        }

        /**
         * Sets the id.
         *
         * @param {string|number} id The required parent id select documents must refer to.
         * @returns {ParentIdQuery} returns `this` so that calls can be chained.
         */

    }, {
        key: 'id',
        value: function id(_id) {
            this._queryOpts.id = _id;
            return this;
        }

        /**
         * When set to `true` will ignore an unmapped `path` and will not match any
         * documents for this query. When set to `false` (the default value) the query
         * will throw an exception if the path is not mapped.
         *
         * @param {boolean} enable `true` or `false`, `false` by default.
         * @returns {ParentIdQuery} returns `this` so that calls can be chained.
         */

    }, {
        key: 'ignoreUnmapped',
        value: function ignoreUnmapped(enable) {
            this._queryOpts.ignore_unmapped = enable;
            return this;
        }
    }]);
    return ParentIdQuery;
}(Query);

module.exports = ParentIdQuery;