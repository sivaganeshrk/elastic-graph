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

var MetricsAggregationBase = require('./metrics-aggregation-base'),
    _require = require('../../core'),
    Highlight = _require.Highlight,
    Sort = _require.Sort,
    _require$util = _require.util,
    checkType = _require$util.checkType,
    setDefault = _require$util.setDefault;


var ES_REF_URL = 'https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-metrics-top-hits-aggregation.html';

/**
 * A `top_hits` metric aggregator keeps track of the most relevant document being
 * aggregated. This aggregator is intended to be used as a sub aggregator, so that
 * the top matching documents can be aggregated per bucket.
 *
 * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-metrics-top-hits-aggregation.html)
 *
 * `top_hits` metric aggregator keeps track of the most relevant document being
 * aggregated.
 *
 * @example
 * const reqBody = esb.requestBodySearch()
 *     .agg(
 *         esb.termsAggregation('top_tags', 'type')
 *             .size(3)
 *             .agg(
 *                 esb.topHitsAggregation('top_sales_hits')
 *                     .sort(esb.sort('date', 'desc'))
 *                     .source({ includes: ['date', 'price'] })
 *                     .size(1)
 *             )
 *     )
 *     .size(0);
 *
 * @example
 * // Field collapsing(logically groups a result set into
 * // groups and per group returns top documents)
 * const reqBody = esb.requestBodySearch()
 *     .query(esb.matchQuery('body', 'elections'))
 *     .agg(
 *         esb.termsAggregation('top-sites', 'domain')
 *             .order('top_hit', 'desc')
 *             .agg(esb.topHitsAggregation('top_tags_hits'))
 *             .agg(
 *                 esb.maxAggregation('top_hit').script(
 *                     esb.script('inline', '_score')
 *                 )
 *             )
 *     );
 *
 * @param {string} name The name which will be used to refer to this aggregation.
 *
 * @extends MetricsAggregationBase
 */

var TopHitsAggregation = function (_MetricsAggregationBa) {
    (0, _inherits3.default)(TopHitsAggregation, _MetricsAggregationBa);

    // eslint-disable-next-line require-jsdoc
    function TopHitsAggregation(name) {
        (0, _classCallCheck3.default)(this, TopHitsAggregation);
        return (0, _possibleConstructorReturn3.default)(this, (TopHitsAggregation.__proto__ || Object.getPrototypeOf(TopHitsAggregation)).call(this, name, 'top_hits'));
    }

    /**
     * @override
     * @throws {Error} This method cannot be called on TopHitsAggregation
     */


    (0, _createClass3.default)(TopHitsAggregation, [{
        key: 'field',
        value: function field() {
            console.log('Please refer ' + ES_REF_URL);
            throw new Error('field is not supported in TopHitsAggregation');
        }

        /**
         * @override
         * @throws {Error} This method cannot be called on TopHitsAggregation
         */

    }, {
        key: 'script',
        value: function script() {
            console.log('Please refer ' + ES_REF_URL);
            throw new Error('script is not supported in TopHitsAggregation');
        }

        /**
         * @override
         * @throws {Error} This method cannot be called on TopHitsAggregation
         */

    }, {
        key: 'missing',
        value: function missing() {
            console.log('Please refer ' + ES_REF_URL);
            throw new Error('missing is not supported in TopHitsAggregation');
        }

        /**
         * @override
         * @throws {Error} This method cannot be called on TopHitsAggregation
         */

    }, {
        key: 'format',
        value: function format() {
            console.log('Please refer ' + ES_REF_URL);
            throw new Error('format is not supported in TopHitsAggregation');
        }

        /**
         * Sets the offset for fetching result.
         *
         * @param {number} from The offset from the first result you want to fetch.
         * @returns {TopHitsAggregation} returns `this` so that calls can be chained
         */

    }, {
        key: 'from',
        value: function from(_from) {
            this._aggsDef.from = _from;
            return this;
        }

        /**
         * Sets the maximum number of top matching hits to return per bucket.
         *
         * @param {number} size The numer of aggregation entries to be returned per bucket.
         * @returns {TopHitsAggregation} returns `this` so that calls can be chained
         */

    }, {
        key: 'size',
        value: function size(_size) {
            this._aggsDef.size = _size;
            return this;
        }

        /**
         * How the top matching hits should be sorted. Allows to add sort on specific field.
         * The sort can be reversed as well. The sort is defined on a per field level,
         * with special field name for `_score` to sort by score, and `_doc` to sort by
         * index order.
         *
         * @param {Sort} sort How the top matching hits should be sorted.
         * @returns {TopHitsAggregation} returns `this` so that calls can be chained.
         * @throws {TypeError} If parameter `sort` is not an instance of `Sort`.
         */

    }, {
        key: 'sort',
        value: function sort(_sort) {
            checkType(_sort, Sort);

            setDefault(this._aggsDef, 'sort', []);

            this._aggsDef.sort.push(_sort);
            return this;
        }

        /**
         * Allows to add multiple sort on specific fields. Each sort can be reversed as well.
         * The sort is defined on a per field level, with special field name for _score to
         * sort by score, and _doc to sort by index order.
         *
         * @param {Array<Sort>} sorts Arry of sort How the top matching hits should be sorted.
         * @returns {TopHitsAggregation} returns `this` so that calls can be chained.
         * @throws {TypeError} If any item in parameter `sorts` is not an instance of `Sort`.
         */

    }, {
        key: 'sorts',
        value: function sorts(_sorts) {
            var _this2 = this;

            _sorts.forEach(function (sort) {
                return _this2.sort(sort);
            });
            return this;
        }

        /**
         * Enables score computation and tracking during sorting.
         * By default, sorting scores are not computed.
         *
         * @param {boolean} trackScores If scores should be computed and tracked. Defaults to false.
         * @returns {TopHitsAggregation} returns `this` so that calls can be chained
         */

    }, {
        key: 'trackScores',
        value: function trackScores(_trackScores) {
            this._aggsDef.track_scores = _trackScores;
            return this;
        }

        /**
         * Enable/Disable returning version number for each hit.
         *
         * @param {boolean} version true to enable, false to disable
         * @returns {TopHitsAggregation} returns `this` so that calls can be chained
         */

    }, {
        key: 'version',
        value: function version(_version) {
            this._aggsDef.version = _version;
            return this;
        }

        /**
         * Enable/Disable explanation of score for each hit.
         *
         * @param {boolean} explain true to enable, false to disable
         * @returns {TopHitsAggregation} returns `this` so that calls can be chained
         */

    }, {
        key: 'explain',
        value: function explain(_explain) {
            this._aggsDef.explain = _explain;
            return this;
        }

        /**
         * Performs highlighting based on the `Highlight` settings.
         *
         * @param {Highlight} highlight
         * @returns {TopHitsAggregation} returns `this` so that calls can be chained
         */

    }, {
        key: 'highlight',
        value: function highlight(_highlight) {
            checkType(_highlight, Highlight);

            this._aggsDef.highlight = _highlight;
            return this;
        }

        /**
         * Allows to control how the `_source` field is returned with every hit.
         * You can turn off `_source` retrieval by passing `false`.
         * It also accepts one(string) or more wildcard(array) patterns to control
         * what parts of the `_source` should be returned
         * An object can also be used to specify the wildcard patterns for `includes` and `excludes`.
         *
         * @param {boolean|string|Array|Object} source
         * @returns {TopHitsAggregation} returns `this` so that calls can be chained
         */

    }, {
        key: 'source',
        value: function source(_source) {
            this._aggsDef._source = _source;
            return this;
        }

        /**
         * The stored_fields parameter is about fields that are explicitly marked as stored in the mapping.
         * Selectively load specific stored fields for each document represented by a search hit
         * using array of stored fields.
         * An empty array will cause only the _id and _type for each hit to be returned.
         * To disable the stored fields (and metadata fields) entirely use: '_none_'
         *
         * @param {Array|string} fields
         * @returns {TopHitsAggregation} returns `this` so that calls can be chained
         */

    }, {
        key: 'storedFields',
        value: function storedFields(fields) {
            this._aggsDef.stored_fields = fields;
            return this;
        }

        /**
         * Computes a document property dynamically based on the supplied `Script`.
         *
         * @param {string} scriptFieldName
         * @param {string|Script} script string or instance of `Script`
         * @returns {TopHitsAggregation} returns `this` so that calls can be chained
         */

    }, {
        key: 'scriptField',
        value: function scriptField(scriptFieldName, script) {
            setDefault(this._aggsDef, 'script_fields', {});

            this._aggsDef.script_fields[scriptFieldName] = { script: script };
            return this;
        }

        /**
         * Sets given dynamic document properties to be computed using supplied `Script`s.
         *
         * Object should have `scriptFieldName` as key and `script` as the value.
         *
         * @param {Object} scriptFields Object with `scriptFieldName` as key and `script` as the value.
         * @returns {TopHitsAggregation} returns `this` so that calls can be chained
         */

    }, {
        key: 'scriptFields',
        value: function scriptFields(_scriptFields) {
            var _this3 = this;

            checkType(_scriptFields, Object);

            Object.keys(_scriptFields).forEach(function (scriptFieldName) {
                return _this3.scriptField(scriptFieldName, _scriptFields[scriptFieldName]);
            });

            return this;
        }

        /**
         * Allows to return the doc value representation of a field for each hit.
         * Doc value fields can work on fields that are not stored.
         *
         * @param {Array<string>} fields
         * @returns {TopHitsAggregation} returns `this` so that calls can be chained
         */

    }, {
        key: 'docvalueFields',
        value: function docvalueFields(fields) {
            this._aggsDef.docvalue_fields = fields;
            return this;
        }
    }]);
    return TopHitsAggregation;
}(MetricsAggregationBase);

module.exports = TopHitsAggregation;