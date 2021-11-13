import { add } from "../src/demo1";

describe("demo1", () => {
  beforeAll(async () => {
  });

  afterEach(() => {
    // jest.restoreAllMocks();
  });

  it("add", () => {
    expect(add(1, 2)).toEqual(3);
  });
});
