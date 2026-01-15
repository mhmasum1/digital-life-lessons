import { useEffect, useMemo, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Spinner from "../../components/common/Spinner";
import toast from "react-hot-toast";

const ManageLessons = () => {
  const axiosSecure = useAxiosSecure();
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);

  const stats = useMemo(() => {
    const publicCount = lessons.filter(l => l.visibility === "public").length;
    const privateCount = lessons.filter(l => l.visibility !== "public").length;
    const reportedCount = 0; 
    return { publicCount, privateCount, reportedCount };
  }, [lessons]);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const res = await axiosSecure.get("/lessons"); 
        setLessons(res.data || []);
      } catch (e) {
        console.error(e);
        toast.error("Failed to load lessons");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [axiosSecure]);

  const toggleVisibility = async (id) => {
    try {
      const res = await axiosSecure.patch(`/admin/lessons/${id}/toggle-visibility`);
      const newVisibility = res.data?.visibility;

      setLessons(prev =>
        prev.map(l => (l._id === id ? { ...l, visibility: newVisibility } : l))
      );

      toast.success(`Lesson is now ${newVisibility}`);
    } catch (e) {
      console.error(e);
      toast.error("Failed to update visibility");
    }
  };

  const deleteLesson = async (id) => {
    const ok = confirm("Are you sure you want to delete this lesson?");
    if (!ok) return;

    try {
      await axiosSecure.delete(`/lessons/${id}`);
      setLessons(prev => prev.filter(l => l._id !== id));
      toast.success("Lesson deleted");
    } catch (e) {
      console.error(e);
      toast.error("Failed to delete lesson");
    }
  };

  if (loading) return <Spinner />;

  return (
    <div className="p-6">
      <div className="mb-5">
        <h2 className="text-xl font-semibold">Manage Lessons</h2>
        <p className="text-sm text-gray-600 mt-1">
          Public: <b>{stats.publicCount}</b> • Private: <b>{stats.privateCount}</b>
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {lessons.map((lesson) => (
          <div key={lesson._id} className="bg-white border rounded-xl p-4">
            <h3 className="font-semibold line-clamp-2">{lesson.title}</h3>
            <p className="text-sm text-gray-500 mb-3">
              Status: {lesson.visibility === "public" ? "Public" : "Private"}
            </p>

            <div className="flex gap-2">
              <button
                onClick={() => toggleVisibility(lesson._id)}
                className="px-3 py-2 rounded-lg bg-orange-500 text-white text-sm hover:bg-orange-600"
              >
                {lesson.visibility === "public" ? "Make Private" : "Publish"}
              </button>

              <button
                onClick={() => deleteLesson(lesson._id)}
                className="px-3 py-2 rounded-lg border border-red-200 text-red-600 text-sm hover:bg-red-50"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageLessons;
