import { Operator } from "./json-rules";
import { DynamicObject } from "../Types";
import defaultOperator from "./json-rules/default-operators";
// import { Engine, TopLevelCondition as Rule } from "json-rules-engine";
import { Engine } from "json-rules-engine";

import { Validator } from "../utils";
import elasticBuilder from "elastic-builder";
// export type TopLevelCondition = Rule;
export type Rule = any;

export default class Transformer {
  private operators: Map<string, Operator>;
  private _routingValue: string | number | null = null;
  private rule: Rule | undefined;
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

  setRoutingValue(routingValue: string | number) {
    this._routingValue = routingValue;

    return this;
  }

  public setRule(rule: Rule) {
    if (Validator.isNonEmptyObject(rule)) {
    } else {
      throw "rule must be a non empty object";
    }

    try {
      let engine = new Engine();

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
    } catch (error: any) {
      throw error;
    }

    this.rule = rule;
    return this;
  }

  private processTheRule = (rule: any, isMain: boolean = false) => {
    let result: any = null;
    const ruleKey = Object.keys(rule);

    if (ruleKey.includes("any") || ruleKey.includes("all")) {
      let output: any = [];
      // @ts-ignore
      for (const data of rule[ruleKey]) {
        output.push(this.processTheRule(data));
      }
      if (!output.includes(null)) {
        switch (ruleKey[0]) {
          case "all":
            result = elasticBuilder.boolQuery().must(output);
            break;
          case "any":
            result = elasticBuilder.boolQuery().should(output);
            break;
        }
      }
    } else {
      const operator = this.operators.get(rule.operator);
      if (operator) {
        result = operator.generate(
          rule.fact,
          rule.value,
          rule.additionalProperties
        );
      } else {
        throw new Error("Invalid Operator");
      }
    }

    if (isMain && this._routingValue) {
      return elasticBuilder
        .boolQuery()
        .must([
          result,
          elasticBuilder.termQuery("_routing", this._routingValue),
        ]);
    }

    return result;
  };

  private checkValues() {
    if (!this.rule) {
      throw new Error("rule is required");
    }
  }

  public transform() {
    try {
      this.checkValues();
    } catch (error) {
      throw error;
    }
    return elasticBuilder
      .requestBodySearch()
      .query(this.processTheRule(this.rule, true) as any)
      .toJSON();
  }
}

const trans = new Transformer();

trans
  .setRule({
    all: [
      {
        fact: "name",
        operator: "greaterThanRelative",
        value: 1,
        additionalProperties: { format: "X" },
      },
      { fact: "age", operator: "equal", value: 21 },
    ],
  })
  .setRoutingValue("hbvsdjhf");

console.log(JSON.stringify(trans.transform()));
