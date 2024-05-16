import React from "react";
import { Link, useMatch } from "react-router-dom";
import { NavLinkWrapper } from "./NavLinkWrapper";
import search_page_on from "../../assets/icons/NavbarIcons/page_on/search_page_on.svg";
import search_page_off from "../../assets/icons/NavbarIcons/page_off/search_page_off.svg";
import search_page_on_window_393 from "@assets/icons/NavbarIcons/page_on/width426/search_page_on_window_393.svg";

const SearchLink: React.FC<{ to: string }> = ({ to }) => {
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
                  ? search_page_on_window_393
                  : search_page_off
                : matched
                ? search_page_on
                : search_page_off
            }
            alt={matched ? "on" : "off"}
          />
        </Link>
      </NavLinkWrapper>
    </Link>
  );
};

export default SearchLink;
