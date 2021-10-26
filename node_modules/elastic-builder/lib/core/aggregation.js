'use strict';

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var has = require('lodash.has');
var isEmpty = require('lodash.isempty');

var _require = require('./util'),
    checkType = _require.checkType,
    recursiveToJSON = _require.recursiveToJSON;

/**
 * Base class implementation for all aggregation types.
 *
 * **NOTE:** Instantiating this directly should not be required.
 * However, if you wish to add a custom implementation for whatever reason,
 * this class should be extended and used, as validation against the class
 * type is present in various places.
 *
 * @param {string} name
 * @param {string} aggType Type of aggregation
 *
 * @throws {Error} if `name` is empty
 * @throws {Error} if `aggType` is empty
 */


var Aggregation = function () {
    // eslint-disable-next-line require-jsdoc
    function Aggregation(name, aggType) {
        (0, _classCallCheck3.default)(this, Aggregation);

        if (isEmpty(aggType)) throw new Error('Aggregation `aggType` cannot be empty');

        this._name = name;
        this.aggType = aggType;

        this._aggs = {};
        this._aggsDef = this._aggs[aggType] = {};
        this._nestedAggs = [];
    }

    // TODO: Investigate case when getter for aggregation will be required

    /**
     * Sets name for aggregation.
     *
     * @param {string} name returns `this` so that calls can be chained.
     * @returns {Aggregation}
     */


    (0, _createClass3.default)(Aggregation, [{
        key: 'name',
        value: function name(_name) {
            this._name = _name;
            return this;
        }

        /**
         * Sets nested aggregations.
         * This method can be called multiple times in order to set multiple nested aggregations.
         *
         * @param {Aggregation} agg Any valid {@link Aggregation}
         * @returns {Aggregation} returns `this` so that calls can be chained.
         * @throws {TypeError} If `agg` is not an instance of `Aggregation`
         */

    }, {
        key: 'aggregation',
        value: function aggregation(agg) {
            checkType(agg, Aggregation);

            // Possible to check for Global aggregation?
            // Global aggregation can only be at the top level.

            this._nestedAggs.push(agg);

            return this;
        }

        /**
         * Sets nested aggregation.
         * This method can be called multiple times in order to set multiple nested aggregations.
         *
         * @param {Aggregation} agg Any valid {@link Aggregation}
         * @returns {Aggregation} returns `this` so that calls can be chained.
         */

    }, {
        key: 'agg',
        value: function agg(_agg) {
            return this.aggregation(_agg);
        }

        /**
         * Sets multiple nested aggregation items.
         * This method accepts an array to set multiple nested aggregations in one call.
         *
         * @param {Array<Aggregation>} aggs Array of valid {@link Aggregation} items
         * @returns {Aggregation} returns `this` so that calls can be chained.
         * @throws {TypeError} If `aggs` is not an instance of `Array`
         * @throws {TypeError} If `aggs` contains instances not of type `Aggregation`
         */

    }, {
        key: 'aggregations',
        value: function aggregations(aggs) {
            var _this = this;

            checkType(aggs, Array);

            aggs.forEach(function (agg) {
                return _this.aggregation(agg);
            });

            return this;
        }

        /**
         * Sets multiple nested aggregation items.
         * Alias for method `aggregations`
         *
         * @param {Array<Aggregation>} aggs Array of valid {@link Aggregation} items
         * @returns {Aggregation} returns `this` so that calls can be chained.
         * @throws {TypeError} If `aggs` is not an instance of `Array`
         * @throws {TypeError} If `aggs` contains instances not of type `Aggregation`
         */

    }, {
        key: 'aggs',
        value: function aggs(_aggs) {
            return this.aggregations(_aggs);
        }

        /**
         * You can associate a piece of metadata with individual aggregations at request time
         * that will be returned in place at response time.
         *
         * @param {Object} meta
         * @returns {Aggregation} returns `this` so that calls can be chained.
         */

    }, {
        key: 'meta',
        value: function meta(_meta) {
            this._aggs.meta = _meta;
            return this;
        }

        /**
         * Internal helper function for determining the aggregation name.
         *
         * @returns {string} Aggregation name
         * @private
         */

    }, {
        key: '_aggsName',
        value: function _aggsName() {
            if (!isEmpty(this._name)) return this._name;

            if (has(this._aggsDef, 'field')) {
                return 'agg_' + this.aggType + '_' + this._aggsDef.field;
            }

            // At this point, it would be difficult to construct a unique
            // aggregation name. Error out.
            throw new Error('Aggregation name could not be determined');
        }

        /**
         * Build and returns DSL representation of the `Aggregation` class instance.
         *
         * @returns {Object} returns an Object which maps to the elasticsearch query DSL
         */

    }, {
        key: 'getDSL',
        value: function getDSL() {
            return this.toJSON();
        }

        /**
         * Override default `toJSON` to return DSL representation for the `aggregation` query.
         *
         * @override
         * @returns {Object} returns an Object which maps to the elasticsearch query DSL
         */

    }, {
        key: 'toJSON',
        value: function toJSON() {
            var mainAggs = recursiveToJSON(this._aggs);

            if (!isEmpty(this._nestedAggs)) {
                mainAggs.aggs = Object.assign.apply(Object, [{}].concat((0, _toConsumableArray3.default)(recursiveToJSON(this._nestedAggs))));
            }

            return (0, _defineProperty3.default)({}, this._aggsName(), mainAggs);
        }
    }]);
    return Aggregation;
}();

module.exports = Aggregation;