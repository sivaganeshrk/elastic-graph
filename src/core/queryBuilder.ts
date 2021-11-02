import { Sort } from "elastic-builder";
import { AggregatorRule, TopLevelCondition } from "../Types";
import { Aggregator } from "./aggregator";
import { Operator } from "./operator";

export class QueryBuilder {
  private operators: Operator[];
  private aggregators: Aggregator[];
  private queryRule: TopLevelCondition;
  private aggregatorRule: AggregatorRule[] | null;
  private sortRule: Sort[] | null;
  private from: number | null;
  private size: number | null;
  /**
   *
   * @param {Operator[]} operators - array of default operators and user defined operators
   * @param aggregator - array of default aggregators and user defined aggregators
   * @param queryRule - user entered query rule
   * @param aggregatorRule - user entered aggregator rule
   * @param sortRule - user entered sortRules
   */
  constructor(
    operators: Operator[],
    aggregator: Aggregator[],
    queryRule: TopLevelCondition,
    aggregatorRule: AggregatorRule[] | null,
    sortRule: Sort[] | null,
    from: number | null,
    size: number | null
  ) {
    this.operators = operators;
    this.aggregators = aggregator;
    this.queryRule = queryRule;
    this.aggregatorRule = aggregatorRule;
    this.sortRule = sortRule;
    this.from = from;
    this.size = size;
  }
}
