import { DynamicObject } from "../Types";
export declare class Operator {
    name: string;
    callback: Function;
    factValueValidator: Function;
    /**
     * Constructor
     * @param {string} name - operator identifier
     * @param {function(fieldName,value)} callback - query generator function
     * @param factValueValidator - optional validator for asserting the data type of the fact
     * @returns {Operator} - instance
     */
    constructor(name: string, callback: Function, factValueValidator?: Function);
    /**
     * Takes the field name and value and convert it into the query based on the callback given
     * @param {any} fieldName - field name
     * @param {any} value - value
     * @param {object} additionalProperties - Additional Properties for the query builder
     * @returns - query instance
     */
    generate(fieldName: string, value: any, additionalProperties: DynamicObject): any;
}
