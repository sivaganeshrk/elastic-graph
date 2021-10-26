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

var _require = require('../../core'),
    Aggregation = _require.Aggregation,
    _require$util = _require.util,
    checkType = _require$util.checkType,
    constructorWrapper = _require$util.constructorWrapper;

var _require2 = require('./composite-agg-values-sources'),
    ValuesSourceBase = _require2.ValuesSourceBase,
    TermsValuesSource = _require2.TermsValuesSource,
    HistogramValuesSource = _require2.HistogramValuesSource,
    DateHistogramValuesSource = _require2.DateHistogramValuesSource;

/**
 * CompositeAggregation is a multi-bucket values source based aggregation that
 * can be used to calculate unique composite values from source documents.
 *
 * Unlike the other multi-bucket aggregation the composite aggregation can be
 * used to paginate **all** buckets from a multi-level aggregation efficiently.
 * This aggregation provides a way to stream **all** buckets of a specific
 * aggregation similarly to what scroll does for documents.
 *
 * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-composite-aggregation.html)
 *
 * @example
 * const reqBody = esb.requestBodySearch()
 *   .agg(
 *     esb.compositeAggregation('my_buckets')
 *       .sources(
 *         esb.CompositeAggregation.termsValuesSource('product', 'product')
 *       )
 *   )
 *
 * NOTE: This query was added in elasticsearch v6.1.
 *
 * @param {string} name a valid aggregation name
 *
 * @extends Aggregation
 */


var CompositeAggregation = function (_Aggregation) {
    (0, _inherits3.default)(CompositeAggregation, _Aggregation);

    // eslint-disable-next-line require-jsdoc
    function CompositeAggregation(name) {
        (0, _classCallCheck3.default)(this, CompositeAggregation);

        var _this = (0, _possibleConstructorReturn3.default)(this, (CompositeAggregation.__proto__ || Object.getPrototypeOf(CompositeAggregation)).call(this, name, 'composite'));

        _this._aggsDef.sources = [];
        return _this;
    }

    /**
     * Specifies the Composite Aggregation values sources to use in the
     * aggregation.
     *
     * @example
     * const { CompositeAggregation } = esb;
     * const reqBody = esb.requestBodySearch()
     *   .agg(
     *     esb.compositeAggregation('my_buckets')
     *       .sources(
     *         CompositeAggregation.dateHistogramValuesSource(
     *           'date',
     *           'timestamp',
     *           '1d'
     *         ),
     *         CompositeAggregation.termsValuesSource('product', 'product')
     *       )
     *   );
     *
     * @param {...ValuesSourceBase} sources
     * @returns {CompositeAggregation} returns `this` so that calls can be chained
     * @throws {TypeError} If any of the rest parameters `sources` is not an
     * instance of `ValuesSourceBase`
     */


    (0, _createClass3.default)(CompositeAggregation, [{
        key: 'sources',
        value: function sources() {
            for (var _len = arguments.length, _sources = Array(_len), _key = 0; _key < _len; _key++) {
                _sources[_key] = arguments[_key];
            }

            _sources.forEach(function (valueSrc) {
                return checkType(valueSrc, ValuesSourceBase);
            });

            this._aggsDef.sources = this._aggsDef.sources.concat(_sources);
            return this;
        }

        /**
         * Defines how many composite buckets should be returned. Each composite
         * bucket is considered as a single bucket so setting a size of 10 will
         * return the first 10 composite buckets created from the values source. The
         * response contains the values for each composite bucket in an array
         * containing the values extracted from each value source.
         *
         * @param {number} size
         * @returns {CompositeAggregation} returns `this` so that calls can be chained
         */

    }, {
        key: 'size',
        value: function size(_size) {
            this._aggsDef.size = _size;
            return this;
        }

        /**
         * The `after` parameter can be used to retrieve the composite buckets that
         * are after the last composite buckets returned in a previous round.
         *
         * @example
         * const { CompositeAggregation } = esb;
         * const reqBody = esb.requestBodySearch().agg(
         *   esb.compositeAggregation('my_buckets')
         *     .size(2)
         *     .sources(
         *       CompositeAggregation.dateHistogramValuesSource(
         *         'date',
         *         'timestamp',
         *         '1d'
         *       ).order('desc'),
         *       CompositeAggregation.termsValuesSource('product', 'product').order('asc')
         *     )
         *     .after({ date: 1494288000000, product: 'mad max' })
         * );
         *
         * @param {Object} afterKey
         * @returns {CompositeAggregation} returns `this` so that calls can be chained
         */

    }, {
        key: 'after',
        value: function after(afterKey) {
            this._aggsDef.after = afterKey;
            return this;
        }
    }]);
    return CompositeAggregation;
}(Aggregation);

CompositeAggregation.TermsValuesSource = TermsValuesSource;
CompositeAggregation.termsValuesSource = constructorWrapper(TermsValuesSource);

CompositeAggregation.HistogramValuesSource = HistogramValuesSource;
CompositeAggregation.histogramValuesSource = constructorWrapper(HistogramValuesSource);

CompositeAggregation.DateHistogramValuesSource = DateHistogramValuesSource;
CompositeAggregation.dateHistogramValuesSource = constructorWrapper(DateHistogramValuesSource);

module.exports = CompositeAggregation;