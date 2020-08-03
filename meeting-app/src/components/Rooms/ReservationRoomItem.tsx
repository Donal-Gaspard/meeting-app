import React from "react";
import { observer } from "mobx-react-lite";
import { Alert } from "react-bootstrap/esm";
import IReservation from "../../models/IReservation";

interface IProps {
  reservation: IReservation;
}
export const ReservationRoomItem: React.FC<IProps> = ({ reservation }) => {
  return (
    <div style={{ padding: "5px 0" }}>
      <Alert key={reservation.id} variant="info">
        {reservation.name} on {reservation.date} at {reservation.timePeriod}
      </Alert>
    </div>
  );
};

export default observer(ReservationRoomItem);
