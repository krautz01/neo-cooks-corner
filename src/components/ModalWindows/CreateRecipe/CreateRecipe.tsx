import { Box, Modal } from "@mui/material";
import { useForm } from "react-hook-form";
import { createRecipe } from "@api/api";
import { IRecipe } from "@interfaces/IRecipe";
import s from "./CreateRecipe.module.scss";
import modal_close_icon from "@assets/icons/modal_close_icon.svg";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 544,
  height: 944,
  bgcolor: "background.paper",
  border: "none",
  borderRadius: "28px",
  boxShadow: 24,
  p: 3.2,
};

interface IProps {
  open: boolean;
  handleClose: () => void;
}

interface ICreateRecipe {
  recipeCreateDto: IRecipe;
  photo: FileList | null;
}

const CreateRecipe: React.FC<IProps> = ({ open, handleClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ICreateRecipe>();

  const onSubmit = async (data: ICreateRecipe) => {
    /* try {
      const response = await createRecipe(
        data.recipeCreateDto,
        data.photo ? data.photo[0] : null
      );
      console.log(response);
      handleClose(); // Закрытие модального окна после успешного обновления
    } catch (error) {
      console.error("Error creating recipe:", error);
    } */
    console.log("fdfdfsfssfs");
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
            <div className={s.form_input_block}>
              <label htmlFor="photo">Add a recipe photo</label>
              <input id="photo" type="file" {...register("photo")} />
            </div>
            <div className={s.form_input_block}>
              <label htmlFor="name">Name your recipe</label>
              <input id="name" type="text" />
            </div>
            <div className={s.form_input_block}>
              <label htmlFor="description">Add a description</label>
              <input id="description" type="text" />
            </div>
            <div className={s.form_input_block_ingr}>
              <label htmlFor="ingredient">Add an ingredient name</label>
              <input id="ingredient" type="text" />
              <label htmlFor="quantity">Add an ingredient quantity</label>
              <input id="quantity" type="text" />
            </div>
            <div className={s.form_input_block}>
              <label htmlFor="difficulty">Difficulty</label>
              <input id="difficulty" type="text" />
            </div>
            <div className={s.form_input_block}>
              <label htmlFor="category">Category of meal</label>
              <input id="category" type="text" />
            </div>
            <div className={s.form_input_block}>
              <label htmlFor="preparationTime">Preparation time</label>
              <input id="preparationTime" type="text" />
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
