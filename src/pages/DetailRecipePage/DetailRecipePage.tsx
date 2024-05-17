import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { IRecipe } from "../../interfaces/IRecipe";
import NotFoundPage from "../NotFoundPage/NotFoundPage";
import s from "./DetailRecipePage.module.scss";
import zozo from "../../assets/images/recipe_photo.png";
import back_button from "../../assets/icons/back_button.svg";
import clock from "../../assets/icons/clock_logo.svg";
import like_icon from "../../assets/icons/RecipeIcons/black/like_icon.svg";
import saving_icon from "../../assets/icons/RecipeIcons/black/saved_icon.svg";

export default function DetailRecipePage() {
  const { id } = useParams();
  const recipes = useSelector(
    (state: { recipes: { recipes: IRecipe[] } }) => state.recipes.recipes
  );
  const [detailRecipe, setDetailRecipe] = useState<IRecipe | null>(null);

  useEffect(() => {
    const foundRecipe = recipes.find(
      (recipe: IRecipe) => String(recipe.id) === id
    );
    setDetailRecipe(foundRecipe || null);
  }, []);
  return (
    <>
      {detailRecipe ? (
        <div className={s.recipe_page}>
          <Link to={"/"} className={s.back_button}>
            <img src={back_button} alt="" />
          </Link>
          <img className={s.recipe_photo} src={zozo} alt="" />
          <div className={s.recipe_content_wrapper}>
            <div className={s.recipe_author_block}>
              <h2>{detailRecipe.title}</h2>
              <p className={s.recipe_author}>by {detailRecipe.author}</p>
            </div>
            <div className={s.recipe_cooking}>
              <div className={s.recipe_cooking_time}>
                <img src={clock} alt="" /> <p>20-30 min</p>
              </div>
              <div className={s.recipe_cooking_level}>Easy</div>
            </div>
            <div className={s.recipe_raitings}>
              <div className={s.recipe_raiting_likes}>
                <img src={like_icon} alt="" />
                {detailRecipe.likes} likes
              </div>
              <div>
                <img src={saving_icon} alt="" />
                {detailRecipe.savedCount} saves
              </div>
            </div>
            <div className={s.recipe_desc}>
              <h3>Description</h3>
              <p>
                You pick up your palette knife and then work that into. Give
                your meat a good old rub. That’s it, nice and hot, hot and spicy
                meat.{" "}
                <a href={detailRecipe.cookingLink} target="_blank">
                  He-he boy...
                </a>
                You pick up your palette knife and then work that into. Give
                your meat a good old rub. That’s it, nice and hot, hot and spicy
                meat.{" "}
                <a href={detailRecipe.cookingLink} target="_blank">
                  He-he boy...
                </a>
                You pick up your palette knife and then work that into. Give
                your meat a good old rub. That’s it, nice and hot, hot and spicy
                meat.
                <a href={detailRecipe.cookingLink} target="_blank">
                  He-he boy...
                </a>
              </p>
            </div>
            <div className={s.recipe_ingredients}>
              <h3>Ingredients</h3>
              <ul>
                {detailRecipe.ingredients.map((ingredient) => (
                  <li key={ingredient.name}>
                    <p>{ingredient.name}</p>
                    <p>{ingredient.quantity}(kg/g)</p>
                  </li>
                ))}
                {/* <li>
                  <p>Chicken</p>
                  <p></p>
                </li>
                <li>
                  <p>Chicken</p>
                  <p>2kg</p>
                </li>
                <li>
                  <p>Chicken</p>
                  <p>2kg</p>
                </li> */}
              </ul>
            </div>
          </div>
        </div>
      ) : (
        <NotFoundPage />
      )}
    </>
  );
}
