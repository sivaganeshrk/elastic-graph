"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Operator = void 0;
var Operator = /** @class */ (function () {
    /**
     * Constructor
     * @param {string} name - operator identifier
     * @param {function(fieldName,value)} callback - query generator function
     * @param factValueValidator - optional validator for asserting the data type of the fact
     * @returns {Operator} - instance
     */
    function Operator(name, callback, factValueValidator) {
        if (factValueValidator === void 0) { factValueValidator = function () { return true; }; }
        if (!name)
            throw new Error("Missing operator name");
        this.name = String(name);
        if (typeof callback !== "function")
            throw new Error("callback must be a function");
        this.callback = callback;
        this.factValueValidator = factValueValidator;
    }
    /**
     * Takes the field name and value and convert it into the query based on the callback given
     * @param {any} fieldName - field name
     * @param {any} value - value
     * @param {object} additionalProperties - Additional Properties for the query builder
     * @returns - query instance
     */
    Operator.prototype.generate = function (fieldName, value, additionalProperties) {
        return (this.factValueValidator(fieldName, value, additionalProperties) &&
            this.callback(fieldName, value, additionalProperties));
    };
    return Operator;
}());
exports.Operator = Operator;
