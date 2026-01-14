import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#FFF7ED] px-4 text-center">
      <h1 className="text-7xl font-extrabold text-orange-500 mb-4">404</h1>

      <h2 className="text-2xl font-semibold text-gray-900 mb-2">
        Page Not Found
      </h2>

      <p className="text-sm text-gray-600 max-w-md mb-6">
        Sorry, the page you are looking for doesn’t exist or may have been moved.
      </p>

      <Link
        to="/"
        className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-medium transition"
      >
        ⬅ Back to Home
      </Link>
    </div>
  );
};

export default NotFound;
