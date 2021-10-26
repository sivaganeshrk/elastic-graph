'use strict';

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ValuesSourceBase = require('./values-source-base');

var REF_URL = 'https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-composite-aggregation.html#_terms';

/**
 * `TermsValuesSource` is a source for the `CompositeAggregation` that handles
 * terms. It works very similar to a terms aggregation with a slightly different
 * syntax.
 *
 * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-composite-aggregation.html#_terms)
 *
 * @example
 * const valueSrc = esb.CompositeAggregation.termsValuesSource('product').script({
 *   source: "doc['product'].value",
 *   lang: 'painless'
 * });
 *
 * @param {string} name
 * @param {string=} field The field to aggregate on
 *
 * @extends ValuesSourceBase
 */

var TermsValuesSource = function (_ValuesSourceBase) {
    (0, _inherits3.default)(TermsValuesSource, _ValuesSourceBase);

    // eslint-disable-next-line require-jsdoc
    function TermsValuesSource(name, field) {
        (0, _classCallCheck3.default)(this, TermsValuesSource);
        return (0, _possibleConstructorReturn3.default)(this, (TermsValuesSource.__proto__ || Object.getPrototypeOf(TermsValuesSource)).call(this, 'terms', REF_URL, name, field));
    }

    return TermsValuesSource;
}(ValuesSourceBase);

module.exports = TermsValuesSource;