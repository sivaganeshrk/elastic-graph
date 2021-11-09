## elastic-graph

A lightweight query builder for Elastic Search and OpenSearch. You can convert a simple JSON Rule built with the popular JSON Rule Engine library and turn into a valid Elastic Search query.<br/>
<br/>
**_Supports_**

- And / OR conditions
- Nested conditions
- Offsets / pagination
- Basic Aggregations
- Custom operators
- Custom Aggregators
- and more

Inspired By:
**[json-rules-engine](https://github.com/CacheControl/json-rules-engine)**
**[elastic-builder](https://github.com/sudo-suhas/elastic-builder)**

## Basic Example

> use toJson function to convert the query to the json

```js
import QueryBuilder from 'elastic-graph'

// Initialize the class
const queryBuilder = new QueryBuilder()

// Usage
queryBuilder.setRule({
  all:[
    any:[
      {fact:"field-1",operator:"equal",value:"value-1"}
      {fact:"field-2",operator:"nonEqual",value:"value-2"}
    ],
    all:[
      {fact:"field-3",operator:"lessThanRelative",value:"3",additionalProperties:{
        format:"X" // format uses the luxon time formate
      }}
    ]
  ]
}).toJson()
```

## Methods

- #### constructor

```js
import QueryBuilder from "elastic-graph";

const queryBuilder = new QueryBuilder();
```

- #### addOperator(operatorName:string,callback:Function)

```js
queryBuilder.addOperator(
  "newOperator",
  (fact: string, value: any, additionalProperties: DynamicObject) => {
    return elasticBuilder.matchQuery(fact, value);
  }
);
```

- #### removeOperator(operatorName:string)

```js
queryBuilder.addOperator(
  "newOperator",
  (fact: string, value: any, additionalProperties: DynamicObject) => {
    return elasticBuilder.matchQuery(fact, value);
  }
);

queryBuilder.removeOperator("newOperator");
```

- #### addAggregator(aggregatorName:string,callback:Function)

```js
queryBuilder.addAggregator(
  "newAggregator",
  (name: string, fieldName: any, additionalProperties: DynamicObject) => {
    return elasticBuilder.sumAggregation(name, fieldName);
  }
);
```

- #### removeAggregator(aggregatorName:string)

```js
queryBuilder.addAggregator(
  "newAggregator",
  (name: string, fieldName: any, additionalProperties: DynamicObject) => {
    return elasticBuilder.sumAggregation(name, fieldName);
  }
);

queryBuilder.removeAggregator("newAggregator");
```

- #### setRoutingValue(value:string|number)
  setRouting set the query routing value

```js
queryBuilder.setRoutingValue("user1");
```

- #### setRule(rule:TopLevelCondition)

```js
queryBuilder.setRule({
  all: [{ fact: "field", operator: "equal", value: "value" }],
});
```

- #### offset(value:number)
  skips the give value of records from the query result

```js
queryBuilder.offset(10);
```

- #### limit(value:number)
  gets the given number of records

```js
queryBuilder.limit(10);
```

- #### toJson()
  convert the query to json

```js
queryBuilder.setRoutingValue("user1").offset(10).limit(10)setRule({
  all: [{ fact: "field", operator: "equal", value: "value" }],
}).toJson();
```

- #### setAggregator(value:AggregatorRule[])

```js
queryBuilder.setAggregator([
  { name: "aggregator1", aggregator: "sum", fieldName: "field-1" },
]);
```

- #### sum(aggregatorName:string,fieldName:string) or sum(value:AggregatorInput[])

```js
queryBuilder.sum("aggregator-sum", "field-2");
// or
queryBuilder.sum([{ name: "aggregator-sum", fieldName: "field-2" }]);
```

- #### avg(aggregatorName:string,fieldName:string) or avg(value:AggregatorInput[])

```js
queryBuilder.avg("aggregator-avg", "field-2");
// or
queryBuilder.avg([{ name: "aggregator-avg", fieldName: "field-2" }]);
```

- #### max(aggregatorName:string,fieldName:string) or max(value:AggregatorInput[])

```js
queryBuilder.max("aggregator-max", "field-2");
// or
queryBuilder.max([{ name: "aggregator-max", fieldName: "field-2" }]);
```

- #### min(aggregatorName:string,fieldName:string) or min(value:AggregatorInput[])

```js
queryBuilder.min("aggregator-min", "field-2");
// or
queryBuilder.min([{ name: "aggregator-min", fieldName: "field-2" }]);
```

- #### sort(fieldName:string,order:"asc"|"desc" = "asc") or sort(value:Sort[])

```js
queryBuilder.sort("field-2", "desc").sort("field-3", "desc");
// or
queryBuilder.sort([
  { name: "field-2", order: "desc" },
  { name: "field-3", order: "desc" },
]);
```

## json format

- #### setRule
  json structure

```js
{
  "fact": "field-name",
  "operator": "operator Identifier",
  "value": "value",
  "additionalProperties": {
    // Additional properties for the query
  }
}
```

setRule

```js
queryBuilder.setRule({
  all:[
    {{
  "fact":"field-name",
  "operator":"operator Identifier",
  "value":"value",
  "additionalProperties":{
    // Additional properties for the query
  }
}}
  ]
})
```

- setAggregator
  json format

  ```js
  {
    "name": "aggregator name",
    "aggregator": "aggregator identifier",
    "fieldName": "name of the field aggregation to be performed",
    "additionalProperties":{
      // Additional Properties for the aggregator
    }
  }
  ```

## Default operators

- #### equal
  sample Rule object
  ```json
  {
    "fact": "fieldName",
    "operator": "equal",
    "value": "value"
  }
  ```
  equal uses term query
- #### containsString
  sample Rule object
  ```json
  {
    "fact": "fieldName",
    "operator": "containsString",
    "value": "value"
  }
  ```
  containsString uses match query
- #### blank
  sample Rule object
  ```json
  {
    "fact": "fieldName",
    "operator": "equal",
    "value": "value"
  }
  ```
  in value give the null replacement value given in the search Database
  blank uses term query
- #### notEqual
  sample Rule object
  ```json
  {
    "fact": "fieldName",
    "operator": "notEqual",
    "value": "value"
  }
  ```
  notEqual uses term query
- #### notContainsString
  sample Rule object
  ```json
  {
    "fact": "fieldName",
    "operator": "notContainsString",
    "value": "value"
  }
  ```
  notContainsString uses match query
- #### notBlank
  sample Rule object
  ```json
  {
    "fact": "fieldName",
    "operator": "notBlank",
    "value": "value"
  }
  ```
  check for the field value is not null
- #### greaterThanAbsolute
  sample Rule object
  ```json
  {
    "fact": "fieldName",
    "operator": "greaterThanAbsolute",
    "value": "value"
  }
  ```
  greaterThanAbsolute uses the range query
- #### lessThanAbsolute
  sample Rule object
  ```json
  {
    "fact": "fieldName",
    "operator": "lessThanAbsolute",
    "value": "value"
  }
  ```
  lessThanAbsolute uses the range query
- #### greaterThanRelative
  sample Rule object
  ```json
  {
    "fact": "fieldName",
    "operator": "greaterThanRelative",
    "value": "value",
    "additionalProperties": {
      "format": "yyyy"
    }
  }
  ```
  greaterThanRelative uses the range query, But there is a preprocessing it convert to the given [format(uses luxon time formatting)](https://moment.github.io/luxon/#/formatting?id=table-of-tokens)
- #### lessThanRelative
  sample Rule object
  ```json
  {
    "fact": "fieldName",
    "operator": "lessThanRelative",
    "value": "value",
    "additionalProperties": {
      "format": "yyyy"
    }
  }
  ```
  lessThanRelative uses the range query, But there is a preprocessing it convert to the given [format(uses luxon time formatting)](https://moment.github.io/luxon/#/formatting?id=table-of-tokens)
- #### notEqualRelative
  sample Rule object
  ```json
  {
    "fact": "fieldName",
    "operator": "notEqualRelative",
    "value": "value",
    "additionalProperties": {
      "format": "yyyy"
    }
  }
  ```
  notEqualRelative uses the range query, But there is a preprocessing it convert to the given [format(uses luxon time formatting)](https://moment.github.io/luxon/#/formatting?id=table-of-tokens)

## Default Aggregator

- #### sum

  **usage**
  sum aggregator is added as native function

  ```js
  //for single sum aggregator
  queryBuilder.sum("aggregatorName", "fieldName");
  // or
  //for multiple sum aggregator
  queryBuilder.sum([
    { name: "aggregator-1", fieldName: "field-1" },
    { name: "aggregator-2", fieldName: "field-2" },
  ]);
  ```

- #### max

  **usage**
  max aggregator is added as native function

  ```js
  //for single max aggregator
  queryBuilder.max("aggregatorName", "fieldName");
  // or
  //for multiple max aggregator
  queryBuilder.max([
    { name: "aggregator-1", fieldName: "field-1" },
    { name: "aggregator-2", fieldName: "field-2" },
  ]);
  ```

- #### min

  **usage**
  sum aggregator is added as native function

  ```js
  //for single min aggregator
  queryBuilder.min("aggregatorName", "fieldName");
  // or
  //for multiple min aggregator
  queryBuilder.min([
    { name: "aggregator-1", fieldName: "field-1" },
    { name: "aggregator-2", fieldName: "field-2" },
  ]);
  ```

- #### avg

  **usage**
  avg aggregator is added as native function

  ```js
  //for single avg aggregator
  queryBuilder.avg("aggregatorName", "fieldName");
  // or
  //for multiple avg aggregator
  queryBuilder.avg([
    { name: "aggregator-1", fieldName: "field-1" },
    { name: "aggregator-2", fieldName: "field-2" },
  ]);
  ```

## How to Add Custom Operator

To add custom operator user addOperator function it take two argument operator initializer and callback (callback must return the instance of elasticBuilder )

elasticBuilder -> elastic-builder [see reference](https://elastic-builder.js.org/docs/#queries)

```js
import QueryBuilder, { DynamicObject, elasticBuilder } from "elastic-graph";

const queryBuilder = new QueryBuilder();

queryBuilder.addOperator(
  "newOperator",
  (fact: string, value: any, additionalProperties: DynamicObject) => {
    return elasticBuilder.matchQuery(fact, value);
  }
);

queryBuilder
  .setRule({
    all: [{ fact: "fieldName", operator: "newOperator", value: "test" }],
  })
  .toJson();
```

## How to Add Custom Aggregator

To add custom aggregator use addAggregator function it take two argument aggregator initializer and callback (callback must return the instance of elasticBuilder )

elasticBuilder -> elastic-builder [see reference](https://elastic-builder.js.org/docs/#aggregations)

```js
import QueryBuilder, { DynamicObject, elasticBuilder } from "elastic-graph";

const queryBuilder = new QueryBuilder();

queryBuilder.addAggregator(
  "newAggregator",
  (name: string, fieldName: any, additionalProperties: DynamicObject) => {
    return elasticBuilder.sumAggregation(name, fieldName);
  }
);

queryBuilder
  .setAggregatorRule([
    {
      name: "aggregatorName",
      aggregator: "newAggregator",
      fieldName: "fieldName",
    },
  ])
  .toJson();
```
