"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryBuilder = void 0;
var elastic_builder_1 = __importDefault(require("elastic-builder"));
var QueryBuilder = /** @class */ (function () {
    /**
     *
     * @param {Operator[]} operators - array of default operators and user defined operators
     * @param aggregator - array of default aggregators and user defined aggregators
     * @param queryRule - user entered query rule
     * @param aggregatorRule - user entered aggregator rule
     * @param sortRule - user entered sortRules
     */
    function QueryBuilder(operators, aggregator, queryRule, aggregatorRule, sortRule, routingValue, from, size) {
        var _this = this;
        this.aggregatorRule = [];
        this.sortRule = [];
        this.from = null;
        this.size = null;
        this._routingValue = null;
        this.processTheRule = function (rule, isMain) {
            var _a;
            if (isMain === void 0) { isMain = false; }
            var result = null;
            var ruleKey = Object.keys(rule);
            if (ruleKey.includes("any") || ruleKey.includes("all")) {
                var output = [];
                // @ts-ignore
                for (var _i = 0, _b = rule[ruleKey]; _i < _b.length; _i++) {
                    var data = _b[_i];
                    output.push(_this.processTheRule(data));
                }
                if (!output.includes(null)) {
                    switch (ruleKey[0]) {
                        case "all":
                            result = elastic_builder_1.default.boolQuery().must(output);
                            break;
                        case "any":
                            result = elastic_builder_1.default.boolQuery().should(output);
                            break;
                    }
                }
            }
            else {
                var operator = _this.operators.get(rule.operator);
                if (operator) {
                    result = operator.generate(rule.fact, rule.value, (_a = rule.additionalProperties) !== null && _a !== void 0 ? _a : {});
                }
                else {
                    throw new Error("Invalid Operator : " + rule.operator);
                }
            }
            if (isMain && _this._routingValue) {
                return elastic_builder_1.default
                    .boolQuery()
                    .must([
                    result,
                    elastic_builder_1.default.termQuery("_routing", _this._routingValue),
                ]);
            }
            return result;
        };
        this.operators = operators;
        this.aggregators = aggregator;
        this.queryRule = queryRule;
        this.aggregatorRule = aggregatorRule;
        this.sortRule = sortRule;
        this._routingValue = routingValue;
        this.from = from;
        this.size = size;
    }
    QueryBuilder.prototype.checkValues = function () {
        if (!this.queryRule) {
            throw new Error("rule is required");
        }
    };
    QueryBuilder.prototype.queryBuilder = function () {
        var _a;
        var query = elastic_builder_1.default.requestBodySearch();
        if (this.queryRule) {
            query.query(this.processTheRule(this.queryRule, true));
        }
        if (this.from) {
            query.from(this.from);
        }
        if (this.size) {
            query.size(this.size);
        }
        if (this.sortRule && this.sortRule.length > 0) {
            for (var _i = 0, _b = this.sortRule; _i < _b.length; _i++) {
                var sort = _b[_i];
                query.sort(elastic_builder_1.default.sort(sort.fieldName, sort.order));
            }
        }
        if (this.aggregatorRule && this.aggregatorRule.length > 0) {
            var aggregatorResult = [];
            for (var _c = 0, _d = this.aggregatorRule; _c < _d.length; _c++) {
                var aggregator = _d[_c];
                var aggregatorExecuter = this.aggregators.get(aggregator.aggregator);
                aggregatorResult.push(aggregatorExecuter === null || aggregatorExecuter === void 0 ? void 0 : aggregatorExecuter.generate(aggregator.name, aggregator.fieldName, (_a = aggregator.additionalProperties) !== null && _a !== void 0 ? _a : {}));
            }
            query.aggregations(aggregatorResult);
        }
        return query;
    };
    QueryBuilder.prototype.buildQuery = function () { };
    return QueryBuilder;
}());
exports.QueryBuilder = QueryBuilder;
