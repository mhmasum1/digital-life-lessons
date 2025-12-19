import { NavLink, Link } from "react-router-dom";

const Sidebar = () => {
    const linkClass = "block px-3 py-2 rounded hover:bg-orange-100 transition";
    const activeClass = "bg-orange-200 font-semibold text-orange-800";

    return (
        <div className="p-4 space-y-2">
            {/* 🔙 Default Home link */}
            <Link
                to="/"
                className="inline-flex items-center gap-2 text-sm text-orange-700 hover:underline mb-3"
            >
                ← Back to Home
            </Link>

            <h2 className="text-lg font-semibold mb-4">Dashboard Menu</h2>

            <NavLink
                to="/dashboard"
                end
                className={({ isActive }) =>
                    `${linkClass} ${isActive ? activeClass : "bg-orange-50"}`
                }
            >
                User Home
            </NavLink>

            <NavLink
                to="/dashboard/my-lessons"
                className={({ isActive }) =>
                    `${linkClass} ${isActive ? activeClass : "bg-orange-50"}`
                }
            >
                My Lessons
            </NavLink>

            <NavLink
                to="/dashboard/add-lesson"
                className={({ isActive }) =>
                    `${linkClass} ${isActive ? activeClass : "bg-orange-50"}`
                }
            >
                Add Lesson
            </NavLink>

            <NavLink
                to="/dashboard/my-favorites"
                className={({ isActive }) =>
                    `${linkClass} ${isActive ? activeClass : "bg-orange-50"}`
                }
            >
                My Favorites
            </NavLink>
        </div>
    );
};

export default Sidebar;
