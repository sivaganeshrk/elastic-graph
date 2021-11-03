"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var aggregator_1 = require("./aggregator");
var elastic_builder_1 = __importDefault(require("elastic-builder"));
var defaultAggregator = [];
defaultAggregator.push(new aggregator_1.Aggregator("sum", function (name, fieldName, additionalProperties) {
    return elastic_builder_1.default.sumAggregation(name, fieldName);
}));
defaultAggregator.push(new aggregator_1.Aggregator("max", function (name, fieldName, additionalProperties) {
    return elastic_builder_1.default.maxAggregation(name, fieldName);
}));
defaultAggregator.push(new aggregator_1.Aggregator("min", function (name, fieldName, additionalProperties) {
    return elastic_builder_1.default.minAggregation(name, fieldName);
}));
defaultAggregator.push(new aggregator_1.Aggregator("avg", function (name, fieldName, additionalProperties) {
    return elastic_builder_1.default.avgAggregation(name, fieldName);
}));
defaultAggregator.push(new aggregator_1.Aggregator("stats", function (name, fieldName, additionalProperties) {
    var query = elastic_builder_1.default.statsAggregation(name, fieldName);
    if (additionalProperties.hasOwnProperty("missing") &&
        additionalProperties["missing"]) {
        query.missing(additionalProperties["missing"]);
    }
    return query;
}));
exports.default = defaultAggregator;
