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
    _require$util = _require.util,
    checkType = _require$util.checkType,
    setDefault = _require$util.setDefault,
    invalidParam = _require$util.invalidParam;

var FullTextQueryBase = require('./full-text-query-base');

var invalidOperatorParam = invalidParam('', 'operator', "'AND' or 'OR'");

/**
 * The `QueryStringQueryBase` provides support for common options used across
 * full text query implementations `QueryStringQuery` and `SimpleQueryStringQuery`.
 * A query that uses a query parser in order to parse its content.
 *
 * **NOTE:** Instantiating this directly should not be required.
 * However, if you wish to add a custom implementation for whatever reason,
 * this class could be extended.
 *
 * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-query-string-query.html)
 *
 * @param {string} queryType
 * @param {string} refUrl
 * @param {string=} queryString The actual query to be parsed.
 *
 * @extends FullTextQueryBase
 */

var QueryStringQueryBase = function (_FullTextQueryBase) {
    (0, _inherits3.default)(QueryStringQueryBase, _FullTextQueryBase);

    // eslint-disable-next-line require-jsdoc
    function QueryStringQueryBase(queryType, refUrl, queryString) {
        (0, _classCallCheck3.default)(this, QueryStringQueryBase);

        var _this = (0, _possibleConstructorReturn3.default)(this, (QueryStringQueryBase.__proto__ || Object.getPrototypeOf(QueryStringQueryBase)).call(this, queryType, queryString));

        _this._refUrl = refUrl;
        return _this;
    }

    /**
     * Appends given field to the list of fields to search against.
     * Fields can be specified with wildcards.
     *
     * Individual fields can be boosted with the caret (^) notation.
     * Example - `"subject^3"`
     *
     * @example
     * const qry = esb.queryStringQuery('this AND that OR thus')
     *     .field('city.*')
     *     .useDisMax(true);
     *
     * @example
     * const qry = esb.simpleQueryStringQuery('foo bar -baz').field('content');
     *
     * @param {string} field One of the fields to be queried
     * @returns {QueryStringQueryBase} returns `this` so that calls can be chained.
     */


    (0, _createClass3.default)(QueryStringQueryBase, [{
        key: 'field',
        value: function field(_field) {
            setDefault(this._queryOpts, 'fields', []);

            this._queryOpts.fields.push(_field);
            return this;
        }

        /**
         * Appends given fields to the list of fields to search against.
         * Fields can be specified with wildcards.
         *
         * Individual fields can be boosted with the caret (^) notation.
         * Example - `[ "subject^3", "message" ]`
         *
         * @example
         * const qry = esb.queryStringQuery('this AND that')
         *     .fields(['content', 'name'])
         *
         * @example
         * const qry = esb.simpleQueryStringQuery('foo bar baz')
         *     .fields(['content', 'name.*^5']);
         *
         * @param {Array<string>} fields The fields to be queried
         * @returns {QueryStringQueryBase} returns `this` so that calls can be chained.
         */

    }, {
        key: 'fields',
        value: function fields(_fields) {
            checkType(_fields, Array);
            setDefault(this._queryOpts, 'fields', []);

            this._queryOpts.fields = this._queryOpts.fields.concat(_fields);
            return this;
        }

        /**
         * The default operator used if no explicit operator is specified.
         * For example, with a default operator of `OR`, the query `capital of Hungary`
         * is translated to `capital OR of OR Hungary`, and with default operator of AND,
         * the same query is translated to `capital AND of AND Hungary`.
         * The default value is OR.
         *
         * @param {string} operator Can be `AND`/`OR`. Default is `OR`.
         * @returns {QueryStringQueryBase} returns `this` so that calls can be chained.
         */

    }, {
        key: 'defaultOperator',
        value: function defaultOperator(operator) {
            if (isNil(operator)) invalidOperatorParam(operator, this._refUrl);

            var operatorUpper = operator.toUpperCase();
            if (operatorUpper !== 'AND' && operatorUpper !== 'OR') {
                invalidOperatorParam(operator, this._refUrl);
            }

            this._queryOpts.default_operator = operatorUpper;
            return this;
        }

        /**
         * By default, wildcards terms in a query string are not analyzed.
         * By setting this value to `true`, a best effort will be made to analyze those as well.
         *
         * @param {boolean} enable
         * @returns {QueryStringQueryBase} returns `this` so that calls can be chained.
         */

    }, {
        key: 'analyzeWildcard',
        value: function analyzeWildcard(enable) {
            this._queryOpts.analyze_wildcard = enable;
            return this;
        }

        /**
         * Sets the `lenient` parameter which allows to ignore exceptions caused
         * by data-type mismatches such as trying to query a numeric field with a
         * text query string when set to `true`.
         *
         * @param {boolean} enable Defaules to `false`
         * @returns {QueryStringQueryBase} returns `this` so that calls can be chained.
         */

    }, {
        key: 'lenient',
        value: function lenient(enable) {
            this._queryOpts.lenient = enable;
            return this;
        }

        /**
         * A suffix to append to fields for quoted parts of the query string.
         * This allows to use a field that has a different analysis chain for exact matching.
         *
         * @param {string} suffix
         * @returns {QueryStringQueryBase} returns `this` so that calls can be chained.
         */

    }, {
        key: 'quoteFieldSuffix',
        value: function quoteFieldSuffix(suffix) {
            this._queryOpts.quote_field_suffix = suffix;
            return this;
        }

        /**
         * Perform the query on all fields detected in the mapping that can be queried.
         * Will be used by default when the `_all` field is disabled and
         * no `default_field` is specified (either in the index settings or
         * in the request body) and no `fields` are specified.
         * @param {boolean} enable
         * @returns {QueryStringQueryBase} returns `this` so that calls can be chained.
         */

    }, {
        key: 'allFields',
        value: function allFields(enable) {
            this._queryOpts.all_fields = enable;
            return this;
        }
    }]);
    return QueryStringQueryBase;
}(FullTextQueryBase);

module.exports = QueryStringQueryBase;