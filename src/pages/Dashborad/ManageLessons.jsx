import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Spinner from "../../components/common/Spinner";

const ManageLessons = () => {
    const axiosSecure = useAxiosSecure();
    const [lessons, setLessons] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            const res = await axiosSecure.get("/lessons");
            setLessons(res.data);
            setLoading(false);
        };
        load();
    }, [axiosSecure]);

    const togglePublish = async (id) => {
        await axiosSecure.patch(`/admin/lessons/${id}/toggle`);
        setLessons(prev =>
            prev.map(l =>
                l._id === id ? { ...l, isPublic: !l.isPublic } : l
            )
        );
    };

    if (loading) return <Spinner />;

    return (
        <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Manage Lessons</h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {lessons.map(lesson => (
                    <div key={lesson._id} className="bg-white border rounded-xl p-4">
                        <h3 className="font-semibold">{lesson.title}</h3>
                        <p className="text-sm text-gray-500 mb-2">
                            Status: {lesson.isPublic ? "Public" : "Private"}
                        </p>

                        <button
                            onClick={() => togglePublish(lesson._id)}
                            className="btn btn-sm bg-orange-500 text-white"
                        >
                            {lesson.isPublic ? "Make Private" : "Publish"}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ManageLessons;
