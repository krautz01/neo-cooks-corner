import React from "react";
import { Link, useMatch } from "react-router-dom";
import { NavLinkWrapper } from "./NavLinkWrapper";
import profile_page_on from "../../assets/icons/NavbarIcons/page_on/profile_page_on.svg";
import profile_page_off from "../../assets/icons/NavbarIcons/page_off/profile_page_off.svg";

const ProfileLink: React.FC<{ to: string }> = ({ to }) => {
  const matched = useMatch(to);
  return (
    <Link to={to}>
      <NavLinkWrapper condition={matched}>
        <Link to={to}>
          <img
            src={matched ? profile_page_on : profile_page_off}
            alt={matched ? "on" : "off"}
          />
        </Link>
      </NavLinkWrapper>
    </Link>
  );
};

export default ProfileLink;
