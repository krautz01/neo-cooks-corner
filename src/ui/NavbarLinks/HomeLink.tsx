import React from "react";
import { Link, useMatch } from "react-router-dom";
import { NavLinkWrapper } from "./NavLinkWrapper";
import home_page_on from "../../assets/icons/NavbarIcons/page_on/home_page_on.svg";
import home_page_off from "../../assets/icons/NavbarIcons/page_off/home_page_off.svg";

const HomeLink: React.FC<{ to: string }> = ({ to }) => {
  const matched = useMatch(to);
  return (
    <NavLinkWrapper condition={matched}>
      <Link to={to}>
        <img
          src={matched ? home_page_on : home_page_off}
          alt={matched ? "on" : "off"}
        />
      </Link>
    </NavLinkWrapper>
  );
};

export default HomeLink;
