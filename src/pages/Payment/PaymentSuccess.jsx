import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAuth from "../../hooks/useAuth";

const PaymentSuccess = () => {
    const axiosPublic = useAxiosPublic();
    const { refreshUser } = useAuth();
    const location = useLocation();

    const [message, setMessage] = useState("Verifying your payment...");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const sessionId = params.get("session_id");

        if (!sessionId) {
            Promise.resolve().then(() => {
                setMessage("No session ID found in the URL.");
                setLoading(false);
            });
            return;
        }

        axiosPublic
            .patch(`/payment-success?session_id=${sessionId}`)
            .then(async (res) => {
                if (res.data?.success) {
                    setMessage("🎉 Payment successful! Your Premium plan is activated.");
                    if (refreshUser) await refreshUser();
                } else {
                    setMessage(res.data?.message || "Payment not completed.");
                }
            })
            .catch((err) => {
                setMessage(
                    err?.response?.data?.message ||
                    "Failed to verify payment. Please contact support."
                );
            })
            .finally(() => {
                setLoading(false);
            });
    }, [location.search, axiosPublic]);


    return (
        <div className="max-w-xl mx-auto px-4 py-16 text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-3">Payment Status</h1>

            <p className="text-sm text-gray-700">{message}</p>

            {loading && (
                <p className="text-xs text-gray-500 mt-3">
                    Please wait, updating your account...
                </p>
            )}
        </div>
    );
};

export default PaymentSuccess;
