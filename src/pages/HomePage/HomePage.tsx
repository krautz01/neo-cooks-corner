import { useEffect, useState } from "react";
import RecipeCard from "../../components/RecipeCard/RecipeCard";
import s from "./HomePage.module.scss";
import { useDispatch } from "react-redux";
import apiData from "../../utils/apiData.json";

export default function HomePage() {
  const dispatch = useDispatch();

  const [recipes, setRecipes] = useState<Array<object>>([]);

  useEffect(() => {
    setRecipes(apiData);
    console.log(recipes);
  }, []);

  return (
    <div className={s.home_page}>
      <div className={s.home_page_content}>
        <div className={s.user_greeting}>Hi, Sarthak. UI Designer & Cook</div>
        <div className={s.recipe_wrapper}>
          <h2>Category</h2>
          <div className={s.recipe_categories}>
            <button className={s.recipe_category} type="button">
              Breakfast
            </button>
            <button className={s.recipe_category} type="button">
              Lunch
            </button>
            <button className={s.recipe_category} type="button">
              Dinner
            </button>
          </div>
          <div className={s.recipe_cards}>
            <RecipeCard />
            <RecipeCard />
            <RecipeCard />
            <RecipeCard />
          </div>
        </div>
      </div>
    </div>
  );
}
