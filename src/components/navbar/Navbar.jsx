import { useState, useEffect, useRef } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useUserInfo from "../../hooks/useUserInfo";

import "../navbar/navbar.css";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const { user, logOut } = useAuth() || {};
    const { dbUser } = useUserInfo();
    const dropdownRef = useRef(null);

    const isPremium = dbUser?.isPremium === true;
    const navigate = useNavigate();


    const handleLogout = async () => {
        try {
            await logOut();
            setDropdownOpen(false);
            setIsOpen(false);
            navigate("/", { replace: true });
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        };

        if (dropdownOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dropdownOpen]);

    const navLinks = (
        <>
            <li>
                <NavLink to="/" className="nav-link">
                    Home
                </NavLink>
            </li>
            <li>
                <NavLink to="/lessons" className="nav-link">
                    Lessons
                </NavLink>
            </li>

            {user?.email && !isPremium && (
                <li>
                    <NavLink to="/pricing" className="nav-link">
                        Pricing
                    </NavLink>
                </li>
            )}

            {user?.email && isPremium && (
                <li>
                    <span className="nav-link text-amber-600 font-semibold">
                        Premium ⭐
                    </span>
                </li>
            )}

            {user?.email && (
                <li>
                    <NavLink to="/dashboard" className="nav-link">
                        Dashboard
                    </NavLink>
                </li>
            )}
        </>
    );

    return (
        <nav className="w-full bg-[#FFF7ED] border-b border-orange-100 shadow-sm sticky top-0 z-30">
            <div className="max-w-6xl mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center gap-2">
                        <Link to="/" className="flex items-center gap-2">
                            <span className="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-primary text-white font-bold text-lg shadow-sm">
                                DL
                            </span>
                            <div className="flex flex-col leading-tight">
                                <span className="font-semibold text-base text-gray-900">
                                    Digital Life Lessons
                                </span>
                            </div>
                        </Link>
                    </div>

                    <div className="hidden md:flex items-center gap-6">
                        <ul className="flex items-center gap-2">{navLinks}</ul>

                        <div className="flex items-center gap-3">
                            {user?.email ? (
                                <div className="relative" ref={dropdownRef}>
                                    <button
                                        type="button"
                                        onClick={() => setDropdownOpen((prev) => !prev)}
                                        className="flex items-center gap-2 px-2 py-1 rounded-full hover:bg-orange-50 transition-colors"
                                    >
                                        {user.photoURL ? (
                                            <img
                                                src={user.photoURL}
                                                alt="avatar"
                                                className="h-8 w-8 rounded-full object-cover border border-orange-200"
                                            />
                                        ) : (
                                            <div className="h-8 w-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-semibold">
                                                {(user.displayName?.[0] ||
                                                    user.email?.[0] ||
                                                    "U"
                                                ).toUpperCase()}
                                            </div>
                                        )}
                                        <span className="text-sm text-gray-700 hidden lg:inline">
                                            {user.displayName || user.email}
                                        </span>
                                    </button>

                                    {dropdownOpen && (
                                        <div className="absolute right-0 mt-2 w-48 bg-white border border-orange-100 rounded-lg shadow-lg py-2 text-sm z-40">
                                            <div className="px-3 pb-2 border-b border-orange-100">
                                                <p className="font-semibold text-gray-900">
                                                    {user.displayName || "User"}
                                                </p>
                                                <p className="text-xs text-gray-500 truncate">
                                                    {user.email}
                                                </p>
                                            </div>
                                            <Link
                                                to="/dashboard/profile"
                                                className="block px-3 py-2 hover:bg-orange-50 text-gray-700"
                                                onClick={() => setDropdownOpen(false)}
                                            >
                                                Profile
                                            </Link>
                                            <Link
                                                to="/dashboard"
                                                className="block px-3 py-2 hover:bg-orange-50 text-gray-700"
                                                onClick={() => setDropdownOpen(false)}
                                            >
                                                Dashboard
                                            </Link>
                                            <button
                                                onClick={handleLogout}
                                                className="w-full text-left px-3 py-2 hover:bg-orange-50 text-red-600"
                                            >
                                                Log out
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <>
                                    <Link
                                        to="/auth/login"
                                        className="px-3 py-1.5 text-sm rounded-md border border-orange-200 bg-white text-gray-800 hover:bg-orange-50 transition-colors"
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        to="/auth/register"
                                        className="px-3 py-1.5 text-sm rounded-md bg-primary text-white hover:bg-orange-500 shadow-sm transition-colors"
                                    >
                                        Sign Up
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>

                    <div className="md:hidden flex items-center gap-2">
                        {user?.email &&
                            (user.photoURL ? (
                                <img
                                    src={user.photoURL}
                                    alt="avatar"
                                    className="h-8 w-8 rounded-full object-cover border border-orange-200"
                                />
                            ) : (
                                <div className="h-8 w-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-semibold">
                                    {(user.displayName?.[0] || user.email?.[0] || "U").toUpperCase()}
                                </div>
                            ))}
                        <button
                            onClick={() => {
                                setIsOpen((prev) => !prev);
                                setDropdownOpen(false);
                            }}
                            className="inline-flex items-center justify-center p-2 rounded-md border border-orange-200 bg-white/80 hover:bg-orange-50 transition-colors"
                        >
                            <svg
                                className="h-5 w-5 text-gray-800"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                {isOpen ? (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={1.8}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                ) : (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={1.8}
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {isOpen && (
                <div className="md:hidden border-t border-orange-100 bg-[#FFF7ED]">
                    <div className="px-4 py-3 space-y-3">
                        <ul className="flex flex-col gap-1">{navLinks}</ul>
                        <div className="pt-2 border-t border-orange-100 flex flex-col gap-2">
                            {user?.email ? (
                                <>
                                    <div className="flex flex-col">
                                        <span className="text-sm font-medium text-gray-800">
                                            {user.displayName || user.email}
                                        </span>
                                        <span className="text-xs text-gray-500">Logged in</span>
                                    </div>
                                    <Link
                                        to="/dashboard/profile"
                                        className="w-full px-3 py-2 text-sm rounded-md bg-white hover:bg-orange-50 text-gray-700 text-left"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        Profile
                                    </Link>
                                    <Link
                                        to="/dashboard"
                                        className="w-full px-3 py-2 text-sm rounded-md bg-white hover:bg-orange-50 text-gray-700 text-left"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        Dashboard
                                    </Link>
                                    <button
                                        onClick={handleLogout}
                                        className="w-full px-3 py-2 text-sm rounded-md border border-orange-200 bg-white hover:bg-orange-50 transition-colors text-left text-red-600"
                                    >
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link
                                        to="/auth/login"
                                        className="w-full px-3 py-2 text-sm rounded-md border border-orange-200 bg-white text-center hover:bg-orange-50 transition-colors"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        to="/auth/register"
                                        className="w-full px-3 py-2 text-sm rounded-md bg-primary text-white text-center hover:bg-orange-500 shadow-sm transition-colors"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        Sign Up
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
