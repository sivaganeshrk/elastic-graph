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

var ES_REF_URL = 'https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-nested-query.html';

/**
 * Nested query allows to query nested objects. The query is executed against
 * the nested objects / docs as if they were indexed as separate docs
 * (they are, internally) and resulting in the root parent doc (or parent nested mapping).
 *
 * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-nested-query.html)
 *
 * @example
 * const qry = esb.nestedQuery()
 *     .path('obj1')
 *     .scoreMode('avg')
 *     .query(
 *         esb.boolQuery().must([
 *             esb.matchQuery('obj1.name', 'blue'),
 *             esb.rangeQuery('obj1.count').gt(5)
 *         ])
 *     );
 *
 * @param {Query=} qry A valid `Query` object
 * @param {string=} path The nested object path.
 *
 * @extends JoiningQueryBase
 */

var NestedQuery = function (_JoiningQueryBase) {
    (0, _inherits3.default)(NestedQuery, _JoiningQueryBase);

    // eslint-disable-next-line require-jsdoc
    function NestedQuery(qry, path) {
        (0, _classCallCheck3.default)(this, NestedQuery);

        var _this = (0, _possibleConstructorReturn3.default)(this, (NestedQuery.__proto__ || Object.getPrototypeOf(NestedQuery)).call(this, 'nested', ES_REF_URL, qry));

        if (!isNil(path)) _this._queryOpts.path = path;
        return _this;
    }

    /**
     * Sets the root context for the nested query.
     *
     * @param {string} path
     * @returns {NestedQuery} returns `this` so that calls can be chained.
     */


    (0, _createClass3.default)(NestedQuery, [{
        key: 'path',
        value: function path(_path) {
            this._queryOpts.path = _path;
            return this;
        }
    }]);
    return NestedQuery;
}(JoiningQueryBase);

module.exports = NestedQuery;