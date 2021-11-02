"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var src_1 = __importDefault(require("../../src"));
describe("json to search Query Transformer Test", function () {
    it("simple query with default operator", function () {
        var transformer = new src_1.default();
        var query = transformer
            .setRule({
            all: [{ fact: "fact-1", operator: "equal", value: "testdata" }],
        })
            .toJson();
        (0, chai_1.expect)(query).to.deep.equal({
            query: { bool: { must: { term: { "fact-1": "testdata" } } } },
        });
    });
    it("simple query with default operator and routing", function () {
        var transformer = new src_1.default();
        var query = transformer
            .setRoutingValue(10)
            .setRule({
            all: [{ fact: "fact-1", operator: "equal", value: "testdata" }],
        })
            .toJson();
        (0, chai_1.expect)(query).to.deep.equal({
            query: {
                bool: {
                    must: [
                        { bool: { must: { term: { "fact-1": "testdata" } } } },
                        { term: { _routing: 10 } },
                    ],
                },
            },
        });
    });
    it("simple query with form and size", function () {
        var transformer = new src_1.default();
        var query = transformer
            .setRule({
            all: [{ fact: "fact-1", operator: "equal", value: "testdata" }],
        })
            .offset(10)
            .size(10)
            .toJson();
        (0, chai_1.expect)(query).to.deep.equal({
            from: 10,
            query: {
                bool: {
                    must: {
                        term: {
                            "fact-1": "testdata",
                        },
                    },
                },
            },
            size: 10,
        });
    });
});
