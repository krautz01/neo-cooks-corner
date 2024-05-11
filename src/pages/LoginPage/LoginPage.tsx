import { Link, useNavigate } from "react-router-dom";
import s from "./LoginPage.module.scss";
import { Button } from "../../ui/Button/Button";
import { Input } from "../../ui/Input/Input";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { login } from "../../redux/reducers/userSlice";

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  interface IFormValues {
    email: string;
    password: string;
  }

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
  } = useForm<IFormValues>({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data: IFormValues) => {
    console.log(data);
    dispatch(login());
    navigate("/")
    // Отправка данных на сервер или выполнение других действий после отправки формы
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
            <Input type="email" id="email" {...register("email")} />
            <p className={s.valid_error}>{errors.email?.message}</p>
          </div>
          <div className={s.input_block}>
            <label htmlFor="password">Password</label>
            <Input type="password" id="password" {...register("password")} />
            <p className={s.valid_error}>{errors.password?.message}</p>
          </div>

          <Button type="submit">Sign In</Button>
        </form>
        <div className={s.link_to_register}>
          I don't have an account?<Link to={"/register"}>Sign Up Now</Link>
        </div>
      </div>
    </div>
  );
}
