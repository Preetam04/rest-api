import assert from "node:assert/strict";
import { before, describe, it } from "node:test";
import request from "supertest";

import { type Task } from "../../generated/prisma/browser";

import app from "../index";

const agent = request.agent(app);

// describe("POST /api/v1/task/create", () => {
//   // create task successully
//   // reject if data is invalid
//   //   should not create task  if not signed in
//   before(async () => {
//     await agent.post("/api/v1/auth/sign-in").send({
//       email: "Preetam12@gmail.com",
//       password: "Preetam1211",
//     });
//   });

//   it("It should not create task  if not signed in", async () => {

//     const response = await request(app).post("/api/v1/task/create").send({
//       title: "",
//       description: "anyting",
//     } as Task);

//     assert.equal(response.status, 401);
//   });

//   it("It should not create task  if data not Valid", async () => {
//     await agent.post("/api/v1/auth/sign-in").send({
//       email: "Preetam12@gmail.com",
//       password: "Preetam1211",
//     });

//     const response = await agent.post("/api/v1/task/create").send({
//       title: "",
//       description: "anyting",
//     } as Task);

//     assert.equal(response.status, 400);
//   });

//   it("It creates the Task if Data is Valid", async () => {
//     await agent.post("/api/v1/auth/sign-in").send({
//       email: "Preetam12@gmail.com",
//       password: "Preetam1211",
//     });

//     const response = await agent.post("/api/v1/task/create").send({
//       title: "Play a game",
//       description: "",
//     } as Task);

//     assert.equal(response.status, 201);
//   });
// });

// describe("GET /api/v1/task", () => {
//   // create task successully
//   // reject if data is invalid
//   //   should not create task  if not signed in

//   before(async () => {
//     await agent.post("/api/v1/auth/sign-in").send({
//       email: "Preetam12@gmail.com",
//       password: "Preetam1211",
//     });
//   });

//   it("It should not get Task if not logged in", async () => {
//     const response = await request(app).get("/api/v1/task/get");

//     assert.equal(response.status, 401);
//   });

//   it("It should get Task if logged in", async () => {
//     const response = await agent.get("/api/v1/task/get");

//     assert.equal(response.status, 200);
//   });
// });

// describe("GET /api/v1/task/:id", () => {
//   // create task successully
//   // reject if data is invalid
//   //   should not create task  if not signed in

//   before(async () => {
//     await agent.post("/api/v1/auth/sign-in").send({
//       email: "Preetam12@gmail.com",
//       password: "Preetam1211",
//     });
//   });

//   it("It should not get Task by id if not logged in", async () => {
//     const response = await request(app).get(
//       "/api/v1/task/get/19932cfc-8219-4fb1-9043-158306eaf244",
//     );

//     assert.equal(response.status, 401);
//   });

//   it("It should get Task by id if logged in", async () => {
//     const response = await agent.get(
//       "/api/v1/task/get/19932cfc-8219-4fb1-9043-158306eaf244",
//     );

//     assert.equal(response.status, 200);
//   });
// });

// describe("DELETE /api/v1/task/delete/:id", () => {
//   // create task successully
//   // reject if data is invalid
//   //   should not create task  if not signed in

//   before(async () => {
//     await agent.post("/api/v1/auth/sign-in").send({
//       email: "Preetam12@gmail.com",
//       password: "Preetam1211",
//     });
//   });

//   //   Cannot delete the task if not logged in
//   it("It should not create task  if not signed in", async () => {
//     const response = await request(app).delete(
//       "/api/v1/task/delete/a7ca0774-4261-4b1b-8668-e2a10a2fc2aa",
//     );

//     assert.equal(response.status, 401);
//   });

//   // cannot delete task that doesnt exist
//   it("It cannot delete task that doesnt exist", async () => {
//     const response = await agent.delete(
//       "/api/v1/task/delete/a7ca0774-4261-4b1b-8668-e2a10a2fc2a3",
//     );

//     assert.equal(response.status, 404);
//   });

//   //   delete task successfully
//   it("It deletes the task successfully", async () => {
//     const response = await agent.delete(
//       "/api/v1/task/delete/19932cfc-8219-4fb1-9043-158306eaf244",
//     );

//     assert.equal(response.status, 200);
//   });
// });

describe("UPDATE /api/v1/task/update/:id", () => {
  before(async () => {
    await agent.post("/api/v1/auth/sign-in").send({
      email: "Preetam12@gmail.com",
      password: "Preetam1211",
    });
  });

  it("It cannot update the task if not signd in", async () => {
    const response = await request(app)
      .patch("/api/v1/task/update/8c7f8cc6-8f1f-43d9-8f5e-33760c14cadc")
      .send({
        title: `Update Title`,
        description: "asdasd",
        status: "IN_PROGRESS",
      } as Task);

    assert.equal(response.status, 401);
  });

  it("It cannot update the task if it does not exists ", async () => {
    const response = await agent
      .patch("/api/v1/task/update/8c7f8cc6-8f1f-43d9-8f5e-33760c14cadd")
      .send({
        title: `Update Title`,
        description: "asdasd",
        status: "IN_PROGRESS",
      } as Task);

    assert.equal(response.status, 404);
  });

  it("it cannot update the task if data format not valid ", async () => {
    const response = await agent
      .patch("/api/v1/task/update/8c7f8cc6-8f1f-43d9-8f5e-33760c14cadc")
      .send({
        title: `Update Title`,
        description: "asdasd",
        status: "INPROGRESS",
      });

    assert.equal(response.status, 400);
  });

  it("User updates his own tasks ", async () => {
    const response = await agent
      .patch("/api/v1/task/update/8c7f8cc6-8f1f-43d9-8f5e-33760c14cadc")
      .send({
        // title: `Update Title 343`,
        description: "lorem ipsum",
        status: "IN_PROGRESS",
      } as Task);

    console.log(response.body);

    assert.equal(response.status, 200);
  });
});
