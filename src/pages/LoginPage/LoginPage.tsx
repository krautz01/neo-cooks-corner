import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@ui/Button";
import { Input } from "@ui/Input";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginUser } from "@redux/reducers/authSlice/authSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@redux/store";
import { ILoginFormValues } from "./interface";
import * as yup from "yup";
import s from "./LoginPage.module.scss";
import visible from "@assets/icons/visible_iconsvg.svg";
import notvisible from "@assets/icons/notvisible_icon.svg";
import email_icon from "@assets/icons/FormIcons/email_icon.svg";

export default function LoginPage() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [passwordVisible, setPasswordVisible] = React.useState(false);

  const schema = yup.object({
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup
      .string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginFormValues>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: ILoginFormValues) => {
    dispatch(loginUser(data)).then((action) => {
      if (loginUser.fulfilled.match(action)) {
        navigate("/"); 
        console.log("Success");
      } else {
        console.log("Login failed");
      }
    });
  };
  return (
    <div className={s.login_page}>
      <div className={s.login_page_greeting}>
        <h1>Welcome Back</h1>
        <h1>
          To <strong>CooksCorner</strong>
        </h1>
      </div>
      <div className={s.login_form_wrapper}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={s.input_block}>
            <label htmlFor="email">Email</label>
            <div className={s.input_wrapper}>
              <Input
                type="email"
                id="email"
                placeholder="Enter your Email"
                {...register("email")}
              />
              <button type="button">
                <img src={email_icon} alt="eye" />
              </button>
            </div>
            <p className={s.valid_error}>{errors.email?.message}</p>
          </div>
          <div className={s.input_block}>
            <label htmlFor="password">Password</label>
            <div className={s.input_wrapper}>
              <Input
                type={passwordVisible ? "text" : "password"}
                placeholder="Enter your Password"
                id="password"
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
          <Button type="submit">Sign In</Button>
        </form>
        <div className={s.link_to_register}>
          I don't have an account? <Link to={"/register"}>Sign Up Now</Link>
        </div>
      </div>
    </div>
  );
}
