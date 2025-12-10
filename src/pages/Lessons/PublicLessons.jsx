import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useUserInfo from "../../hooks/useUserInfo";
import Spinner from "../../components/common/Spinner";

const PublicLessons = () => {
    const axiosSecure = useAxiosSecure();
    const { dbUser } = useUserInfo();

    const [lessons, setLessons] = useState([]);
    const [loading, setLoading] = useState(true);

    const isPremiumUser = dbUser?.isPremium === true;

    useEffect(() => {
        let cancelled = false;

        const fetchLessons = async () => {
            try {
                setLoading(true);
                const res = await axiosSecure.get("/lessons/public");
                const data = res.data;

                const list = Array.isArray(data)
                    ? data
                    : Array.isArray(data?.lessons)
                        ? data.lessons
                        : [];

                if (!cancelled) setLessons(list);
            } catch (error) {
                console.error("GET /lessons/public error:", error);
                if (!cancelled) setLessons([]);
            } finally {
                if (!cancelled) setLoading(false);
            }
        };

        fetchLessons();

        return () => {
            cancelled = true;
        };
    }, [axiosSecure]);

    if (loading) return <Spinner />;

    return (
        <div className="bg-white min-h-screen">
            <div className="max-w-5xl mx-auto px-4 py-10">
                <header className="mb-6">
                    <h1 className="text-2xl md:text-3xl font-semibold text-gray-900 text-center mb-2">
                        Browse Public Life Lessons
                    </h1>
                    <p className="text-sm text-gray-600 text-center max-w-2xl mx-auto">
                        Discover real-life experiences, reflections and wisdom shared by the
                        community.
                    </p>
                    <p className="mt-3 text-[11px] text-center inline-block mx-auto px-3 py-1 rounded-full bg-orange-50 text-orange-700 border border-orange-100">
                        Some lessons are Premium only – upgrade to unlock full access.
                    </p>
                </header>

                {lessons.length === 0 ? (
                    <p className="text-sm text-gray-600 text-center mt-10">
                        No public lessons have been shared yet.
                    </p>
                ) : (
                    <div className="grid md:grid-cols-2 gap-5">
                        {lessons.map((lesson) => {
                            const isPremiumLesson = lesson.accessLevel === "premium";
                            const isLocked = isPremiumLesson && !isPremiumUser;

                            return (
                                <div
                                    key={lesson._id}
                                    className={`relative rounded-2xl border border-orange-100 bg-[#FFF7ED] p-5 shadow-sm flex flex-col justify-between ${isLocked ? "overflow-hidden" : ""
                                        }`}
                                >
                                    {/* blur layer for locked premium */}
                                    {isLocked && (
                                        <div className="absolute inset-0 bg-white/60 backdrop-blur-[3px] z-10 flex flex-col items-center justify-center text-center px-4">
                                            <p className="text-sm font-semibold text-amber-800 mb-1">
                                                🔒 Premium Lesson
                                            </p>
                                            <p className="text-xs text-amber-700 mb-3">
                                                Upgrade to Premium to read the full story and other
                                                premium lessons.
                                            </p>
                                            <Link
                                                to="/pricing"
                                                className="inline-flex items-center justify-center px-3 py-1.5 rounded-lg bg-orange-500 text-white text-xs font-semibold hover:bg-orange-600 transition"
                                            >
                                                Go to Pricing →
                                            </Link>
                                        </div>
                                    )}

                                    <div className={isLocked ? "opacity-40 pointer-events-none" : ""}>
                                        <div className="flex items-start justify-between gap-4 mb-3">
                                            <div>
                                                <h2 className="text-base font-semibold text-gray-900 mb-1">
                                                    {lesson.title}
                                                </h2>
                                                <p className="text-[11px] uppercase tracking-wide text-gray-400">
                                                    #{lesson.category || "LifeLesson"}
                                                </p>
                                            </div>
                                            <span
                                                className={`px-2 py-0.5 rounded-full text-[11px] border ${isPremiumLesson
                                                        ? "bg-amber-50 text-amber-700 border-amber-200"
                                                        : "bg-emerald-50 text-emerald-700 border-emerald-200"
                                                    }`}
                                            >
                                                {isPremiumLesson ? "Premium" : "Free"}
                                            </span>
                                        </div>

                                        <p className="text-sm text-gray-700 mb-3 line-clamp-3">
                                            {lesson.shortDescription}
                                        </p>

                                        <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                                            <div className="flex items-center gap-2">
                                                {lesson.creatorPhotoURL ? (
                                                    <img
                                                        src={lesson.creatorPhotoURL}
                                                        alt={lesson.creatorName}
                                                        className="h-7 w-7 rounded-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="h-7 w-7 rounded-full bg-orange-500 text-white flex items-center justify-center text-xs font-semibold">
                                                        {(lesson.creatorName?.[0] || "U").toUpperCase()}
                                                    </div>
                                                )}
                                                <span>{lesson.creatorName || "Anonymous"}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span>{lesson.emotionalTone || "Neutral"}</span>
                                                <span>•</span>
                                                <span>
                                                    {lesson.createdAt
                                                        ? new Date(lesson.createdAt).toLocaleDateString()
                                                        : ""}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="flex justify-end">
                                            <Link
                                                to={`/lessons/${lesson._id}`}
                                                className="text-xs font-semibold text-orange-600 border border-orange-200 px-3 py-1.5 rounded-full hover:bg-orange-50 transition"
                                            >
                                                See details →
                                            </Link>
                                        </div>
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

export default PublicLessons;
