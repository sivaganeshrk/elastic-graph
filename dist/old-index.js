"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("./utils");
var json_rules_engine_1 = require("json-rules-engine");
var elastic_builder_1 = __importDefault(require("elastic-builder"));
var OpenSearchTransformer = /** @class */ (function () {
    function OpenSearchTransformer() {
        var _this = this;
        this.processTheRule = function (rule, isMain) {
            if (isMain === void 0) { isMain = false; }
            var result = null;
            var ruleKey = Object.keys(rule);
            if (ruleKey.includes("any") || ruleKey.includes("all")) {
                var output = [];
                // @ts-ignore
                for (var _i = 0, _a = rule[ruleKey]; _i < _a.length; _i++) {
                    var data = _a[_i];
                    output.push(_this.processTheRule(data));
                }
                if (!output.includes(null)) {
                    switch (ruleKey[0]) {
                        case "all":
                            result = elastic_builder_1.default.boolQuery().must(output);
                            break;
                        case "any":
                            result = elastic_builder_1.default.boolQuery().should(output);
                            break;
                    }
                }
            }
            else {
                switch (rule.operator) {
                    case "containsString":
                    case "equal":
                        result = elastic_builder_1.default.matchQuery(rule.fact, rule.value);
                        break;
                    case "notEqual":
                    case "notContainString":
                        result = elastic_builder_1.default
                            .boolQuery()
                            .mustNot(elastic_builder_1.default.matchQuery(rule.fact, rule.value));
                        break;
                    case "greaterThanRelative":
                        result = elastic_builder_1.default.rangeQuery(rule.fact).gt(rule.value);
                        break;
                    case "lessThanRelative":
                        result = elastic_builder_1.default.rangeQuery(rule.fact).lt(rule.value);
                        break;
                }
            }
            if (isMain) {
                return elastic_builder_1.default
                    .boolQuery()
                    .must([result, elastic_builder_1.default.termQuery("_routing", _this.tenant_uuid)]);
            }
            return result;
        };
    }
    OpenSearchTransformer.prototype.setTenant = function (tenant_uuid) {
        if (utils_1.Validator.isPositiveNumber(tenant_uuid)) {
            this.tenant_uuid = tenant_uuid;
        }
        else {
            throw "tenant_uuid must be positive integer";
        }
        return this;
    };
    OpenSearchTransformer.prototype.setRule = function (rule) {
        if (utils_1.Validator.isNonEmptyObject(rule)) {
        }
        else {
            throw "rule must be a non empty object";
        }
        try {
            var engine = new json_rules_engine_1.Engine();
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
        }
        catch (error) {
            throw error;
        }
        this.rule = rule;
        return this;
    };
    OpenSearchTransformer.prototype.checkValues = function () {
        if (!this.tenant_uuid) {
            throw new Error("tenant_uuid must be a positive integer");
        }
        if (!this.rule) {
            throw new Error("rule is required");
        }
    };
    OpenSearchTransformer.prototype.transform = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                    this.checkValues();
                }
                catch (error) {
                    throw error;
                }
                return [2 /*return*/, elastic_builder_1.default
                        .requestBodySearch()
                        .query(this.processTheRule(this.rule, true))
                        .toJSON()];
            });
        });
    };
    return OpenSearchTransformer;
}());
exports.default = OpenSearchTransformer;
