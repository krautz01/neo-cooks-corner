import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector } from "@redux/hooks";
import { AppDispatch } from "@redux/store";
import { logOut } from "@redux/reducers/authSlice/authSlice";
import React, { useEffect } from "react";
import userPhoto from "@assets/images/user.png";
import RecipeCard from "@components/RecipeCard/RecipeCard";
import logout_icon from "@assets/icons/NavbarIcons/logout_icon.svg";
import s from "./AuthorPage.module.scss";
import { fetchAuthor } from "@redux/reducers/authorSlice/authorSlice";
import { followOnAuthor } from "../../api/api";

const AuthorPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.author.user);
  const { id } = useParams();
  const isSmallScreen = window.innerWidth < 426;
  useEffect(() => {
    dispatch(fetchAuthor(id));
  }, []);

  const handleLogOut = () => {
    navigate("/");
    dispatch(logOut());
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className={s.profile_page}>
      <div className={s.profile_page_top}>
        <h2>Profile</h2>
        {isSmallScreen ? (
          <img src={logout_icon} alt="logout" onClick={() => handleLogOut()} />
        ) : (
          ""
        )}
      </div>
      <div className={s.user_block}>
        <img
          src={user.photoLink || userPhoto}
          alt=""
          className={s.user_photo}
        />
        <div className={s.user_raitings}>
          <div className={s.user_raiting}>
            <h2>{user.recipes.length}</h2>
            <p>Recipe</p>
          </div>
          <div className={s.user_raiting}>
            <h2>{user.followersCount}</h2>
            <p>Followers</p>
          </div>
          <div className={s.user_raiting}>
            <h2>{user.followingsCount}</h2>
            <p>Following</p>
          </div>
        </div>
        <div className={s.user_info_bottom}>
          <div className={s.user_title}>
            <p className={s.user_title_name}>{user.name}</p>
            <p className={s.user_title_bio}>
              {user.description || "No description"}
            </p>
          </div>
          <button
            className={s.manage_button}
            type="button"
            onClick={() => followOnAuthor(user.id)}
          >
            Follow
          </button>
        </div>
      </div>
      <div className={s.user_recipes_block}>
        <div className={s.user_recipes}>
          {user.recipes.length === 0 ? (
            <div>No own recipes</div>
          ) : (
            user.recipes
              .slice(0, isSmallScreen ? 4 : 8)
              .map((recipe) => <RecipeCard recipe={recipe} />)
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthorPage;
