import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDebounce } from "@hooks/useDebounce";
import { SearchInput } from "@ui/SearchInput";
import { IRecipe } from "@interfaces/IRecipe";
import { searchRecipes } from "@redux/reducers/searchSlice/searchSlice";
import { AppDispatch } from "@redux/store";
import { Button } from "@ui/Button";
import RecipeCard from "@components/RecipeCard/RecipeCard";
import s from "./SearchPage.module.scss";
import add_recipe_icon from "@assets/icons/add_recipe_icon.svg";
import search_icon from "@assets/icons/search_icon.svg";
import search_delete_icon from "@assets/icons/search_delete_icon.svg";
import MobileSearchRecipeCard from "@components/MobileSearchRecipeCard/MobileSearchRecipeCard";

const SearchPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const recipes = useSelector(
    (state: { search: { recipes: IRecipe[] } }) => state.search.recipes
  );

  const debouncedSearch = useDebounce((search: string) => {
    dispatch(searchRecipes(search));
  });

  const handleFindRecipes = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("");
    setSearchTerm(e.target.value);
    debouncedSearch(e.target.value);
  };

  const [searchTerm, setSearchTerm] = useState("");
  const IsSmallScreen = window.innerWidth <= 426;
  console.log(IsSmallScreen);

  return (
    <div className={s.search_page}>
      <h2>What to eat today?</h2>
      <div className={s.search_types}>
        <button type="button" className={s.search_type_button}>
          Chefs
        </button>
        <button type="button" className={s.search_type_button}>
          Recipes
        </button>
      </div>
      <form className={s.search_input_block}>
        <SearchInput
          type="text"
          placeholder="Search recipes"
          value={searchTerm}
          onChange={(e) => handleFindRecipes(e)}
        />
        {searchTerm === "" ? (
          <div className={s.search_button}>
            <img src={search_icon} alt="search_icon" />
          </div>
        ) : (
          <button
            className={s.search_button}
            type="submit"
            onClick={() => setSearchTerm("")}
          >
            <img src={search_delete_icon} alt="search_icon" />
          </button>
        )}
      </form>
      <div className={s.search_recipes}>
        {recipes.length === 0 ? (
          <p>No results found</p>
        ) : (
          recipes
            .slice(0, 8)
            .map((recipe) =>
              IsSmallScreen ? (
                <MobileSearchRecipeCard
                  key={recipe.id}
                  id={recipe.id}
                  title={recipe.title}
                  photo={recipe.photo}
                />
              ) : (
                <RecipeCard
                  recipe={recipe}
                  key={recipe.id}
                  isSearchRecipeCard={true}
                />
              )
            )
        )}
      </div>
      <div
        className={s.add_recipe_button}
        style={
          IsSmallScreen
            ? recipes.length === 0
              ? { marginTop: "118%" }
              : {}
            : recipes.length === 0
            ? { marginTop: "48.5%" }
            : { marginTop: "9%" }
        }
      >
        <Button type="button">
          <img src={add_recipe_icon} alt="" />
          Add your recipe
        </Button>
      </div>
    </div>
  );
};

export default SearchPage;
