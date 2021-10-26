'use strict';

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _require = require('../../core'),
    Query = _require.Query;

/**
 * Interface-like class used to group and identify various implementations of Span queries.
 *
 * **NOTE:** Instantiating this directly should not be required.
 * However, if you wish to add a custom implementation for whatever reason,
 * this class could be extended.
 *
 * @extends Query
 */


var SpanQueryBase = function (_Query) {
  (0, _inherits3.default)(SpanQueryBase, _Query);

  function SpanQueryBase() {
    (0, _classCallCheck3.default)(this, SpanQueryBase);
    return (0, _possibleConstructorReturn3.default)(this, (SpanQueryBase.__proto__ || Object.getPrototypeOf(SpanQueryBase)).apply(this, arguments));
  }

  return SpanQueryBase;
}(Query);

module.exports = SpanQueryBase;