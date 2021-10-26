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
    GeoShape = _require.GeoShape,
    IndexedShape = _require.IndexedShape,
    _require$util = _require.util,
    checkType = _require$util.checkType,
    invalidParam = _require$util.invalidParam,
    GEO_RELATION_SET = _require.consts.GEO_RELATION_SET;

var GeoQueryBase = require('./geo-query-base');

var ES_REF_URL = 'https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-geo-shape-query.html';

var invalidRelationParam = invalidParam(ES_REF_URL, 'relation', GEO_RELATION_SET);

/**
 * Filter documents indexed using the `geo_shape` type. Requires
 * the `geo_shape` Mapping.
 *
 * The `geo_shape` query uses the same grid square representation as
 * the `geo_shape` mapping to find documents that have a shape that
 * intersects with the query shape. It will also use the same PrefixTree
 * configuration as defined for the field mapping.
 *
 * The query supports two ways of defining the query shape, either by
 * providing a whole shape definition, or by referencing the name of
 * a shape pre-indexed in another index.
 *
 * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-geo-shape-query.html)
 *
 * @example
 * const geoQry = esb.geoShapeQuery('location')
 *     .shape(esb.geoShape()
 *         .type('envelope')
 *         .coordinates([[13.0, 53.0], [14.0, 52.0]]))
 *     .relation('within');
 *
 * @example
 * // Pre-indexed shape
 * const geoQry = esb.geoShapeQuery()
 *     .field('location')
 *     .indexedShape(esb.indexedShape()
 *         .id('DEU')
 *         .type('countries')
 *         .index('shapes')
 *         .path('location'))
 *
 * @param {string=} field
 *
 * @extends GeoQueryBase
 */

var GeoShapeQuery = function (_GeoQueryBase) {
    (0, _inherits3.default)(GeoShapeQuery, _GeoQueryBase);

    // eslint-disable-next-line require-jsdoc
    function GeoShapeQuery(field) {
        (0, _classCallCheck3.default)(this, GeoShapeQuery);
        return (0, _possibleConstructorReturn3.default)(this, (GeoShapeQuery.__proto__ || Object.getPrototypeOf(GeoShapeQuery)).call(this, 'geo_shape', field));
    }

    /**
     * @override
     * @throws {Error} This method cannot be called on GeoShapeQuery
     */


    (0, _createClass3.default)(GeoShapeQuery, [{
        key: 'validationMethod',
        value: function validationMethod() {
            console.log('Please refer ' + ES_REF_URL);
            throw new Error('validationMethod is not supported in GeoShapeQuery');
        }

        /**
         * Sets the shape definition for the geo query.
         *
         * @param {GeoShape} shape
         * @returns {GeoShapeQuery} returns `this` so that calls can be chained.
         * @throws {TypeError} If given `shape` is not an instance of `GeoShape`
         */

    }, {
        key: 'shape',
        value: function shape(_shape) {
            checkType(_shape, GeoShape);

            this._fieldOpts.shape = _shape;
            return this;
        }

        /**
         * Sets the reference name of a shape pre-indexed in another index.
         *
         * @param {IndexedShape} shape
         * @returns {GeoShapeQuery} returns `this` so that calls can be chained.
         * @throws {TypeError} If given `shape` is not an instance of `IndexedShape`
         */

    }, {
        key: 'indexedShape',
        value: function indexedShape(shape) {
            checkType(shape, IndexedShape);

            this._fieldOpts.indexed_shape = shape;
            return this;
        }

        /**
         * Sets the relationship between Query and indexed data
         * that will be used to determine if a Document should be matched or not.
         *
         * @param {string} relation Can be one of `WITHIN`, `CONTAINS`, `DISJOINT`
         * or `INTERSECTS`(default)
         * @returns {GeoShapeQuery} returns `this` so that calls can be chained
         */

    }, {
        key: 'relation',
        value: function relation(_relation) {
            if (isNil(_relation)) invalidRelationParam(_relation);

            var relationUpper = _relation.toUpperCase();
            if (!GEO_RELATION_SET.has(relationUpper)) {
                invalidRelationParam(_relation);
            }

            this._fieldOpts.relation = relationUpper;
            return this;
        }

        /**
         * When set to `true` will ignore an unmapped `path` and will not match any
         * documents for this query. When set to `false` (the default value) the query
         * will throw an exception if the path is not mapped.
         *
         * @param {boolean} enable `true` or `false`, `false` by default.
         * @returns {GeoShapeQuery} returns `this` so that calls can be chained.
         */

    }, {
        key: 'ignoreUnmapped',
        value: function ignoreUnmapped(enable) {
            this._queryOpts.ignore_unmapped = enable;
            return this;
        }
    }]);
    return GeoShapeQuery;
}(GeoQueryBase);

module.exports = GeoShapeQuery;