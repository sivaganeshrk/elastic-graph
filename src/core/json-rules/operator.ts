export default class Operator {
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
  constructor(
    name: string,
    callback: Function,
    factValueValidator: Function = () => true
  ) {
    if (!name) throw new Error("Missing operator name");
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
   * @returns - query instance
   */
  generate(fieldName: any, value: any) {
    return (
      this.factValueValidator(fieldName, value) &&
      this.callback(fieldName, value)
    );
  }
}
