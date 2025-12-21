import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Spinner from "../../components/common/Spinner";
import toast from "react-hot-toast";

const ReportedLessons = () => {
    const axiosSecure = useAxiosSecure();
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadReports = async () => {
            try {
                const res = await axiosSecure.get("/reports");
                setReports(res.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        loadReports();
    }, [axiosSecure]);

    // 🔴 Delete lesson
    const handleDeleteLesson = async (lessonId, reportId) => {
        const confirm = window.confirm("Delete this lesson permanently?");
        if (!confirm) return;

        try {
            await axiosSecure.delete(`/lessons/${lessonId}`);
            await axiosSecure.delete(`/reports/${reportId}`);

            setReports(prev => prev.filter(r => r._id !== reportId));
            toast.success("Lesson deleted");
        } catch (err) {
            toast.error("Failed to delete lesson");
        }
    };

    // 🟢 Ignore report
    const handleIgnore = async (reportId) => {
        try {
            await axiosSecure.delete(`/reports/${reportId}`);
            setReports(prev => prev.filter(r => r._id !== reportId));
            toast.success("Report ignored");
        } catch (err) {
            toast.error("Failed to ignore report");
        }
    };

    if (loading) return <Spinner />;

    return (
        <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Reported Lessons</h2>

            {reports.length === 0 ? (
                <p className="text-gray-500">No reported lessons 🎉</p>
            ) : (
                <div className="space-y-3">
                    {reports.map(report => (
                        <div
                            key={report._id}
                            className="bg-white border rounded-lg p-4 flex justify-between items-center"
                        >
                            <div>
                                <h3 className="font-semibold">
                                    {report.lessonTitle || "Untitled Lesson"}
                                </h3>
                                <p className="text-sm text-gray-600">
                                    Reason: {report.reason}
                                </p>
                            </div>

                            <div className="flex gap-2">
                                <button
                                    onClick={() =>
                                        handleDeleteLesson(report.lessonId, report._id)
                                    }
                                    className="btn btn-xs bg-red-500 text-white"
                                >
                                    Delete
                                </button>

                                <button
                                    onClick={() => handleIgnore(report._id)}
                                    className="btn btn-xs bg-gray-200"
                                >
                                    Ignore
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ReportedLessons;
