import React, { useContext, useEffect } from "react";
import RoomStore from "../../store/RoomStore";
import { observer } from "mobx-react-lite";
import { Spinner, Row } from "react-bootstrap";
import ReservationsRoomList from "./ReservationsRoomList";
import RoomSelect from "../../UI/RoomSelect";
export const Rooms = () => {
  const roomStore = useContext(RoomStore);
  const { loadingDetails } = roomStore;

  useEffect(() => {
    roomStore.loadRooms();
  }, [roomStore]);

  return (
    <div style={{ padding: "25px 0" }}>
      <RoomSelect variant="primary" />
      {loadingDetails && <Spinner animation="border" size="sm" />}
      <Row className="justify-content-md-center">
        <ReservationsRoomList />
      </Row>
    </div>
  );
};
export default observer(Rooms);
