import { TopLevelCondition as Rule } from "json-rules-engine";
export declare type TopLevelCondition = Rule;
export default class OpenSearchTransformer {
    private tenant_uuid;
    private rule;
    constructor();
    setTenant(tenant_uuid: number): this;
    setRule(rule: Rule): this;
    private checkValues;
    private processTheRule;
    transform(): Promise<object>;
}
