import { Operator } from "./operator";
import { AggregatorInput, AggregatorRule, DynamicObject, Sort, TopLevelCondition } from "../Types";
import { Aggregator } from "./aggregator";
export default class Transformer {
    private operators;
    private aggregator;
    private _routingValue;
    private rule;
    private aggregatorRule;
    private sortRule;
    private _from;
    private _size;
    constructor();
    /**
     * Add a custom operator definition
     * @param {string} operatorName - operator identifier
     * @param {function(fieldName,value,additionalProperties)} callback - the method to execute when the operator is encountered
     */
    addOperator(operatorName: string | Operator, callback: (fieldName: string, value: any, additionProperties: DynamicObject) => any): this;
    /**
     * Remove a custom operator definition
     * @param operatorName - operator identifier
     */
    removeOperator(operatorName: string): this;
    /**
     * Add a custom aggregator definition
     * @param {string} aggregatorName - aggregator identifier
     * @param {function(name,fieldName,additionalProperties)} callback - the method to execute when the aggregator is encountered
     */
    addAggregator(aggregatorName: string | Aggregator, callback: (name: string, fieldName: string, additionalProperties: DynamicObject) => any): this;
    /**
     * Remove a custom aggregator definition
     * @param operatorName - aggregator identifier
     */
    removeAggregator(aggregatorName: string): this;
    /**
     * Set Routing Value For the query
     * @param routingValue - routing value
     *
     */
    setRoutingValue(routingValue: string | number): this;
    /**
     * setRule
     * @param rule - json-rules-engine rule format
     */
    setRule(rule: TopLevelCondition): this;
    /**
     * Set offset value for the query
     * @param {number} value - offset value
     */
    offset(value: number): this;
    /**
     * Set limit value for the query
     * @param value - limit value
     */
    limit(value: number): this;
    /**
     * Build a query based on the user given input
     * @returns {object} the builded search query
     */
    toJson(): object;
    setAggregator(aggregator: AggregatorRule[]): this;
    private aggsWrapper;
    /**
     * Sum Aggregator
     * @param {string | AggregatorInput[]} name - name of the aggregator
     * @param {string} fieldName - field name the aggregator to be performed
     */
    sum(name: string | AggregatorInput[], fieldName?: string): this;
    /**
     * Avg Aggregator [reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-metrics-avg-aggregation.html)
     * @param {string | AggregatorInput[]} name - name of the aggregator
     * @param {string} fieldName - field name the aggregator to be performed
     */
    avg(name: string | AggregatorInput[], fieldName?: string): this;
    /**
     * Max Aggregator
     * [reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-metrics-max-aggregation.html)
     * @param {string | AggregatorInput[]} name - name of the aggregator
     * @param {string} fieldName - field name the aggregator to be performed
     */
    max(name: string | AggregatorInput[], fieldName?: string): this;
    /**
     * Min Aggregator [reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-metrics-min-aggregation.html)
     * @param {string | AggregatorInput[]} name - name of the aggregator
     * @param {string} fieldName - field name the aggregator to be performed
     */
    min(name: string | AggregatorInput[], fieldName?: string): this;
    /**
     * sort
     * @param {string | Sort[]} fieldName - field name
     * @param {"asc"|"desc"} order - order "asc" or "desc"
     */
    sort(fieldName: string | Sort[], order?: "asc" | "desc"): this;
}
