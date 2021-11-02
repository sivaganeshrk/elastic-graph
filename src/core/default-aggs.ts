import { Aggregator } from "./aggregator";
import elasticBuilder from "elastic-builder";
import { DynamicObject } from "../../Types";

const defaultAggregator: Aggregator[] = [];

defaultAggregator.push(
  new Aggregator(
    "sum",
    (name: string, fieldName: string, additionalProperties: DynamicObject) => {
      return elasticBuilder.sumAggregation(name, fieldName);
    }
  )
);

defaultAggregator.push(
  new Aggregator(
    "max",
    (name: string, fieldName: string, additionalProperties: DynamicObject) => {
      return elasticBuilder.maxAggregation(name, fieldName);
    }
  )
);

defaultAggregator.push(
  new Aggregator(
    "min",
    (name: string, fieldName: string, additionalProperties: DynamicObject) => {
      return elasticBuilder.minAggregation(name, fieldName);
    }
  )
);

defaultAggregator.push(
  new Aggregator(
    "avg",
    (name: string, fieldName: string, additionalProperties: DynamicObject) => {
      return elasticBuilder.avgAggregation(name, fieldName);
    }
  )
);

defaultAggregator.push(
  new Aggregator(
    "stats",
    (name: string, fieldName: string, additionalProperties: DynamicObject) => {
      const query = elasticBuilder.statsAggregation(name, fieldName);

      if (
        additionalProperties.hasOwnProperty("missing") &&
        additionalProperties["missing"]
      ) {
        query.missing(additionalProperties["missing"]);
      }

      return query;
    }
  )
);

export default defaultAggregator;
