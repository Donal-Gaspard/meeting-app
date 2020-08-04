import React, { useContext, Fragment } from "react";
import RoomStore from "../../store/RoomStore";
import  ReservationRoomItem  from "./ReservationRoomItem";
import Styles from './Rooms.module.scss'
 const ReservationsRoomList = () => {
  const roomStore = useContext(RoomStore);
  const { detailsReservations } = roomStore;

   const displayDetailRooms = detailsReservations?.map((reservation) => (
     <div className={Styles[""]}>
       <ReservationRoomItem key={reservation.id} reservation={reservation} />
    </div>
  ));

  return <Fragment>{displayDetailRooms}</Fragment>;
};

export default ReservationsRoomList;
