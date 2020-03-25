import { app } from "../../app";
import request from "supertest";

const agent = request.agent(app);

describe("POST /login ", () => {
  const userIncorrectLogin = {
    username: "admis",
    password: "sadas"
  };
  const userIncorrectPassword = {
    username: "admin",
    password: "sadas"
  };
  const correctUser = {
    username: "admin",
    password: "admin"
  };
  it("result with incorrect login:respond status code:400 ", done => {
    agent
      .post("/login")
      .send(userIncorrectLogin)
      .set("Accept", "application/json")
      .expect(400, done);
  });
  it("result with incorrect password:respond status code:400 ", done => {
    agent
      .post("/login")
      .send(userIncorrectPassword)
      .set("Accept", "application/json")
      .expect(400, done);
  });
  it("result with correct login and password:respond status code:200 ", done => {
    agent
      .post("/login")
      .send(correctUser)
      .set("Accept", "application/json")
      .expect(200, done);
  });
});

describe("POST /updateUser", () => {
  const user = {
    cityNames: ["Kiev", "London", "Dnipro"],
    username: "admin"
  };
  const validJwtToken =
    "Bearer eyJhbGciOiJIUzI1NiJ9.YWRtaW4.XUxjbRTAomQdCs_x1yStfz_Hdws1FCtj_fRqgK0noiA";
  const incorrectJwtToken = "Bearer sddd";
  it("result with correctJWT:respond status code:200", done => {
    agent
      .post("/updateUser")
      .send(user)
      .set("authorization", validJwtToken)
      .expect(200, done);
  });
  it("result with incorrectJWT:respond status code:403", done => {
    agent
      .post("/updateUser")
      .send(user)
      .set("authorization", incorrectJwtToken)
      .expect(403, done);
  });
});

describe("POST /weatherReport", () => {
  const city = "Lviv,UA";
  const incorrectJwtToken = "Bearer sddd";
  it("result with incorrectJWT:respond with status code 403", done => {
    agent
      .post("/weatherReport")
      .send(city)
      .set("authorization", incorrectJwtToken)
      .expect(403, done);
  });
});
