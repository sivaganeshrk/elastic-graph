'use strict';

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var has = require('lodash.has');
var isNil = require('lodash.isnil');

var _require = require('../../core'),
    invalidParam = _require.util.invalidParam;

var TermsAggregationBase = require('./terms-aggregation-base');

var ES_REF_URL = 'https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-terms-aggregation.html';

var invalidDirectionParam = invalidParam(ES_REF_URL, 'direction', "'asc' or 'desc'");
var invalidCollectModeParam = invalidParam(ES_REF_URL, 'mode', "'breadth_first' or 'depth_first'");

/**
 * A multi-bucket value source based aggregation where buckets are dynamically
 * built - one per unique value.
 *
 * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-terms-aggregation.html)
 *
 * @example
 * const agg = esb.termsAggregation('genres', 'genre');
 *
 * @param {string} name The name which will be used to refer to this aggregation.
 * @param {string=} field The field to aggregate on
 *
 * @extends TermsAggregationBase
 */

var TermsAggregation = function (_TermsAggregationBase) {
    (0, _inherits3.default)(TermsAggregation, _TermsAggregationBase);

    // eslint-disable-next-line require-jsdoc
    function TermsAggregation(name, field) {
        (0, _classCallCheck3.default)(this, TermsAggregation);
        return (0, _possibleConstructorReturn3.default)(this, (TermsAggregation.__proto__ || Object.getPrototypeOf(TermsAggregation)).call(this, name, 'terms', ES_REF_URL, field));
    }

    /**
     * When set to `true`, shows an error value for each term returned by the aggregation
     * which represents the _worst case error_ in the document count and can be useful
     * when deciding on a value for the shard_size parameter.
     *
     * @param {boolean} enable
     * @returns {TermsAggregation} returns `this` so that calls can be chained
     */


    (0, _createClass3.default)(TermsAggregation, [{
        key: 'showTermDocCountError',
        value: function showTermDocCountError(enable) {
            this._aggsDef.show_term_doc_count_error = enable;
            return this;
        }

        /**
         * Break the analysis up into multiple requests by grouping the field’s values
         * into a number of partitions at query-time and processing only one
         * partition in each request.
         *
         * Note that this method is a special case as the name doesn't map to the
         * elasticsearch parameter name. This is required because there is already
         * a method for `include` applicable for Terms aggregations. However, this
         * could change depending on community interest.
         *
         * @example
         * const agg = esb.termsAggregation('expired_sessions', 'account_id')
         *     .includePartition(0, 20)
         *     .size(10000)
         *     .order('last_access', 'asc')
         *     .agg(esb.maxAggregation('last_access', 'access_date'));
         *
         * @param {number} partition
         * @param {number} numPartitions
         * @returns {TermsAggregation} returns `this` so that calls can be chained
         */

    }, {
        key: 'includePartition',
        value: function includePartition(partition, numPartitions) {
            // TODO: Print warning if include key is being overwritten
            this._aggsDef.include = {
                partition: partition,
                num_partitions: numPartitions
            };
            return this;
        }

        /**
         * Can be used for deferring calculation of child aggregations by using
         * `breadth_first` mode. In `depth_first` mode all branches of the aggregation
         * tree are expanded in one depth-first pass and only then any pruning occurs.
         *
         * @example
         * const agg = esb.termsAggregation('actors', 'actors')
         *     .size(10)
         *     .collectMode('breadth_first')
         *     .agg(esb.termsAggregation('costars', 'actors').size(5));
         *
         * @param {string} mode The possible values are `breadth_first` and `depth_first`.
         * @returns {TermsAggregation} returns `this` so that calls can be chained
         */

    }, {
        key: 'collectMode',
        value: function collectMode(mode) {
            if (isNil(mode)) invalidCollectModeParam(mode);

            var modeLower = mode.toLowerCase();
            if (modeLower !== 'breadth_first' && modeLower !== 'depth_first') {
                invalidCollectModeParam(mode);
            }

            this._aggsDef.collect_mode = modeLower;
            return this;
        }

        /**
         * Sets the ordering for buckets
         *
         * @example
         * // Ordering the buckets by their doc `_count` in an ascending manner
         * const agg = esb.termsAggregation('genres', 'genre').order('_count', 'asc');
         *
         * @example
         * // Ordering the buckets alphabetically by their terms in an ascending manner
         * const agg = esb.termsAggregation('genres', 'genre').order('_term', 'asc');
         *
         * @example
         * // Ordering the buckets by single value metrics sub-aggregation
         * // (identified by the aggregation name)
         * const agg = esb.termsAggregation('genres', 'genre')
         *     .order('max_play_count', 'asc')
         *     .agg(esb.maxAggregation('max_play_count', 'play_count'));
         *
         * @example
         * // Ordering the buckets by multi value metrics sub-aggregation
         * // (identified by the aggregation name):
         * const agg = esb.termsAggregation('genres', 'genre')
         *     .order('playback_stats.max', 'desc')
         *     .agg(esb.statsAggregation('playback_stats', 'play_count'));
         *
         * @example
         * // Multiple order criteria
         * const agg = esb.termsAggregation('countries')
         *     .field('artist.country')
         *     .order('rock>playback_stats.avg', 'desc')
         *     .order('_count', 'desc')
         *     .agg(
         *         esb.filterAggregation('rock')
         *             .filter(esb.termQuery('genre', 'rock'))
         *             .agg(esb.statsAggregation('playback_stats', 'play_count'))
         *     );
         *
         * @param {string} key
         * @param {string} direction `asc` or `desc`
         * @returns {TermsAggregation} returns `this` so that calls can be chained
         */

    }, {
        key: 'order',
        value: function order(key) {
            var direction = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'desc';

            if (isNil(direction)) invalidDirectionParam(direction);

            var directionLower = direction.toLowerCase();
            if (directionLower !== 'asc' && directionLower !== 'desc') {
                invalidDirectionParam(direction);
            }

            if (has(this._aggsDef, 'order')) {
                if (!Array.isArray(this._aggsDef.order)) {
                    this._aggsDef.order = [this._aggsDef.order];
                }

                this._aggsDef.order.push((0, _defineProperty3.default)({}, key, directionLower));
            } else {
                this._aggsDef.order = (0, _defineProperty3.default)({}, key, directionLower);
            }

            return this;
        }
    }]);
    return TermsAggregation;
}(TermsAggregationBase);

module.exports = TermsAggregation;