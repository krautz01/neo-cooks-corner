import React from "react";
import { Link } from "react-router-dom";
import { IRecipe } from "@interfaces/IRecipe";
import a from "./RecipeCard.module.scss";
import b from "./SearchCard.module.scss";
import zozo from "@assets/images/zozo.png";
import like_icon_white from "@assets/icons/RecipeIcons/white/like_icon.svg";
import saved_icon_white from "@assets/icons/RecipeIcons/white/saved_icon.svg";
import like_icon_black from "@assets/icons/RecipeIcons/black/like_icon.svg";
import saved_icon_black from "@assets/icons/RecipeIcons/black/saved_icon.svg";

interface IRecipeCardProps {
  recipe: IRecipe;
  isSearchRecipeCard?: boolean;
}
const RecipeCard: React.FC<IRecipeCardProps> = ({
  recipe,
  isSearchRecipeCard,
}) => {
  const s = isSearchRecipeCard ? b : a;
  const like = isSearchRecipeCard ? like_icon_black : like_icon_white;
  const save = isSearchRecipeCard ? saved_icon_black : saved_icon_white;

  const handleSetToLikes = () => {};

  return (
    <div className={s.recipe_card}>
      <Link to={`/recipe/${recipe.id}/`}>
        <img className={s.recipe_photo} src={recipe.photo || zozo} alt="" />
      </Link>
      <div className={s.recipe_card_info}>
        <p className={s.recipe_name}>{recipe.title}</p>
        <Link to={`/author/${recipe.userId}`}>
          <p className={s.recipe_author}>
            by
            {recipe.userName}
          </p>
        </Link>
        <div className={s.recipe_card_raitings}>
          <p>
            <img src={like} alt="like" onClick={() => handleSetToLikes()} />
            {recipe.likesCount}
          </p>
          <p>
            <img src={save} alt="save" />
            {recipe.savesCount}
          </p>
        </div>
      </div>
    </div>
  );
};
export default RecipeCard;
