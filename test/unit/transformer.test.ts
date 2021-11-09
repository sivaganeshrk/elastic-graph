import { expect } from "chai";
import Transformer from "../../src";

describe("json to search Query Transformer Test", () => {
  it("simple query with default operator", () => {
    const transformer = new Transformer();
    const query = transformer
      .setRule({
        all: [{ fact: "fact-1", operator: "equal", value: "testdata" }],
      })
      .toJson();

    expect(query).to.deep.equal({
      query: { bool: { must: { term: { "fact-1": "testdata" } } } },
    });
  });

  it("simple query with default operator and routing", () => {
    const transformer = new Transformer();
    const query = transformer
      .setRoutingValue(10)
      .setRule({
        all: [{ fact: "fact-1", operator: "equal", value: "testdata" }],
      })
      .toJson();
    expect(query).to.deep.equal({
      query: {
        bool: {
          must: [
            { bool: { must: { term: { "fact-1": "testdata" } } } },
            { term: { _routing: 10 } },
          ],
        },
      },
    });
  });
  it("simple query with form and size 0", () => {
    const transformer = new Transformer();
    const query = transformer
      .setRule({
        all: [{ fact: "fact-1", operator: "equal", value: "testdata" }],
      })
      .offset(0)
      .limit(0)
      .toJson();

    expect(query).to.deep.equal({
      from: 0,
      query: {
        bool: {
          must: {
            term: {
              "fact-1": "testdata",
            },
          },
        },
      },
      size: 0,
    });
  });
  it("simple query with form and size 10", () => {
    const transformer = new Transformer();
    const query = transformer
      .setRule({
        all: [{ fact: "fact-1", operator: "equal", value: "testdata" }],
      })
      .offset(10)
      .limit(10)
      .toJson();

    expect(query).to.deep.equal({
      from: 10,
      query: {
        bool: {
          must: {
            term: {
              "fact-1": "testdata",
            },
          },
        },
      },
      size: 10,
    });
  });
});
