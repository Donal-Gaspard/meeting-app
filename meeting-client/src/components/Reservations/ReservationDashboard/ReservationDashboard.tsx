import React from "react";
import ReservationForm from "../ReservationForm/ReservationForm";
import ReservationList from "../ReservationList/ReservationList";
import { observer } from "mobx-react-lite";
import Styles from "./ReservationDashboard.module.scss";

export const ReservationDashboard = () => {
  return (
    <div>
      <ReservationList />
      <div className={Styles["reservation-form"]}>
        <ReservationForm />
      </div>
    </div>
  );
};

export default observer(ReservationDashboard);
