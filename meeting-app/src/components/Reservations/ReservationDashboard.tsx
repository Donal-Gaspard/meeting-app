import React from "react";
import ReservationForm from "./ReservationForm";
import ReservationList from "./ReservationList/ReservationList";
import { observer } from "mobx-react-lite";
export const ReservationDashboard = () => {
  return (
    <div>
      <ReservationList />
      <div style={{ width: "80%" }}>
        <ReservationForm />
      </div>
    </div>
  );
};

export default observer(ReservationDashboard);
