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
    checkType = _require.util.checkType;

var _require2 = require('../../core'),
    Query = _require2.Query;

/**
 * Filters documents that have fields that match any of the provided terms (**not analyzed**).
 *
 * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-terms-query.html)
 *
 * @example
 * const qry = esb.constantScoreQuery(
 *     esb.termsQuery('user', ['kimchy', 'elasticsearch'])
 * );
 *
 * @example
 * const qry = esb.termsQuery('user')
 *     .index('users')
 *     .type('user')
 *     .id(2)
 *     .path('followers');
 *
 * @param {string=} field
 * @param {Array|string|number|boolean=} values
 *
 * @extends Query
 */


var TermsQuery = function (_Query) {
    (0, _inherits3.default)(TermsQuery, _Query);

    // TODO: The DSL is a mess. Think about cleaning up some.

    // eslint-disable-next-line require-jsdoc
    function TermsQuery(field, values) {
        (0, _classCallCheck3.default)(this, TermsQuery);

        // Default assume user is not insane
        var _this = (0, _possibleConstructorReturn3.default)(this, (TermsQuery.__proto__ || Object.getPrototypeOf(TermsQuery)).call(this, 'terms'));

        _this._isTermsLookup = false;
        _this._termsLookupOpts = {};
        _this._values = [];

        if (!isNil(field)) _this._field = field;
        if (!isNil(values)) {
            if (Array.isArray(values)) _this.values(values);else _this.value(values);
        }
        return _this;
    }

    /**
     * Private helper function to set a terms lookup option.
     *
     * @private
     * @param {string} key
     * @param {string|number|boolean} val
     */


    (0, _createClass3.default)(TermsQuery, [{
        key: '_setTermsLookupOpt',
        value: function _setTermsLookupOpt(key, val) {
            this._isTermsLookup = true;
            this._termsLookupOpts[key] = val;
        }

        /**
         * Sets the field to search on.
         *
         * @param {string} field
         * @returns {TermsQuery} returns `this` so that calls can be chained.
         */

    }, {
        key: 'field',
        value: function field(_field) {
            this._field = _field;
            return this;
        }

        /**
         * Append given value to list of values to run Terms Query with.
         *
         * @param {string|number|boolean} value
         * @returns {TermsQuery} returns `this` so that calls can be chained
         */

    }, {
        key: 'value',
        value: function value(_value) {
            this._values.push(_value);
            return this;
        }

        /**
         * Specifies the values to run query for.
         *
         * @param {Array<string|number|boolean>} values Values to run query for.
         * @returns {TermsQuery} returns `this` so that calls can be chained
         * @throws {TypeError} If `values` is not an instance of Array
         */

    }, {
        key: 'values',
        value: function values(_values) {
            checkType(_values, Array);

            this._values = this._values.concat(_values);
            return this;
        }

        /**
         * Convenience method for setting term lookup options.
         * Valid options are `index`, `type`, `id`, `path`and `routing`
         *
         * @param {Object} lookupOpts An object with any of the keys `index`,
         * `type`, `id`, `path` and `routing`.
         * @returns {TermsQuery} returns `this` so that calls can be chained
         */

    }, {
        key: 'termsLookup',
        value: function termsLookup(lookupOpts) {
            checkType(lookupOpts, Object);

            this._isTermsLookup = true;
            Object.assign(this._termsLookupOpts, lookupOpts);
            return this;
        }

        /**
         * The index to fetch the term values from. Defaults to the current index.
         *
         * Note: The `index` parameter in the terms filter, used to look up terms in
         * a dedicated index is mandatory in elasticsearch 6.0. Previously, the
         * index defaulted to the index the query was executed on. In 6.0, this
         * index must be explicitly set in the request.
         *
         * @param {string} idx The index to fetch the term values from.
         * Defaults to the current index.
         * @returns {TermsQuery} returns `this` so that calls can be chained
         */

    }, {
        key: 'index',
        value: function index(idx) {
            this._setTermsLookupOpt('index', idx);
            return this;
        }

        /**
         * The type to fetch the term values from.
         *
         * @param {string} type
         * @returns {TermsQuery} returns `this` so that calls can be chained
         */

    }, {
        key: 'type',
        value: function type(_type) {
            this._setTermsLookupOpt('type', _type);
            return this;
        }

        /**
         * The id of the document to fetch the term values from.
         *
         * @param {string} id
         * @returns {TermsQuery} returns `this` so that calls can be chained
         */

    }, {
        key: 'id',
        value: function id(_id) {
            this._setTermsLookupOpt('id', _id);
            return this;
        }

        /**
         * The field specified as path to fetch the actual values for the `terms` filter.
         *
         * @param {string} path
         * @returns {TermsQuery} returns `this` so that calls can be chained
         */

    }, {
        key: 'path',
        value: function path(_path) {
            this._setTermsLookupOpt('path', _path);
            return this;
        }

        /**
         * A custom routing value to be used when retrieving the external terms doc.
         *
         * @param {string} routing
         * @returns {TermsQuery} returns `this` so that calls can be chained
         */

    }, {
        key: 'routing',
        value: function routing(_routing) {
            this._setTermsLookupOpt('routing', _routing);
            return this;
        }

        /**
         * Override default `toJSON` to return DSL representation of the `terms` query
         * class instance.
         *
         * @override
         * @returns {Object} returns an Object which maps to the elasticsearch query DSL
         */

    }, {
        key: 'toJSON',
        value: function toJSON() {
            // recursiveToJSON doesn't seem to be required here.
            return (0, _defineProperty3.default)({}, this.queryType, Object.assign({}, this._queryOpts, (0, _defineProperty3.default)({}, this._field, this._isTermsLookup ? this._termsLookupOpts : this._values)));
        }
    }]);
    return TermsQuery;
}(Query);

module.exports = TermsQuery;