import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useUserInfo from "../../hooks/useUserInfo";


const PublicLessons = () => {
    const axiosSecure = useAxiosSecure();
    const { dbUser } = useUserInfo();
    const isPremium = dbUser?.isPremium === true;

    const [lessons, setLessons] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        axiosSecure
            .get("/lessons/public")
            .then((res) => {
                const data = Array.isArray(res.data?.lessons)
                    ? res.data.lessons
                    : [];
                setLessons(data);
            })
            .catch((err) => {
                console.error("Public lessons load error:", err);
                setLessons([]);
            })
            .finally(() => setLoading(false));
    }, [axiosSecure]);

    if (loading) {
        return (
            <div className="max-w-5xl mx-auto px-4 py-16">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                    Browse Public Life Lessons
                </h1>
                <p className="text-gray-600 text-sm">Loading lessons...</p>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto px-4 py-16">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-1">
                        Browse Public Life Lessons
                    </h1>
                    <p className="text-sm text-gray-600">
                        Discover real-life experiences, reflections and wisdom shared by
                        the community.
                    </p>
                </div>
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-amber-50 text-[11px] text-amber-700 border border-amber-200">
                    Some lessons are Premium only – upgrade to unlock full access.
                </span>
            </div>

            {lessons.length === 0 ? (
                <p className="text-sm text-gray-500">
                    No public lessons have been shared yet.
                </p>
            ) : (
                <div className="grid md:grid-cols-2 gap-5">
                    {lessons.map((lesson) => {
                        const isLocked =
                            lesson.accessLevel === "premium" && !isPremium;

                        const createdDate = lesson.createdAt
                            ? new Date(lesson.createdAt).toLocaleDateString()
                            : "N/A";

                        return (
                            <div
                                key={lesson._id}
                                className="relative border border-orange-100 rounded-xl bg-white p-4 shadow-sm hover:shadow-md transition-shadow"
                            >
                                {/* lock overlay */}
                                {isLocked && (
                                    <div className="absolute inset-0 bg-white/70 backdrop-blur-sm rounded-xl flex flex-col items-center justify-center text-center z-10 px-4">
                                        <div className="mb-2 text-amber-600 text-3xl">
                                            🔒
                                        </div>
                                        <p className="text-sm font-semibold text-gray-800 mb-1">
                                            Premium Lesson
                                        </p>
                                        <p className="text-xs text-gray-600">
                                            Upgrade to Premium to unlock the full story.
                                        </p>
                                    </div>
                                )}

                                <div className={isLocked ? "opacity-60 blur-[1px]" : ""}>
                                    <div className="flex items-start justify-between gap-2 mb-2">
                                        <h2 className="font-semibold text-gray-900 text-lg">
                                            {lesson.title}
                                        </h2>
                                        <span className="px-2 py-0.5 rounded-full text-[11px] border border-orange-200 bg-orange-50 text-orange-700 capitalize">
                                            {lesson.accessLevel === "premium"
                                                ? "Premium"
                                                : "Free"}
                                        </span>
                                    </div>

                                    <p className="text-sm text-gray-700 mb-3 line-clamp-3">
                                        {lesson.shortDescription}
                                    </p>

                                    <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                                        <span className="capitalize">
                                            #{lesson.category || "Self-Growth"}
                                        </span>
                                        <span>{lesson.emotionalTone || "Reflective"}</span>
                                        <span>{createdDate}</span>
                                    </div>

                                    <div className="flex items-center justify-between mt-2">
                                        <div className="flex items-center gap-2">
                                            {lesson.creatorPhotoURL ? (
                                                <img
                                                    src={lesson.creatorPhotoURL}
                                                    alt={lesson.creatorName}
                                                    className="h-7 w-7 rounded-full object-cover border border-orange-100"
                                                />
                                            ) : (
                                                <div className="h-7 w-7 rounded-full bg-orange-500 text-white flex items-center justify-center text-xs font-semibold">
                                                    {(lesson.creatorName?.[0] ||
                                                        "U"
                                                    ).toUpperCase()}
                                                </div>
                                            )}
                                            <span className="text-xs text-gray-700">
                                                {lesson.creatorName || "Anonymous"}
                                            </span>
                                        </div>

                                        <Link
                                            to={`/lessons/${lesson._id}`}
                                            className="text-xs font-medium text-primary hover:underline"
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
    );
};

export default PublicLessons;
