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
    invalidParam = _require.util.invalidParam,
    MODEL_SET = _require.consts.MODEL_SET;

var PipelineAggregationBase = require('./pipeline-aggregation-base');

var ES_REF_URL = 'https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-pipeline-movavg-aggregation.html';

var invalidModelParam = invalidParam(ES_REF_URL, 'model', MODEL_SET);

/**
 * Given an ordered series of data, the Moving Average aggregation will
 * slide a window across the data and emit the average value of that window.
 *
 * `moving_avg` aggregations must be embedded inside of a histogram or
 * date_histogram aggregation.
 *
 * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-pipeline-movavg-aggregation.html)
 *
 * @example
 * const agg = esb.movingAverageAggregation('the_movavg', 'the_sum')
 *     .model('holt')
 *     .window(5)
 *     .gapPolicy('insert_zeros')
 *     .settings({ alpha: 0.8 });
 *
 * @example
 * const reqBody = esb.requestBodySearch()
 *     .agg(
 *         esb.dateHistogramAggregation('my_date_histo', 'timestamp')
 *             .interval('day')
 *             .agg(esb.sumAggregation('the_sum', 'lemmings'))
 *             // Relative path to sibling metric `the_sum`
 *             .agg(esb.movingAverageAggregation('the_movavg', 'the_sum'))
 *     )
 *     .size(0);
 *
 * @example
 * const reqBody = esb.requestBodySearch()
 *     .agg(
 *         esb.dateHistogramAggregation('my_date_histo', 'timestamp')
 *             .interval('day')
 *             // Use the document count as it's input
 *             .agg(esb.movingAverageAggregation('the_movavg', '_count'))
 *     )
 *     .size(0);
 *
 * @param {string} name The name which will be used to refer to this aggregation.
 * @param {string=} bucketsPath The relative path of metric to aggregate over
 *
 * @extends PipelineAggregationBase
 */

var MovingAverageAggregation = function (_PipelineAggregationB) {
    (0, _inherits3.default)(MovingAverageAggregation, _PipelineAggregationB);

    // eslint-disable-next-line require-jsdoc
    function MovingAverageAggregation(name, bucketsPath) {
        (0, _classCallCheck3.default)(this, MovingAverageAggregation);
        return (0, _possibleConstructorReturn3.default)(this, (MovingAverageAggregation.__proto__ || Object.getPrototypeOf(MovingAverageAggregation)).call(this, name, 'moving_avg', ES_REF_URL, bucketsPath));
    }

    /**
     * @override
     * @throws {Error} This method cannot be called on MovingAverageAggregation
     */


    (0, _createClass3.default)(MovingAverageAggregation, [{
        key: 'format',
        value: function format() {
            console.log('Please refer ' + ES_REF_URL);
            throw new Error('format is not supported in MovingAverageAggregation');
        }

        /**
         * Sets the moving average weighting model that we wish to use. Optional.
         *
         * @example
         * const agg = esb.movingAverageAggregation('the_movavg', 'the_sum')
         *     .model('simple')
         *     .window(30);
         *
         * @example
         * const agg = esb.movingAverageAggregation('the_movavg', 'the_sum')
         *     .model('ewma')
         *     .window(30)
         *     .settings({ alpha: 0.8 });
         *
         * @param {string} model Can be `simple`, `linear`,
         * `ewma` (aka "single-exponential"), `holt` (aka "double exponential")
         * or `holt_winters` (aka "triple exponential").
         * Default is `simple`
         * @returns {MovingAverageAggregation} returns `this` so that calls can be chained
         */

    }, {
        key: 'model',
        value: function model(_model) {
            if (isNil(_model)) invalidModelParam(_model);

            var modelLower = _model.toLowerCase();
            if (!MODEL_SET.has(modelLower)) invalidModelParam(_model);

            this._aggsDef.model = modelLower;
            return this;
        }

        /**
         * Sets the size of window to "slide" across the histogram. Optional.
         *
         * @example
         * const agg = esb.movingAverageAggregation('the_movavg', 'the_sum')
         *     .model('simple')
         *     .window(30)
         *
         * @param {number} window Default is 5
         * @returns {MovingAverageAggregation} returns `this` so that calls can be chained
         */

    }, {
        key: 'window',
        value: function window(_window) {
            this._aggsDef.window = _window;
            return this;
        }

        /**
         * If the model should be algorithmically minimized. Optional.
         * Applicable on EWMA, Holt-Linear, Holt-Winters.
         * Minimization is disabled by default for `ewma` and `holt_linear`,
         * while it is enabled by default for `holt_winters`.
         *
         * @example
         * const agg = esb.movingAverageAggregation('the_movavg', 'the_sum')
         *     .model('holt_winters')
         *     .window(30)
         *     .minimize(true)
         *     .settings({ period: 7 });
         *
         * @param {boolean} enable `false` for most models
         * @returns {MovingAverageAggregation} returns `this` so that calls can be chained
         */

    }, {
        key: 'minimize',
        value: function minimize(enable) {
            this._aggsDef.minimize = enable;
            return this;
        }

        /**
         * Model-specific settings, contents which differ depending on the model specified.
         * Optional.
         *
         * @example
         * const agg = esb.movingAverageAggregation('the_movavg', 'the_sum')
         *     .model('ewma')
         *     .window(30)
         *     .settings({ alpha: 0.8 });
         *
         * @param {Object} settings
         * @returns {MovingAverageAggregation} returns `this` so that calls can be chaineds
         */

    }, {
        key: 'settings',
        value: function settings(_settings) {
            this._aggsDef.settings = _settings;
            return this;
        }

        /**
         * Enable "prediction" mode, which will attempt to extrapolate into the future given
         * the current smoothed, moving average
         *
         * @example
         * const agg = esb.movingAverageAggregation('the_movavg', 'the_sum')
         *     .model('simple')
         *     .window(30)
         *     .predict(10);
         *
         * @param {number} predict the number of predictions you would like appended to the
         * end of the series
         * @returns {MovingAverageAggregation} returns `this` so that calls can be chained
         */

    }, {
        key: 'predict',
        value: function predict(_predict) {
            this._aggsDef.predict = _predict;
            return this;
        }
    }]);
    return MovingAverageAggregation;
}(PipelineAggregationBase);

module.exports = MovingAverageAggregation;