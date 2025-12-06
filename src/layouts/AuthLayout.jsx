import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";

const AuthLayout = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
            <div className="w-full max-w-md bg-base-100 shadow-xl rounded-xl p-6 md:p-8">
                <Link to="/" className="block mb-4 text-center font-bold text-xl">
                    Life Lessons Lab
                </Link>
                <Outlet />
            </div>
        </div>
    );
};

export default AuthLayout;
