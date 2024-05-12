import { useEffect, useState } from "react";
import RecipeCard from "../../components/RecipeCard/RecipeCard";
import s from "./HomePage.module.scss";
/* import { useDispatch } from "react-redux"; */
import apiData from "../../utils/apiData.json";

interface IRecipe {
  photo: string;
  title: string;
  likes: number;
  category: string;
  author: string;
  savedCount: number;
}

export default function HomePage() {
  /* const dispatch = useDispatch(); */

  /* const [recipes, setRecipes] = useState<Array<object>>([]); */
  const [sortedRecipes, setSortedRecipes] = useState<IRecipe[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("breakfast");

  useEffect(() => {
    const newRecipes = apiData.filter(
      (setSortedRecipe) => setSortedRecipe.category == activeCategory
    );
    setSortedRecipes(newRecipes);
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
            {sortedRecipes.map((recipe) => (
              <RecipeCard recipe={recipe} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
