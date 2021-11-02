import { Operator } from "./json-rules";
import {
  ConditionProperties,
  DynamicObject,
  NestedCondition,
  TopLevelCondition,
} from "../Types";
import defaultOperator from "./json-rules/default-operators";
// import { Engine, TopLevelCondition as Rule } from "json-rules-engine";
import { Engine } from "json-rules-engine";

import { Validator } from "../utils";
import elasticBuilder from "elastic-builder";

export default class Transformer {
  private operators: Map<string, Operator>;
  private _routingValue: string | number | null = null;
  private rule: TopLevelCondition | undefined;
  private _from: number = 0;
  private _size: number = 0;
  constructor() {
    this.operators = new Map();
    defaultOperator.map((data) => {
      this.addOperator(data, () => {});
    });
  }

  /**
   * Add a custom operator definition
   * @param {string} operatorName - operator identifier
   * @param {function(fieldName,value,additionalProperties)} callback - the method to execute when the operator is encountered
   */
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

  /**
   * Remove a custom operator definition
   * @param operatorName - operator identifier
   */
  removeOperator(operatorName: string) {
    if (typeof operatorName === "string") {
      this.operators.delete(operatorName);
    } else {
      throw new Error("operatorName mus be string");
    }
    return this;
  }

  /**
   *
   * @param routingValue - routing value
   *
   */
  setRoutingValue(routingValue: string | number) {
    this._routingValue = routingValue;

    return this;
  }
  /**
   * setRule
   * @param rule - json-rules-engine rule format
   */
  public setRule(rule: TopLevelCondition) {
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

  offset(value: number) {
    if (!Validator.isPositiveNumber(value)) {
      throw new Error("offset value must be a positive integer");
    }

    this._from = value;

    return this;
  }

  size(value: number) {
    if (!Validator.isPositiveNumber(value)) {
      throw new Error("size value must be a positive integer");
    }

    this._size = value;

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
          rule.additionalProperties ?? {}
        );
      } else {
        throw new Error(`Invalid Operator : ${rule.operator}`);
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

  private queryBuilder() {
    try {
      this.checkValues();
    } catch (error) {
      throw error;
    }
    const query = elasticBuilder
      .requestBodySearch()
      .query(this.processTheRule(this.rule, true));

    if (this._from > 0) {
      query.from(this._from);
    }

    if (this._size > 0) {
      query.size(this._size);
    }

    return query;
  }

  /**
   *
   * @returns {object} the builded search query
   */
  public toJson(): object {
    return this.queryBuilder().toJSON();
  }

  sum(){} 
}
