import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import useUserInfo from "../../hooks/useUserInfo";

const PublicLessons = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const { dbUser } = useUserInfo();
    const navigate = useNavigate();

    const [lessons, setLessons] = useState([]);
    const [loading, setLoading] = useState(true);

    const isPremiumUser = dbUser?.isPremium === true;

    useEffect(() => {
        setLoading(true);
        axiosSecure
            .get("/lessons/public")
            .then((res) => {
                const data = Array.isArray(res.data) ? res.data : res.data?.lessons || [];
                setLessons(data);
            })
            .catch((err) => {
                console.error("GET /lessons/public error:", err);
                setLessons([]);
            })
            .finally(() => setLoading(false));
    }, [axiosSecure]);

    const handleLockedClick = () => {
        if (isPremiumUser) return;
        if (user?.email) {
            navigate("/pricing");
        } else {
            navigate("/auth/login");
        }
    };

    const formatDate = (date) => {
        if (!date) return "N/A";
        return new Date(date).toLocaleDateString();
    };

    if (loading) {
        return (
            <div className="max-w-6xl mx-auto px-4 py-16">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                    Browse Public Life Lessons
                </h1>
                <p className="text-sm text-gray-600">Loading lessons...</p>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto px-4 py-16">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 mb-8">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                        Browse Public Life Lessons
                    </h1>
                    <p className="text-sm text-gray-600 mt-1">
                        Discover real-life experiences, reflections and wisdom shared by the
                        community.
                    </p>
                </div>

                {isPremiumUser ? (
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-medium">
                        Premium member ⭐ – full access
                    </span>
                ) : (
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-xs font-medium">
                        Some lessons are Premium only – upgrade to unlock full access.
                    </span>
                )}
            </div>

            {lessons.length === 0 ? (
                <p className="text-sm text-gray-600">
                    No public lessons have been shared yet.
                </p>
            ) : (
                <div className="grid gap-5 md:grid-cols-2">
                    {lessons.map((lesson) => {
                        const locked =
                            lesson?.accessLevel === "premium" && !isPremiumUser;

                        return (
                            <div
                                key={lesson._id}
                                className={`relative rounded-xl border border-orange-100 bg-white shadow-sm overflow-hidden group`}
                            >
                                {/* blur overlay for locked premium */}
                                {locked && (
                                    <div className="absolute inset-0 z-10 bg-white/70 backdrop-blur-sm flex flex-col items-center justify-center text-center px-4">
                                        <div className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-orange-100 text-orange-600 mb-2">
                                            🔒
                                        </div>
                                        <p className="text-sm font-semibold text-gray-900">
                                            Premium Lesson
                                        </p>
                                        <p className="text-xs text-gray-600 mt-1 mb-3">
                                            Upgrade to Premium to read the full life lesson.
                                        </p>
                                        <button
                                            onClick={handleLockedClick}
                                            className="px-4 py-2 rounded-lg bg-primary text-white text-xs font-semibold hover:bg-orange-500 transition"
                                        >
                                            Upgrade to view
                                        </button>
                                    </div>
                                )}

                                <div className={`p-4 md:p-5 ${locked ? "blur-sm" : ""}`}>
                                    {/* header: category + access level */}
                                    <div className="flex items-center justify-between gap-2 mb-3">
                                        <div className="flex flex-wrap items-center gap-2">
                                            {lesson.category && (
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-orange-50 text-orange-700 text-xs font-medium">
                                                    {lesson.category}
                                                </span>
                                            )}
                                            {lesson.emotionalTone && (
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-sky-50 text-sky-700 text-xs font-medium">
                                                    {lesson.emotionalTone}
                                                </span>
                                            )}
                                        </div>
                                        <span
                                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${lesson.accessLevel === "premium"
                                                ? "bg-amber-100 text-amber-800"
                                                : "bg-emerald-100 text-emerald-800"
                                                }`}
                                        >
                                            {lesson.accessLevel === "premium"
                                                ? "Premium"
                                                : "Free"}
                                        </span>
                                    </div>

                                    {/* title + description */}
                                    <h2 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-2">
                                        {lesson.title || "Untitled lesson"}
                                    </h2>
                                    <p className="text-sm text-gray-700 mb-3 line-clamp-3">
                                        {lesson.shortDescription ||
                                            lesson.description ||
                                            "No description provided."}
                                    </p>

                                    {/* creator + date */}
                                    <div className="flex items-center justify-between mt-3">
                                        <div className="flex items-center gap-2">
                                            {lesson.creatorPhotoURL || lesson.creator?.photoURL ? (
                                                <img
                                                    src={lesson.creatorPhotoURL || lesson.creator?.photoURL}
                                                    alt={lesson.creatorName || lesson.creator?.name || "Creator"}
                                                    className="h-8 w-8 rounded-full object-cover border border-orange-100"
                                                />
                                            ) : (
                                                <div className="h-8 w-8 rounded-full bg-orange-100 text-orange-700 flex items-center justify-center text-xs font-semibold">
                                                    {(lesson.creatorName ||
                                                        lesson.creator?.name ||
                                                        "U"
                                                    )[0].toUpperCase()}
                                                </div>
                                            )}
                                            <div>
                                                <p className="text-xs font-medium text-gray-900">
                                                    {lesson.creatorName ||
                                                        lesson.creator?.name ||
                                                        "Unknown creator"}
                                                </p>
                                                <p className="text-[11px] text-gray-500">
                                                    Shared on {formatDate(lesson.createdAt)}
                                                </p>
                                            </div>
                                        </div>

                                        {/* buttons */}
                                        {!locked ? (
                                            <Link
                                                to={`/lessons/${lesson._id}`}
                                                className="inline-flex items-center px-3 py-1.5 rounded-md bg-primary text-white text-xs font-semibold hover:bg-orange-500 transition"
                                            >
                                                See Details
                                            </Link>
                                        ) : (
                                            <button
                                                onClick={handleLockedClick}
                                                className="inline-flex items-center px-3 py-1.5 rounded-md bg-gray-900 text-white text-xs font-semibold hover:bg-gray-800 transition z-20"
                                            >
                                                Upgrade to view
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default PublicLessons;
