import React from "react";
import Styles from "./Header.module.scss";
interface IProps {
  name: string;
}
export const Header: React.FC<IProps> = ({ name }) => {
  return (
    <div className={Styles["reservation-header"]}>
      <h2>Welcom {name}</h2>
    </div>
  );
};
export default Header;
