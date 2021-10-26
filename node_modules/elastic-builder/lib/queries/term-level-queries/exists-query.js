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
 * Returns documents that have at least one non-`null` value in the original field
 *
 * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-exists-query.html)
 *
 * @example
 * const qry = esb.existsQuery('user');
 *
 * @example
 * const qry = esb.boolQuery().mustNot(esb.existsQuery('user'));
 *
 * @param {string=} field
 *
 * @extends Query
 */


var ExistsQuery = function (_Query) {
    (0, _inherits3.default)(ExistsQuery, _Query);

    // eslint-disable-next-line require-jsdoc
    function ExistsQuery(field) {
        (0, _classCallCheck3.default)(this, ExistsQuery);

        var _this = (0, _possibleConstructorReturn3.default)(this, (ExistsQuery.__proto__ || Object.getPrototypeOf(ExistsQuery)).call(this, 'exists'));

        if (!isNil(field)) _this._queryOpts.field = field;
        return _this;
    }

    /**
     * Sets the field to search on.
     *
     * @param {string} field
     * @returns {ExistsQuery} returns `this` so that calls can be chained.
     */


    (0, _createClass3.default)(ExistsQuery, [{
        key: 'field',
        value: function field(_field) {
            this._queryOpts.field = _field;
            return this;
        }
    }]);
    return ExistsQuery;
}(Query);

module.exports = ExistsQuery;