import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import useUserInfo from "../../hooks/useUserInfo";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const AddLesson = () => {
    const { user } = useAuth();
    const { dbUser } = useUserInfo();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const [submitting, setSubmitting] = useState(false);

    if (!user?.email) {
        return <Navigate to="/auth/login" replace />;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user?.email) return;

        const form = e.target;

        const lessonData = {
            title: form.title.value.trim(),
            shortDescription: form.shortDescription.value.trim(),
            details: form.details.value.trim(),
            category: form.category.value,
            emotionalTone: form.emotionalTone.value,
            accessLevel: form.accessLevel.value,
            visibility: form.visibility.value,

            creatorEmail: user.email,
            creatorName: user.displayName || dbUser?.name || "Anonymous",
            creatorPhotoURL: user.photoURL || dbUser?.photoURL || "",
        };

        try {
            setSubmitting(true);
            const res = await axiosSecure.post("/lessons", lessonData);

            if (res.data?.insertedId) {
                toast.success("Lesson added successfully!");
                form.reset();
                navigate("/lessons", { replace: true });
            } else {
                toast.error("Something went wrong. Please try again.");
            }
        } catch (err) {
            console.error("Add lesson error:", err);
            toast.error("Failed to save lesson.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto px-4 py-10">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                Share a Life Lesson
            </h1>
            <p className="text-sm text-gray-600 mb-6">
                Write a real story, insight or experience that could help other
                students and learners.
            </p>

            <form
                onSubmit={handleSubmit}
                className="space-y-5 bg-white border border-orange-100 rounded-xl p-5 shadow-sm"
            >
                {/* Title */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Lesson title <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        name="title"
                        required
                        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/60 focus:border-primary"
                        placeholder="e.g. How I Learned to Handle Failure in University"
                    />
                </div>

                {/* Short Description */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Short description (preview) <span className="text-red-500">*</span>
                    </label>
                    <textarea
                        name="shortDescription"
                        rows={2}
                        required
                        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/60 focus:border-primary"
                        placeholder="2–3 lines summary that will appear on the card."
                    ></textarea>
                </div>

                {/* Full Details */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Full story / lesson details
                    </label>
                    <textarea
                        name="details"
                        rows={5}
                        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/60 focus:border-primary"
                        placeholder="Write the full lesson, what happened, what you felt and what you learned."
                    ></textarea>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Category
                        </label>
                        <select
                            name="category"
                            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/60 focus:border-primary"
                            defaultValue="Self-Growth"
                        >
                            <option>Self-Growth</option>
                            <option>Productivity</option>
                            <option>Relationships</option>
                            <option>Mental Health</option>
                            <option>Career</option>
                            <option>Study Skills</option>
                            <option>Money & Finance</option>
                            <option>Other</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Emotional tone
                        </label>
                        <select
                            name="emotionalTone"
                            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/60 focus:border-primary"
                            defaultValue="Reflective"
                        >
                            <option>Reflective</option>
                            <option>Hopeful</option>
                            <option>Motivational</option>
                            <option>Calm</option>
                            <option>Sad</option>
                            <option>Grateful</option>
                            <option>Neutral</option>
                        </select>
                    </div>
                </div>

                {/* Access level */}
                <div>
                    <p className="block text-sm font-medium text-gray-700 mb-1">
                        Access level
                    </p>
                    <div className="flex flex-wrap gap-4 text-sm">
                        <label className="inline-flex items-center gap-2">
                            <input
                                type="radio"
                                name="accessLevel"
                                value="free"
                                defaultChecked
                            />
                            <span>Free lesson</span>
                        </label>
                        <label className="inline-flex items-center gap-2">
                            <input type="radio" name="accessLevel" value="premium" />
                            <span>Premium lesson</span>
                        </label>
                    </div>
                </div>

                {/* Visibility */}
                <div>
                    <p className="block text-sm font-medium text-gray-700 mb-1">
                        Visibility
                    </p>
                    <div className="flex flex-wrap gap-4 text-sm">
                        <label className="inline-flex items-center gap-2">
                            <input
                                type="radio"
                                name="visibility"
                                value="public"
                                defaultChecked
                            />
                            <span>Public – show on Browse Public Life Lessons</span>
                        </label>
                        <label className="inline-flex items-center gap-2">
                            <input type="radio" name="visibility" value="private" />
                            <span>Private – only you can see</span>
                        </label>
                    </div>
                </div>

                {/* Submit */}
                <div className="pt-2">
                    <button
                        type="submit"
                        disabled={submitting}
                        className="w-full md:w-auto px-5 py-2.5 rounded-lg bg-primary text-white text-sm font-semibold hover:bg-orange-500 transition disabled:opacity-60"
                    >
                        {submitting ? "Saving..." : "Save Lesson"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddLesson;
