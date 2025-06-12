"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const main_1 = require("../../src/main");
describe("Should test the main file", () => {
    let app = main_1.App.getInstance();
    it("should return a new app instance", () => {
        expect(app).toBeDefined();
    });
});
