"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var assert = require("assert");
var chai_1 = require("chai");
var src_1 = __importDefault(require("../../src"));
var operator_1 = require("../../src/core/json-rules/operator");
var elastic_builder_1 = __importDefault(require("elastic-builder"));
describe("Operator Class Test", function () {
    it("Creating new operator-success", function () {
        var newOne = new operator_1.Operator("sum", function (name, value) {
            return name + "-" + value;
        });
        assert.equal(newOne instanceof operator_1.Operator, true);
    });
    it("Creating new operator-error", function () {
        var result = "";
        try {
            new operator_1.Operator("", function (name, value) {
                return name + "-" + value;
            });
            result = "";
        }
        catch (error) {
            result = error.message;
        }
        (0, chai_1.expect)(result).to.be.equal("Missing operator name");
    });
});
describe("Transformer Operator Test", function () {
    var transformer = new src_1.default();
    it("Adding new operator to transformer-success", function () {
        transformer.addOperator("testOperator", function (fieldName, value, additionalProperties) {
            return elastic_builder_1.default
                .boolQuery()
                .must(elastic_builder_1.default.matchQuery("test", "test"));
        });
        transformer.setRule({
            all: [
                { fact: "testOperator", operator: "testOperator", value: "testValue" },
            ],
        });
        transformer.toJson();
    });
    it("Adding new operator to transformer-Error", function () {
        var result = "";
        try {
            transformer.addOperator("", function (fieldName, value, additionalProperties) {
                return true;
            });
            result = "";
        }
        catch (error) {
            result = error.message;
        }
        (0, chai_1.expect)(result).to.be.equal("Missing operator name");
    });
    it("Removing operator from transformer-success", function () {
        var result = "";
        transformer.removeOperator("testOperator");
        try {
            transformer
                .setRule({
                all: [
                    {
                        fact: "testOperator",
                        operator: "testOperator",
                        value: "testValue",
                    },
                ],
            })
                .toJson();
        }
        catch (error) {
            result = error.message;
        }
        (0, chai_1.expect)(result).to.be.equal("Invalid Operator : testOperator");
    });
});
