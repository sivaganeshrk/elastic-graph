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
    Query = _require.Query,
    Script = _require.Script,
    checkType = _require.util.checkType;

/**
 * A query allowing to define scripts as queries.
 * They are typically used in a filter context.
 *
 * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-script-query.html)
 *
 * @example
 * const scriptQry = esb.scriptQuery(esb.script()
 *  .lang('painless')
 *  .inline("doc['num1'].value > 1"))
 *
 * // Use in filter context
 * const qry = esb.boolQuery().must(scriptQry);
 *
 * @param {Script=} script
 *
 * @extends Query
 */


var ScriptQuery = function (_Query) {
    (0, _inherits3.default)(ScriptQuery, _Query);

    // eslint-disable-next-line require-jsdoc
    function ScriptQuery(script) {
        (0, _classCallCheck3.default)(this, ScriptQuery);

        var _this = (0, _possibleConstructorReturn3.default)(this, (ScriptQuery.__proto__ || Object.getPrototypeOf(ScriptQuery)).call(this, 'script'));

        if (!isNil(script)) _this.script(script);
        return _this;
    }

    /**
     * Sets the `script` for query.
     *
     * @param {Script} script
     * @returns {ScriptQuery} returns `this` so that calls can be chained.
     */


    (0, _createClass3.default)(ScriptQuery, [{
        key: 'script',
        value: function script(_script) {
            checkType(_script, Script);

            this._queryOpts.script = _script;
            return this;
        }
    }]);
    return ScriptQuery;
}(Query);

module.exports = ScriptQuery;