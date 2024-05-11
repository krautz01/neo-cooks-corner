import { Route, Routes } from "react-router-dom";
import "./App.css";
import { useAppSelector } from "./redux/hooks";
import LoginPage from "./pages/LoginPage/LoginPage";
import HomePage from "./pages/HomePage/HomePage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import DetailRecipePage from "./pages/DetailRecipePage/DetailRecipePage";
import SearchPage from "./pages/SearchPage/SearchPage";
import AuthorPage from "./pages/AuthorPage/AuthorPage";
import UserProfilePage from "./pages/UserProfilePage/UserProfilePage";
import GreetingPage from "./pages/GreetingPage/GreetingPage";
import Navbar from "./components/Navbar/Navbar";

function App() {
  const isAuth = useAppSelector((state) => state.auth.isAuth);
  console.log(isAuth)
  return (
    <>
      {isAuth ? (
        <div className="nav_and_pag">
          <Navbar />
          <div>
            <Routes>
              <Route path={"/"} element={<HomePage />} />
              <Route path={"/not-found"} element={<NotFoundPage />} />
              <Route path={"/recipe-detail"} element={<DetailRecipePage />} />
              <Route path={"/recipe-author"} element={<AuthorPage />} />
              <Route path={"/recipe-search"} element={<SearchPage />} />
              <Route path={"/user-profile"} element={<UserProfilePage />} />
            </Routes>
          </div>
        </div>
      ) : (
        <Routes>
          <Route path={"/"} element={<GreetingPage />} />
          <Route path={"/login"} element={<LoginPage />} />
          <Route path={"/register"} element={<RegisterPage />} />
        </Routes>
      )}
    </>
  );
}

export default App;
