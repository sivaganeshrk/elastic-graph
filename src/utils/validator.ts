export class Validator {
  static isNumber(val: any): boolean {
    let result = false;

    try {
      result = typeof val === "number";
    } catch (e) {
      throw e;
    }

    return result;
  }
  static isPositiveNumber(val: any): boolean {
    let result = false;

    try {
      result = this.isNumber(val) && val > 0;
    } catch (e) {
      throw e;
    }

    return result;
  }
  static isObject(val: any): boolean {
    let result = false;

    try {
      result = typeof val === "object";
    } catch (e) {
      throw e;
    }

    return result;
  }

  static isNonEmptyObject(val: any): boolean {
    let result = false;

    try {
      result = this.isObject(val) && Object.keys(val).length > 0;
    } catch (e) {
      throw e;
    }

    return result;
  }
}
