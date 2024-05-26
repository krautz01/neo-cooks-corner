import { Box, Modal } from "@mui/material";
import { useForm, useFieldArray } from "react-hook-form";
import s from "./CreateRecipe.module.scss";
import modal_close_icon from "@assets/icons/modal_close_icon.svg";
import add_recipe_icon from "@assets/icons/add_recipe_icon.svg";
import { createRecipe } from "../../../api/api";


interface IProps {
  open: boolean;
  handleClose: () => void;
}

interface IIngredients {
  name: string;
  quantity: string;
  unit: string;
}

export interface ICreateRecipe {
  title: string;
  description: string;
  photo: FileList | null;
  ingredientsList: IIngredients[];
  difficulty: string;
  category: string;
  youtubeLink: string;
  preparationTime: string;
}

const units = ["kg", "g", "ml", "to taste", "pieces", "tbsp"];

const CreateRecipe: React.FC<IProps> = ({ open, handleClose }) => {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<ICreateRecipe>({
    defaultValues: {
      ingredientsList: [{ name: " ", quantity: " ", unit: units[0] }],
      difficulty: "EASY",
    },
  });
  
  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    border: "none",
    borderRadius: "28px",
    boxShadow: 24,
    p: 3.2,
  };

  const { fields, append, remove } = useFieldArray({
    control,
    name: "ingredientsList",
  });

  const onSubmit = async (data: ICreateRecipe) => {
    try {
      const formattedIngredients = data.ingredientsList.map(
        ({ name, quantity, unit }) => ({
          name,
          quantity: `${quantity} ${unit}`,
        })
      );
      const recipeData = {
        title: data.title,
        description: data.description,
        ingredientsList: formattedIngredients,
        difficulty: data.difficulty,
        category: data.category,
        youtubeLink: data.youtubeLink,
        preparationTime: data.preparationTime,
      };
      console.log(recipeData);
      const response = await createRecipe(
        recipeData,
        data.photo ? data.photo[0] : null
      );
      console.log(response);
      /*  handleClose();  */
    } catch (error) {
      console.error("Error creating recipe:", error);
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <form
          className={s.create_recipe_form}
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className={s.form_top}>
            <h2>Create recipe</h2>
            <img src={modal_close_icon} alt="" onClick={handleClose} />
          </div>
          <div className={s.form_inner_wrapper}>
            <div className={s.form_inner_wrapper_top}>
              <div className={s.form_input_block_photo}>
                <label htmlFor="photo">Add a recipe photo</label>
                <input
                  id="photo"
                  type="file"
                  accept="image/png"
                  placeholder="Upload a new photo"
                  {...register("photo")}
                />
              </div>
              <div className={s.form_input_block_title}>
                <label htmlFor="title">Name your recipe</label>
                <input
                  id="title"
                  type="text"
                  {...register("title", { required: true })}
                />
                {errors.title && (
                  <p className={s.error_message}>
                    Это поле обязательно для заполнения
                  </p>
                )}
              </div>
              <div className={s.form_input_block_desc}>
                <label htmlFor="description">Add a description</label>
                <input
                  id="description"
                  type="text"
                  {...register("description", { required: true })}
                />
                {errors.description && (
                  <p className={s.error_message}>
                    Это поле обязательно для заполнения
                  </p>
                )}
              </div>
            </div>
            <div className={s.form_input_block_ingr}>
              <label>Add an ingredient</label>
              {fields.map((item, index) => (
                <div key={item.id} className={s.ingredient_item}>
                  <input
                    className={s.ingredient_item_title}
                    placeholder="Ingredient name"
                    {...register(`ingredientsList.${index}.name`, {
                      required: true,
                    })}
                  />
                  <div className={s.ingredient_quantity_wrapper}>
                    <input
                      className={s.ingredient_item_quantity}
                      placeholder={getValues(
                        `ingredientsList.${index}.quantity`
                      )}
                      {...register(`ingredientsList.${index}.quantity`, {
                        required: true,
                      })}
                    />
                    <select
                      className={s.ingredient_item_unit}
                      {...register(`ingredientsList.${index}.unit`, {
                        required: true,
                      })}
                    >
                      {units.map((unit) => (
                        <option key={unit} value={unit}>
                          {unit}
                        </option>
                      ))}
                    </select>
                  </div>
                  {/* <input
                    className={s.ingredient_item_quantity}
                    placeholder="Quantity"
                    {...register(`ingredients.${index}.quantity`, {
                      required: true,
                    })}
                  /> */}
                  {index > 0 ? (
                    <button
                      className={s.ingredient_item_action_button}
                      type="button"
                      onClick={() => remove(index)}
                    >
                      Удалить
                    </button>
                  ) : (
                    <button
                      className={s.ingredient_item_action_button}
                      type="button"
                      onClick={() =>
                        append({ name: "", quantity: "", unit: units[0] })
                      }
                    >
                      <img src={add_recipe_icon} alt="add_recipe_icon" />
                    </button>
                  )}
                </div>
              ))}
            </div>
            <div className={s.form_input_block}>
              <label htmlFor="category">Category of meal</label>
              {/* <input
                id="category"
                type="text"
                {...register("category", { required: true })}
              /> */}
              <select
                id="category"
                {...register("category", { required: true })}
              >
                <option value="">Choose a category</option>
                <option value="BREAKFAST">Breakfast</option>
                <option value="LUNCH">Lunch</option>
                <option value="DINNER">Dinner</option>
              </select>
              {errors.category && (
                <p className={s.error_message}>
                  Это поле обязательно для заполнения
                </p>
              )}
            </div>
            <div className={s.form_difficulty_block}>
              <label htmlFor="difficulty">Difficulty</label>
              <div className={s.difficulty_buttons}>
                <button
                  type="button"
                  className={
                    getValues("difficulty") === "Easy"
                      ? s.difficulty_active
                      : s.difficulty
                  }
                  onClick={() => setValue("difficulty", "EASY")}
                >
                  Easy
                </button>
                <button
                  type="button"
                  className={
                    getValues("difficulty") === "Medium"
                      ? s.difficulty_active
                      : s.difficulty
                  }
                  onClick={() => setValue("difficulty", "MEDIUM")}
                >
                  Medium
                </button>
                <button
                  type="button"
                  className={
                    getValues("difficulty") === "Hard"
                      ? s.difficulty_active
                      : s.difficulty
                  }
                  onClick={() => setValue("difficulty", "HARD")}
                >
                  Hard
                </button>
              </div>
              {/* <input
                id="category"
                type="text"
                {...register("category", { required: true })}
              /> */}
              {errors.difficulty && (
                <p className={s.error_message}>
                  Это поле обязательно для заполнения
                </p>
              )}
            </div>
            <div className={s.form_input_block}>
              <label htmlFor="youtubeLink">Add YouTube link</label>
              <input
                id="youtubeLink"
                type="text"
                {...register("youtubeLink", { required: true })}
              />
              {errors.youtubeLink && (
                <p className={s.error_message}>
                  Это поле обязательно для заполнения
                </p>
              )}
            </div>
            <div className={s.form_input_block}>
              <label htmlFor="preparationTime">Preparation time</label>
              <input
                id="preparationTime"
                type="text"
                {...register("preparationTime", { required: true })}
              />
              {errors.preparationTime && (
                <p className={s.error_message}>
                  Это поле обязательно для заполнения
                </p>
              )}
            </div>
          </div>
          <button type="submit" className={s.submit_button}>
            Create a recipe
          </button>
        </form>
      </Box>
    </Modal>
  );
};

export default CreateRecipe;
