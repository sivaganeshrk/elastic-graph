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
    invalidParam = _require.util.invalidParam,
    GEO_RELATION_SET = _require.consts.GEO_RELATION_SET;

var MultiTermQueryBase = require('./multi-term-query-base');

var ES_REF_URL = 'https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-range-query.html';

var invalidRelationParam = invalidParam(ES_REF_URL, 'relation', GEO_RELATION_SET);

/**
 * Matches documents with fields that have terms within a certain range.
 *
 * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-range-query.html)
 *
 * @param {string=} field
 *
 * @example
 * const qry = esb.rangeQuery('age')
 *     .gte(10)
 *     .lte(20)
 *     .boost(2.0);
 *
 * @example
 * const qry = esb.rangeQuery('date').gte('now-1d/d').lt('now/d');
 *
 * @extends MultiTermQueryBase
 */

var RangeQuery = function (_MultiTermQueryBase) {
    (0, _inherits3.default)(RangeQuery, _MultiTermQueryBase);

    // eslint-disable-next-line require-jsdoc
    function RangeQuery(field) {
        (0, _classCallCheck3.default)(this, RangeQuery);
        return (0, _possibleConstructorReturn3.default)(this, (RangeQuery.__proto__ || Object.getPrototypeOf(RangeQuery)).call(this, 'range', field));
    }

    /**
     * @override
     * @throws {Error} This method cannot be called on RangeQuery
     */


    (0, _createClass3.default)(RangeQuery, [{
        key: 'value',
        value: function value() {
            console.log('Please refer ' + ES_REF_URL);
            throw new Error('value is not supported in RangeQuery');
        }

        /**
         * Greater-than or equal to
         *
         * @param {string|number} val
         * @returns {RangeQuery} returns `this` so that calls can be chained.
         */

    }, {
        key: 'gte',
        value: function gte(val) {
            this._queryOpts.gte = val;
            return this;
        }

        /**
         * Less-than or equal to
         *
         * @param {string|number} val
         * @returns {RangeQuery} returns `this` so that calls can be chained.
         */

    }, {
        key: 'lte',
        value: function lte(val) {
            this._queryOpts.lte = val;
            return this;
        }

        /**
         * Greater-than
         *
         * @param {string|number} val
         * @returns {RangeQuery} returns `this` so that calls can be chained.
         */

    }, {
        key: 'gt',
        value: function gt(val) {
            this._queryOpts.gt = val;
            return this;
        }

        /**
         * Less-than
         *
         * @param {string|number} val
         * @returns {RangeQuery} returns `this` so that calls can be chained.
         */

    }, {
        key: 'lt',
        value: function lt(val) {
            this._queryOpts.lt = val;
            return this;
        }

        /**
         * The lower bound. Defaults to start from the first.
         *
         * @param {string|number} val The lower bound value, type depends on field type
         * @returns {RangeQuery} returns `this` so that calls can be chained.
         */

    }, {
        key: 'from',
        value: function from(val) {
            this._queryOpts.from = val;
            return this;
        }

        /**
         * The upper bound. Defaults to unbounded.
         *
         * @param {string|number} val The upper bound value, type depends on field type
         * @returns {RangeQuery} returns `this` so that calls can be chained.
         */

    }, {
        key: 'to',
        value: function to(val) {
            this._queryOpts.to = val;
            return this;
        }

        /**
         * Should the first from (if set) be inclusive or not. Defaults to `true`
         *
         * @param {boolean} enable `true` to include, `false` to exclude
         * @returns {RangeQuery} returns `this` so that calls can be chained.
         */

    }, {
        key: 'includeLower',
        value: function includeLower(enable) {
            this._queryOpts.include_lower = enable;
            return this;
        }

        /**
         * Should the last to (if set) be inclusive or not. Defaults to `true`.
         *
         * @param {boolean} enable `true` to include, `false` to exclude
         * @returns {RangeQuery} returns `this` so that calls can be chained.
         */

    }, {
        key: 'includeUpper',
        value: function includeUpper(enable) {
            this._queryOpts.include_upper = enable;
            return this;
        }

        /**
         * Time Zone to be applied to any range query related to dates.
         *
         * @param {string} zone
         * @returns {RangeQuery} returns `this` so that calls can be chained.
         */

    }, {
        key: 'timeZone',
        value: function timeZone(zone) {
            this._queryOpts.time_zone = zone;
            return this;
        }

        /**
         * Sets the format expression for parsing the upper and lower bounds.
         * If no format is specified, then it will use the first format specified in the field mapping.
         *
         * @example
         * const qry = esb.rangeQuery('born')
         *     .gte('01/01/2012')
         *     .lte('2013')
         *     .format('dd/MM/yyyy||yyyy');
         *
         * @param {string} fmt Format for parsing upper and lower bounds.
         * @returns {RangeQuery} returns `this` so that calls can be chained
         */

    }, {
        key: 'format',
        value: function format(fmt) {
            this._queryOpts.format = fmt;
            return this;
        }

        /**
         * Sets the relationship between Query and indexed data
         * that will be used to determine if a Document should be matched or not.
         *
         * @param {string} relation Can be one of `WITHIN`, `CONTAINS`, `DISJOINT`
         * or `INTERSECTS`(default)
         * @returns {RangeQuery} returns `this` so that calls can be chained
         */

    }, {
        key: 'relation',
        value: function relation(_relation) {
            if (isNil(_relation)) invalidRelationParam(_relation);

            var relationUpper = _relation.toUpperCase();
            if (!GEO_RELATION_SET.has(relationUpper)) {
                invalidRelationParam(_relation);
            }

            this._queryOpts.relation = relationUpper;
            return this;
        }

        /**
         * Override default `toJSON` to return DSL representation of the `range` query
         * class instance.
         *
         * @override
         * @returns {Object} returns an Object which maps to the elasticsearch query DSL
         */

    }, {
        key: 'toJSON',
        value: function toJSON() {
            // recursiveToJSON doesn't seem to be required here.
            return (0, _defineProperty3.default)({}, this.queryType, (0, _defineProperty3.default)({}, this._field, this._queryOpts));
        }
    }]);
    return RangeQuery;
}(MultiTermQueryBase);

module.exports = RangeQuery;