import {App} from "../../src/main";

describe("Should test the main file", () => {
    let app: App = App.getInstance();

  it("should return a new app instance", () => {
    expect(app).toBeDefined();
  });

});

