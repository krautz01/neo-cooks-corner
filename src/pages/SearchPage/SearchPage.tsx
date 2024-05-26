import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useDebounce } from "@hooks/useDebounce";
import { SearchInput } from "@ui/SearchInput";
import { AppDispatch } from "@redux/store";
import { useAppSelector } from "@redux/hooks";
import {
  searchChefs,
  searchRecipes,
} from "@redux/reducers/searchSlice/searchSlice";
import { Button } from "@ui/Button";
import RecipeCard from "@components/RecipeCard/RecipeCard"
import search_icon from "@assets/icons/search_icon.svg";
import search_delete_icon from "@assets/icons/search_delete_icon.svg";
import MobileSearchRecipeCard from "@components/MobileSearchRecipeCard/MobileSearchRecipeCard";
import ChefCard from "@components/ChefCard/ChefCard";
import CreateRecipe from "@components/ModalWindows/CreateRecipe/CreateRecipe";
import s from "./SearchPage.module.scss";

const SearchPage: React.FC = () => {
  const [category, setCategory] = useState("recipes");
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const IsSmallScreen = window.innerWidth <= 426;

  const dispatch = useDispatch<AppDispatch>();
  const recipes = useAppSelector((state) => state.search.recipes);
  const chefs = useAppSelector((state) => state.search.chefs);

  const debouncedSearch = useDebounce((search: string) => {
    if (category === "recipes") {
      dispatch(searchRecipes(search));
    } else if (category === "chefs") {
      dispatch(searchChefs(search));
    } else {
      console.log("error searching");
    }
  });

  const handleFindRecipes = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    debouncedSearch(e.target.value);
  };

  return (
    <div className={s.search_page}>
      <h2>What to eat today?</h2>
      <div className={s.search_types}>
        <button
          type="button"
          className={
            category === "chefs"
              ? s.search_type_button_active
              : s.search_type_button
          }
          onClick={() => setCategory("chefs")}
        >
          Chefs
        </button>
        <button
          type="button"
          className={
            category === "recipes"
              ? s.search_type_button_active
              : s.search_type_button
          }
          onClick={() => setCategory("recipes")}
        >
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
        {category === "recipes" ? (
          recipes.length === 0 ? (
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
          )
        ) : chefs.length === 0 ? (
          <p>No results found</p>
        ) : (
          chefs
            .slice(0, 8)
            .map((chef) => (
              <ChefCard
                chefPhoto={chef.photoLink}
                name={chef.name}
                key={chef.id}
              />
            ))
        )}
      </div>
      <div className={s.add_recipe_button}>
        <Button type="button" onClick={handleOpen}>
          Add your recipe
        </Button>
        <CreateRecipe open={open} handleClose={handleClose} />
      </div>
    </div>
  );
};

export default SearchPage;
