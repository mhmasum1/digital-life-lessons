import { Outlet } from "react-router-dom";
import Sidebar from "../components/dashboard/Sidebar";

const DashboardLayout = () => {
    return (
        <div className="min-h-screen flex bg-base-200">
            {/* Sidebar */}
            <aside className="w-64 bg-base-100 shadow-lg hidden md:block">
                <Sidebar />
            </aside>

            {/* Main dashboard content */}
            <div className="flex-1 p-4 md:p-8">
                <Outlet />
            </div>
        </div>
    );
};

export default DashboardLayout;
