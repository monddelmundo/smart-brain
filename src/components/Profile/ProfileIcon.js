import React, { useState } from "react";
import {
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

const ProfileIcon = ({ onRouteChange, toggleModal }) => {
  const [dropdownOpen, setOpen] = useState(false);
  const toggle = () => setOpen(!dropdownOpen);
  return (
    <div className="pa4 tc">
      <ButtonDropdown isOpen={dropdownOpen} toggle={toggle}>
        <DropdownToggle
          tag="span"
          data-toggle="dropdown"
          aria-expanded={dropdownOpen}
        >
          <img
            src="http://tachyons.io/img/logo.jpg"
            className="br-100 ba h3 w3 dib"
            alt="avatar"
          />
        </DropdownToggle>
        <DropdownMenu
          right
          className="b--transparent shadow-5"
          style={{ backgroundColor: "rgba(255, 255, 255, 0.5" }}
        >
          <DropdownItem onClick={() => toggleModal()}>
            View Profile
          </DropdownItem>
          <DropdownItem onClick={() => onRouteChange("signout")}>
            Sign Out
          </DropdownItem>
        </DropdownMenu>
      </ButtonDropdown>
    </div>
  );
};

export default ProfileIcon;
