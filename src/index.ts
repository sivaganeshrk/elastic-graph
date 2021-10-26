import { Validator } from "./utils";
import { Engine, TopLevelCondition as Rule } from "json-rules-engine";
import elasticBuilder from "elastic-builder";
export type TopLevelCondition = Rule;

export default class OpenSearchTransformer {
  private tenant_uuid: number | undefined;
  private rule: Rule | undefined;

  constructor() {}
  public setTenant(tenant_uuid: number) {
    if (Validator.isPositiveNumber(tenant_uuid)) {
      this.tenant_uuid = tenant_uuid;
    } else {
      throw "tenant_uuid must be positive integer";
    }
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
  }

  private checkValues() {
    if (!this.tenant_uuid) {
      throw new Error("tenant_uuid must be a positive integer");
    }
    if (!this.rule) {
      throw new Error("rule is required");
    }
  }

  processTheRule = (rule: any, isMain: boolean = false) => {
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
      switch (rule.operator) {
        case "containsString":
        case "equal":
          result = elasticBuilder.matchQuery(rule.fact, rule.value);
          break;
        case "notEqual":
        case "notContainString":
          result = elasticBuilder
            .boolQuery()
            .mustNot(elasticBuilder.matchQuery(rule.fact, rule.value));
          break;
        case "greaterThanRelative":
          result = elasticBuilder.rangeQuery(rule.fact).gt(rule.value);
          break;
        case "lessThanRelative":
          result = elasticBuilder.rangeQuery(rule.fact).lt(rule.value);
          break;
      }
    }

    if (isMain) {
      return elasticBuilder
        .boolQuery()
        .must([result, elasticBuilder.termQuery("_routing", this.tenant_uuid)]);
    }

    return result;
  };

  async transform() {
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
