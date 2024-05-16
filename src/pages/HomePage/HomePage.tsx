import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecipes } from "../../redux/reducers/recipeSlice";
import { AppDispatch } from "../../redux/store";
import { IRecipe } from "../../interfaces/IRecipe";
import RecipeCard from "../../components/RecipeCard/RecipeCard";
import s from "./HomePage.module.scss";

export default function HomePage() {
  const dispatch = useDispatch<AppDispatch>();
  const recipes = useSelector(
    (state: { recipes: { recipes: IRecipe[] } }) => state.recipes.recipes
  );
  const category = useSelector(
    (state: { recipes: { category: "lunch" | "breakfast" | "dinner" } }) =>
      state.recipes.category
  );
  useEffect(() => {
    dispatch(fetchRecipes(category));
  }, []);

  return (
    <div className={s.home_page}>
      <div className={s.home_page_content}>
        <div className={s.user_greeting}>Hi, Sarthak. UI Designer & Cook</div>
        <div className={s.recipe_wrapper}>
          <h2>Category</h2>
          <div className={s.recipe_categories}>
            <button
              type="button"
              className={
                category === "breakfast"
                  ? s.recipe_category_active
                  : s.recipe_category
              }
              onClick={() => dispatch(fetchRecipes("breakfast"))}
            >
              Breakfast
            </button>
            <button
              type="button"
              className={
                category === "lunch"
                  ? s.recipe_category_active
                  : s.recipe_category
              }
              onClick={() => dispatch(fetchRecipes("lunch"))}
            >
              Lunch
            </button>
            <button
              type="button"
              className={
                category === "dinner"
                  ? s.recipe_category_active
                  : s.recipe_category
              }
              onClick={() => dispatch(fetchRecipes("dinner"))}
            >
              Dinner
            </button>
          </div>
          <div className={s.recipe_cards}>
            {recipes.length > 0 &&
              recipes.map((recipe) => (
                <RecipeCard recipe={recipe} key={recipe.id} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
