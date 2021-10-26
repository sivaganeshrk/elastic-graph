'use strict';

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ValueTermQueryBase = require('./value-term-query-base');

/**
 * The `term` query finds documents that contain the *exact* term specified
 * in the inverted index.
 *
 * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-term-query.html)
 *
 * @example
 * const termQry = esb.termQuery('user', 'Kimchy');
 *
 * @param {string=} field
 * @param {string|number|boolean=} queryVal
 *
 * @extends ValueTermQueryBase
 */

var TermQuery = function (_ValueTermQueryBase) {
    (0, _inherits3.default)(TermQuery, _ValueTermQueryBase);

    // eslint-disable-next-line require-jsdoc
    function TermQuery(field, queryVal) {
        (0, _classCallCheck3.default)(this, TermQuery);
        return (0, _possibleConstructorReturn3.default)(this, (TermQuery.__proto__ || Object.getPrototypeOf(TermQuery)).call(this, 'term', field, queryVal));
    }

    return TermQuery;
}(ValueTermQueryBase);

module.exports = TermQuery;