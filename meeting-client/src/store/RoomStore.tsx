import { createContext } from "react";

import { observable, action } from "mobx";
import agent from "../api/agent";
import IRoom from "../models/IRoom";
import IReservation from "../models/IReservation";
import moment from "moment";
const { roomAgent } = agent;

class RoomStore {
  @observable rooms: IRoom[] = [];
  @observable loading = false;
  @observable loadingDetails = false;

  @observable
  detailsReservations: IReservation[] | null = [];

  @observable currentRoom: IRoom | null = null;

  @action
  loadRooms = async () => {
    try {
      this.loading = true;
      this.rooms = await roomAgent.list();
      this.loading = false;
    } catch (error) {
      this.loading = false;
    }
  };

  @action loadReservationsRoom = async (id: number) => {
    try {
      this.loadingDetails = true;
      let reservations: IReservation[] = await roomAgent.details(id);
      this.detailsReservations = reservations.map((reserv) => {
        reserv.date = moment(reserv.date).format("YYYY-MM-DD");
        return reserv;
      });
      this.loadingDetails = false;
    } catch (error) {
      this.loadingDetails = false;
    }
  };
}

export default createContext(new RoomStore());
