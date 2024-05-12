import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { IRecipe } from "../../interfaces/IRecipe";
import NotFoundPage from "../NotFoundPage/NotFoundPage";
import s from "./DetailRecipePage.module.scss";
import zozo from "../../assets/images/recipe_photo.png";
import back_button from "../../assets/icons/back_button.svg";
import clock from "../../assets/icons/clock_logo.svg";

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
          </div>
        </div>
      ) : (
        <NotFoundPage />
      )}
    </>
  );
}
