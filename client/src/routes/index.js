import BlankLayout from "layouts/BlankLayout";
import AccountPage from "pages/AccountPage";
import Jobs from "pages/Jobs";
import LoginPage from "pages/LoginPage";
import NotFoundPage from "pages/NotFoundPage";
import PostJob from "features/job/PostJob";
import RegisterPage from "pages/RegisterPage";
import UserProfilePage from "pages/UserProfilePage";
import React from "react";
import { Route, Routes } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import HomePage from "../pages/HomePage";
import AuthRequire from "./AuthRequire";
import DetailsJobPage from "pages/DetailsJobPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="jobs" element={<Jobs />} />
        <Route path="job/:jobId" element={<DetailsJobPage />} />
      </Route>
      <Route
        path="/"
        element={
          <AuthRequire>
            <MainLayout />
          </AuthRequire>
        }
      >
        <Route path="post_job" element={<PostJob />} />
        <Route path="account" element={<AccountPage />} />
        <Route path="user/:userId" element={<UserProfilePage />} />
      </Route>
      <Route path="/" element={<BlankLayout />}>
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
