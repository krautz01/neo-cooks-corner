import s from "./Navbar.module.scss";
import cooks_corner_link from "../../assets/icons/cooks_corner_link.svg";
import home_link from "../../assets/icons/home_link.svg";
import search_link from "../../assets/icons/search_link.svg";
import profile_link from "../../assets/icons/profile_link.svg";
import logout_link from "../../assets/icons/logout_link.svg";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../redux/reducers/userSlice";
import { useDispatch } from "react-redux";

export default function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogOut = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <div className={s.navbar}>
      <div className={s.cooks_corner_link}>
        <Link to={"/"}>
          <img src={cooks_corner_link} alt="cooks_corner_link" />
        </Link>
      </div>
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
        <img src={logout_link} alt="logout_link" onClick={() => handleLogOut} />
      </div>
    </div>
  );
}
