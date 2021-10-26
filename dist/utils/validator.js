"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Validator = void 0;
var Validator = /** @class */ (function () {
    function Validator() {
    }
    Validator.isNumber = function (val) {
        var result = false;
        try {
            result = typeof val === "number";
        }
        catch (e) {
            throw e;
        }
        return result;
    };
    Validator.isPositiveNumber = function (val) {
        var result = false;
        try {
            result = this.isNumber(val) && val > 0;
        }
        catch (e) {
            throw e;
        }
        return result;
    };
    Validator.isObject = function (val) {
        var result = false;
        try {
            result = typeof val === "object";
        }
        catch (e) {
            throw e;
        }
        return result;
    };
    Validator.isNonEmptyObject = function (val) {
        var result = false;
        try {
            result = this.isObject(val) && Object.keys(val).length > 0;
        }
        catch (e) {
            throw e;
        }
        return result;
    };
    return Validator;
}());
exports.Validator = Validator;
