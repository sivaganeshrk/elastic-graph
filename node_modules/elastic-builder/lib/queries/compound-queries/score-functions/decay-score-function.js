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

var isNil = require('lodash.isnil');

var _require = require('../../../core'),
    _require$util = _require.util,
    invalidParam = _require$util.invalidParam,
    recursiveToJSON = _require$util.recursiveToJSON;

var ES_REF_URL = 'https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-function-score-query.html#function-decay';

var ScoreFunction = require('./score-function');

var invalidModeParam = invalidParam(ES_REF_URL, 'mode', "'linear', 'exp' or 'gauss'");

/**
 * Decay functions score a document with a function that decays depending on
 * the distance of a numeric field value of the document from a user given
 * origin. This is similar to a range query, but with smooth edges instead of
 * boxes.
 *
 * Supported decay functions are: `linear`, `exp`, and `gauss`.
 *
 * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-function-score-query.html#function-decay)
 *
 * If no `mode` is supplied, `gauss` will be used.
 *
 * @example
 * // Defaults to decay function `gauss`
 * const decayFunc = esb.decayScoreFunction()
 *     .field('location') // field is a geo_point
 *     .origin('11, 12') // geo format
 *     .scale('2km')
 *     .offset('0km')
 *     .decay(0.33);
 *
 * @example
 * const decayFunc = esb.decayScoreFunction('gauss', 'date')
 *     .origin('2013-09-17')
 *     .scale('10d')
 *     .offset('5d')
 *     .decay(0.5);
 *
 * @param {string=} mode Can be one of `linear`, `exp`, and `gauss`.
 * Defaults to `gauss`.
 * @param {string=} field the document field to run decay function against.
 *
 * @extends ScoreFunction
 */

var DecayScoreFunction = function (_ScoreFunction) {
    (0, _inherits3.default)(DecayScoreFunction, _ScoreFunction);

    // eslint-disable-next-line require-jsdoc
    function DecayScoreFunction() {
        var mode = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'gauss';
        var field = arguments[1];
        (0, _classCallCheck3.default)(this, DecayScoreFunction);

        var _this = (0, _possibleConstructorReturn3.default)(this, (DecayScoreFunction.__proto__ || Object.getPrototypeOf(DecayScoreFunction)).call(this, mode));

        if (!isNil(field)) _this._field = field;
        return _this;
    }

    /**
     * Set the decay mode.
     *
     * @param {string} mode  Can be one of `linear`, `exp`, and `gauss`.
     * Defaults to `gauss`.
     * @returns {DecayScoreFunction} returns `this` so that calls can be chained.
     */


    (0, _createClass3.default)(DecayScoreFunction, [{
        key: 'mode',
        value: function mode(_mode) {
            if (isNil(_mode)) invalidModeParam(_mode);

            var modeLower = _mode.toLowerCase();
            if (modeLower !== 'linear' && modeLower !== 'exp' && modeLower !== 'gauss') {
                invalidModeParam(_mode);
            }

            this._name = _mode;
            return this;
        }

        /**
         * Sets the decay mode to linear.
         * Alias for `mode('linear')`
         *
         * @returns {DecayScoreFunction} returns `this` so that calls can be chained.
         */

    }, {
        key: 'linear',
        value: function linear() {
            this._name = 'linear';
            return this;
        }

        /**
         * Sets the decay mode to exp.
         * Alias for `mode('exp')`
         *
         * @returns {DecayScoreFunction} returns `this` so that calls can be chained.
         */

    }, {
        key: 'exp',
        value: function exp() {
            this._name = 'exp';
            return this;
        }

        /**
         * Sets the decay mode to gauss.
         * Alias for `mode('gauss')`
         *
         * @returns {DecayScoreFunction} returns `this` so that calls can be chained.
         */

    }, {
        key: 'gauss',
        value: function gauss() {
            this._name = 'gauss';
            return this;
        }

        /**
         * Sets the document field to run decay function against.
         *
         * @param {string} field the document field to run decay function against.
         * @returns {DecayScoreFunction} returns `this` so that calls can be chained.
         */

    }, {
        key: 'field',
        value: function field(_field) {
            this._field = _field;
            return this;
        }

        /**
         * The point of origin used for calculating distance. Must be given as a number
         * for numeric field, date for date fields and geo point for geo fields.
         * Required for geo and numeric field. For date fields the default is `now`.
         * Date math (for example `now-1h`) is supported for origin.
         *
         * @param {number|string|Object} origin A valid origin value for the field type.
         * @returns {DecayScoreFunction} returns `this` so that calls can be chained.
         */

    }, {
        key: 'origin',
        value: function origin(_origin) {
            this._opts.origin = _origin;
            return this;
        }

        /**
         * Required for all types. Defines the distance from origin + offset at which
         * the computed score will equal decay parameter. For geo fields: Can be defined
         * as number+unit (`1km`, `12m`,…). Default unit is meters. For date fields: Can be
         * defined as a number+unit (`1h`, `10d`,…). Default unit is milliseconds.
         * For numeric field: Any number.
         *
         * @param {number|string} scale A valid scale value for the field type.
         * @returns {DecayScoreFunction} returns `this` so that calls can be chained.
         */

    }, {
        key: 'scale',
        value: function scale(_scale) {
            this._opts.scale = _scale;
            return this;
        }

        /**
         * If an `offset` is defined, the decay function will only compute the decay function
         * for documents with a distance greater that the defined offset. The default is `0`.
         *
         * @param {number|string} offset A valid offset value for the field type.
         * @returns {DecayScoreFunction} returns `this` so that calls can be chained.
         */

    }, {
        key: 'offset',
        value: function offset(_offset) {
            this._opts.offset = _offset;
            return this;
        }

        /**
         * The `decay` parameter defines how documents are scored at the distance given at `scale`.
         * If no `decay` is defined, documents at the distance `scale` will be scored `0.5`.
         *
         * @param {number} decay A decay value as a double.
         * @returns {DecayScoreFunction} returns `this` so that calls can be chained.
         */

    }, {
        key: 'decay',
        value: function decay(_decay) {
            this._opts.decay = _decay;
            return this;
        }

        /**
         * Overrides default `toJSON` to return DSL representation of the decay score function
         * class instance.
         *
         * @override
         * @returns {Object} returns an Object which maps to the elasticsearch query DSL
         */

    }, {
        key: 'toJSON',
        value: function toJSON() {
            // TODO: If mode/field is not set throw an error.
            var repr = Object.assign((0, _defineProperty3.default)({}, this._name, (0, _defineProperty3.default)({}, this._field, this._opts)), this._body);
            return recursiveToJSON(repr);
        }
    }]);
    return DecayScoreFunction;
}(ScoreFunction);

module.exports = DecayScoreFunction;