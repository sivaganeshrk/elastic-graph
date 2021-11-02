import { AggregatorRule, TopLevelCondition, Sort } from "../Types";
import { Aggregator } from "./aggregator";
import { Operator } from "./operator";
import elasticBuilder from "elastic-builder";
export class QueryBuilder {
  private operators: Map<string, Operator>;
  private aggregators: Map<string, Aggregator>;
  private queryRule: TopLevelCondition | null;
  private aggregatorRule: AggregatorRule[] | null = [];
  private sortRule: Sort[] | null = [];
  private from: number | null = null;
  private size: number | null = null;
  private _routingValue: number | string | null = null;
  /**
   *
   * @param {Operator[]} operators - array of default operators and user defined operators
   * @param aggregator - array of default aggregators and user defined aggregators
   * @param queryRule - user entered query rule
   * @param aggregatorRule - user entered aggregator rule
   * @param sortRule - user entered sortRules
   */
  constructor(
    operators: Map<string, Operator>,
    aggregator: Map<string, Aggregator>,
    queryRule: TopLevelCondition | null,
    aggregatorRule: AggregatorRule[],
    sortRule: Sort[],
    routingValue: string | number | null,
    from: number | null,
    size: number | null
  ) {
    this.operators = operators;
    this.aggregators = aggregator;
    this.queryRule = queryRule;
    this.aggregatorRule = aggregatorRule;
    this.sortRule = sortRule;
    this._routingValue = routingValue;
    this.from = from;
    this.size = size;
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
    if (!this.queryRule) {
      throw new Error("rule is required");
    }
  }

  queryBuilder() {
    try {
      this.checkValues();
    } catch (error) {
      throw error;
    }
    const query = elasticBuilder.requestBodySearch();

    if (this.queryRule) {
      query.query(this.processTheRule(this.queryRule, true));
    }

    if (this.from && this.from > 0) {
      query.from(this.from);
    }

    if (this.size && this.size > 0) {
      query.size(this.size);
    }

    if (this.sortRule && this.sortRule.length > 0) {
      for (const sort of this.sortRule) {
        query.sort(elasticBuilder.sort(sort.fieldName, sort.order));
      }
    }

    if (this.aggregatorRule && this.aggregatorRule.length > 0) {
      let aggregatorResult = [];
      for (const aggregator of this.aggregatorRule) {
        const aggregatorExecuter = this.aggregators.get(aggregator.aggregator);
        aggregatorResult.push(
          aggregatorExecuter?.generate(
            aggregator.name,
            aggregator.fieldName,
            aggregator.additionalProperties ?? {}
          )
        );
      }

      query.aggregations(aggregatorResult);
    }

    return query;
  }

  public buildQuery() {}
}
