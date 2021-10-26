import OpenSearchTransformer, { TopLevelCondition } from "../index";

const transformer = new OpenSearchTransformer();

transformer.setTenant(1);
const rule: TopLevelCondition = {
  all: [
    { fact: "name", operator: "equal", value: "siva" },
    { fact: "age", operator: "equal", value: 21 },
  ],
};
try {
  transformer.setRule(rule);
} catch (error) {
  // console.log(error);
}

transformer.transform().then((data) => {
  console.log(data);
  console.log(JSON.stringify(data));
});
