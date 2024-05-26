import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logOut } from "@redux/reducers/authSlice/authSlice";
import React from "react";
import s from "./Navbar.module.scss";
import HomeLink from "@ui/NavbarLinks/HomeLink";
import SearchLink from "@ui/NavbarLinks/SearchLink";
import ProfileLink from "@ui/NavbarLinks/ProfileLink";
import logout_link from "@assets/icons/NavbarIcons/logout_icon.svg";
import cooks_corner_link from "@assets/icons/NavbarIcons/cooks_corner_icon.svg";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogOut = () => {
    dispatch(logOut());
    navigate("/");
  };

  return (
    <div className={s.navbar}>
      <div className={s.cooks_corner_link}>
        <img src={cooks_corner_link} alt="cooks_corner_link" />
      </div>
      <div className={s.navbar_links}>
        <HomeLink to={"/"} />
        <SearchLink to={"/search"} />
        <ProfileLink to={"/profile"} />
        <button
          onClick={() => handleLogOut()}
          type="button"
          className={s.logout_button}
        >
          <img
            src={logout_link}
            alt="logout_link"
            onClick={() => handleLogOut}
          />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
