import { DynamicObject } from "../Types";
export declare class Aggregator {
    name: string;
    callback: Function;
    valueValidator: Function;
    /**
     * Constructor
     * @param {string} name - aggregator identifier
     * @param {function(fieldName,value)} callback - query generator function
     * @param factValueValidator - optional validator for asserting the data type of the fact
     * @returns {Operator} - instance
     */
    constructor(name: string, callback: Function, valueValidator?: Function);
    /**
     * Takes the field name, aggregator name and convert it into the aggregator based on the callback given
     * @param {string} name - aggregator name (user defined)
     * @param {string} aggregator - aggregator identifier(unique)
     * @param {string} fieldName - field name to perform the aggregator
     * @param {object} additionalProperties - Additional Properties for the query builder
     * @returns - query instance
     */
    generate(name: string, fieldName: string, additionalProperties: DynamicObject): any;
}
