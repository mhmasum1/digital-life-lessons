const TopContributors = ({ contributors }) => {
    return (
        <section className="py-10 bg-white">
            <div className="max-w-6xl mx-auto px-4">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl md:text-2xl font-semibold text-gray-900">
                        Top Contributors of the Week
                    </h2>
                    <p className="text-xs md:text-sm text-gray-500">
                        Most active members sharing real stories
                    </p>
                </div>

                {contributors.length === 0 ? (
                    <p className="text-sm text-gray-500">
                        No contributors yet for this week.
                    </p>
                ) : (
                    <div className="grid gap-5 md:grid-cols-3">
                        {contributors.map((user) => (
                            <div
                                key={user._id}
                                className="flex items-center gap-3 rounded-xl border border-orange-100 bg-[#FFF7ED]/60 p-4"
                            >
                                {user.photoURL ? (
                                    <img
                                        src={user.photoURL}
                                        alt={user.name}
                                        className="h-10 w-10 rounded-full object-cover border border-orange-200"
                                    />
                                ) : (
                                    <div className="h-10 w-10 rounded-full bg-primary text-white flex items-center justify-center text-sm font-semibold">
                                        {(user.name?.[0] || "U").toUpperCase()}
                                    </div>
                                )}
                                <div>
                                    <p className="text-sm font-semibold text-gray-900">
                                        {user.name}
                                    </p>
                                    <p className="text-[11px] text-gray-500">
                                        {user.totalLessons} lessons • {user.totalSaves} saves
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default TopContributors;
