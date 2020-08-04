import React, { useContext, useEffect } from "react";
import ReservationStore from "../../../store/ReservationStore";
import { observer } from "mobx-react-lite";
import ReservationItem from "../ReservationItem/ReservationItem";
import { Button, Badge } from "react-bootstrap";

import Styles from "./ReservationList.module.scss";
export const ReservationList = () => {
  const reservationStore = useContext(ReservationStore);
  const { ReservationByDate } = reservationStore;

  useEffect(() => {
    reservationStore.loadReservations();
    reservationStore.listPeriod().catch((error) => console.error(error));
  }, [reservationStore]);

  const displayReservations = ReservationByDate.map((reservation) => {
    return <ReservationItem key={reservation.id} reservation={reservation} />;
  });

  return (
    <div className={Styles["reservation-dashboard"]}>
      <div className={Styles["reservation-title"]}>
        <Button variant="primary">
          My Reservation{" "}
          <Badge variant="light">{ReservationByDate.length}</Badge>
        </Button>
      </div>
      <div id="card-list" className={Styles.reservation_list}>
        {displayReservations}
      </div>
    </div>
  );
};

export default observer(ReservationList);
