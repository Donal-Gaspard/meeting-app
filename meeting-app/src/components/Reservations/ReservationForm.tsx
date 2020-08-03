import React, { useContext, useState, useEffect, Fragment } from "react";
import { Card, Form, Badge } from "react-bootstrap";
import IReservation from "../../models/IReservation";
import ReservationStore from "../../store/ReservationStore";
import { observer } from "mobx-react-lite";
import { Button } from "react-bootstrap/esm";
import RoomStore from "../../store/RoomStore";

const defautReservation: IReservation = {
  id: "",
  userId: 1,
  name: "",
  date: "",
  timePeriod: "",
};
const EditReservation = () => {
  const reservationStore = useContext(ReservationStore);
  const roomStore = useContext(RoomStore);
  const { rooms, loadReservationsRoom } = roomStore;
  const [currentRoom, setCurrentRoom] = useState<number | null>(null);
  const [validated, setValidated] = useState(false);
  const [roomAndDateselected, setRoomAndDateSelected] = useState(false);
  const {
    currentReservation: initialReservation,
    editReservation,
    cancelEdit,
    addReservation,
    getAvaibillities,
    avaibillities,
    editMode,
  } = reservationStore;

  const [reservation, setReservation] = useState<IReservation>(
    defautReservation
  );

  useEffect(() => {
    if (initialReservation?.id) {
      setReservation(initialReservation);
    }
  }, [initialReservation]);

  useEffect(() => {
    if (currentRoom && reservation.date) {
      setRoomAndDateSelected(true);
      getAvaibillities(currentRoom, reservation.date);
    } else {
      setRoomAndDateSelected(false);
    }
  }, [currentRoom, getAvaibillities, reservation.date]);

  const displayTimePeriods = avaibillities.map((hour) => (
    <option key={hour}>{hour}</option>
  ));

  const displayRooms = rooms?.map((room) => (
    <option key={room.id} data-id={room.id}>
      {room.name}
    </option>
  ));

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    if (name === "rooms") {
      if (value) {
        let roomId = rooms.filter((room) => room.name === value)[0].id;
        setCurrentRoom(roomId);
        setReservation({ ...reservation, roomId: roomId });
        loadReservationsRoom(roomId);
      }
    } else {
      setReservation({ ...reservation, [name]: value });
    }
  };

  const displayTitle = editMode ? (
    <b>Edit Reservation {initialReservation?.name} </b>
  ) : (
    <b>Create Reservation</b>
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
      setValidated(false);
    }
    if (editMode) {
      editReservation(reservation);
      setReservation(defautReservation);
    } else {
      addReservation(reservation);
      setReservation(defautReservation);
    }
  };

  return (
    <Fragment>
      {displayTitle}
      <Card>
        <Card.Body>
          <Form validated={validated} onSubmit={handleSubmit}>
            <Form.Group controlId="MeetingName">
              <Form.Label>Meeting name</Form.Label>
              <Form.Control
                onChange={handleInputChange}
                name="name"
                size="sm"
                type="text"
                placeholder="Enter meeting name"
                value={reservation.name}
                pattern="[A-Za-z]{3}"
                required
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid state.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="date">
              <Form.Label>Date</Form.Label>
              <Form.Control
                value={reservation.date}
                onChange={handleInputChange}
                name="date"
                size="sm"
                type="date"
                placeholder="Enter day"
                required
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid state.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="rooms">
              <Form.Label>Rooms {reservation.roomId}</Form.Label>
              <Form.Control
                onChange={handleInputChange}
                value={reservation?.room?.name}
                name="rooms"
                size="sm"
                as="select"
                required
              >
                <option></option>
                {displayRooms}
              </Form.Control>
              <Form.Control.Feedback type="invalid">
                Please provide a valid state.
              </Form.Control.Feedback>
            </Form.Group>

            {roomAndDateselected && (
              <Form.Group controlId="timePeriods">
                <Form.Label>
                  time period
                  <Badge style={{ marginLeft: "8px" }} variant="success">
                    {avaibillities.length} availabilities
                  </Badge>
                </Form.Label>
                <Form.Control
                  value={reservation.timePeriod}
                  onChange={handleInputChange}
                  name="timePeriod"
                  size="sm"
                  as="select"
                  required
                >
                  <option></option>
                  {displayTimePeriods}
                </Form.Control>
                <Form.Control.Feedback type="invalid">
                  Please provide a valid state.
                </Form.Control.Feedback>
              </Form.Group>
            )}
            {editMode && (
              <Button
                style={{ float: "left" }}
                size="sm"
                onClick={cancelEdit}
                variant="warning"
              >
                Cancel
              </Button>
            )}
            <Button
              style={{ float: "right" }}
              size="sm"
              type="submit"
              variant="success"
            >
              {editMode ? "update" : "add"}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Fragment>
  );
};
export default observer(EditReservation);
