import React, { useContext, useEffect } from "react";
import ReservationStore from "../../../store/ReservationStore";
import { observer } from "mobx-react-lite";
import ReservationItem from "../ReservationItem";
import { Button, Badge } from "react-bootstrap";

import styles from "./ReservationList.module.scss";
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
    <div style={{ marginTop: "20px" }}>
      <Button variant="primary">
        My Reservation <Badge variant="light">{ReservationByDate.length}</Badge>
        <span className="sr-only">My reservations</span>
      </Button>
      <div className={styles.reservation_list}>{displayReservations}</div>
    </div>
  );
};

export default observer(ReservationList);
