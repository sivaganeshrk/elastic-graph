export type DynamicObject = {
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

export type NestedCondition = ConditionProperties | TopLevelCondition;
type AllConditions = { all: NestedCondition[] };
type AnyConditions = { any: NestedCondition[] };
export type TopLevelCondition = AllConditions | AnyConditions;
