const { testServer } = require("../jest.setup");

describe("Get all projects", () => {
  it("Should return all projects", async () => {
    const response = await testServer.get("/nao-existe");

    console.log(response.statusCode);
  });
});
