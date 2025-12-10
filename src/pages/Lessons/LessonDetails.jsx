import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useUserInfo from "../../hooks/useUserInfo";
import Spinner from "../../components/common/Spinner";

const LessonDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();
    const { dbUser } = useUserInfo();

    const [lesson, setLesson] = useState(null);
    const [loading, setLoading] = useState(true);

    const isPremiumUser = dbUser?.isPremium === true;

    useEffect(() => {
        if (!id) return;

        let cancelled = false;

        const fetchLesson = async () => {
            try {
                setLoading(true);
                const res = await axiosSecure.get(`/lessons/${id}`);
                if (!cancelled) {
                    setLesson(res.data || null);
                }
            } catch (error) {
                console.error("GET /lessons/:id error:", error);
                if (!cancelled) {
                    setLesson(null);
                }
            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        };

        fetchLesson();

        return () => {
            cancelled = true;
        };
    }, [id, axiosSecure]);

    if (loading) return <Spinner />;

    if (!lesson) {
        return (
            <div className="max-w-3xl mx-auto px-4 py-16">
                <button
                    onClick={() => navigate(-1)}
                    className="text-sm text-orange-600 hover:underline mb-4"
                >
                    ← Back
                </button>
                <p className="text-gray-700">Lesson not found.</p>
            </div>
        );
    }

    const {
        title,
        shortDescription,
        fullStory,
        category,
        emotionalTone,
        accessLevel,
        creatorName,
        creatorPhotoURL,
        createdAt,
    } = lesson;

    const isPremiumLesson = accessLevel === "premium";

    return (
        <div className="bg-[#FFF7ED] min-h-screen py-10 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Back + meta line */}
                <div className="flex items-center justify-between mb-6">
                    <button
                        onClick={() => navigate(-1)}
                        className="text-sm text-orange-600 hover:underline"
                    >
                        ← Back to lessons
                    </button>

                    <div className="flex items-center gap-2 text-xs text-gray-500">
                        <span className="px-2 py-0.5 rounded-full bg-white border border-orange-100">
                            {category || "Life Lesson"}
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-white border border-orange-100">
                            {emotionalTone || "Neutral"}
                        </span>
                        <span
                            className={`px-2 py-0.5 rounded-full border text-[11px] ${isPremiumLesson
                                ? "bg-amber-50 text-amber-700 border-amber-200"
                                : "bg-emerald-50 text-emerald-700 border-emerald-200"
                                }`}
                        >
                            {isPremiumLesson ? "Premium" : "Free"}
                        </span>
                    </div>
                </div>

                {/* Main card */}
                <article className="bg-white rounded-2xl shadow-sm border border-orange-100 p-6 md:p-8">
                    {/* Title + date */}
                    <header className="mb-6">
                        <h1 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-2">
                            {title}
                        </h1>
                        <div className="flex items-center justify-between text-xs text-gray-500">
                            <div className="flex items-center gap-2">
                                {creatorPhotoURL ? (
                                    <img
                                        src={creatorPhotoURL}
                                        alt={creatorName}
                                        className="h-7 w-7 rounded-full object-cover"
                                    />
                                ) : (
                                    <div className="h-7 w-7 rounded-full bg-orange-500 text-white flex items-center justify-center text-xs font-semibold">
                                        {(creatorName?.[0] || "U").toUpperCase()}
                                    </div>
                                )}
                                <div className="flex flex-col leading-tight">
                                    <span className="text-xs font-medium text-gray-800">
                                        {creatorName || "Anonymous"}
                                    </span>
                                    <span className="text-[11px] text-gray-500">
                                        {createdAt
                                            ? new Date(createdAt).toLocaleDateString()
                                            : "Recently shared"}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </header>

                    {/* Short description */}
                    {shortDescription && (
                        <p className="text-sm text-gray-700 bg-orange-50 border border-orange-100 rounded-xl px-4 py-3 mb-6">
                            {shortDescription}
                        </p>
                    )}

                    {/* Premium lock for non-premium users */}
                    {isPremiumLesson && !isPremiumUser ? (
                        <div className="mt-4 border border-dashed border-amber-300 bg-amber-50/60 rounded-xl px-4 py-5 text-center">
                            <p className="text-sm font-medium text-amber-800 mb-2">
                                🔒 This is a Premium life lesson.
                            </p>
                            <p className="text-xs text-amber-700 mb-3">
                                Upgrade to Premium to unlock the full story and all future
                                premium lessons.
                            </p>
                            <Link
                                to="/pricing"
                                className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-orange-500 text-white text-sm font-semibold hover:bg-orange-600 transition"
                            >
                                Go to Premium Pricing →
                            </Link>
                        </div>
                    ) : (
                        // Full story for free lessons OR premium user
                        <section className="prose prose-sm md:prose-base max-w-none text-gray-800 leading-relaxed">
                            {fullStory ? (
                                fullStory.split("\n").map((para, idx) => (
                                    <p key={idx} className="mb-3">
                                        {para}
                                    </p>
                                ))
                            ) : (
                                <p>
                                    No detailed story was provided for this lesson, but the short
                                    description above summarizes the key insight.
                                </p>
                            )}
                        </section>
                    )}
                </article>
            </div>
        </div>
    );
};

export default LessonDetails;
