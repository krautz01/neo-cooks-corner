import { Link } from "react-router-dom";
import s from "./RegisterPage.module.scss";
import { Button } from "../../ui/Button/Button";
import { Input } from "../../ui/Input/Input";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormValues>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: IFormValues) => {
    console.log(data);
   
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
            <Input type="text" id="username" {...register("username")} />
            <p className={s.valid_error}>{errors.username?.message}</p>
          </div>
          <div className={s.input_block}>
            <label htmlFor="email">Gmail</label>
            <Input type="email" id="email" {...register("email")} />
            <p className={s.valid_error}>{errors.email?.message}</p>
          </div>
          <div className={s.input_block}>
            <label htmlFor="password">Password</label>
            <Input type="password" id="password" {...register("password")} />
            <p className={s.valid_error}>{errors.password?.message}</p>
          </div>
          <div className={s.input_block}>
            <label htmlFor="password">Re-Password</label>
            <Input
              type="password"
              id="confirmPassword"
              {...register("confirmPassword")}
            />
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
