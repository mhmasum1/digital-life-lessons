import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useUserInfo from "../../hooks/useUserInfo";


const LessonDetails = () => {
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();
    const { dbUser } = useUserInfo();
    const isPremium = dbUser?.isPremium === true;

    const [lesson, setLesson] = useState(null);
    const [loading, setLoading] = useState(true);
    const [errorMsg, setErrorMsg] = useState("");

    useEffect(() => {
        if (!id) return;

        setLoading(true);
        axiosSecure
            .get(`/lessons/${id}`)
            .then((res) => {
                setLesson(res.data);
                setErrorMsg("");
            })
            .catch((err) => {
                console.error("Lesson details error:", err);
                setErrorMsg("Unable to load this lesson.");
            })
            .finally(() => setLoading(false));
    }, [axiosSecure, id]);

    if (loading) {
        return (
            <div className="max-w-3xl mx-auto px-4 py-16">
                <p className="text-sm text-gray-600">Loading lesson...</p>
            </div>
        );
    }

    if (errorMsg || !lesson) {
        return (
            <div className="max-w-3xl mx-auto px-4 py-16">
                <p className="text-sm text-red-600 mb-3">{errorMsg || "Lesson not found."}</p>
                <Link to="/lessons" className="text-sm text-primary hover:underline">
                    ← Back to lessons
                </Link>
            </div>
        );
    }

    const locked = lesson.accessLevel === "premium" && !isPremium;

    return (
        <div className="max-w-3xl mx-auto px-4 py-16">
            <Link to="/lessons" className="text-xs text-primary hover:underline">
                ← Back to lessons
            </Link>

            <div className="mt-3 mb-2 flex items-center gap-2">
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-orange-50 border border-orange-100 capitalize">
                    {lesson.category || "Self-Growth"}
                </span>
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-amber-50 border border-amber-100 capitalize">
                    {lesson.emotionalTone || "Reflective"}
                </span>
                <span className="text-[11px] px-2 py-0.5 rounded-full border border-slate-200 capitalize">
                    {lesson.accessLevel || "free"}
                </span>
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-2">{lesson.title}</h1>

            <div className="flex items-center justify-between text-xs text-gray-500 mb-6">
                <div className="flex items-center gap-2">
                    {lesson.creatorPhotoURL ? (
                        <img
                            src={lesson.creatorPhotoURL}
                            alt={lesson.creatorName}
                            className="h-7 w-7 rounded-full object-cover border border-orange-100"
                        />
                    ) : (
                        <div className="h-7 w-7 rounded-full bg-orange-500 text-white flex items-center justify-center text-xs font-semibold">
                            {(lesson.creatorName?.[0] || "U").toUpperCase()}
                        </div>
                    )}
                    <span>{lesson.creatorName || "Anonymous"}</span>
                </div>
                <span>
                    {lesson.createdAt
                        ? new Date(lesson.createdAt).toLocaleString()
                        : "N/A"}
                </span>
            </div>

            {locked ? (
                <div className="border border-amber-200 rounded-xl bg-amber-50 p-6 text-center">
                    <div className="text-3xl mb-2">🔒</div>
                    <h2 className="font-semibold text-gray-900 mb-1">
                        This is a Premium Lesson
                    </h2>
                    <p className="text-sm text-gray-700 mb-3">
                        Upgrade to Premium to unlock the full story and details of this
                        lesson.
                    </p>
                    <Link
                        to="/pricing"
                        className="inline-flex items-center px-4 py-2 rounded-lg bg-primary text-white text-sm font-semibold hover:bg-orange-500"
                    >
                        Go to Pricing
                    </Link>
                </div>
            ) : (
                <div className="prose max-w-none text-gray-800 text-sm leading-relaxed">
                    {lesson.details || lesson.shortDescription}
                </div>
            )}
        </div>
    );
};

export default LessonDetails;
