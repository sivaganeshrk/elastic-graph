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
    checkType = _require.util.checkType;

var SpanQueryBase = require('./span-query-base');

/**
 * Wrapper to allow span queries to participate in composite single-field
 * span queries by lying about their search field. The span field masking
 * query maps to Lucene's `SpanFieldMaskingQuery`.
 *
 * This can be used to support queries like span-near or span-or across
 * different fields, which is not ordinarily permitted.
 *
 * Span field masking query is invaluable in conjunction with multi-fields
 * when same content is indexed with multiple analyzers. For instance we
 * could index a field with the standard analyzer which breaks text up into
 * words, and again with the english analyzer which stems words into their root form.
 *
 * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-span-field-masking-query.html)
 *
 * @param {string=} field
 * @param {SpanQueryBase=} spanQry Any other span type query
 *
 * @example
 * const spanQry = esb.spanNearQuery()
 *     .clauses([
 *         esb.spanTermQuery('text', 'quick brown'),
 *         esb.spanFieldMaskingQuery()
 *             .field('text')
 *             .query(esb.spanTermQuery('text.stems', 'fox'))
 *     ])
 *     .slop(5)
 *     .inOrder(false);
 *
 * @extends SpanQueryBase
 */

var SpanFieldMaskingQuery = function (_SpanQueryBase) {
    (0, _inherits3.default)(SpanFieldMaskingQuery, _SpanQueryBase);

    // eslint-disable-next-line require-jsdoc
    function SpanFieldMaskingQuery(field, spanQry) {
        (0, _classCallCheck3.default)(this, SpanFieldMaskingQuery);

        var _this = (0, _possibleConstructorReturn3.default)(this, (SpanFieldMaskingQuery.__proto__ || Object.getPrototypeOf(SpanFieldMaskingQuery)).call(this, 'field_masking_span'));

        if (!isNil(field)) _this._queryOpts.field = field;
        if (!isNil(spanQry)) _this.query(spanQry);
        return _this;
    }

    /**
     * Sets the span query.
     *
     * @param {SpanQueryBase} spanQry
     * @returns {SpanFieldMaskingQuery} returns `this` so that calls can be chained.
     */


    (0, _createClass3.default)(SpanFieldMaskingQuery, [{
        key: 'query',
        value: function query(spanQry) {
            checkType(spanQry, SpanQueryBase);

            this._queryOpts.query = spanQry;
            return this;
        }

        /**
         * Sets the field to mask.
         *
         * @param {string} field
         * @returns {SpanFieldMaskingQuery} returns `this` so that calls can be chained.
         */

    }, {
        key: 'field',
        value: function field(_field) {
            this._queryOpts.field = _field;
            return this;
        }
    }]);
    return SpanFieldMaskingQuery;
}(SpanQueryBase);

module.exports = SpanFieldMaskingQuery;