import { Route, Routes } from "react-router-dom";
import { useAppSelector } from "./redux/hooks";
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
              <Route path={"/recipe/:id/author"} element={<AuthorPage />} />
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
