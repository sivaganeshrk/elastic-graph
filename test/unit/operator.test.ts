var assert = require("assert");
import { expect } from "chai";
import Transformer from "../../src";
import { Operator } from "../../src/core/json-rules/operator";
import elasticBuilder from "elastic-builder";
describe("Operator Class Test", () => {
  it("Creating new operator-success", () => {
    const newOne = new Operator("sum", (name: any, value: any) => {
      return `${name}-${value}`;
    });

    assert.equal(newOne instanceof Operator, true);
  });
  it("Creating new operator-error", () => {
    let result = "";
    try {
      new Operator("", (name: any, value: any) => {
        return `${name}-${value}`;
      });
      result = "";
    } catch (error: any) {
      result = error.message;
    }

    expect(result).to.be.equal("Missing operator name");
  });
});

describe("Transformer Operator Test", () => {
  const transformer = new Transformer();
  it("Adding new operator to transformer-success", () => {
    transformer.addOperator(
      "testOperator",
      (fieldName, value, additionalProperties) => {
        return elasticBuilder
          .boolQuery()
          .must(elasticBuilder.matchQuery("test", "test"));
      }
    );

    transformer.setRule({
      all: [
        { fact: "testOperator", operator: "testOperator", value: "testValue" },
      ],
    });

    transformer.buildQuery();
  });

  it("Adding new operator to transformer-Error", () => {
    let result = "";
    try {
      transformer.addOperator("", (fieldName, value, additionalProperties) => {
        return true;
      });

      result = "";
    } catch (error: any) {
      result = error.message;
    }

    expect(result).to.be.equal("Missing operator name");
  });

  it("Removing operator from transformer-success", () => {
    let result = "";
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
        .buildQuery();
    } catch (error: any) {
      result = error.message;
    }

    expect(result).to.be.equal("Invalid Operator : testOperator");
  });
});
