import s from "./Navbar.module.scss";
import search_link from "../../assets/icons/search_link.svg";
import profile_link from "../../assets/icons/profile_link.svg";
import logout_link from "../../assets/icons/logout_link.svg";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../redux/reducers/userSlice";
import { useDispatch } from "react-redux";
import CooksCornerLink from "../../ui/CooksCornerLink";
import { useState } from "react";
import HomeLink from "../../ui/HomeLink";

export default function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogOut = () => {
    dispatch(logout());
    navigate("/");
  };

  const [touched, setTouched] = useState<boolean>(true);

  return (
    <div className={s.navbar}>
      <div className={s.cooks_corner_link}>
        <Link to={"/"} onClick={() => setTouched(!touched)}>
          <CooksCornerLink touched={touched} />
        </Link>
      </div>
      <div className={s.navbar_links}>
        <div className={s.navbar_links_top}>
          <Link to={"/"} onClick={() => setTouched(!touched)}>
            <HomeLink touched={touched} />
          </Link>
          <Link to={"/recipe-search"}>
            <img src={search_link} alt="" />
          </Link>
          <Link to={"/user-profile"}>
            <img src={profile_link} alt="" />
          </Link>
        </div>
        <img src={logout_link} alt="logout_link" onClick={() => handleLogOut} />
      </div>
    </div>
  );
}
