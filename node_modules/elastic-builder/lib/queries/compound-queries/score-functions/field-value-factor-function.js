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

var _require = require('../../../core'),
    invalidParam = _require.util.invalidParam,
    FIELD_MODIFIER_SET = _require.consts.FIELD_MODIFIER_SET;

var ScoreFunction = require('./score-function');

var ES_REF_URL = 'https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-function-score-query.html#function-field-value-factor';

var invaliModifierdParam = invalidParam(ES_REF_URL, 'modifier', FIELD_MODIFIER_SET);

/**
 * The `field_value_factor` function allows you to use a field from a document
 * to influence the score. It's similar to using the `script_score` function, however,
 * it avoids the overhead of scripting. If used on a multi-valued field, only the
 * first value of the field is used in calculations.
 *
 * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-function-score-query.html#function-field-value-factor)
 *
 * @example
 * // Scoring formula - sqrt(1.2 * doc['popularity'].value)
 * const scoreFunc = esb.fieldValueFactorFunction('popularity')
 *     .factor(1.2)
 *     .modifier('sqrt')
 *     .missing(1);
 *
 * @param {string=} field the field to be extracted from the document.
 *
 * @extends ScoreFunction
 */

var FieldValueFactorFunction = function (_ScoreFunction) {
    (0, _inherits3.default)(FieldValueFactorFunction, _ScoreFunction);

    // eslint-disable-next-line require-jsdoc
    function FieldValueFactorFunction(field) {
        (0, _classCallCheck3.default)(this, FieldValueFactorFunction);

        var _this = (0, _possibleConstructorReturn3.default)(this, (FieldValueFactorFunction.__proto__ || Object.getPrototypeOf(FieldValueFactorFunction)).call(this, 'field_value_factor'));

        if (!isNil(field)) _this._opts.field = field;
        return _this;
    }

    /**
     * Sets the field to be extracted from the document.
     *
     * @param {string} field the field to be extracted from the document.
     * @returns {FieldValueFactorFunction} returns `this` so that calls can be chained.
     */


    (0, _createClass3.default)(FieldValueFactorFunction, [{
        key: 'field',
        value: function field(_field) {
            this._opts.field = _field;
            return this;
        }

        /**
         * Optional factor to multiply the field value with, defaults to `1`.
         *
         * @param {number} factor Factor to multiply the field with.
         * @returns {FieldValueFactorFunction} returns `this` so that calls can be chained.
         */

    }, {
        key: 'factor',
        value: function factor(_factor) {
            this._opts.factor = _factor;
            return this;
        }

        /**
         * Modifier to apply to the field value, can be one of: `none`, `log`,
         * `log1p`, `log2p`, `ln`, `ln1p`, `ln2p`, `square`, `sqrt`, or `reciprocal`.
         * Defaults to `none`.
         *
         * @param {string} mod Modified to apply on field. Can be one of: `none`, `log`,
         * `log1p`, `log2p`, `ln`, `ln1p`, `ln2p`, `square`, `sqrt`, or `reciprocal`.
         * Defaults to `none`.
         * @returns {FieldValueFactorFunction} returns `this` so that calls can be chained.
         */

    }, {
        key: 'modifier',
        value: function modifier(mod) {
            if (isNil(mod)) invaliModifierdParam(mod);

            var modLower = mod.toLowerCase();
            if (!FIELD_MODIFIER_SET.has(modLower)) {
                invaliModifierdParam(mod);
            }

            this._opts.modifier = modLower;
            return this;
        }

        /**
         * Value used if the document doesn’t have that field. The modifier and factor
         * are still applied to it as though it were read from the document.
         *
         * @param {number} val To be used with documents which do not have field value.
         * @returns {FieldValueFactorFunction} returns `this` so that calls can be chained.
         */

    }, {
        key: 'missing',
        value: function missing(val) {
            this._opts.missing = val;
            return this;
        }
    }]);
    return FieldValueFactorFunction;
}(ScoreFunction);

module.exports = FieldValueFactorFunction;