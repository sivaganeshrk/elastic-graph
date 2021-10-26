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
    checkType = _require.util.checkType;

/**
 * The `matrix_stats` aggregation is a numeric aggregation that computes
 * statistics over a set of document fields
 *
 * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-matrix-stats-aggregation.html)
 *
 * @example
 * const agg = esb.matrixStatsAggregation('matrixstats', ['poverty', 'income']);
 *
 * @param {string} name A valid aggregation name
 * @param {Array=} fields Array of fields
 *
 * @extends Aggregation
 */


var MatrixStatsAggregation = function (_Aggregation) {
    (0, _inherits3.default)(MatrixStatsAggregation, _Aggregation);

    // eslint-disable-next-line require-jsdoc
    function MatrixStatsAggregation(name, fields) {
        (0, _classCallCheck3.default)(this, MatrixStatsAggregation);

        var _this = (0, _possibleConstructorReturn3.default)(this, (MatrixStatsAggregation.__proto__ || Object.getPrototypeOf(MatrixStatsAggregation)).call(this, name, 'matrix_stats'));

        if (!isNil(fields)) _this.fields(fields);
        return _this;
    }

    /**
     * The `fields` setting defines the set of fields (as an array) for computing
     * the statistics.
     *
     * @example
     * const agg = esb.matrixStatsAggregation('matrixstats')
     *     .fields(['poverty', 'income']);
     *
     * @param {Array<string>} fields Array of fields
     * @returns {MatrixStatsAggregation} returns `this` so that calls can be chained
     */


    (0, _createClass3.default)(MatrixStatsAggregation, [{
        key: 'fields',
        value: function fields(_fields) {
            checkType(_fields, Array);

            this._aggsDef.fields = _fields;
            return this;
        }

        /**
         * The `mode` parameter controls what array value the aggregation will use for
         * array or multi-valued fields
         * @param {string} mode One of `avg`, `min`, `max`, `sum` and `median`
         * @returns {MatrixStatsAggregation} returns `this` so that calls can be chained
         */

    }, {
        key: 'mode',
        value: function mode(_mode) {
            // TODO: Add a set in consts and validate input
            this._aggsDef.mode = _mode;
            return this;
        }

        /**
         * The missing parameter defines how documents that are missing a value should
         * be treated. By default they will be ignored but it is also possible to treat
         * them as if they had a value.
         *
         * @example
         * const agg = esb.matrixStatsAggregation('matrixstats')
         *     .fields(['poverty', 'income'])
         *     .missing({ income: 50000 });
         *
         * @param {Object} missing Set of fieldname : value mappings to specify default
         * values per field
         * @returns {MatrixStatsAggregation} returns `this` so that calls can be chained
         */

    }, {
        key: 'missing',
        value: function missing(_missing) {
            this._aggsDef.missing = _missing;
            return this;
        }
    }]);
    return MatrixStatsAggregation;
}(Aggregation);

module.exports = MatrixStatsAggregation;