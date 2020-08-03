import React, { useContext } from "react";
import ReservationStore from "../../store/ReservationStore";
import { Card, Button } from "react-bootstrap";
import IReservation from "../../models/IReservation";

interface IProps {
  reservation: IReservation;
}

const ReservationItem: React.FC<IProps> = ({ reservation }) => {
  const reservationStore = useContext(ReservationStore);
  const { selectResevation, deleteReservation } = reservationStore;
  return (
    <div style={{ width: "30%" }}>
      <Card>
        <Card.Body>
          <Card.Title>{reservation.name}</Card.Title>
          <Card.Text>
            {reservation.date} at {reservation.timePeriod}
            <br />
            Room {reservation.roomId}
          </Card.Text>
          <Button
            style={{ float: "left" }}
            onClick={() => deleteReservation(reservation.id)}
            size="sm"
            variant="danger"
          >
            Delete
          </Button>
          <Button
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