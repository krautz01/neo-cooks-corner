import { useEffect, useState } from "react";
import RecipeCard from "../../components/RecipeCard/RecipeCard";
import s from "./HomePage.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecipes } from "../../redux/reducers/recipeSlice";
import { AppDispatch } from "../../redux/store";
import { IRecipe } from "../../interfaces/IRecipe";

export default function HomePage() {
  const dispatch = useDispatch<AppDispatch>();
  const recipes = useSelector(
    (state: { recipes: { recipes: IRecipe[] } }) => state.recipes.recipes
  );

  const [sortedRecipes, setSortedRecipes] = useState<IRecipe[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("");

  useEffect(() => {
    dispatch(fetchRecipes());
    setActiveCategory("breakfast");
  }, []);

  useEffect(() => {
    const newRecipes = recipes.filter(
      (recipe: IRecipe) => recipe.category == activeCategory
    );
    setSortedRecipes(newRecipes);
    console.log(newRecipes);
  }, [activeCategory]);

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
                activeCategory == "breakfast"
                  ? s.recipe_category_active
                  : s.recipe_category
              }
              onClick={() => setActiveCategory("breakfast")}
            >
              Breakfast
            </button>
            <button
              type="button"
              className={
                activeCategory == "lunch"
                  ? s.recipe_category_active
                  : s.recipe_category
              }
              onClick={() => setActiveCategory("lunch")}
            >
              Lunch
            </button>
            <button
              type="button"
              className={
                activeCategory == "dinner"
                  ? s.recipe_category_active
                  : s.recipe_category
              }
              onClick={() => setActiveCategory("dinner")}
            >
              Dinner
            </button>
          </div>
          <div className={s.recipe_cards}>
            {sortedRecipes.length > 0 &&
              sortedRecipes.map((recipe) => (
                <RecipeCard recipe={recipe} key={recipe.id} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
