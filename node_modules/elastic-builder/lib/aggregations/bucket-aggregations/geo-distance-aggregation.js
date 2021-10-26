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
    GeoPoint = _require.GeoPoint,
    _require$util = _require.util,
    checkType = _require$util.checkType,
    invalidParam = _require$util.invalidParam,
    UNIT_SET = _require.consts.UNIT_SET;

var RangeAggregationBase = require('./range-aggregation-base');

var ES_REF_URL = 'https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-geodistance-aggregation.html';

var invalidUnitParam = invalidParam(ES_REF_URL, 'unit', UNIT_SET);
var invalidDistanceTypeParam = invalidParam(ES_REF_URL, 'distance_type', "'plane' or 'arc'");

/**
 * A multi-bucket aggregation that works on geo_point fields and conceptually
 * works very similar to the range aggregation. The user can define a point of
 * origin and a set of distance range buckets. The aggregation evaluate the
 * distance of each document value from the origin point and determines the
 * buckets it belongs to based on the ranges (a document belongs to a bucket
 * if the distance between the document and the origin falls within the distance
 * range of the bucket).
 *
 * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-geodistance-aggregation.html)
 *
 * @example
 * const agg = esb.geoDistanceAggregation('rings_around_amsterdam', 'location')
 *     .origin(esb.geoPoint().string('52.3760, 4.894'))
 *     .ranges([{ to: 100000 }, { from: 100000, to: 300000 }, { from: 300000 }]);
 *
 * @param {string} name The name which will be used to refer to this aggregation.
 * @param {string=} field The field to aggregate on
 *
 * @extends RangeAggregationBase
 */

var GeoDistanceAggregation = function (_RangeAggregationBase) {
    (0, _inherits3.default)(GeoDistanceAggregation, _RangeAggregationBase);

    // eslint-disable-next-line require-jsdoc
    function GeoDistanceAggregation(name, field) {
        (0, _classCallCheck3.default)(this, GeoDistanceAggregation);
        return (0, _possibleConstructorReturn3.default)(this, (GeoDistanceAggregation.__proto__ || Object.getPrototypeOf(GeoDistanceAggregation)).call(this, name, 'geo_distance', field));
    }

    /**
     * @override
     * @throws {Error} This method cannot be called on GeoDistanceAggregation
     */


    (0, _createClass3.default)(GeoDistanceAggregation, [{
        key: 'format',
        value: function format() {
            console.log('Please refer ' + ES_REF_URL);
            throw new Error('format is not supported in GeoDistanceAggregation');
        }

        /**
         * @override
         * @throws {Error} This method cannot be called on GeoDistanceAggregation
         */

    }, {
        key: 'script',
        value: function script() {
            console.log('Please refer ' + ES_REF_URL);
            throw new Error('script is not supported in GeoDistanceAggregation');
        }

        /**
         * Sets the point of origin from where distances will be measured.
         *
         * @param {GeoPoint} point A valid `GeoPoint` object.
         * @returns {GeoDistanceAggregation} returns `this` so that calls can be chained
         * @throws {TypeError} If `point` is not an instance of `GeoPoint`
         */

    }, {
        key: 'origin',
        value: function origin(point) {
            checkType(point, GeoPoint);

            this._aggsDef.origin = point;
            return this;
        }

        /**
         * Sets the distance unit.  Valid values are:
         * mi (miles), in (inches), yd (yards),
         * km (kilometers), cm (centimeters), mm (millimeters),
         * ft(feet), NM(nauticalmiles)
         *
         * @example
         * const agg = esb.geoDistanceAggregation('rings_around_amsterdam', 'location')
         *     .origin(esb.geoPoint().string('52.3760, 4.894'))
         *     .unit('km')
         *     .ranges([{ to: 100 }, { from: 100, to: 300 }, { from: 300 }]);
         *
         * @param {string} unit Distance unit, default is `m`(meters).
         * @returns {GeoDistanceAggregation} returns `this` so that calls can be chained
         * @throws {Error} If Unit is outside the accepted set.
         */

    }, {
        key: 'unit',
        value: function unit(_unit) {
            if (!UNIT_SET.has(_unit)) {
                invalidUnitParam(_unit);
            }

            this._aggsDef.unit = _unit;
            return this;
        }

        /**
         * Sets the distance calculation mode, `arc` or `plane`.
         * The `arc` calculation is the more accurate.
         * The `plane` is the faster but least accurate.
         *
         * @example
         * const agg = esb.geoDistanceAggregation('rings_around_amsterdam', 'location')
         *     .origin(esb.geoPoint().string('52.3760, 4.894'))
         *     .unit('km')
         *     .distanceType('plane')
         *     .ranges([{ to: 100 }, { from: 100, to: 300 }, { from: 300 }]);
         *
         * @param {string} type
         * @returns {GeoDistanceAggregation} returns `this` so that calls can be chained
         * @throws {Error} If `type` is neither `plane` nor `arc`.
         */

    }, {
        key: 'distanceType',
        value: function distanceType(type) {
            if (isNil(type)) invalidDistanceTypeParam(type);

            var typeLower = type.toLowerCase();
            if (typeLower !== 'plane' && typeLower !== 'arc') invalidDistanceTypeParam(type);

            this._aggsDef.distance_type = typeLower;
            return this;
        }
    }]);
    return GeoDistanceAggregation;
}(RangeAggregationBase);

module.exports = GeoDistanceAggregation;