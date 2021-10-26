'use strict';

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _require = require('./util'),
    recursiveToJSON = _require.recursiveToJSON;

/**
 * Base class implementation for all query types.
 *
 * **NOTE:** Instantiating this directly should not be required.
 * However, if you wish to add a custom implementation for whatever reason,
 * this class should be extended and used, as validation against the class
 * type is present in various places.
 *
 * @param {string} queryType
 */


var Query = function () {
    // eslint-disable-next-line require-jsdoc
    function Query(queryType) {
        (0, _classCallCheck3.default)(this, Query);

        this.queryType = queryType;

        this._body = {};
        this._queryOpts = this._body[queryType] = {};
    }

    /**
     * Sets the boost value for documents matching the `Query`.
     *
     * @param {number} factor
     * @returns {Query} returns `this` so that calls can be chained.
     */


    (0, _createClass3.default)(Query, [{
        key: 'boost',
        value: function boost(factor) {
            this._queryOpts.boost = factor;
            return this;
        }

        /**
         * Sets the query name.
         *
         * @example
         * const boolQry = esb.boolQuery()
         *     .should([
         *         esb.matchQuery('name.first', 'shay').name('first'),
         *         esb.matchQuery('name.last', 'banon').name('last')
         *     ])
         *     .filter(esb.termsQuery('name.last', ['banon', 'kimchy']).name('test'));
         *
         * @param {string} name
         * @returns {Query} returns `this` so that calls can be chained.
         */

    }, {
        key: 'name',
        value: function name(_name) {
            this._queryOpts._name = _name;
            return this;
        }

        /**
         * Build and returns DSL representation of the `Query` class instance.
         *
         * @returns {Object} returns an Object which maps to the elasticsearch query DSL
         */

    }, {
        key: 'getDSL',
        value: function getDSL() {
            return this.toJSON();
        }

        /**
         * Override default `toJSON` to return DSL representation for the `query`
         *
         * @override
         * @returns {Object} returns an Object which maps to the elasticsearch query DSL
         */

    }, {
        key: 'toJSON',
        value: function toJSON() {
            return recursiveToJSON(this._body);
        }
    }]);
    return Query;
}();

module.exports = Query;