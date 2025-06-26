import {App} from "../src/main";

describe("Should test the main file", () => {
    const app: App = App.getInstance();

  it.skip("should return a new app instance", () => {
    expect(app).toBeDefined();
  });

});

