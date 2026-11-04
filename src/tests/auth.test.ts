// import assert from "node:assert/strict";
// import { describe, it } from "node:test";
// import request from "supertest";

// import app from "../index";

// describe("POST /api/v1/auth/sign-up", () => {
//   const randomEmail = `luffy${(Math.random() * 10000).toFixed(3)}@gmail.com`;

//   it("It should register user with valid credentials", async () => {
//     const response = await request(app).post("/api/v1/auth/sign-up").send({
//       username: "Luffy",
//       email: randomEmail,
//       password: "luffy1211",
//     });

//     assert.equal(response.status, 201);
//   });

//   it("It should not register user without valid email", async () => {
//     const response = await request(app).post("/api/v1/auth/sign-up").send({
//       email: "asdasd",
//       password: "asdasdasdasd",
//       username: "ksdfkd",
//     });

//     assert.equal(response.status, 400);
//   });

//   it("It should not register user with duplicate email address", async () => {
//     const response = await request(app).post("/api/v1/auth/sign-up").send({
//       email: randomEmail,
//       password: "luffy3434",
//       username: "Luuuuffff",
//     });

//     // console.log(response.status, response.body);

//     assert.equal(response.status, 409);
//   });

//   it("It should reject if data value are not provided", async () => {
//     const response = await request(app).post("/api/v1/auth/sign-up").send({
//       email: "luffy12@gmail.com",
//       username: "Luuuuffff",
//     });

//     assert.equal(response.status, 400);
//   });
// });

// describe("POST /api/v1/auth/sign-in", () => {
//   // sign in data not valid
//   // user signed in successfully
//   // user does not exists
//   //   wrong password

//   it("It should reject the sign in if data not valid ", async () => {
//     const response = await request(app).post("/api/v1/auth/sign-in").send({
//       email: "asdasd",
//       password: "Preetam1211",
//     });

//     assert.equal(response.status, 400);
//   });

//   it("It should reject the sign in if user does not exists", async () => {
//     const response = await request(app).post("/api/v1/auth/sign-in").send({
//       email: "Pre3tam@gmail.com",
//       password: "Preetam1211",
//     });

//     assert.equal(response.status, 404);
//   });

//   it("It should reject the sign in if password is incorrect", async () => {
//     const response = await request(app).post("/api/v1/auth/sign-in").send({
//       email: "Preetam12@gmail.com",
//       password: "Preetam1212",
//     });

//     assert.equal(response.status, 401);
//   });

//   it("It should let the user sign in successfully", async () => {
//     const response = await request(app).post("/api/v1/auth/sign-in").send({
//       email: "Preetam12@gmail.com",
//       password: "Preetam1211",
//     });

//     assert.equal(response.status, 200);
//   });
// });

// describe("GET /api/v1/auth/me", () => {
//   it("should return the authenticated user", async () => {
//     const agent = request.agent(app);

//     // First, sign in to create a session
//     await agent.post("/api/v1/auth/sign-in").send({
//       email: "Preetam12@gmail.com",
//       password: "Preetam1211",
//     });

//     // Agent automatically sends the session cookie
//     const response = await agent.get("/api/v1/auth/me");

//     assert.equal(response.status, 200);
//     assert.equal(response.body.user.email, "Preetam12@gmail.com");
//   });
// });

// describe("GET /api/v1/auth/sign-out", () => {
//   it("should sign out the user", async () => {
//     const agent = request.agent(app);

//     // First, sign in to create a session
//     await agent.post("/api/v1/auth/sign-in").send({
//       email: "Preetam12@gmail.com",
//       password: "Preetam1211",
//     });

//     // Agent automatically sends the session cookie
//     const response = await agent.post("/api/v1/auth/sign-out");

//     assert.equal(response.status, 200);
//   });
// });
