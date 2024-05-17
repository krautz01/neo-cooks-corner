import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDebounce } from "@hooks/useDebounce";
import { SearchInput } from "@ui/SearchInput";
import { IRecipe } from "@interfaces/IRecipe";
import { searchRecipes } from "@redux/reducers/searchSlice";
import { AppDispatch } from "@redux/store";
import RecipeCard from "@components/RecipeCard/RecipeCard";
import search_icon from "@assets/icons/search_icon.svg";
import search_delete_icon from "@assets/icons/search_delete_icon.svg";
import s from "./SearchPage.module.scss";

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

  return (
    <div className={s.search_page}>
      <h2>What to eat today?</h2>
      <button type="button">Recipes</button>
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
        {recipes.length ? (
          recipes.map((recipe) => (
            <RecipeCard
              recipe={recipe}
              key={recipe.id}
              isSearchRecipeCard={true}
            />
          ))
        ) : (
          <div>No results found</div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
