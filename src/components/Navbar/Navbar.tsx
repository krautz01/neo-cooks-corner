import s from "./Navbar.module.scss";
import cooks_corner_link from "../../assets/icons/cooks_corner_link.svg";
import home_link from "../../assets/icons/home_link.svg";
import search_link from "../../assets/icons/search_link.svg";
import profile_link from "../../assets/icons/profile_link.svg";
import logout_link from "../../assets/icons/logout_link.svg";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className={s.navbar}>
      <Link to={"/"}>
        <img src={cooks_corner_link} alt="cooks_corner_link" />
      </Link>
      <div className={s.navbar_links}>
        <div className={s.navbar_links_top}>
          <Link to={"/"}>
            <img src={home_link} alt="" />
          </Link>
          <Link to={"/recipe-search"}>
            <img src={search_link} alt="" />
          </Link>
          <Link to={"/user-profile"}>
            <img src={profile_link} alt="" />
          </Link>
        </div>
        <Link to={"/login"}>
          <img src={logout_link} alt="" />
        </Link>
      </div>
    </div>
  );
}
