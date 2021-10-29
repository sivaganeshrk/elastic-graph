import { Operator } from "./json-rules";
import { DynamicObject } from "../Types";
import defaultOperator from "./json-rules/default-operators";

export default class Transformer {
  private operators: Map<string, Operator>;
  constructor() {
    this.operators = new Map();
    defaultOperator.map((data) => {
      this.addOperator(data, () => {});
    });
  }

  addOperator(
    operatorName: string | Operator,
    callback: (
      fieldName: string,
      value: any,
      additionProperties: DynamicObject
    ) => any
  ) {
    let operator;
    if (operatorName instanceof Operator) {
      operator = operatorName;
    } else {
      operator = new Operator(operatorName, callback);
    }

    this.operators.set(operator.name, operator);
    return this;
  }

  removeOperator(operatorName: string) {
    if (typeof operatorName === "string") {
      this.operators.delete(operatorName);
    } else {
      throw new Error("operatorName mus be string");
    }
    return this;
  }
}
