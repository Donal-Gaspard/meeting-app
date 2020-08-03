import React from "react";

interface IProps {
  name: string;
}
export const Header: React.FC<IProps> = ({ name }) => {
  return (
    <div className="title">
      <h2>Welcom {name}</h2>
    </div>
  );
};
export default Header;
