/// <reference types="cypress"/>
import IReservation from "../../../src/models/IReservation";
import { v4 as uuid } from "uuid";

let reservation: IReservation = {
  id: uuid(),
  name: uuid(),
  roomId: 10,
  userId: 1,
  date: "2040-01-01",
  timePeriod: "7h - 8h",
};
let avaibillities: string[] = [];
let urlAvaibillities = "";

describe("reservation page tests", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
    urlAvaibillities = `https://localhost:44364/api/reservations/avaibillities?roomId=${reservation.roomId}&date=${reservation.date}`;

    reservation = {
      id: uuid(),
      name: uuid(),
      roomId: 10,
      userId: 1,
      date: "2040-01-01",
      timePeriod: "7h - 8h",
    };
  });

  it("should be worked", () => {
    expect(true).equal(true);
  });
  it("shoulb contain reservation form with default values", () => {
    cy.get("#MeetingName").should("have.value", "");
    cy.get("#date").should("have.value", "");
    cy.get("#rooms").should("have.value", "");
    cy.get(".btn-success").should("have.value", "");
    cy.get(".btn-success").should("have.text", "Add");
    cy.get("#timePeriods").should("not.exist");
    cy.get(".badge-success").should("not.exist");
  });

  it("should be add reservation", () => {
    const { name, roomId, date } = reservation;
    cy.get("#MeetingName").type(name);
    cy.get("#MeetingName").should("have.value", name);
    cy.get("#date").type(date);
    cy.get("#rooms").select(`room ${roomId}`);
    cy.get("#rooms").should("have.value", `room ${roomId}`);
    cy.get(".badge-success").should("exist");
    cy.request(urlAvaibillities).then((res) => {
      console.log("res :>> ", res);
      expect(res.status).to.eq(200);
      avaibillities = res.body;
      console.log("res :>> ", res.body);
      cy.get(".badge-success").should(
        "have.text",
        `${avaibillities.length} availabilities`
      );
      cy.wait(500);
      cy.get("#timePeriods").select(avaibillities[0], { force: true });
      cy.get("#timePeriods").should("have.value", avaibillities[0]);
    });
    cy.get(".btn-success").click();
    cy.get("#card-list").find(".card").its("length").should("be.gt", 0);
    let nbCard = 0;
    cy.get("#card-list").contains(name);
    cy.get("#card-list")
      .find(".card")
      .then((card) => {
        nbCard = Cypress.$(card).length;
        console.log("nbCard :>> ", nbCard);
        cy.get(".badge-light").should("have.text", nbCard);
      });
  });

  it("should be delete a reservation", () => {
    const { name, roomId, date } = reservation;
    cy.get("#MeetingName").type(name);
    cy.get("#MeetingName").should("have.value", name);
    cy.get("#date").type(date);
    cy.get("#rooms").select(`room ${roomId}`);
    cy.get("#rooms").should("have.value", `room ${roomId}`);
    cy.get(".badge-success").should("exist");
    cy.request(urlAvaibillities).then((res) => {
      console.log("res :>> ", res);
      expect(res.status).to.eq(200);
      avaibillities = res.body;
      console.log("res :>> ", res.body);
      cy.get(".badge-success").should(
        "have.text",
        `${avaibillities.length} availabilities`
      );
      cy.wait(500);
      cy.get("#timePeriods").select(avaibillities[0], { force: true });
      cy.get("#timePeriods").should("have.value", avaibillities[0]);
    });
    cy.get(".btn-success").click();

    let btnDelete = `#btn-delete-${name}`;
    cy.get(btnDelete).click();
    cy.get("#card-list").should("not.contain", name);
  });

  it("should be edit a reservation", () => {
    const { id, name, roomId, date } = reservation;
    cy.get("#MeetingName").type(name);
    cy.get("#MeetingName").should("have.value", name);
    cy.get("#date").type(date);
    cy.get("#rooms").select(`room ${roomId}`);
    cy.get("#rooms").should("have.value", `room ${roomId}`);
    cy.get(".badge-success").should("exist");
    cy.request(urlAvaibillities).then((res) => {
      console.log("res :>> ", res);
      expect(res.status).to.eq(200);
      avaibillities = res.body;
      console.log("res :>> ", res.body);
      cy.get(".badge-success").should(
        "have.text",
        `${avaibillities.length} availabilities`
      );
      console.log("avaibillities[0] :>> ", avaibillities[0]);
      cy.wait(500);
      cy.get("#timePeriods").select(avaibillities[0], { force: true });
      cy.wait(500);
      cy.get("#timePeriods").should("have.value", avaibillities[0]);
    });
    cy.get(".btn-success").click();

    let btnEdit = `#btn-edit-${name}`;
    // cancel visible
    cy.get(btnEdit).click();
    cy.get("#btn-cancel").should("exist");
    cy.get(".btn-success").should("have.text", "Update");

    const newName = `${id}-new`;
    cy.get("#MeetingName").should("have.value", name);
    cy.get("#rooms").should("have.value", `room ${roomId}`);
    cy.get("#date").should("have.value", "2040-01-01");
    cy.get("#MeetingName").type(newName);

    cy.get(".btn-success").click();
    cy.get("#card-list").contains(name);

    //should  Reset  field after edit
    cy.get("#MeetingName").should("have.value", "");
    cy.get("#date").should("have.value", "");
    cy.get("#rooms").should("have.value", "");
    cy.get(".btn-success").should("have.value", "");
  });

  it.only("should be edit and cancel", () => {
    const { name, roomId, date } = reservation;
    cy.get("#MeetingName").type(name);
    cy.get("#MeetingName").should("have.value", name);
    cy.get("#date").type(date);
    cy.get("#rooms").select(`room ${roomId}`);
    cy.get("#rooms").should("have.value", `room ${roomId}`);
    cy.get(".badge-success").should("exist");
    cy.request(urlAvaibillities).then((res) => {
      console.log("res :>> ", res);
      expect(res.status).to.eq(200);
      avaibillities = res.body;
      console.log("res :>> ", res.body);
      cy.get(".badge-success").should(
        "have.text",
        `${avaibillities.length} availabilities`
      );
      console.log("avaibillities[0] :>> ", avaibillities[0]);
      cy.wait(500);
      cy.get("#timePeriods").select(avaibillities[0], { force: true });
      cy.wait(500);
      cy.get("#timePeriods").should("have.value", avaibillities[0]);
    });
    cy.get(".btn-success").click();

    let btnEdit = `#btn-edit-${name}`;
    // cancel visible
    cy.get(btnEdit).click();
    cy.get("#btn-cancel").click();

    //should  Reset  field after edit
    cy.get("#MeetingName").should("have.value", "");
    cy.get("#date").should("have.value", "");
    cy.get("#rooms").should("have.value", "");
    cy.get(".btn-success").should("have.value", "");
  });
});
