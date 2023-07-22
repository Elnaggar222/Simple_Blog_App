import { Navigate, Route, Routes } from "react-router-dom";
import DefaultLayout from "../Layouts/DefaultLayout";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import Blogs from "../pages/Blog/Blogs";
import NewPost from "../pages/Blog/NewPost";
import Article from "../pages/Blog/Article";
import AuthLayout from "../Layouts/AuthLayout";
import Login from "../pages/auth/Login";
import SignUp from "../pages/auth/SignUp";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

const MainRoutes = () => {
  const { isAuth } = useContext(AuthContext);
  console.log("isAuth is ",isAuth)

  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route index element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Route>

      <Route path="/blogs" element={<DefaultLayout />}>
        <Route index element={<Blogs />} />
        {isAuth && (
          <Route path="new" element={<NewPost />} />
        )}
        {!isAuth && (
          <Route path="new" element={<Navigate to="/login" replace />} />
        )}
       <Route path=":slug" element={<Article />} />
      </Route>

      <Route path="/" element={<AuthLayout />}>
        {!isAuth && (
          <Route path="login" element={<Login />} />
        )}
        {isAuth && (
          <Route path="login" element={<Navigate to="/blogs" replace />} />
        )}
        {!isAuth ? (
          <Route path="signUp" element={<SignUp />} />
        ) : (
          <Route path="signUp" element={<Navigate to="/blogs" replace />} />
        )}
      </Route>
    </Routes>
  );
};

export default MainRoutes;
