const Pricing = () => {
    return (
        <div className="max-w-3xl mx-auto py-10">
            <h2 className="text-3xl font-bold mb-6 text-center">Pricing</h2>

            <div className="grid md:grid-cols-2 gap-6">
                {/* Free Plan */}
                <div className="border rounded-xl p-6 shadow-sm">
                    <h3 className="text-xl font-semibold mb-2">Free Plan</h3>
                    <p className="mb-4 text-sm text-gray-500">
                        Basic access for trying the platform.
                    </p>
                    <ul className="space-y-1 text-sm">
                        <li>• Access to free lessons</li>
                        <li>• Save limited favorites</li>
                        <li>• Community features (basic)</li>
                    </ul>
                </div>

                {/* Premium Plan */}
                <div className="border rounded-xl p-6 shadow-sm">
                    <h3 className="text-xl font-semibold mb-2">Premium Plan</h3>
                    <p className="mb-4 text-sm text-gray-500">
                        Full access to all premium features.
                    </p>
                    <ul className="space-y-1 text-sm">
                        <li>• Access to premium lessons</li>
                        <li>• Unlimited favorites</li>
                        <li>• Advanced analytics & dashboard</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Pricing;
