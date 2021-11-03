import { AggregatorRule, TopLevelCondition, Sort } from "../Types";
import { Aggregator } from "./aggregator";
import { Operator } from "./operator";
import elasticBuilder from "elastic-builder";
export declare class QueryBuilder {
    private operators;
    private aggregators;
    private queryRule;
    private aggregatorRule;
    private sortRule;
    private from;
    private size;
    private _routingValue;
    /**
     *
     * @param {Operator[]} operators - array of default operators and user defined operators
     * @param aggregator - array of default aggregators and user defined aggregators
     * @param queryRule - user entered query rule
     * @param aggregatorRule - user entered aggregator rule
     * @param sortRule - user entered sortRules
     */
    constructor(operators: Map<string, Operator>, aggregator: Map<string, Aggregator>, queryRule: TopLevelCondition | null, aggregatorRule: AggregatorRule[], sortRule: Sort[], routingValue: string | number | null, from: number | null, size: number | null);
    private processTheRule;
    private checkValues;
    queryBuilder(): elasticBuilder.RequestBodySearch;
    buildQuery(): void;
}
