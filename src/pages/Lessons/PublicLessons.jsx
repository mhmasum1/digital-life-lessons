import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useUserInfo from "../../hooks/useUserInfo";
import Spinner from "../../components/common/Spinner";
import LessonCard from "../../components/lessons/LessonCard";

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

                    {!isPremiumUser && (
                        <p className="mt-3 text-[11px] text-center inline-block mx-auto px-3 py-1 rounded-full bg-orange-50 text-orange-700 border border-orange-100">
                            Some lessons are Premium only – upgrade to unlock full access.
                        </p>
                    )}
                </header>

                {lessons.length === 0 ? (
                    <p className="text-sm text-gray-600 text-center mt-10">
                        No public lessons have been shared yet.
                    </p>
                ) : (
                    <div className="grid md:grid-cols-2 gap-5">
                        {lessons.map((lesson) => (
                            <LessonCard
                                key={lesson._id}
                                lesson={lesson}
                                isPremiumUser={isPremiumUser}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default PublicLessons;
