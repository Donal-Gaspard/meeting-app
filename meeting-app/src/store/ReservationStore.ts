import { toast } from "react-toastify";
import { createContext } from "react";

import { observable, action, runInAction, computed } from "mobx";
import agent from "../api/agent";
import IReservation from "../models/IReservation";
import moment from "moment";
import { v4 as uuid } from "uuid";

const { ReservationsAgent } = agent;

class ReservationStore {
  @observable loading = false;

  @observable timePeriods: string[] = [];
  @observable reservationRegistry = new Map(); // fix error with nested item
  @observable currentReservation: IReservation | null = null;
  @observable editMode = false;
  @observable avaibillities: string[] = [];
  @observable reservations: IReservation[] = [];
  @observable currentRoom: string | undefined = "";
  @action loadReservations = async () => {
    try {
      this.loading = true;
      const reservations = await ReservationsAgent.list();
      this.reservations = reservations;
      runInAction("loading activities", () => {
        reservations.forEach((reserv) => {
          let reservationWithouttime = { ...reserv };
          reservationWithouttime.date = moment(reserv.date).format(
            "YYYY-MM-DD"
          );
          this.reservationRegistry.set(reserv.id, reservationWithouttime);
        });
      });
      this.loading = false;
    } catch (error) {
      this.loading = false;
      console.error("error");
    }
  };

  @action editReservation = async (reservation: IReservation) => {
    this.loading = true;
    try {
      await ReservationsAgent.update(reservation);
      this.reservationRegistry.set(reservation.id, reservation);
      this.currentReservation = null;
      this.editMode = false;
      this.loading = false;
      toast.success(`${reservation.name} Edited`);
    } catch (error) {
      this.currentReservation = null;
      this.loading = false;
      console.error("error", error);
    }
  };

  @action cancelEdit = () => {
    this.currentReservation = null;
  };
  @action selectResevation = (id: string) => {
    if (!id) {
      this.currentReservation = null;
      this.editMode = false;
    } else {
      this.currentReservation = this.reservationRegistry.get(id);
      this.editMode = true;
    }
  };

  @computed get ReservationByDate() {
    return Array.from(this.reservationRegistry.values()).sort(
      (a, b) => Date.parse(a.date) - Date.parse(b.date)
    );
  }
  @action listPeriod = async () => {
    try {
      this.timePeriods = await ReservationsAgent.listPeriod();
    } catch (error) {
      console.error("error");
      throw error;
    }
  };

  @action addReservation = async (reservation: IReservation) => {
    reservation.id = uuid();
    try {
      await ReservationsAgent.create(reservation);
      this.loading = false;
      this.currentReservation = null;
      this.reservationRegistry.set(reservation.id, reservation);
      toast.success(`${reservation.name} added`);
    } catch (error) {
      this.currentReservation = null;
      console.error("error", error);
    }
  };

  @action deleteReservation = async (id: string) => {
    try {
      await ReservationsAgent.delete(id);
      runInAction("deleting activity", () => {
        this.reservationRegistry.delete(id);
        toast.success(`Deleted`);
      });
    } catch (error) {
      console.error(error);
    }
  };

  @action getAvaibillities = async (roomId: number, date: string) => {
    try {
      this.avaibillities = await ReservationsAgent.getAvaibillities(
        roomId,
        date
      );
    } catch (error) {
      console.error(error);
    }
  };
}

export default createContext(new ReservationStore());
