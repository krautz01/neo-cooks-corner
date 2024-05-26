import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@redux/store";
import { fetchRecipesById } from "@redux/reducers/recipeSlice/recipeSlice";
import { useAppSelector } from "@redux/hooks";
/* import {
  addToLikes,
  addToSaves,
  removeFromLikes,
  removeFromSaves,
} from "../../api/api"; */
import NotFoundPage from "../NotFoundPage/NotFoundPage";
import s from "./DetailRecipePage.module.scss";
import zozo from "@assets/images/recipe_photo.png";
import back_button from "@assets/icons/back_button.svg";
import clock from "@assets/icons/clock_logo.svg";
import like_icon from "@assets/icons/RecipeIcons/black/like_icon.svg";
import saving_icon from "@assets/icons/RecipeIcons/black/saved_icon.svg";

export default function DetailRecipePage() {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const recipeById = useAppSelector((state) => state.recipes.recipeById);

  useEffect(() => {
    dispatch(fetchRecipesById(id));
  }, []);

  const handleAddOrRemoveLike = async (id: number) => {
    /* try {
      const response = await addToLikes(id);
      if (response.data.message === "Recipe already added to like") {
        await removeFromLikes(id);
      }
    } catch (error) {
      console.error(error);
    } */
    console.log(id);
  };

  const handleAddOrRemoveSaves = async (id: number) => {
    /*   try {
      const response = await addToSaves(id);
      if (response.data.message === "Recipe already added to like") {
        await removeFromSaves(id);
      }
    } catch (error) {
      console.error(error);
    } */
    console.log(id);
  };
  return (
    <>
      {recipeById ? (
        <div className={s.recipe_page}>
          <Link to={"/"} className={s.back_button}>
            <img src={back_button} alt="back" />
          </Link>
          <img
            className={s.recipe_photo}
            src={recipeById.photo || zozo}
            alt="recipe"
          />
          <div className={s.recipe_content_wrapper}>
            <div className={s.recipe_author_block}>
              <h2>{recipeById.title}</h2>
              <Link to={`/author/${recipeById.userId}`}>
                <p className={s.recipe_author}>by {recipeById.userName}</p>
              </Link>
            </div>
            <div className={s.recipe_cooking}>
              <div className={s.recipe_cooking_time}>
                <img src={clock} alt="clock" />
                <p>{recipeById.preparationTime}</p>
              </div>
              <div className={s.recipe_cooking_level}>
                {recipeById.difficulty}
              </div>
            </div>
            <div className={s.recipe_raitings}>
              <div className={s.recipe_raiting_likes}>
                <img
                  src={like_icon}
                  alt="like"
                  onClick={() => handleAddOrRemoveLike(recipeById.id)}
                />
                {recipeById.likesCount} likes
              </div>
              <div>
                <img
                  src={saving_icon}
                  alt="save"
                  onClick={() => handleAddOrRemoveSaves(recipeById.id)}
                />
                {recipeById.savesCount} saves
              </div>
            </div>
            <div className={s.recipe_desc}>
              <h3>Description</h3>
              <p>
                You pick up your palette knife and then work that into. Give
                your meat a good old rub. That's it, nice and hot, hot and spicy
                meat.{" "}
                <a href={recipeById.youtubeLink} target="_blank">
                  He-he boy...
                </a>
                You pick up your palette knife and then work that into. Give
                your meat a good old rub. That's it, nice and hot, hot and spicy
                meat.{" "}
                <a href={recipeById.youtubeLink} target="_blank">
                  He-he boy...
                </a>
                You pick up your palette knife and then work that into. Give
                your meat a good old rub. That's it, nice and hot, hot and spicy
                meat.
                <a href={recipeById.youtubeLink} target="_blank">
                  He-he boy...
                </a>
              </p>
            </div>
            <div className={s.recipe_ingredients}>
              <h3>Ingredients</h3>
              <ul>
                {recipeById.ingredients.map((ingredient) => (
                  <li key={ingredient.name}>
                    <p>{ingredient.name}</p>
                    <p>{ingredient.quantity}</p>
                  </li>
                ))}
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
