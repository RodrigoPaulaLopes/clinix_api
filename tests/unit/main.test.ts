import {App} from "../../src/main";

describe("Should test the main file", () => {
    let app: App = new App(3000);

  it("should return a new app instance", () => {
    expect(app).toBeDefined();
  });


});

