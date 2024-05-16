import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SearchInput } from "../../ui/SearchInput";
import { IRecipe } from "../../interfaces/IRecipe";
import search_icon from "../../assets/icons/search_icon.svg";
import s from "./SearchPage.module.scss";
import { searchRecipes } from "../../redux/reducers/searchSlice";
import { AppDispatch } from "../../redux/store";
import { useDebounce } from "../../hooks/useDebounce";

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
          <img src={search_icon} alt="search_icon" />
        ) : (
          <button type="submit" onClick={() => setSearchTerm("")}>
            X
          </button>
        )}
      </form>
      <div className={s.search_recipes}>
        {recipes.length ? (
          recipes.map((recipe) => <div key={recipe.id}>sddds</div>)
        ) : (
          <div>No results</div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
