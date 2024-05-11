import RecipeCard from "../../components/RecipeCard/RecipeCard";
import s from "./HomePage.module.scss";

export default function HomePage() {
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
              Diiner
            </button>
          </div>
          <div className={s.recipe_cards}>
            <RecipeCard/>
            <RecipeCard/>
            <RecipeCard/>
            <RecipeCard/>
          </div>
        </div>
      </div>
    </div>
  );
}
