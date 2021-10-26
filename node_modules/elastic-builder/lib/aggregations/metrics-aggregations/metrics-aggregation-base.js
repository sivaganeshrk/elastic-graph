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
    Script = _require.Script,
    checkType = _require.util.checkType;

/**
 * The `MetricsAggregationBase` provides support for common options used across
 * various metrics `Aggregation` implementations.
 *
 * **NOTE:** Instantiating this directly should not be required.
 * However, if you wish to add a custom implementation for whatever reason,
 * this class could be extended.
 *
 * @param {string} name a valid aggregation name
 * @param {string} aggType type of aggregation
 * @param {string=} field The field to aggregate on
 *
 * @extends Aggregation
 */


var MetricsAggregationBase = function (_Aggregation) {
    (0, _inherits3.default)(MetricsAggregationBase, _Aggregation);

    // eslint-disable-next-line require-jsdoc
    function MetricsAggregationBase(name, aggType, field) {
        (0, _classCallCheck3.default)(this, MetricsAggregationBase);

        var _this = (0, _possibleConstructorReturn3.default)(this, (MetricsAggregationBase.__proto__ || Object.getPrototypeOf(MetricsAggregationBase)).call(this, name, aggType));

        if (!isNil(field)) _this._aggsDef.field = field;
        return _this;
    }

    // TODO: Investigate whether Metrics Aggregations can have sub aggregations
    // Hide setters for `aggs` and `aggregations` if required

    // TODO: Investigate case when getters will be required

    /**
     * Sets field to run aggregation on.
     *
     * @param {string} field a valid field name
     * @returns {MetricsAggregationBase} returns `this` so that calls can be chained
     */


    (0, _createClass3.default)(MetricsAggregationBase, [{
        key: 'field',
        value: function field(_field) {
            this._aggsDef.field = _field;
            return this;
        }

        /**
         * Sets script parameter for aggregation.
         *
         * @example
         * // Compute the average grade based on a script
         * const agg = esb.avgAggregation('avg_grade').script(
         *     esb.script('inline', "doc['grade'].value").lang('painless')
         * );
         *
         * @example
         * // Value script, apply grade correction
         * const agg = esb.avgAggregation('avg_grade', 'grade').script(
         *     esb.script('inline', '_value * params.correction')
         *         .lang('painless')
         *         .params({ correction: 1.2 })
         * );
         *
         * @param {Script} script
         * @returns {MetricsAggregationBase} returns `this` so that calls can be chained
         * @throws {TypeError} If `script` is not an instance of `Script`
         */

    }, {
        key: 'script',
        value: function script(_script) {
            checkType(_script, Script);

            this._aggsDef.script = _script;
            return this;
        }

        /**
         * Sets the missing parameter ehich defines how documents
         * that are missing a value should be treated.
         *
         * @example
         * const agg = esb.avgAggregation('avg_grade', 'grade').missing(10);
         *
         * @param {string} value
         * @returns {MetricsAggregationBase} returns `this` so that calls can be chained
         */

    }, {
        key: 'missing',
        value: function missing(value) {
            this._aggsDef.missing = value;
            return this;
        }

        /**
         * Sets the format expression if applicable.
         *
         * @param {string} fmt Format mask to apply on aggregation response. Example: ####.00
         * @returns {MetricsAggregationBase} returns `this` so that calls can be chained
         */

    }, {
        key: 'format',
        value: function format(fmt) {
            this._aggsDef.format = fmt;
            return this;
        }
    }]);
    return MetricsAggregationBase;
}(Aggregation);

module.exports = MetricsAggregationBase;