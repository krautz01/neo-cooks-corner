import { useDispatch, useSelector } from "react-redux";
import s from "./ProfilePage.module.scss";
import user from "@assets/images/user.png";
import { AppDispatch } from "@redux/store";
import { IRecipe } from "@interfaces/IRecipe";
import RecipeCard from "@components/RecipeCard/RecipeCard";

const ProfilePage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>;
  const recipes = useSelector(
    (state: { recipes: { recipes: IRecipe[] } }) => state.recipes.recipes
  );

  const isSmallScreen = window.innerWidth < 426;
  return (
    <div className={s.profile_page}>
      <h2>Profile</h2>
      <div className={s.user_block}>
        <img src={user} alt="" className={s.user_photo} />
        <div className={s.user_raitings}>
          <div className={s.user_raiting}>
            <h2>29</h2>
            <p>Recipe</p>
          </div>
          <div className={s.user_raiting}>
            <h2>144</h2>
            <p>Followers</p>
          </div>
          <div className={s.user_raiting}>
            <h2>100</h2>
            <p>Following</p>
          </div>
        </div>
        <div className={s.user_info_bottom}>
          <div className={s.user_title}>
            <p className={s.user_title_name}>Sarthak Ranjan Hota</p>
            <p className={s.user_title_bio}>
              I'm a passionate chef who loves creating delicious dishes with
              flair.
            </p>
          </div>
          <button className={s.manage_button} type="button">
            Manage Profile
          </button>
        </div>
      </div>
      <div className={s.user_recipes_block}>
        <div className={s.user_recipes_type_buttons}>
          <button type="button">My recipe</button>
          <button type="button">Saved recipe</button>
        </div>
        <div className={s.user_recipes}>
          {recipes.length === 0 ? (
            <div></div>
          ) : (
            recipes
              .slice(0, isSmallScreen ? 4 : 8)
              .map((recipe) => <RecipeCard recipe={recipe} />)
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
