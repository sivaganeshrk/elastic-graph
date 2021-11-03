"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var operator_1 = require("./operator");
var default_operators_1 = __importDefault(require("./default-operators"));
// import { Engine, TopLevelCondition as Rule } from "json-rules-engine";
var json_rules_engine_1 = require("json-rules-engine");
var utils_1 = require("../utils");
var aggregator_1 = require("./aggregator");
var default_aggs_1 = __importDefault(require("./default-aggs"));
var queryBuilder_1 = require("./queryBuilder");
var Transformer = /** @class */ (function () {
    function Transformer() {
        var _this = this;
        this._routingValue = null;
        this.rule = null;
        this.aggregatorRule = [];
        this.sortRule = [];
        this._from = 0;
        this._size = 0;
        this.operators = new Map();
        this.aggregator = new Map();
        default_operators_1.default.map(function (data) {
            _this.addOperator(data, function () { });
        });
        default_aggs_1.default.map(function (data) {
            _this.addAggregator(data, function () { });
        });
    }
    /**
     * Add a custom operator definition
     * @param {string} operatorName - operator identifier
     * @param {function(fieldName,value,additionalProperties)} callback - the method to execute when the operator is encountered
     */
    Transformer.prototype.addOperator = function (operatorName, callback) {
        var operator;
        if (operatorName instanceof operator_1.Operator) {
            operator = operatorName;
        }
        else {
            operator = new operator_1.Operator(operatorName, callback);
        }
        this.operators.set(operator.name, operator);
        return this;
    };
    /**
     * Remove a custom operator definition
     * @param operatorName - operator identifier
     */
    Transformer.prototype.removeOperator = function (operatorName) {
        if (utils_1.Validator.isNonEmptyString(operatorName)) {
            this.operators.delete(operatorName);
        }
        else {
            throw new Error("operatorName must be non empty string");
        }
        return this;
    };
    /**
     * Add a custom aggregator definition
     * @param {string} aggregatorName - aggregator identifier
     * @param {function(name,fieldName,additionalProperties)} callback - the method to execute when the aggregator is encountered
     */
    Transformer.prototype.addAggregator = function (aggregatorName, callback) {
        var aggregator;
        if (aggregatorName instanceof aggregator_1.Aggregator) {
            aggregator = aggregatorName;
        }
        else {
            if (!utils_1.Validator.isNonEmptyString(aggregatorName)) {
                throw new Error("aggregatorName must be a non empty string");
            }
            aggregator = new aggregator_1.Aggregator(aggregatorName, callback);
        }
        this.aggregator.set(aggregator.name, aggregator);
        return this;
    };
    /**
     * Remove a custom aggregator definition
     * @param operatorName - aggregator identifier
     */
    Transformer.prototype.removeAggregator = function (aggregatorName) {
        if (utils_1.Validator.isNonEmptyString(aggregatorName)) {
            this.aggregator.delete(aggregatorName);
        }
        else {
            throw new Error("aggregatorName must be non empty string");
        }
        return this;
    };
    /**
     * Set Routing Value For the query
     * @param routingValue - routing value
     *
     */
    Transformer.prototype.setRoutingValue = function (routingValue) {
        this._routingValue = routingValue;
        return this;
    };
    /**
     * setRule
     * @param rule - json-rules-engine rule format
     */
    Transformer.prototype.setRule = function (rule) {
        if (utils_1.Validator.isNonEmptyObject(rule)) {
        }
        else {
            throw "rule must be a non empty object";
        }
        try {
            var engine = new json_rules_engine_1.Engine();
            engine.addRule({
                conditions: rule,
                event: {
                    // define the event to fire when the conditions evaluate truthy
                    type: "dummyEvent",
                    params: {
                        message: "dummyMessage",
                    },
                },
            });
        }
        catch (error) {
            throw error;
        }
        this.rule = rule;
        return this;
    };
    /**
     * Set offset value for the query
     * @param {number} value - offset value
     */
    Transformer.prototype.offset = function (value) {
        if (!utils_1.Validator.isPositiveNumber(value)) {
            throw new Error("offset value must be a positive integer");
        }
        this._from = value;
        return this;
    };
    /**
     * Set limit value for the query
     * @param value - limit value
     */
    Transformer.prototype.limit = function (value) {
        if (!utils_1.Validator.isPositiveNumber(value)) {
            throw new Error("size value must be a positive integer");
        }
        this._size = value;
        return this;
    };
    /**
     * Build a query based on the user given input
     * @returns {object} the builded search query
     */
    Transformer.prototype.toJson = function () {
        return new queryBuilder_1.QueryBuilder(this.operators, this.aggregator, this.rule, this.aggregatorRule, this.sortRule, this._routingValue, this._from, this._size)
            .queryBuilder()
            .toJSON();
    };
    Transformer.prototype.setAggregator = function (aggregator) {
        if (Array.isArray(aggregator)) {
            this.aggregatorRule = this.aggregatorRule.concat(aggregator);
        }
        else {
            throw new Error("aggregator in must be a instance of a Array");
        }
        return this;
    };
    Transformer.prototype.aggsWrapper = function (data) {
        this.aggregatorRule.push(data);
    };
    /**
     * Sum Aggregator
     * @param {string | AggregatorInput[]} name - name of the aggregator
     * @param {string} fieldName - field name the aggregator to be performed
     */
    Transformer.prototype.sum = function (name, fieldName) {
        if (fieldName === void 0) { fieldName = ""; }
        if (Array.isArray(name)) {
            if (name.length > 0) {
                for (var _i = 0, name_1 = name; _i < name_1.length; _i++) {
                    var data = name_1[_i];
                    this.aggsWrapper({
                        name: data.name,
                        fieldName: data.fieldName,
                        aggregator: "sum",
                        additionalProperties: {},
                    });
                }
            }
        }
        else {
            this.aggsWrapper({
                name: name,
                aggregator: "sum",
                fieldName: fieldName,
                additionalProperties: {},
            });
        }
        return this;
    };
    /**
     * Avg Aggregator [reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-metrics-avg-aggregation.html)
     * @param {string | AggregatorInput[]} name - name of the aggregator
     * @param {string} fieldName - field name the aggregator to be performed
     */
    Transformer.prototype.avg = function (name, fieldName) {
        if (fieldName === void 0) { fieldName = ""; }
        if (Array.isArray(name)) {
            if (name.length > 0) {
                for (var _i = 0, name_2 = name; _i < name_2.length; _i++) {
                    var data = name_2[_i];
                    this.aggsWrapper({
                        name: data.name,
                        fieldName: data.fieldName,
                        aggregator: "avg",
                        additionalProperties: {},
                    });
                }
            }
        }
        else {
            this.aggsWrapper({
                name: name,
                aggregator: "avg",
                fieldName: fieldName,
                additionalProperties: {},
            });
        }
        return this;
    };
    /**
     * Max Aggregator
     * [reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-metrics-max-aggregation.html)
     * @param {string | AggregatorInput[]} name - name of the aggregator
     * @param {string} fieldName - field name the aggregator to be performed
     */
    Transformer.prototype.max = function (name, fieldName) {
        if (fieldName === void 0) { fieldName = ""; }
        if (Array.isArray(name)) {
            if (name.length > 0) {
                for (var _i = 0, name_3 = name; _i < name_3.length; _i++) {
                    var data = name_3[_i];
                    this.aggsWrapper({
                        name: data.name,
                        fieldName: data.fieldName,
                        aggregator: "max",
                        additionalProperties: {},
                    });
                }
            }
        }
        else {
            this.aggsWrapper({
                name: name,
                aggregator: "max",
                fieldName: fieldName,
                additionalProperties: {},
            });
        }
        return this;
    };
    /**
     * Min Aggregator [reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-metrics-min-aggregation.html)
     * @param {string | AggregatorInput[]} name - name of the aggregator
     * @param {string} fieldName - field name the aggregator to be performed
     */
    Transformer.prototype.min = function (name, fieldName) {
        if (fieldName === void 0) { fieldName = ""; }
        if (Array.isArray(name)) {
            if (name.length > 0) {
                for (var _i = 0, name_4 = name; _i < name_4.length; _i++) {
                    var data = name_4[_i];
                    this.aggsWrapper({
                        name: data.name,
                        fieldName: data.fieldName,
                        aggregator: "min",
                        additionalProperties: {},
                    });
                }
            }
        }
        else {
            this.aggsWrapper({
                name: name,
                aggregator: "min",
                fieldName: fieldName,
                additionalProperties: {},
            });
        }
        return this;
    };
    /**
     * sort
     * @param {string | Sort[]} fieldName - field name
     * @param {"asc"|"desc"} order - order "asc" or "desc"
     */
    Transformer.prototype.sort = function (fieldName, order) {
        if (order === void 0) { order = "asc"; }
        if (Array.isArray(fieldName)) {
            this.sortRule = this.sortRule.concat(fieldName);
        }
        else {
            this.sortRule.push({ fieldName: fieldName, order: order });
        }
        return this;
    };
    return Transformer;
}());
exports.default = Transformer;
