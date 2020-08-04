import React, { useContext } from "react";
import ReservationStore from "../../../store/ReservationStore";
import { Card, Button } from "react-bootstrap";
import IReservation from "../../../models/IReservation";
import Styles from "./ReservationItem.module.scss";
interface IProps {
  reservation: IReservation;
}

const ReservationItem: React.FC<IProps> = ({ reservation }) => {
  const reservationStore = useContext(ReservationStore);
  const { selectResevation, deleteReservation } = reservationStore;
  return (
    <div className={Styles["reservation-card"]}>
      <Card id={reservation.name}>
        <Card.Body>
          <Card.Title>{reservation.name}</Card.Title>
          <Card.Text>
            {reservation.date} at {reservation.timePeriod}
            <br />
            Room {reservation.roomId}
          </Card.Text>
          <Button
            id={`btn-delete-${reservation.name}`}
            style={{ float: "left" }}
            onClick={() => deleteReservation(reservation.id)}
            size="sm"
            variant="danger"
          >
            Delete
          </Button>
          <Button
            id={`btn-edit-${reservation.name}`}
            style={{ float: "right" }}
            onClick={() => selectResevation(reservation.id)}
            size="sm"
            variant="primary"
          >
            Edit
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ReservationItem;
