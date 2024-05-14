import s from "./RecipeCard.module.scss";
import zozo from "../../assets/images/zozo.png";
import like_icon from "../../assets/icons/like_icon.svg";
import saved_icon from "../../assets/icons/saved_icon.svg";
import React from "react";
import { Link } from "react-router-dom";
import { IRecipe } from "../../interfaces/IRecipe";

interface IRecipeCardProps {
  recipe: IRecipe;
}

const RecipeCard: React.FC<IRecipeCardProps> = ({ recipe }) => {
  return (
    <Link to={`/recipe/${recipe.id}/`} key={recipe.id}>
      <div
        className={s.recipe_card}
        style={{ backgroundImage: `url(${zozo})` }}
      >
        <div className={s.recipe_card_info}>
          <p className={s.recipe_name}>{recipe.title}</p>
          <p className={s.recipe_author}>by {recipe.author}</p>
          <div className={s.recipe_card_raitings}>
            <p>
              <img src={like_icon} alt="like" />
              {recipe.likes}
            </p>
            <p>
              <img src={saved_icon} alt="save" />
              {recipe.savedCount}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};
export default RecipeCard;
