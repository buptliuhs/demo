import { add } from "../src/demo1";
import * as faker from "faker";

describe("demo1", () => {
  it("add", () => {
    const n1 = faker.datatype.number();
    const n2 = faker.datatype.number();
    expect(add(n1, n2)).toEqual(n1 + n2);
  });
});
