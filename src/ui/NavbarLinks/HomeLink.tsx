import React from "react";
import { Link, useMatch } from "react-router-dom";
import { NavLinkWrapper } from "./NavLinkWrapper";
import home_page_on from "../../assets/icons/NavbarIcons/page_on/home_page_on.svg";
import home_page_off from "../../assets/icons/NavbarIcons/page_off/home_page_off.svg";
import home_page_on_window_393 from "@assets/icons/NavbarIcons/page_on/width426/home_page_on_window_393.svg";

const HomeLink: React.FC<{ to: string }> = ({ to }) => {
  const matched = useMatch(to);
  const isSmallScreen = window.innerWidth <= 426;
  return (
    <NavLinkWrapper condition={matched}>
      <Link to={to}>
        <img
          src={
            isSmallScreen
              ? matched
                ? home_page_on_window_393
                : home_page_off
              : matched
              ? home_page_on
              : home_page_off
          }
          alt={matched ? "on" : "off"}
        />
      </Link>
    </NavLinkWrapper>
  );
};

export default HomeLink;
