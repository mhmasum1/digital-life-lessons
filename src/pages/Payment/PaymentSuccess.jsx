import { useSearchParams } from "react-router-dom";

const PaymentSuccess = () => {
    const [searchParams] = useSearchParams();
    const txId = searchParams.get("session_id");

    return (
        <div className="p-10 text-center">
            <h1 className="text-3xl font-bold text-green-600">Payment Successful 🎉</h1>
            <p className="mt-4">Your account has been upgraded to Premium!</p>
            <p className="text-gray-600 mt-3">Transaction ID: {txId}</p>

            <a href="/" className="mt-6 block text-blue-600 underline">
                Go to Home
            </a>
        </div>
    );
};

export default PaymentSuccess;
