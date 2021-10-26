'use strict';

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isNil = require('lodash.isnil');

/**
 * A shape which has already been indexed in another index and/or index
 * type. This is particularly useful for when you have a pre-defined list of
 * shapes which are useful to your application and you want to reference this
 * using a logical name (for example 'New Zealand') rather than having to
 * provide their coordinates each time.
 *
 * @example
 * const shape = esb.indexedShape('DEU', 'countries')
 *     .index('shapes')
 *     .path('location');
 *
 * const shape = esb.indexedShape()
 *     .id('DEU')
 *     .type('countries')
 *     .index('shapes')
 *     .path('location');
 *
 * @param {string=} id The document id of the shape.
 * @param {string=} type The name of the type where the shape is indexed.
 */

var IndexedShape = function () {
    // eslint-disable-next-line require-jsdoc
    function IndexedShape(id, type) {
        (0, _classCallCheck3.default)(this, IndexedShape);

        this._body = {};

        if (!isNil(id)) this._body.id = id;
        if (!isNil(type)) this._body.type = type;
    }

    /**
     * Sets the ID of the document that containing the pre-indexed shape.
     *
     * @param {string} id The document id of the shape.
     * @returns {IndexedShape} returns `this` so that calls can be chained.
     */


    (0, _createClass3.default)(IndexedShape, [{
        key: 'id',
        value: function id(_id) {
            this._body.id = _id;
            return this;
        }

        /**
         * Sets the index type where the pre-indexed shape is.
         *
         * @param {string} type The name of the type where the shape is indexed.
         * @returns {IndexedShape} returns `this` so that calls can be chained.
         */

    }, {
        key: 'type',
        value: function type(_type) {
            this._body.type = _type;
            return this;
        }

        /**
         * Sets the name of the index where the pre-indexed shape is. Defaults to `shapes`.
         *
         * @param {string} index A valid index name
         * @returns {IndexedShape} returns `this` so that calls can be chained.
         */

    }, {
        key: 'index',
        value: function index(_index) {
            this._body.index = _index;
            return this;
        }

        /**
         * Sets the field specified as path containing the pre-indexed shape.
         * Defaults to `shape`.
         *
         * @param {string} path field name.
         * @returns {IndexedShape} returns `this` so that calls can be chained.
         */

    }, {
        key: 'path',
        value: function path(_path) {
            this._body.path = _path;
            return this;
        }

        /**
         * Override default `toJSON` to return DSL representation of the geo shape
         * class instance.
         *
         * @override
         * @returns {Object} returns an Object which maps to the elasticsearch query DSL
         */

    }, {
        key: 'toJSON',
        value: function toJSON() {
            return this._body;
        }
    }]);
    return IndexedShape;
}();

module.exports = IndexedShape;