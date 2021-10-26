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
 * The `BucketAggregationBase` provides support for common options used across
 * various bucket `Aggregation` implementations.
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


var BucketAggregationBase = function (_Aggregation) {
    (0, _inherits3.default)(BucketAggregationBase, _Aggregation);

    // eslint-disable-next-line require-jsdoc
    function BucketAggregationBase(name, aggType, field) {
        (0, _classCallCheck3.default)(this, BucketAggregationBase);

        var _this = (0, _possibleConstructorReturn3.default)(this, (BucketAggregationBase.__proto__ || Object.getPrototypeOf(BucketAggregationBase)).call(this, name, aggType));

        if (!isNil(field)) _this._aggsDef.field = field;
        return _this;
    }

    /**
     * Sets field to run aggregation on.
     *
     * @param {string} field a valid field name
     * @returns {BucketAggregationBase} returns `this` so that calls can be chained
     */


    (0, _createClass3.default)(BucketAggregationBase, [{
        key: 'field',
        value: function field(_field) {
            this._aggsDef.field = _field;
            return this;
        }

        /**
         * Sets script parameter for aggregation.
         *
         * @example
         * // Generating the terms using a script
         * const agg = esb.termsAggregation('genres').script(
         *     esb.script('file', 'my_script').params({ field: 'genre' })
         * );
         *
         * @example
         * // Value script
         * const agg = esb.termsAggregation('genres', 'genre').script(
         *     esb.script('inline', "'Genre: ' +_value").lang('painless')
         * );
         *
         * @param {Script} script
         * @returns {BucketAggregationBase} returns `this` so that calls can be chained
         * @throws {TypeError} If `script` is not an instance of `Script`
         */

    }, {
        key: 'script',
        value: function script(_script) {
            checkType(_script, Script);
            this._aggsDef.script = _script;
            return this;
        }
    }]);
    return BucketAggregationBase;
}(Aggregation);

module.exports = BucketAggregationBase;