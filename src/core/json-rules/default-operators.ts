import { Operator } from "./operator";
import elasticBuilder from "elastic-builder";
import { DateTime } from "luxon";
import { DynamicObject } from "../../Types/index";

const defaultOperator: Operator[] = [];

const formateDateRelative = (seconds: number, format: string = "x") => {
  return DateTime.now().minus({ seconds: seconds }).toFormat(format);
};

// match exact string
defaultOperator.push(
  new Operator(
    "equal",
    (
      fieldName: string,
      value: string,
      additionalProperties: DynamicObject = {}
    ) => {
      return elasticBuilder.termQuery(fieldName, value);
    }
  )
);

// check for the value contains the given string
defaultOperator.push(
  new Operator(
    "containsString",
    (
      fieldName: string,
      value: {},
      additionalProperties: DynamicObject = {}
    ) => {}
  )
);

// match exact string
defaultOperator.push(
  new Operator(
    "is",
    (
      fieldName: string,
      value: string,
      additionalProperties: DynamicObject = {}
    ) => {
      return elasticBuilder.termQuery(fieldName, value);
    }
  )
);

// check the value is null
defaultOperator.push(
  new Operator(
    "blank",
    (
      fieldName: string,
      value: string = "NULL",
      additionalProperties: DynamicObject = {}
    ) => {
      return elasticBuilder.termQuery(fieldName, value);
    }
  )
);

defaultOperator.push(
  new Operator(
    "notEqual",
    (
      fieldName: string,
      value: string,
      additionalProperties: DynamicObject = {}
    ) => {
      return elasticBuilder
        .boolQuery()
        .mustNot(elasticBuilder.termQuery(fieldName, value));
    }
  )
);

defaultOperator.push(
  new Operator(
    "notContainsString",
    (
      fieldName: string,
      value: string,
      additionalProperties: DynamicObject = {}
    ) => {
      return elasticBuilder
        .boolQuery()
        .mustNot(elasticBuilder.matchQuery(fieldName, value));
    }
  )
);

defaultOperator.push(
  new Operator(
    "notBlank",
    (
      fieldName: string,
      value: string = "NULL",
      additionalProperties: DynamicObject = {}
    ) => {
      return elasticBuilder
        .boolQuery()
        .mustNot(elasticBuilder.termQuery(fieldName, value));
    }
  )
);

defaultOperator.push(
  new Operator(
    "greaterThanAbsolute",
    (
      fieldName: string,
      value: string | number,
      additionalProperties: DynamicObject = {}
    ) => {
      return elasticBuilder.rangeQuery(fieldName).gt(value);
    }
  )
);

defaultOperator.push(
  new Operator(
    "lessThanAbsolute",
    (
      fieldName: string,
      value: string | number,
      additionalProperties: DynamicObject = {}
    ) => {
      return elasticBuilder.rangeQuery(fieldName).lt(value);
    }
  )
);

defaultOperator.push(
  new Operator(
    "equalAbsolute",
    (
      fieldName: string,
      value: string | number,
      additionalProperties: DynamicObject = {}
    ) => {
      return elasticBuilder.termQuery(fieldName, value);
    }
  )
);

defaultOperator.push(
  new Operator(
    "greaterThanRelative",
    (
      fieldName: string,
      value: number,
      additionalProperties: DynamicObject = {}
    ) => {
      return elasticBuilder
        .rangeQuery(fieldName)
        .gt(formateDateRelative(value, additionalProperties["formate"]));
    }
  )
);

defaultOperator.push(
  new Operator(
    "lessThanRelative",
    (
      fieldName: string,
      value: number,
      additionalProperties: DynamicObject = {}
    ) => {
      return elasticBuilder
        .rangeQuery(fieldName)
        .lt(formateDateRelative(value, additionalProperties["formate"]));
    }
  )
);

defaultOperator.push(
  new Operator(
    "equalRelative",
    (
      fieldName: string,
      value: number,
      additionalProperties: DynamicObject = {}
    ) => {
      return elasticBuilder.termQuery(
        fieldName,
        formateDateRelative(value, additionalProperties.format)
      );
    }
  )
);

defaultOperator.push(
  new Operator(
    "notEqualRelative",
    (
      fieldName: string,
      value: number,
      additionalProperties: DynamicObject = {}
    ) => {
      return elasticBuilder
        .boolQuery()
        .mustNot(
          elasticBuilder.termQuery(
            fieldName,
            formateDateRelative(value, additionalProperties["formate"])
          )
        );
    }
  )
);
export default defaultOperator;
