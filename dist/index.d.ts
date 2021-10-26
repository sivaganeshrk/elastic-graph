import { TopLevelCondition as Rule } from "json-rules-engine";
export declare type TopLevelCondition = Rule;
export default class OpenSearchTransformer {
    private tenant_uuid;
    private rule;
    constructor();
    setTenant(tenant_uuid: number): void;
    setRule(rule: Rule): void;
    private checkValues;
    processTheRule: (rule: any, isMain?: boolean) => any;
    transform(): Promise<object>;
}
