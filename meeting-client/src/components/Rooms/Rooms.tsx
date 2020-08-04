import React, { useContext, useEffect } from "react";
import RoomStore from "../../store/RoomStore";
import { observer } from "mobx-react-lite";
import { Spinner, Row } from "react-bootstrap";
import ReservationsRoomList from "./ReservationsRoomList";
import RoomSelect from "../../UI/RoomSelect";
import Styles from './Rooms.module.scss'
const Rooms = () => {
  const roomStore = useContext(RoomStore);
  const { loadingDetails } = roomStore;

  useEffect(() => {
    roomStore.loadRooms();
  }, [roomStore]);

  return (
    <div className={Styles["rooms"]}>
      <RoomSelect variant="primary" />
      {loadingDetails && <Spinner animation="border" size="sm" />}
      <Row>
        <div className={Styles["room-list"]}>
        <ReservationsRoomList />

        </div>
      </Row>
    </div>
  );
};
export default observer(Rooms);
