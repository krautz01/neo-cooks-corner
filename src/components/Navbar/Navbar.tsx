import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/reducers/userSlice";
import { useDispatch } from "react-redux";
import React from "react";
import s from "./Navbar.module.scss";
import HomeLink from "../../ui/NavbarLinks/HomeLink";
import SearchLink from "../../ui/NavbarLinks/SearchLink";
import ProfileLink from "../../ui/NavbarLinks/ProfileLink";
import logout_link from "../../assets/icons/NavbarIcons/logout_link.svg";
import cooks_corner_link from "../../assets/icons/NavbarIcons/cooks_corner_link.svg"

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogOut = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <div className={s.navbar}>
      <div className={s.cooks_corner_link}>
        <img src={cooks_corner_link} alt="cooks_corner_link"/>
      </div>
      <div className={s.navbar_links}>
        <div className={s.navbar_links_top}>
          <HomeLink to={"/"} /> 
          <SearchLink to={"/search"} />
          <ProfileLink to={"/profile"} />
          <img
            src={logout_link}
            alt="logout_link"
            onClick={() => handleLogOut}
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
