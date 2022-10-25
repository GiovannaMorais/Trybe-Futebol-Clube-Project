import * as sinon from "sinon";
import * as chai from "chai";
import * as bcryptjs from "bcryptjs";
import * as Jwt from "jsonwebtoken";

// @ts-ignore
import chaiHttp = require("chai-http");

import { app } from "../app";
import Teams from "../database/models/teams";
import Matches from "../database/models/matches";
import Users from "../database/models/users";
import { InProgressFalse, InProgressTrue, TeamIdNotExist } from "./mocks/matches.mocks";

chai.use(chaiHttp);

const { expect } = chai;

describe("Test on matches routes ", () => {
  beforeEach(sinon.restore);

  it("Test when 'inProgress' equals true ", async () => {
    sinon
      .stub(Matches, "findAll")
      .resolves([ InProgressTrue as unknown as Users,]);

    const response = await chai.request(app).get("/matches?inProgress=true");

    expect(response.status).to.equal(200);
    expect(response.body[0]).to.have.property("teamName").equal("corinthians");
  });

  it("Test when 'inProgress' equals false", async () => {
    sinon
      .stub(Matches, "findAll")
      .resolves([InProgressFalse as unknown as Users,
      ]);

    const response = await chai.request(app).get("/matches?inProgress=false");

    expect(response.status).to.equal(200);
    expect(response.body[0]).to.have.property("teamName").equal("corinthians");
  });

  it("Test when 'InProgress' is not passed", async () => {
    sinon.stub(Matches, "findAll").resolves([]);

    const response = await chai.request(app).get("/matches");

    expect(response.status).to.equal(200);
    expect(Array.isArray(response.body)).to.be.equal(true);
  });

  it("Test route /matches/:id/finish", async () => {
    sinon.stub(Matches, "update").resolves();
    const response = await chai
      .request(app)
      .patch("/matches/4/finish")
      .set("params", "id");

    expect(response.status).to.equal(200);
    expect(response.body).to.equal("Finished");
  });

  it("Test route /matches/:id", async () => {
    sinon.stub(Matches, "update").resolves();
    const response = await chai
      .request(app)
      .patch("/matches/4")
      .set("params", "id")
      .send({
        homeTeamGoals: 1,
        awayTeamGoals: 2,
      });

    expect(response.status).to.equal(200);
    expect(response.body).to.equal("");
  });
  it("Test by checking if the failure message occurs if you provide an id that does not exist", async () => {
    sinon.stub(Jwt, "verify").resolves({ email: "trybe@trybe.com" });
    sinon.stub(Teams, "findOne").resolves();

    sinon
      .stub(Matches, "create")
      .resolves(InProgressFalse as unknown as Users);

    const response = await chai
      .request(app)
      .post("/matches")
      .set("authorization", "1234abcd")
      .send(TeamIdNotExist);

    expect(response.status).to.equal(404);
    expect(response.body)
      .to.have.property("message")
      .equal("There is no team with such id!");
  });
});
