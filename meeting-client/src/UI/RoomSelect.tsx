import React, { useContext, Fragment } from "react";
import RoomStore from "../store/RoomStore";
import { DropdownButton, Dropdown } from "react-bootstrap";
import { observer } from "mobx-react-lite";

const RoomSelect: React.FC<{ variant: string }> = ({ variant }) => {
  const roomStore = useContext(RoomStore);
  const { rooms, loadReservationsRoom } = roomStore;

  const displayRooms = rooms?.map((room) => {
    return (
      <Dropdown.Item
        key={room.id}
        onClick={() => loadReservationsRoom(room.id)}
      >
        {room.name}
      </Dropdown.Item>
    );
  });

  return (
    <Fragment>
      <DropdownButton
        variant={variant}
        id="dropdown-basic-button"
        title="Rooms list"
      >
        {displayRooms}
      </DropdownButton>
    </Fragment>
  );
};

export default observer(RoomSelect);
