import React, { Fragment } from "react";
import ReservationForm from "../ReservationForm/ReservationForm";
import ReservationList from "../ReservationList/ReservationList";
import { observer } from "mobx-react-lite";
import Styles from "./ReservationDashboard.module.scss";

const ReservationDashboard = () => {
  return (
    <Fragment>
      <ReservationList />
      <div className={Styles["reservation-form"]}>
        <ReservationForm />
      </div>
    </Fragment>
  );
};

export default observer(ReservationDashboard);
