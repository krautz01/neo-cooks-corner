import { Link, useNavigate } from "react-router-dom";
import { Button } from "@ui/Button.tsx";
import { Input } from "@ui/Input.tsx";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
import { registerUser } from "@redux/reducers/authSlice/authSlice";
import { AppDispatch } from "@redux/store";
import { IRegisterFormValues } from "./interface";
import React from "react";
import * as yup from "yup";
import s from "./RegisterPage.module.scss";
import visible from "@assets/icons/visible_iconsvg.svg";
import notvisible from "@assets/icons/notvisible_icon.svg";
import email_icon from "@assets/icons/FormIcons/email_icon.svg";
import user_icon from "@assets/icons/FormIcons/user_icon.svg";

const schema = yup.object({
  name: yup.string().required("Name is required"),
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

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegisterFormValues>({
    resolver: yupResolver(schema),
    mode: "onBlur",
  });

  const onSubmit = (data: IRegisterFormValues) => {
    dispatch(registerUser(data)).then((action) => {
      if (registerUser.fulfilled.match(action)) {
        navigate("/login"); // Перенаправление при успешном входе
        alert("Success");
      } else {
        console.error("Login failed", action.payload);
        alert("Register failed");
      }
    });
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
            <label htmlFor="name">Name</label>
            <div className={s.input_wrapper}>
              <Input
                type="text"
                id="name"
                {...register("name")}
                placeholder="Enter yout name"
              />
              <button type="button">
                <img src={user_icon} alt="user_icon" />
              </button>
            </div>
            <p className={s.valid_error}>{errors.name?.message}</p>
          </div>
          <div className={s.input_block}>
            <label htmlFor="email">Gmail</label>
            <div className={s.input_wrapper}>
              <Input
                type="email"
                id="email"
                {...register("email")}
                placeholder="Enter your Email"
              />
              <button type="button">
                <img src={email_icon} alt="email_icon" />
              </button>
            </div>
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
                type={confirmPasswordVisible ? "text" : "password"}
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
          Already have an account? <Link to={"/login"}>Sign In Now</Link>
        </div>
      </div>
    </div>
  );
}
