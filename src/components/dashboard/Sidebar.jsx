import { NavLink } from "react-router-dom";

const Sidebar = () => {
    return (
        <div className="p-4 space-y-2">
            <h2 className="text-lg font-semibold mb-4">Dashboard Menu</h2>

            <NavLink to="/dashboard" className="block px-3 py-2 bg-orange-50 rounded">
                User Home
            </NavLink>

            <NavLink to="/dashboard/my-lessons" className="block px-3 py-2 bg-orange-50 rounded">
                My Lessons
            </NavLink>

            <NavLink to="/dashboard/add-lesson" className="block px-3 py-2 bg-orange-50 rounded">
                Add Lesson
            </NavLink>
        </div>
    );
};

export default Sidebar;
