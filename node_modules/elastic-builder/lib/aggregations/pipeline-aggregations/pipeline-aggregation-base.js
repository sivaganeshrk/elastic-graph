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
    Aggregation = _require.Aggregation,
    invalidParam = _require.util.invalidParam;

var invalidGapPolicyParam = invalidParam('', 'gap_policy', "'skip' or 'insert_zeros'");

/**
 * The `PipelineAggregationBase` provides support for common options used across
 * various pipeline `Aggregation` implementations.
 *
 * Pipeline aggregations cannot have sub-aggregations but depending on the type
 * it can reference another pipeline in the buckets_path allowing pipeline
 * aggregations to be chained. For example, you can chain together two derivatives
 * to calculate the second derivative (i.e. a derivative of a derivative).
 *
 * **NOTE:** Instantiating this directly should not be required.
 * However, if you wish to add a custom implementation for whatever reason,
 * this class could be extended.
 *
 * @param {string} name a valid aggregation name
 * @param {string} aggType type of aggregation
 * @param {string} refUrl Elasticsearch reference URL
 * @param {string|Object=} bucketsPath The relative path of metric to aggregate over
 *
 * @extends Aggregation
 */

var PipelineAggregationBase = function (_Aggregation) {
    (0, _inherits3.default)(PipelineAggregationBase, _Aggregation);

    // eslint-disable-next-line require-jsdoc
    function PipelineAggregationBase(name, aggType, refUrl, bucketsPath) {
        (0, _classCallCheck3.default)(this, PipelineAggregationBase);

        var _this = (0, _possibleConstructorReturn3.default)(this, (PipelineAggregationBase.__proto__ || Object.getPrototypeOf(PipelineAggregationBase)).call(this, name, aggType));

        _this._refUrl = refUrl;

        if (!isNil(bucketsPath)) _this._aggsDef.buckets_path = bucketsPath;
        return _this;
    }

    /**
     * Sets the relative path, `buckets_path`, which refers to the metric to aggregate over.
     * Required.
     *
     * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-pipeline.html#buckets-path-syntax)
     *
     * @example
     * const reqBody = esb.requestBodySearch()
     *     .agg(
     *         esb.dateHistogramAggregation('histo', 'date')
     *             .interval('day')
     *             .agg(esb.termsAggregation('categories', 'category'))
     *             .agg(
     *                 esb.bucketSelectorAggregation('min_bucket_selector')
     *                     .bucketsPath({ count: 'categories._bucket_count' })
     *                     .script(esb.script('inline', 'params.count != 0'))
     *             )
     *     )
     *     .size(0);
     *
     * @param {string|Object} path
     * @returns {PipelineAggregationBase} returns `this` so that calls can be chained
     */


    (0, _createClass3.default)(PipelineAggregationBase, [{
        key: 'bucketsPath',
        value: function bucketsPath(path) {
            this._aggsDef.buckets_path = path;
            return this;
        }

        /**
         * Set policy for missing data. Optional.
         *
         * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-pipeline.html#gap-policy)
         *
         * @param {string} policy Can be `skip` or `insert_zeros`
         * @returns {PipelineAggregationBase} returns `this` so that calls can be chained
         */

    }, {
        key: 'gapPolicy',
        value: function gapPolicy(policy) {
            if (isNil(policy)) invalidGapPolicyParam(policy, this._refUrl);

            var policyLower = policy.toLowerCase();
            if (policyLower !== 'skip' && policyLower !== 'insert_zeros') {
                invalidGapPolicyParam(policy, this._refUrl);
            }

            this._aggsDef.gap_policy = policyLower;
            return this;
        }

        /**
         * Sets the format expression if applicable. Optional.
         *
         * @param {string} fmt Format mask to apply on aggregation response. Example: ####.00
         * @returns {PipelineAggregationBase} returns `this` so that calls can be chained
         */

    }, {
        key: 'format',
        value: function format(fmt) {
            this._aggsDef.format = fmt;
            return this;
        }
    }]);
    return PipelineAggregationBase;
}(Aggregation);

module.exports = PipelineAggregationBase;