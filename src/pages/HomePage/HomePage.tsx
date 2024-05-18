import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecipes } from "../../redux/reducers/recipeSlice/recipeSlice";
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
    (state: { recipes: { category: "LUNCH" | "BREAKFAST" | "DINNER" } }) =>
      state.recipes.category
  );
  useEffect(() => {
    dispatch(fetchRecipes(category));
  }, []);

  const isSmallScreen = window.innerWidth < 426;

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
                category === "BREAKFAST"
                  ? s.recipe_category_active
                  : s.recipe_category
              }
              onClick={() => dispatch(fetchRecipes("BREAKFAST"))}
            >
              Breakfast
            </button>
            <button
              type="button"
              className={
                category === "LUNCH"
                  ? s.recipe_category_active
                  : s.recipe_category
              }
              onClick={() => dispatch(fetchRecipes("LUNCH"))}
            >
              Lunch
            </button>
            <button
              type="button"
              className={
                category === "DINNER"
                  ? s.recipe_category_active
                  : s.recipe_category
              }
              onClick={() => dispatch(fetchRecipes("DINNER"))}
            >
              Dinner
            </button>
          </div>
          <div className={s.recipe_cards}>
            {recipes.length > 0 &&
              recipes
                .slice(0, isSmallScreen ? 4 : 12)
                .map((recipe) => (
                  <RecipeCard recipe={recipe} key={recipe.id} />
                ))}
          </div>
        </div>
      </div>
    </div>
  );
}
