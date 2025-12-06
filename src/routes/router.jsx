
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

import MyFavorites from "../pages/Favorites/MyFavorites";

import Pricing from "../pages/Pricing/Pricing";
import PaymentSuccess from "../pages/Payment/PaymentSuccess";
import PaymentCancel from "../pages/Payment/PaymentCancel";


import NotFound from "../pages/Error/NotFound";
import AccessDenied from "../pages/Error/AccessDenied";
import MyLesson from "../pages/Lessons/MyLesson";
import UserHome from "../pages/Dashborad/UserHome";
import AdminHome from "../pages/Dashborad/AdminHome";
import ManageUsers from "../pages/Dashborad/ManageUsers";
import ManageLessons from "../pages/Dashborad/ManageLessons";
import ReportedLessons from "../pages/Dashborad/ReportedLessons";

const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        errorElement: <NotFound />,
        children: [
            { path: "/", element: <Home /> },
            { path: "/lessons", element: <PublicLessons /> },
            {
                path: "/lesson/:id",
                element: (
                    <PrivateRoute>
                        <LessonDetails />
                    </PrivateRoute>
                ),
            },
            { path: "/pricing", element: <Pricing /> },
            { path: "/payment/success", element: <PaymentSuccess /> },
            { path: "/payment/cancel", element: <PaymentCancel /> },
            { path: "/access-denied", element: <AccessDenied /> },
        ],
    },

    // Auth Routes
    {
        path: "/auth",
        element: <AuthLayout />,
        children: [
            { path: "/auth/login", element: <Login /> },
            { path: "/auth/register", element: <Register /> },
        ],
    },

    // Dashboard Routes
    {
        path: "/dashboard",
        element: (
            <PrivateRoute>
                <DashboardLayout />
            </PrivateRoute>
        ),
        children: [
            // User side
            { path: "/dashboard", element: < UserHome /> },
            { path: "/dashboard/add-lesson", element: <AddLesson /> },
            { path: "/dashboard/my-lessons", element: <MyLesson /> },
            { path: "/dashboard/update-lesson/:id", element: <UpdateLesson /> },
            { path: "/dashboard/my-favorites", element: <MyFavorites /> },

            // Admin side
            {
                path: "/dashboard/admin",
                element: (
                    <AdminRoute>
                        <AdminHome />
                    </AdminRoute>
                ),
            },
            {
                path: "/dashboard/manage-users",
                element: (
                    <AdminRoute>
                        <ManageUsers />
                    </AdminRoute>
                ),
            },
            {
                path: "/dashboard/manage-lessons",
                element: (
                    <AdminRoute>
                        <ManageLessons />
                    </AdminRoute>
                ),
            },
            {
                path: "/dashboard/reported-lessons",
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
