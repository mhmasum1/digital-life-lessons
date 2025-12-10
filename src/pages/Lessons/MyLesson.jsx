import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";


const MyLesson = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const [lessons, setLessons] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user?.email) return;

        setLoading(true);
        axiosSecure
            .get(`/lessons/my?email=${encodeURIComponent(user.email)}`)
            .then((res) => {
                const data = Array.isArray(res.data) ? res.data : [];
                setLessons(data);
            })
            .catch((err) => {
                console.error("My lessons load error:", err);
                setLessons([]);
            })
            .finally(() => setLoading(false));
    }, [axiosSecure, user?.email]);

    return (
        <div className="max-w-5xl mx-auto">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-gray-900">My Lessons</h1>
                <Link
                    to="/dashboard/add-lesson"
                    className="px-3 py-1.5 rounded-md text-sm bg-primary text-white hover:bg-orange-500"
                >
                    + Add New Lesson
                </Link>
            </div>

            {loading ? (
                <p className="text-sm text-gray-600">Loading your lessons...</p>
            ) : lessons.length === 0 ? (
                <p className="text-sm text-gray-500">
                    You haven’t shared any lessons yet.
                </p>
            ) : (
                <div className="overflow-x-auto bg-base-100 rounded-xl shadow-sm border border-orange-100">
                    <table className="table table-zebra text-sm">
                        <thead>
                            <tr className="text-gray-600">
                                <th>Title</th>
                                <th>Visibility</th>
                                <th>Access</th>
                                <th>Created</th>
                                <th className="text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {lessons.map((lesson) => (
                                <tr key={lesson._id}>
                                    <td className="max-w-xs">
                                        <span className="font-medium text-gray-900 line-clamp-2">
                                            {lesson.title}
                                        </span>
                                    </td>
                                    <td className="capitalize text-xs">
                                        <span className="px-2 py-0.5 rounded-full bg-orange-50 border border-orange-100">
                                            {lesson.visibility || "public"}
                                        </span>
                                    </td>
                                    <td className="capitalize text-xs">
                                        {lesson.accessLevel || "free"}
                                    </td>
                                    <td className="text-xs text-gray-500">
                                        {lesson.createdAt
                                            ? new Date(
                                                lesson.createdAt
                                            ).toLocaleDateString()
                                            : "N/A"}
                                    </td>
                                    <td className="text-right space-x-2">
                                        <Link
                                            to={`/lessons/${lesson._id}`}
                                            className="text-xs text-primary hover:underline"
                                        >
                                            Details
                                        </Link>
                                        <Link
                                            to={`/dashboard/update-lesson/${lesson._id}`}
                                            className="text-xs text-amber-700 hover:underline"
                                        >
                                            Edit
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default MyLesson;
