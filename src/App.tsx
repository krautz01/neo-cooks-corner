import { Route, Routes, useNavigate } from "react-router-dom";
import { useAppSelector } from "./redux/hooks";
import { fetchUser } from "@redux/reducers/authSlice/authSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@redux/store";
import { useEffect } from "react";
import { isTokenExpired } from "@utils/checkJWT";
import LoginPage from "./pages/LoginPage/LoginPage";
import HomePage from "./pages/HomePage/HomePage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import DetailRecipePage from "./pages/DetailRecipePage/DetailRecipePage";
import SearchPage from "./pages/SearchPage/SearchPage";
import AuthorPage from "./pages/AuthorPage/AuthorPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import GreetingPage from "./pages/GreetingPage/GreetingPage";
import Navbar from "./components/Navbar/Navbar";
import "./scss/App.scss";

function App() {
  const isAuth = useAppSelector((state) => state.auth.isAuth);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token != undefined) {
      isTokenExpired(token)
        ? localStorage.removeItem("token")
        : dispatch(fetchUser(token));
    } else {
      navigate("/")
    }
  }, []);

  return (
    <>
      {isAuth ? (
        <>
          <div className="navbar">
            <Navbar />
          </div>
          <div className="pages">
            <Routes>
              <Route path={"/"} element={<HomePage />} />
              <Route path={"/recipe/:id"} element={<DetailRecipePage />} />
              <Route path={"/author/:id"} element={<AuthorPage />} />
              <Route path={"/search"} element={<SearchPage />} />
              <Route path={"/profile"} element={<ProfilePage />} />
              <Route path={"/not-found"} element={<NotFoundPage />} />
            </Routes>
          </div>
        </>
      ) : (
        <div className="authpages">
          <Routes>
            <Route path={"/"} element={<GreetingPage />} />
            <Route path={"/login"} element={<LoginPage />} />
            <Route path={"/register"} element={<RegisterPage />} />
          </Routes>
        </div>
      )}
    </>
  );
}

export default App;
