// src/routes/router.jsx
import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layouts/RootLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import AuthLayout from "../layouts/AuthLayout";

import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";

import Home from "../pages/Home/Home";
import PublicLessons from "../pages/Lessons/PublicLessons";
import LessonDetails from "../pages/Lessons/LessonDetails";

import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";

import AddLesson from "../pages/Lessons/AddLesson";
import UpdateLesson from "../pages/Lessons/UpdateLesson";
import MyLesson from "../pages/Lessons/MyLesson";

import MyFavorites from "../pages/Favorites/MyFavorites";

import Pricing from "../pages/Pricing/Pricing";
import PaymentSuccess from "../pages/Payment/PaymentSuccess";
import PaymentCancel from "../pages/Payment/PaymentCancel";

import NotFound from "../pages/Error/NotFound";
import AccessDenied from "../pages/Error/AccessDenied";
import UserHome from "../pages/Dashborad/UserHome";
import AdminHome from "../pages/Dashborad/AdminHome";
import ManageUsers from "../pages/Dashborad/ManageUsers";
import ManageLessons from "../pages/Dashborad/ManageLessons";
import ReportedLessons from "../pages/Dashborad/ReportedLessons";

const router = createBrowserRouter([
    // ---------- Public / main layout ----------
    {
        path: "/",
        element: <RootLayout />,
        errorElement: <NotFound />,
        children: [
            { index: true, element: <Home /> },
            { path: "lessons", element: <PublicLessons /> },

            // ✅ Details route – MUST match /lessons/:id
            {
                path: "lessons/:id",
                element: (
                    <PrivateRoute>
                        <LessonDetails />
                    </PrivateRoute>
                ),
            },

            { path: "pricing", element: <Pricing /> },
            { path: "payment/success", element: <PaymentSuccess /> },
            { path: "payment/cancel", element: <PaymentCancel /> },
            { path: "access-denied", element: <AccessDenied /> },
        ],
    },

    // ---------- Auth routes ----------
    {
        path: "/auth",
        element: <AuthLayout />,
        children: [
            { path: "login", element: <Login /> },
            { path: "register", element: <Register /> },
        ],
    },

    // ---------- Dashboard routes ----------
    {
        path: "/dashboard",
        element: (
            <PrivateRoute>
                <DashboardLayout />
            </PrivateRoute>
        ),
        children: [
            // user side
            { index: true, element: <UserHome /> },
            { path: "add-lesson", element: <AddLesson /> },
            { path: "my-lessons", element: <MyLesson /> },
            { path: "update-lesson/:id", element: <UpdateLesson /> },
            { path: "my-favorites", element: <MyFavorites /> },

            // admin side
            {
                path: "admin",
                element: (
                    <AdminRoute>
                        <AdminHome />
                    </AdminRoute>
                ),
            },
            {
                path: "manage-users",
                element: (
                    <AdminRoute>
                        <ManageUsers />
                    </AdminRoute>
                ),
            },
            {
                path: "manage-lessons",
                element: (
                    <AdminRoute>
                        <ManageLessons />
                    </AdminRoute>
                ),
            },
            {
                path: "reported-lessons",
                element: (
                    <AdminRoute>
                        <ReportedLessons />
                    </AdminRoute>
                ),
            },
        ],
    },
]);

export default router;
