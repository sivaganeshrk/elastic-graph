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

var _require = require('../../core'),
    Query = _require.Query,
    checkType = _require.util.checkType;

/**
 * Returns any documents that match with at least one or more of the provided
 * terms. The terms are not analyzed and thus must match exactly. The number of
 * terms that must match varies per document and is either controlled by a
 * minimum should match field or computed per document in a minimum should match
 * script.
 *
 * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-terms-set-query.html)
 *
 * NOTE: This query was added in elasticsearch v6.1.
 *
 * @example
 * const qry = esb.termsSetQuery('codes', ['abc', 'def', 'ghi'])
 *     .minimumShouldMatchField('required_matches')
 *
 * @param {string=} field
 * @param {Array<string|number|boolean>|string|number=} terms
 *
 * @extends Query
 */


var TermsSetQuery = function (_Query) {
    (0, _inherits3.default)(TermsSetQuery, _Query);

    // eslint-disable-next-line require-jsdoc
    function TermsSetQuery(field, terms) {
        (0, _classCallCheck3.default)(this, TermsSetQuery);

        var _this = (0, _possibleConstructorReturn3.default)(this, (TermsSetQuery.__proto__ || Object.getPrototypeOf(TermsSetQuery)).call(this, 'terms_set'));

        _this._queryOpts.terms = [];

        if (!isNil(field)) _this._field = field;
        if (!isNil(terms)) {
            if (Array.isArray(terms)) _this.terms(terms);else _this.term(terms);
        }
        return _this;
    }

    /**
     * Sets the field to search on.
     *
     * @param {string} field
     * @returns {TermsSetQuery} returns `this` so that calls can be chained.
     */


    (0, _createClass3.default)(TermsSetQuery, [{
        key: 'field',
        value: function field(_field) {
            this._field = _field;
            return this;
        }

        /**
         * Append given term to set of terms to run Terms Set Query with.
         *
         * @param {string|number|boolean} term
         * @returns {TermsSetQuery} returns `this` so that calls can be chained
         */

    }, {
        key: 'term',
        value: function term(_term) {
            this._queryOpts.terms.push(_term);
            return this;
        }

        /**
         * Specifies the terms to run query for.
         *
         * @param {Array<string|number|boolean>} terms Terms set to run query for.
         * @returns {TermsSetQuery} returns `this` so that calls can be chained
         * @throws {TypeError} If `terms` is not an instance of Array
         */

    }, {
        key: 'terms',
        value: function terms(_terms) {
            checkType(_terms, Array);

            this._queryOpts.terms = this._queryOpts.terms.concat(_terms);
            return this;
        }

        /**
         * Controls the number of terms that must match per document.
         *
         * @param {string} fieldName
         * @returns {TermsSetQuery} returns `this` so that calls can be chained
         */

    }, {
        key: 'minimumShouldMatchField',
        value: function minimumShouldMatchField(fieldName) {
            this._queryOpts.minimum_should_match_field = fieldName;
            return this;
        }

        /**
         * Sets the `script` for query. It controls how many terms are required to
         * match in a more dynamic way.
         *
         * The `params.num_terms` parameter is available in the script to indicate
         * the number of terms that have been specified.
         *
         * @example
         * const qry = esb.termsSetQuery('codes', ['abc', 'def', 'ghi'])
         *     .minimumShouldMatchScript({
         *         source: "Math.min(params.num_terms, doc['required_matches'].value)"
         *     })
         *
         * @param {Script|string|Object} script
         * @returns {ScriptQuery} returns `this` so that calls can be chained.
         */

    }, {
        key: 'minimumShouldMatchScript',
        value: function minimumShouldMatchScript(script) {
            this._queryOpts.minimum_should_match_script = script;
            return this;
        }

        /**
         * Override default `toJSON` to return DSL representation of the term level query
         * class instance.
         *
         * @override
         * @returns {Object} returns an Object which maps to the elasticsearch query DSL
         */

    }, {
        key: 'toJSON',
        value: function toJSON() {
            return (0, _defineProperty3.default)({}, this.queryType, (0, _defineProperty3.default)({}, this._field, this._queryOpts));
        }
    }]);
    return TermsSetQuery;
}(Query);

module.exports = TermsSetQuery;