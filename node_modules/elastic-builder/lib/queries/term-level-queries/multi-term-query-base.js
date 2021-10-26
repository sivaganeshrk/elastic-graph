'use strict';

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ValueTermQueryBase = require('./value-term-query-base');

/**
 * Interface-like class used to group and identify various implementations of
 * multi term queries:
 *
 * - Wildcard Query
 * - Fuzzy Query
 * - Prefix Query
 * - Range Query
 * - Regexp Query
 *
 * **NOTE:** Instantiating this directly should not be required.
 * However, if you wish to add a custom implementation for whatever reason,
 * this class could be extended.
 *
 * @extends ValueTermQueryBase
 */

var MultiTermQueryBase = function (_ValueTermQueryBase) {
  (0, _inherits3.default)(MultiTermQueryBase, _ValueTermQueryBase);

  function MultiTermQueryBase() {
    (0, _classCallCheck3.default)(this, MultiTermQueryBase);
    return (0, _possibleConstructorReturn3.default)(this, (MultiTermQueryBase.__proto__ || Object.getPrototypeOf(MultiTermQueryBase)).apply(this, arguments));
  }

  return MultiTermQueryBase;
}(ValueTermQueryBase);

module.exports = MultiTermQueryBase;