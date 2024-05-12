import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../ui/Button";
import { Input } from "../../ui/Input";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
import { login } from "../../redux/reducers/userSlice";
import * as yup from "yup";
import React from "react";
import s from "./RegisterPage.module.scss";
import visible from "../../assets/icons/visible_iconsvg.svg";
import notvisible from "../../assets/icons/notvisible_icon.svg";

interface IFormValues {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const schema = yup.object({
  username: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Please confirm your password"),
});

export default function RegisterPage() {
  const [passwordVisible, setPasswordVisible] = React.useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] =
    React.useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormValues>({
    resolver: yupResolver(schema),
    mode: "onBlur",
  });

  const onSubmit = (data: IFormValues) => {
    console.log(data);
    dispatch(login());
    navigate("/");
    // Отправка данных на сервер или выполнение других действий после отправки формы
  };

  return (
    <div className={s.register_page}>
      <div className={s.register_page_greeting}>
        <h1>Sign up for delicious</h1>
        <h1>
          <strong>Discoveries!</strong>
        </h1>
      </div>
      <div className={s.register_form_wrapper}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={s.input_block}>
            <label htmlFor="username">Name</label>
            <Input type="text" id="username" {...register("username")} placeholder="Enter yout name"/>
            <p className={s.valid_error}>{errors.username?.message}</p>
          </div>
          <div className={s.input_block}>
            <label htmlFor="email">Gmail</label>
            <Input type="email" id="email" {...register("email")} placeholder="Enter your Email"/>
            <p className={s.valid_error}>{errors.email?.message}</p>
          </div>
          <div className={s.input_block}>
            <label htmlFor="password">Password</label>
            <div className={s.input_wrapper}>
              <Input
                type={passwordVisible ? "text" : "password"}
                id="password"
                placeholder="Enter your Password"
                {...register("password")}
              />
              <button
                type="button"
                onClick={() => setPasswordVisible(!passwordVisible)}
              >
                <img src={passwordVisible ? visible : notvisible} alt="eye" />
              </button>
            </div>
            <p className={s.valid_error}>{errors.password?.message}</p>
          </div>
          <div className={s.input_block}>
            <label htmlFor="password">Re-Password</label>
            <div className={s.input_wrapper}>
              <Input
                type={passwordVisible ? "text" : "password"}
                id="confirmPassword"
                placeholder="Re-Enter yout Password"
                {...register("confirmPassword")}
              />
              <button
                onClick={() =>
                  setConfirmPasswordVisible(!confirmPasswordVisible)
                }
                type="button"
              >
                <img
                  src={confirmPasswordVisible ? visible : notvisible}
                  alt="eye"
                />
              </button>
            </div>
            <p className={s.valid_error}>{errors.confirmPassword?.message}</p>
          </div>
          <Button type="submit">Sign In</Button>
        </form>
        <div className={s.link_to_register}>
          Already have an account?<Link to={"/login"}>Sign In Now</Link>
        </div>
      </div>
    </div>
  );
}
