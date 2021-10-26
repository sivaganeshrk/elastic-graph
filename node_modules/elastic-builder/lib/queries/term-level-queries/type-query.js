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
 * Filters documents matching the provided document / mapping type.
 *
 * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-type-query.html)
 *
 * @example
 * const qry = esb.typeQuery('my_type');
 *
 * @param {string=} type The elasticsearch doc type
 *
 * @extends Query
 */


var TypeQuery = function (_Query) {
    (0, _inherits3.default)(TypeQuery, _Query);

    // eslint-disable-next-line require-jsdoc
    function TypeQuery(type) {
        (0, _classCallCheck3.default)(this, TypeQuery);

        var _this = (0, _possibleConstructorReturn3.default)(this, (TypeQuery.__proto__ || Object.getPrototypeOf(TypeQuery)).call(this, 'type'));

        if (!isNil(type)) _this._queryOpts.value = type;
        return _this;
    }

    /**
     * Sets the elasticsearch doc type to query on.
     *
     * @param {string} type The elasticsearch doc type
     * @returns {TypeQuery} returns `this` so that calls can be chained.
     */


    (0, _createClass3.default)(TypeQuery, [{
        key: 'value',
        value: function value(type) {
            this._queryOpts.value = type;
            return this;
        }

        /**
         * Sets the elasticsearch doc type to query on.
         * Alias for method `value`.
         *
         * @param {string} type The elasticsearch doc type
         * @returns {TypeQuery} returns `this` so that calls can be chained.
         */

    }, {
        key: 'type',
        value: function type(_type) {
            return this.value(_type);
        }
    }]);
    return TypeQuery;
}(Query);

module.exports = TypeQuery;