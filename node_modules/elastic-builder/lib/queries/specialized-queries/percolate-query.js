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
    checkType = _require.util.checkType,
    Query = _require.Query;

/**
 * The `percolate` query can be used to match queries stored in an index.
 * The `percolate` query itself contains the document that will be used
 * as query to match with the stored queries.
 *
 * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-percolate-query.html)
 *
 * @example
 * const percolateQry = esb.percolateQuery('query', 'doctype')
 *     .document({ message: 'A new bonsai tree in the office' });
 *
 * const percolateQry = esb.percolateQuery()
 *     .field('query')
 *     .documentType('doctype')
 *     .index('my-index')
 *     .type('message')
 *     .id('1')
 *     .version(1);
 *
 * @param {string=} field The field of type `percolator` and that holds the indexed queries.
 * @param {string=} docType The type / mapping of the document being percolated.
 *
 * @extends Query
 */


var PercolateQuery = function (_Query) {
    (0, _inherits3.default)(PercolateQuery, _Query);

    // eslint-disable-next-line require-jsdoc
    function PercolateQuery(field, docType) {
        (0, _classCallCheck3.default)(this, PercolateQuery);

        var _this = (0, _possibleConstructorReturn3.default)(this, (PercolateQuery.__proto__ || Object.getPrototypeOf(PercolateQuery)).call(this, 'percolate'));

        _this._queryOpts.documents = [];

        if (!isNil(field)) _this._queryOpts.field = field;
        // Delegate this to method:
        if (!isNil(docType)) _this._queryOpts.document_type = docType;
        return _this;
    }

    /**
     * Sets the field of type `percolator` and that holds the indexed queries.
     *
     * @param {string} field The field of type `percolator` and that holds the indexed queries.
     * @returns {PercolateQuery} returns `this` so that calls can be chained.
     */


    (0, _createClass3.default)(PercolateQuery, [{
        key: 'field',
        value: function field(_field) {
            this._queryOpts.field = _field;
            return this;
        }

        /**
         * Sets the type / mapping of the document being percolated.
         *
         * Note: This param has been deprecated in elasticsearch 6.0. From 6.0 and
         * later, it is no longer required to specify the `document_type` parameter.
         *
         * @param {string} docType The type / mapping of the document being percolated.
         * @returns {PercolateQuery} returns `this` so that calls can be chained.
         */

    }, {
        key: 'documentType',
        value: function documentType(docType) {
            this._queryOpts.document_type = docType;
            return this;
        }

        /**
         * Appends given source document to the list of source documents being percolated.
         * Instead of specifying the source document being percolated,
         * the source can also be retrieved from an already stored document.
         *
         * @example
         *const qry = esb.percolateQuery('query', 'people')
         * .document({ name: 'Will Smith' });
         *
         * @param {Object} doc The source document being percolated.
         * @returns {PercolateQuery} returns `this` so that calls can be chained.
         */

    }, {
        key: 'document',
        value: function document(doc) {
            this._queryOpts.documents.push(doc);
            return this;
        }

        /**
         * Appends given source documents to the list of source documents being percolated.
         * Instead of specifying the source documents being percolated,
         * the source can also be retrieved from already stored documents.
         *
         * @example
         *const qry = esb.percolateQuery('query', 'people')
         * .documents([{ name: 'Will Smith' }, { name: 'Willow Smith' }]);
         *
         * @param {Object[]} docs The source documents being percolated.
         * @returns {PercolateQuery} returns `this` so that calls can be chained.
         */

    }, {
        key: 'documents',
        value: function documents(docs) {
            checkType(docs, Array);

            this._queryOpts.documents = this._queryOpts.documents.concat(docs);
            return this;
        }

        /**
         * Sets the index the document resides in. This is a required parameter if `document`
         * is not specified.
         *
         * @param {string} index The index the document resides in.
         * @returns {PercolateQuery} returns `this` so that calls can be chained.
         */

    }, {
        key: 'index',
        value: function index(_index) {
            this._queryOpts.index = _index;
            return this;
        }

        /**
         * Sets the type of the document to fetch. This is a required parameter if `document`
         * is not specified.
         *
         * @param {string} type The type of the document to fetch.
         * @returns {PercolateQuery} returns `this` so that calls can be chained.
         */

    }, {
        key: 'type',
        value: function type(_type) {
            this._queryOpts.type = _type;
            return this;
        }

        /**
         * Sets the id of the document to fetch. This is a required parameter if `document`
         * is not specified.
         *
         * @param {string} id The id of the document to fetch.
         * @returns {PercolateQuery} returns `this` so that calls can be chained.
         */

    }, {
        key: 'id',
        value: function id(_id) {
            this._queryOpts.id = _id;
            return this;
        }

        /**
         * Sets the routing to be used to fetch document to percolate. Optional.
         *
         * @param {string} routing The routing to be used to fetch document to percolate.
         * @returns {PercolateQuery} returns `this` so that calls can be chained.
         */

    }, {
        key: 'routing',
        value: function routing(_routing) {
            this._queryOpts.routing = _routing;
            return this;
        }

        /**
         * Sets the preference to be used to fetch document to percolate. Optional.
         *
         * @param {string} preference The preference to be used to fetch document to percolate.
         * @returns {PercolateQuery} returns `this` so that calls can be chained.
         */

    }, {
        key: 'preference',
        value: function preference(_preference) {
            this._queryOpts.preference = _preference;
            return this;
        }

        /**
         * Sets the expected version of the document to be fetched. Optional.
         * If the version does not match, the search request will fail
         * with a version conflict error.
         *
         * @param {string} version The expected version of the document to be fetched.
         * @returns {PercolateQuery} returns `this` so that calls can be chained.
         */

    }, {
        key: 'version',
        value: function version(_version) {
            this._queryOpts.version = _version;
            return this;
        }
    }]);
    return PercolateQuery;
}(Query);

module.exports = PercolateQuery;