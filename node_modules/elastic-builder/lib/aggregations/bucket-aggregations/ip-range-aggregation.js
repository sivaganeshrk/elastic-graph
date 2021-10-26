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

var RangeAggregationBase = require('./range-aggregation-base');

var ES_REF_URL = 'https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-iprange-aggregation.html';

/**
 * Dedicated range aggregation for IP typed fields.
 *
 * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/5current/search-aggregations-bucket-iprange-aggregation.html)
 *
 * @example
 * const agg = esb.ipRangeAggregation('ip_ranges', 'ip').ranges([
 *     { to: '10.0.0.5' },
 *     { from: '10.0.0.5' }
 * ]);
 *
 * @example
 * const agg = esb.ipRangeAggregation('ip_ranges', 'ip').ranges([
 *     { mask: '10.0.0.0/25' },
 *     { mask: '10.0.0.127/25' }
 * ]);
 *
 * @param {string} name The name which will be used to refer to this aggregation.
 * @param {string=} field The field to aggregate on
 *
 * @extends RangeAggregationBase
 */

var IpRangeAggregation = function (_RangeAggregationBase) {
    (0, _inherits3.default)(IpRangeAggregation, _RangeAggregationBase);

    // eslint-disable-next-line require-jsdoc
    function IpRangeAggregation(name, field) {
        (0, _classCallCheck3.default)(this, IpRangeAggregation);

        // Variable name is misleading. Only one of these needs to be present.
        var _this = (0, _possibleConstructorReturn3.default)(this, (IpRangeAggregation.__proto__ || Object.getPrototypeOf(IpRangeAggregation)).call(this, name, 'ip_range', field));

        _this._rangeRequiredKeys = ['from', 'to', 'mask'];
        return _this;
    }

    /**
     * @override
     * @throws {Error} This method cannot be called on IpRangeAggregation
     */


    (0, _createClass3.default)(IpRangeAggregation, [{
        key: 'format',
        value: function format() {
            console.log('Please refer ' + ES_REF_URL);
            throw new Error('format is not supported in IpRangeAggregation');
        }
    }]);
    return IpRangeAggregation;
}(RangeAggregationBase);

module.exports = IpRangeAggregation;