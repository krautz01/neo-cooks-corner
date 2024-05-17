import React from "react";
import { Link, useMatch } from "react-router-dom";
import { NavLinkWrapper } from "./NavLinkWrapper";
import profile_page_on from "../../assets/icons/NavbarIcons/page_on/profile_page_on.svg";
import profile_page_off from "../../assets/icons/NavbarIcons/page_off/profile_page_off.svg";
import profile_page_on_window_393 from "@assets/icons/NavbarIcons/page_on/width426/profile_page_on_window_393.svg";

const ProfileLink: React.FC<{ to: string }> = ({ to }) => {
  const matched = useMatch(to);
  const isSmallScreen = window.innerWidth <= 426;
  return (
    <Link to={to}>
      <NavLinkWrapper condition={matched}>
        <Link to={to}>
          <img
            src={
              isSmallScreen
                ? matched
                  ? profile_page_on_window_393
                  : profile_page_off
                : matched
                ? profile_page_on
                : profile_page_off
            }
            alt={matched ? "on" : "off"}
          />
        </Link>
      </NavLinkWrapper>
    </Link>
  );
};

export default ProfileLink;
