import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Spinner from "../../components/common/Spinner";

const ReportedLessons = () => {
    const axiosSecure = useAxiosSecure();
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            const res = await axiosSecure.get("/reports");
            setReports(res.data);
            setLoading(false);
        };
        load();
    }, [axiosSecure]);

    if (loading) return <Spinner />;

    return (
        <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Reported Lessons</h2>

            {reports.length === 0 ? (
                <p className="text-gray-500">No reports found 🎉</p>
            ) : (
                <div className="space-y-3">
                    {reports.map(r => (
                        <div
                            key={r._id}
                            className="bg-white border rounded-xl p-4"
                        >
                            <h3 className="font-semibold">{r.lessonTitle}</h3>
                            <p className="text-sm text-gray-600">
                                Reason: {r.reason}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ReportedLessons;
