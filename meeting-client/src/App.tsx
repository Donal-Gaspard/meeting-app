import React, { useEffect, useContext } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import UserStore from "./store/UserStore";
import { observer } from "mobx-react-lite";
import Rooms from "./components/Rooms/Rooms";
import { Spinner, Container } from "react-bootstrap/esm";
import ReservationDashboard from "./components/Reservations/ReservationDashboard";
import RoomStore from "./store/RoomStore";
import { Row, Col } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
function App() {
  const userStore = useContext(UserStore);
  const { currentUser, loading } = userStore;
  const roomStore = useContext(RoomStore);

  useEffect(() => {
    userStore.loadUsers();
    roomStore.loadRooms();
  }, [roomStore, userStore]);

  if (loading)
    return (
      <Container>
        <Spinner animation="border" />{" "}
      </Container>
    );
  return (
    <div className="App">
      <ToastContainer autoClose={2000} position="bottom-right" />
      {currentUser && <Header name={currentUser.name} />}
      <Container fluid>
        <Row>
          <Col xs={8}>
            <ReservationDashboard />
          </Col>
          <Col xs={3}>
            <Rooms />
          </Col>
        </Row>
      </Container>
    </div>
  );
}
export default observer(App);
