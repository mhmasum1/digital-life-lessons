import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Spinner from "../../components/common/Spinner";

const MyLesson = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const [lessons, setLessons] = useState([]);
    const [loading, setLoading] = useState(true);

    // 👇 Hook সবসময় top-level এ
    useEffect(() => {
        let cancelled = false;

        // axiosSecure বা user এখনো ready না থাকলে কিছুই করব না
        if (!user?.email || !axiosSecure) {
            setLessons([]);
            setLoading(false);
            return;
        }

        const fetchMyLessons = async () => {
            try {
                setLoading(true);
                // তোমার backend রুট যদি অন্যরকম হয়, শুধু নিচের URL টা বদলে নিও
                const res = await axiosSecure.get(`/lessons/user/${user.email}`);
                const data = res.data;

                const list = Array.isArray(data)
                    ? data
                    : Array.isArray(data?.lessons)
                        ? data.lessons
                        : [];

                if (!cancelled) setLessons(list);
            } catch (error) {
                console.error("GET /lessons/user/:email error:", error);
                if (!cancelled) setLessons([]);
            } finally {
                if (!cancelled) setLoading(false);
            }
        };

        fetchMyLessons();

        return () => {
            cancelled = true;
        };
    }, [axiosSecure, user?.email]);

    // 🔒 User না থাকলে – login page এ পাঠিয়ে দেই
    if (!user?.email && !loading) {
        return <Navigate to="/auth/login" replace />;
    }

    if (loading) return <Spinner />;

    return (
        <div className="bg-[#FFF7ED] min-h-screen py-8 px-4">
            <div className="max-w-5xl mx-auto">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-900">
                            My Life Lessons
                        </h1>
                        <p className="text-sm text-gray-600">
                            All the lessons you have shared with the community.
                        </p>
                    </div>
                    <Link
                        to="/dashboard/add-lesson"
                        className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-orange-500 text-white text-sm font-semibold hover:bg-orange-600 transition"
                    >
                        + Share a new lesson
                    </Link>
                </div>

                {lessons.length === 0 ? (
                    <div className="mt-10 text-center">
                        <p className="text-sm text-gray-600 mb-3">
                            You haven&apos;t shared any lessons yet.
                        </p>
                        <Link
                            to="/dashboard/add-lesson"
                            className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-orange-500 text-white text-sm font-semibold hover:bg-orange-600 transition"
                        >
                            Share your first lesson →
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {lessons.map((lesson) => {
                            const isPremiumLesson = lesson.accessLevel === "premium";

                            return (
                                <div
                                    key={lesson._id}
                                    className="bg-white rounded-xl border border-orange-100 p-4 md:p-5 shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-4"
                                >
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <h2 className="text-base font-semibold text-gray-900">
                                                {lesson.title}
                                            </h2>
                                            <span
                                                className={`px-2 py-0.5 rounded-full text-[11px] border ${isPremiumLesson
                                                        ? "bg-amber-50 text-amber-700 border-amber-200"
                                                        : "bg-emerald-50 text-emerald-700 border-emerald-200"
                                                    }`}
                                            >
                                                {isPremiumLesson ? "Premium" : "Free"}
                                            </span>
                                        </div>
                                        <p className="text-xs text-gray-500 mb-1">
                                            #{lesson.category || "LifeLesson"} •{" "}
                                            {lesson.emotionalTone || "Neutral"}
                                        </p>
                                        <p className="text-sm text-gray-700 line-clamp-2">
                                            {lesson.shortDescription}
                                        </p>
                                        <p className="text-[11px] text-gray-400 mt-1">
                                            Shared on{" "}
                                            {lesson.createdAt
                                                ? new Date(lesson.createdAt).toLocaleDateString()
                                                : "recently"}
                                        </p>
                                    </div>

                                    <div className="flex flex-col items-end gap-2 min-w-[150px]">
                                        <Link
                                            to={`/lessons/${lesson._id}`}
                                            className="text-xs font-semibold text-orange-600 border border-orange-200 px-3 py-1.5 rounded-full hover:bg-orange-50 transition w-full text-center"
                                        >
                                            View details
                                        </Link>

                                        <Link
                                            to={`/dashboard/update-lesson/${lesson._id}`}
                                            className="text-xs font-semibold text-gray-700 border border-gray-200 px-3 py-1.5 rounded-full hover:bg-gray-50 transition w-full text-center"
                                        >
                                            Edit lesson
                                        </Link>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyLesson;
