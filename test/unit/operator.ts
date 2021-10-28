var assert = require("assert");
import Operator from "../../src/core/json-rules/operator";
describe("Operator Adding Test", function () {
  it("Creating new operator-success", function () {
    const newOne = new Operator("sum", (name: any, value: any) => {
      return `${name}-${value}`;
    });

    return newOne instanceof Operator;
  });
  it("Creating new operator-error", function () {
    try {
      const newOne = new Operator("", (name: any, value: any) => {
        return `${name}-${value}`;
      });
      return false;
    } catch (error: any) {
      return error.message === "Missing operator name";
    }
  });
});
