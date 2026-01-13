import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";

const RootLayout = () => {

    useEffect(() => {
        fetch(import.meta.env.VITE_API_URL + "/")
            .catch(() => {});
    }, []);

    return (
        <div className="min-h-screen flex flex-col">
            {/* Top Navbar */}
            <Navbar />

            {/* Main content */}
            <main className="flex-1 max-w-6xl mx-auto px-4 py-6">
                <Outlet />
            </main>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default RootLayout;
