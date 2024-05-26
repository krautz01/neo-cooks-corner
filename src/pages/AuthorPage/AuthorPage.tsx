import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { useAppSelector } from "@redux/hooks";
import { AppDispatch } from "@redux/store";
import React, { useEffect } from "react";
import userPhoto from "@assets/images/user.png";
import RecipeCard from "@components/RecipeCard/RecipeCard";
import s from "./AuthorPage.module.scss";
import { fetchAuthor } from "@redux/reducers/authorSlice/authorSlice";
import { followOnAuthor } from "../../api/api";
import back_button from "@assets/icons/back_button.svg";

const AuthorPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useAppSelector((state) => state.author.user);
  const { id } = useParams();
  const isSmallScreen = window.innerWidth < 426;
  useEffect(() => {
    dispatch(fetchAuthor(id));
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className={s.author_page}>
      <div className={s.author_page_top}>
        <Link to={"/"} className={s.back_button}>
          <img src={back_button} alt="" />
        </Link>
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
