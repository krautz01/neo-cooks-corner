import React from "react";
import { Link } from "react-router-dom";
import { IRecipe } from "@interfaces/IRecipe";
import { addToLikes, addToSaves } from "../../api/api";
import a from "./RecipeCard.module.scss";
import b from "./SearchCard.module.scss";
import zozo from "@assets/images/zozo.png";
import like_icon_white from "@assets/icons/RecipeIcons/white/like_icon.svg";
import saved_icon_white from "@assets/icons/RecipeIcons/white/saved_icon.svg";
import like_icon_black from "@assets/icons/RecipeIcons/black/like_icon.svg";
import saved_icon_black from "@assets/icons/RecipeIcons/black/saved_icon.svg";
/* import { useAppSelector } from "@redux/hooks"; */

interface IRecipeCardProps {
  recipe: IRecipe;
  isSearchRecipeCard?: boolean;
}
const RecipeCard: React.FC<IRecipeCardProps> = ({
  recipe,
  isSearchRecipeCard,
}) => {
  /*   const saves = useAppSelector((state) => state.auth.user?.saves); */
  const s = isSearchRecipeCard ? b : a;
  const like = isSearchRecipeCard ? like_icon_black : like_icon_white;
  const save = isSearchRecipeCard ? saved_icon_black : saved_icon_white;

  /*  const isRecipeInSaves = (id: number) => {
    const d = saves && saves.some((save) => save.id === id);
    console.log(d);
    return saves && saves.some((save) => save.id === id);
  }; */
  const handleAddOrRemoveLike = (id: number) => {
    addToLikes(id);
    /* try {
    } catch (error) {
      console.error(error);
      removeFromSaves(id);
    } */
  };

  const handleAddOrRemoveSaves = async (id: number) => {
    addToSaves(id);
    /*  try {
      if (response.data.message === "Recipe already added to like") {
        await removeFromSaves(id);
      }
    } catch (error) {
      console.error(error);
    } */
  };

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
            <img
              src={like}
              alt="like"
              onClick={() => handleAddOrRemoveLike(recipe.id)}
            />
            {recipe.likesCount}
          </p>
          <p>
            <img
              src={save}
              alt="save"
              onClick={() => handleAddOrRemoveSaves(recipe.id)}
            />
            {recipe.savesCount}
          </p>
        </div>
      </div>
    </div>
  );
};
export default RecipeCard;
