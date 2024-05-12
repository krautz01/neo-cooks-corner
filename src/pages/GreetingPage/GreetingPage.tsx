import { Link } from "react-router-dom";
import greeting_logo from "../../assets/icons/greeting_logo.svg";
import styles from "./GreetingPage.module.scss";

export default function GreetingPage() {
  return (
    <div className={styles.greeting_page}>
      <div>
        <Link to={"/login"}>
          <img src={greeting_logo} alt="Greeting logo" />
          <p>CooksCorner</p>
        </Link>
      </div>
      <div>Version 0.0.1</div>
    </div>
  );
}
