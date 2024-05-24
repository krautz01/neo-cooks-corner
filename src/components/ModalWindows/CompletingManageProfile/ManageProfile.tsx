import { Box, Modal } from "@mui/material";
import { Button } from "@ui/Button";
import { Input } from "@ui/Input";
/* import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup"; */
import { useForm } from "react-hook-form";
import { manageProfile, changeProfile } from "../../../api/api";
import React from "react";
import modal_close_icon from "@assets/icons/modal_close_icon.svg";
import s from "./ManageProfile.module.scss";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 544,
  height: 564,
  bgcolor: "background.paper",
  border: "none",
  borderRadius: "28px",
  boxShadow: 24,
  p: 3.2,
};

interface IProps {
  open: boolean;
  desc: string | null;
  handleClose: () => void;
}

interface IManageProfile {
  name: string;
  description: string;
  photo: FileList | null;
}

const ManageProfile: React.FC<IProps> = ({ open, handleClose, desc }) => {
  /* const schema = yup.object({
    name: yup.string().required("Name is required"),
    description: yup
      .string()
      .min(20, "Description must be at least 20 characters")
      .required("Description is required"),
    photo: yup
      .mixed()
      .nullable()
      .test(
        "fileSize",
        "The file is too large",
        (value) => !value || (value && value.size <= 2000000) 
      )
      .test(
        "fileType",
        "Unsupported File Format",
        (value) => !value || (value && ["image/png"].includes(value.type))
      ),
  }); */

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<IManageProfile>(/* {
    resolver: yupResolver(schema),
  } */);

  const onSubmit = async (data: IManageProfile) => {
    try {
      /* const response = await manageProfile(
        data.name,
        data.description,
        data.photo ? data.photo[0] : null
      ); */
      const response = await changeProfile(
        data.name,
        data.description,
        data.photo ? data.photo[0] : null
      );
      console.log(response);
      handleClose(); // Закрытие модального окна после успешного обновления
    } catch (error) {
      console.error("Error updating profile:", error);
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
          className={s.manage_profil_form}
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className={s.form_top}>
            <h2>Manage profil</h2>
            <img src={modal_close_icon} alt="" onClick={handleClose} />
          </div>
          <div className={s.input_block_name}>
            <label htmlFor="name">Change your name</label>
            <input id="name" type="text" {...register("name")} />
            <p className={s.valid_error}>{errors.name?.message}</p>
          </div>
          <div className={s.input_block_bio}>
            <label htmlFor="description">Change your bio</label>
            <Input
              id="description"
              type="text"
              placeholder={desc || ""}
              {...register("description")}
            />
            <p className={s.valid_error}>{errors.description?.message}</p>
          </div>
          <div className={s.input_block_photo}>
            <label htmlFor="photo">Change your photo</label>
            <Input
              id="photo"
              type="file"
              accept="image/png"
              placeholder="Upload a new photo"
              {...register("photo")}
              /* onChange={(e) => {
                const file = e.target.files?.[0] || null;
                setValue("photo", file);
              }} */
            />
            <p className={s.valid_error}>{errors.photo?.message}</p>
          </div>
          <div className={s.button_block}>
            <Button type="submit">Save changes</Button>
          </div>
        </form>
      </Box>
    </Modal>
  );
};

export default ManageProfile;
