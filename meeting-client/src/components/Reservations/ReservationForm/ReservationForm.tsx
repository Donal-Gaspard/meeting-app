import React, {
  useContext,
  useState,
  useEffect,
  Fragment,
  useRef,
} from "react";
import { Card, Form, Badge } from "react-bootstrap";
import IReservation from "../../../models/IReservation";
import ReservationStore from "../../../store/ReservationStore";
import { observer } from "mobx-react-lite";
import { Button } from "react-bootstrap/esm";
import RoomStore from "../../../store/RoomStore";
import Styles from "./ReservationForm.module.scss";
const defautReservation: IReservation = {
  id: "",
  userId: 1,
  name: "",
  date: "",
  timePeriod: "",
  room: undefined,
};
const EditReservation = () => {
  const reservationStore = useContext(ReservationStore);
  const roomStore = useContext(RoomStore);
  const { rooms, loadReservationsRoom } = roomStore;
  const [currentRoom, setCurrentRoom] = useState<number | null>(null);
  const [validated, setValidated] = useState(false);
  const [roomAndDateselected, setRoomAndDateSelected] = useState(false);
  const [periods, setPeriods] = useState<string[]>([]);
  const {
    currentReservation: initialReservation,
    editReservation,
    cancelEdit,
    addReservation,
    getAvaibillities,
    avaibillities,
    editMode,
    listPeriod,
    timePeriods,
  } = reservationStore;

  const [reservation, setReservation] = useState<IReservation>(
    defautReservation
  );
  const formRef = useRef(null);

  useEffect(() => {
    if (initialReservation?.id) {
      listPeriod();
      setReservation(initialReservation);
    }
  }, [initialReservation, listPeriod]);

  useEffect(() => {
    if (currentRoom && reservation.date && !editMode) {
      setRoomAndDateSelected(true);
      getAvaibillities(currentRoom, reservation.date);
      setPeriods(avaibillities);
    } else {
      setRoomAndDateSelected(false);
      console.log("timePeriods", timePeriods);
      setPeriods(timePeriods);
    }
    // if (editMode && currentRoom) {
    //   setPeriods(timePeriods);
    // }
  }, [
    avaibillities,
    currentRoom,
    editMode,
    getAvaibillities,
    listPeriod,
    reservation.date,
    timePeriods,
  ]);

  const displayTimePeriods = periods.map((hour) => (
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
    <div className={Styles["reservation-form-title"]}>
      Edit Reservation {initialReservation?.name}
    </div>
  ) : (
    <div className={Styles["reservation-form-title"]}>Create Reservation</div>
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(false);
    }
    if (editMode) {
      console.log("Edit :>> ");
      editReservation(reservation);
      setReservation(defautReservation);
    } else {
      console.log("create :>> ");
      addReservation(reservation);
      setReservation(defautReservation);
    }
  };
  const cancelEditHandle = () => {
    cancelEdit();
    handleReset();
    setReservation(defautReservation);
  };
  const handleReset = () => {
    (formRef?.current as any).reset();
    setValidated(false);
  };

  return (
    <div>
      {displayTitle}
      <Card>
        <Card.Body>
          <Form validated={validated} onSubmit={handleSubmit} ref={formRef}>
            <Form.Group controlId="MeetingName">
              <Form.Label>Meeting name</Form.Label>
              <Form.Control
                onChange={handleInputChange}
                name="name"
                size="sm"
                type="text"
                placeholder="Enter meeting name"
                value={reservation.name}
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

            {(roomAndDateselected || editMode) && (
              <Form.Group controlId="timePeriods">
                <Form.Label>
                  time period
                  {!editMode && (
                    <Badge style={{ marginLeft: "8px" }} variant="success">
                      {avaibillities.length} availabilities
                    </Badge>
                  )}
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
                onClick={cancelEditHandle}
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
    </div>
  );
};
export default observer(EditReservation);
