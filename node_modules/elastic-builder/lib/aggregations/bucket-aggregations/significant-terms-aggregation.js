'use strict';

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SignificantAggregationBase = require('./significant-aggregation-base');

var ES_REF_URL = 'https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-significantterms-aggregation.html';

/**
 * An aggregation that returns interesting or unusual occurrences of terms in
 * a set.
 *
 * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-significantterms-aggregation.html)
 *
 * @example
 * const reqBody = esb.requestBodySearch()
 *     .query(esb.termsQuery('force', 'British Transport Police'))
 *     .agg(
 *         esb.significantTermsAggregation(
 *             'significantCrimeTypes',
 *             'crime_type'
 *         )
 *     );
 *
 * @example
 * // Use parent aggregation for segregated data analysis
 * const agg = esb.termsAggregation('forces', 'force').agg(
 *     esb.significantTermsAggregation('significantCrimeTypes', 'crime_type')
 * );
 *
 * @param {string} name The name which will be used to refer to this aggregation.
 * @param {string=} field The field to aggregate on
 *
 * @extends SignificantAggregationBase
 */

var SignificantTermsAggregation = function (_SignificantAggregati) {
    (0, _inherits3.default)(SignificantTermsAggregation, _SignificantAggregati);

    // eslint-disable-next-line require-jsdoc
    function SignificantTermsAggregation(name, field) {
        (0, _classCallCheck3.default)(this, SignificantTermsAggregation);
        return (0, _possibleConstructorReturn3.default)(this, (SignificantTermsAggregation.__proto__ || Object.getPrototypeOf(SignificantTermsAggregation)).call(this, name, 'significant_terms', ES_REF_URL, field));
    }

    return SignificantTermsAggregation;
}(SignificantAggregationBase);

module.exports = SignificantTermsAggregation;