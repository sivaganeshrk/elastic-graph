import OpenSearchTransformer, { TopLevelCondition } from "../index";

const transformer = new OpenSearchTransformer();

const rule: TopLevelCondition = {
  all: [
    { fact: "name", operator: "equal", value: "siva" },
    { fact: "age", operator: "equal", value: 21 },
  ],
};

transformer
  .setTenant(1)
  .setRule(rule)
  .transform()
  .then((data) => {
    console.log(JSON.stringify(data));
  });
