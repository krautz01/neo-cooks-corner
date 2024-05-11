import { Link } from "react-router-dom";
import s from "./LoginPage.module.scss";
import { Button } from "../../components/Button/Button";
import { Input } from "../../components/Input/Input";

export default function LoginPage() {
  return (
    <div className={s.login_page}>
      <div className={s.login_page_greeting}>
        <h1>Welcome Back</h1>
        <h1>To CooksCorner</h1>
      </div>
      <div className={s.login_form_wrapper}>
        <form>
          <label htmlFor="email">Email</label>
          <Input type="email" id="email" />
          <label htmlFor="password">Password</label>
          <Input type="password" id="password" />
          <Button type="submit">Sign In</Button>
        </form>
        <div className={s.link_to_register}>
          I don't have an account?<Link to={"/register"}>Sign Up Now</Link>
        </div>
      </div>
    </div>
  );
}
