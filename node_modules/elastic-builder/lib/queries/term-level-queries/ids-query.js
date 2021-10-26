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
    Query = _require.Query,
    checkType = _require.util.checkType;

/**
 * Filters documents that only have the provided ids.
 * Note, this query uses the _uid field.
 *
 * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-ids-query.html)
 *
 * @example
 * const qry = esb.idsQuery('my_type', ['1', '4', '100']);
 *
 * @param {Array|string=} type The elasticsearch doc type
 * @param {Array=} ids List of ids to fiter on.
 *
 * @extends Query
 */


var IdsQuery = function (_Query) {
    (0, _inherits3.default)(IdsQuery, _Query);

    // eslint-disable-next-line require-jsdoc
    function IdsQuery(type, ids) {
        (0, _classCallCheck3.default)(this, IdsQuery);

        var _this = (0, _possibleConstructorReturn3.default)(this, (IdsQuery.__proto__ || Object.getPrototypeOf(IdsQuery)).call(this, 'ids'));

        if (!isNil(type)) _this._queryOpts.type = type;
        if (!isNil(ids)) _this.values(ids);
        return _this;
    }

    /**
     * Sets the elasticsearch doc type to query on.
     * The type is optional and can be omitted, and can also accept an array of values.
     * If no type is specified, all types defined in the index mapping are tried.
     *
     * @param {Array<string>|string} type The elasticsearch doc type
     * @returns {IdsQuery} returns `this` so that calls can be chained.
     */


    (0, _createClass3.default)(IdsQuery, [{
        key: 'type',
        value: function type(_type) {
            this._queryOpts.type = _type;
            return this;
        }

        /**
         * Sets the list of ids to fiter on.
         *
         * @param {Array<string|number>} ids
         * @returns {IdsQuery} returns `this` so that calls can be chained.
         */

    }, {
        key: 'values',
        value: function values(ids) {
            checkType(ids, Array);

            this._queryOpts.values = ids;
            return this;
        }

        /**
         * Sets the list of ids to fiter on.
         * Alias for `values` method.
         *
         * @param {Array<string|number>} ids
         * @returns {IdsQuery} returns `this` so that calls can be chained.
         */

    }, {
        key: 'ids',
        value: function ids(_ids) {
            return this.values(_ids);
        }
    }]);
    return IdsQuery;
}(Query);

module.exports = IdsQuery;