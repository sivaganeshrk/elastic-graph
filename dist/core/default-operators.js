"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var operator_1 = require("./operator");
var elastic_builder_1 = __importDefault(require("elastic-builder"));
var luxon_1 = require("luxon");
var utils_1 = require("../utils");
var defaultOperator = [];
var formateDateRelative = function (seconds, format) {
    if (format === void 0) { format = "x"; }
    return luxon_1.DateTime.now().minus({ seconds: seconds }).toFormat(format);
};
// match exact string
defaultOperator.push(new operator_1.Operator("equal", function (fieldName, value, additionalProperties) {
    if (additionalProperties === void 0) { additionalProperties = {}; }
    return elastic_builder_1.default.termQuery(fieldName, value);
}));
// check for the value contains the given string
defaultOperator.push(new operator_1.Operator("containsString", function (fieldName, value, additionalProperties) {
    if (additionalProperties === void 0) { additionalProperties = {}; }
    elastic_builder_1.default.matchQuery(fieldName, value);
}));
// match exact string
defaultOperator.push(new operator_1.Operator("is", function (fieldName, value, additionalProperties) {
    if (additionalProperties === void 0) { additionalProperties = {}; }
    return elastic_builder_1.default.termQuery(fieldName, value);
}));
// check the value is null
defaultOperator.push(new operator_1.Operator("blank", function (fieldName, value, additionalProperties) {
    if (value === void 0) { value = "NULL"; }
    if (additionalProperties === void 0) { additionalProperties = {}; }
    return elastic_builder_1.default.termQuery(fieldName, value);
}));
defaultOperator.push(new operator_1.Operator("notEqual", function (fieldName, value, additionalProperties) {
    if (additionalProperties === void 0) { additionalProperties = {}; }
    return elastic_builder_1.default
        .boolQuery()
        .mustNot(elastic_builder_1.default.termQuery(fieldName, value));
}));
defaultOperator.push(new operator_1.Operator("notContainsString", function (fieldName, value, additionalProperties) {
    if (additionalProperties === void 0) { additionalProperties = {}; }
    return elastic_builder_1.default
        .boolQuery()
        .mustNot(elastic_builder_1.default.matchQuery(fieldName, value));
}));
defaultOperator.push(new operator_1.Operator("notBlank", function (fieldName, value, additionalProperties) {
    if (value === void 0) { value = "NULL"; }
    if (additionalProperties === void 0) { additionalProperties = {}; }
    return elastic_builder_1.default
        .boolQuery()
        .mustNot(elastic_builder_1.default.termQuery(fieldName, value));
}));
defaultOperator.push(new operator_1.Operator("greaterThanAbsolute", function (fieldName, value, additionalProperties) {
    if (additionalProperties === void 0) { additionalProperties = {}; }
    return elastic_builder_1.default.rangeQuery(fieldName).gt(value);
}));
defaultOperator.push(new operator_1.Operator("lessThanAbsolute", function (fieldName, value, additionalProperties) {
    if (additionalProperties === void 0) { additionalProperties = {}; }
    return elastic_builder_1.default.rangeQuery(fieldName).lt(value);
}));
defaultOperator.push(new operator_1.Operator("equalAbsolute", function (fieldName, value, additionalProperties) {
    if (additionalProperties === void 0) { additionalProperties = {}; }
    return elastic_builder_1.default.termQuery(fieldName, value);
}));
defaultOperator.push(new operator_1.Operator("greaterThanRelative", function (fieldName, value, additionalProperties) {
    if (additionalProperties === void 0) { additionalProperties = {}; }
    (0, utils_1.debug)("callback", additionalProperties);
    return elastic_builder_1.default
        .rangeQuery(fieldName)
        .gt(formateDateRelative(value, additionalProperties["format"]));
}));
defaultOperator.push(new operator_1.Operator("lessThanRelative", function (fieldName, value, additionalProperties) {
    if (additionalProperties === void 0) { additionalProperties = {}; }
    return elastic_builder_1.default
        .rangeQuery(fieldName)
        .lt(formateDateRelative(value, additionalProperties["format"]));
}));
defaultOperator.push(new operator_1.Operator("equalRelative", function (fieldName, value, additionalProperties) {
    if (additionalProperties === void 0) { additionalProperties = {}; }
    return elastic_builder_1.default.termQuery(fieldName, formateDateRelative(value, additionalProperties.format));
}));
defaultOperator.push(new operator_1.Operator("notEqualRelative", function (fieldName, value, additionalProperties) {
    if (additionalProperties === void 0) { additionalProperties = {}; }
    return elastic_builder_1.default
        .boolQuery()
        .mustNot(elastic_builder_1.default.termQuery(fieldName, formateDateRelative(value, additionalProperties["format"])));
}));
exports.default = defaultOperator;
