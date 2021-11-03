export declare type DynamicObject = {
    [key: string]: any;
};
export interface ConditionProperties {
    fact: string;
    operator: string;
    value: any;
    additionalProperties?: object;
    path?: string;
    priority?: number;
    params?: Record<string, any>;
}
export declare type NestedCondition = ConditionProperties | TopLevelCondition;
declare type AllConditions = {
    all: NestedCondition[];
};
declare type AnyConditions = {
    any: NestedCondition[];
};
export declare type TopLevelCondition = AllConditions | AnyConditions;
export interface AggregatorRule {
    name: string;
    aggregator: string;
    fieldName: string;
    additionalProperties?: DynamicObject;
}
export interface AggregatorInput {
    fieldName: string;
    name: string;
}
export interface Sort {
    fieldName: string;
    order: "desc" | "asc";
}
export {};
