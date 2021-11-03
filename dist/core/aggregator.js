"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Aggregator = void 0;
var Aggregator = /** @class */ (function () {
    /**
     * Constructor
     * @param {string} name - aggregator identifier
     * @param {function(fieldName,value)} callback - query generator function
     * @param factValueValidator - optional validator for asserting the data type of the fact
     * @returns {Operator} - instance
     */
    function Aggregator(name, callback, valueValidator) {
        if (valueValidator === void 0) { valueValidator = function () { return true; }; }
        if (!name) {
            throw new Error("Missing aggregator name");
        }
        this.name = name;
        if (typeof callback !== "function") {
            throw new Error("callback must be function");
        }
        this.callback = callback;
        if (typeof valueValidator !== "function") {
            throw new Error("valueValidator must be a function");
        }
        this.valueValidator = valueValidator;
    }
    /**
     * Takes the field name, aggregator name and convert it into the aggregator based on the callback given
     * @param {string} name - aggregator name (user defined)
     * @param {string} aggregator - aggregator identifier(unique)
     * @param {string} fieldName - field name to perform the aggregator
     * @param {object} additionalProperties - Additional Properties for the query builder
     * @returns - query instance
     */
    Aggregator.prototype.generate = function (name, fieldName, additionalProperties) {
        return (this.valueValidator(name, fieldName, additionalProperties) &&
            this.callback(name, fieldName, additionalProperties));
    };
    return Aggregator;
}());
exports.Aggregator = Aggregator;
