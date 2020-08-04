import React, { useContext, Fragment } from "react";
import RoomStore from "../../store/RoomStore";
import  ReservationRoomItem  from "./ReservationRoomItem";

export const ReservationsRoomList = () => {
  const roomStore = useContext(RoomStore);
  const { detailsReservations } = roomStore;

  const displayDetailRooms = detailsReservations?.map((reservation) => (
    <ReservationRoomItem key={reservation.id} reservation={reservation} />
  ));

  return <Fragment>{displayDetailRooms}</Fragment>;
};

export default ReservationsRoomList;
