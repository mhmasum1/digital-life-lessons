const FeaturedLessons = ({ lessons }) => {
    const safeLessons = Array.isArray(lessons) ? lessons : [];

    return (
        <section className="py-10 bg-white">
            <div className="max-w-6xl mx-auto px-4">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl md:text-2xl font-semibold text-gray-900">
                        Featured Life Lessons
                    </h2>
                    <p className="text-xs md:text-sm text-gray-500">
                        Curated by our team from the most impactful stories
                    </p>
                </div>

                {safeLessons.length === 0 ? (
                    <p className="text-sm text-gray-500">
                        No featured lessons yet. Admin can feature lessons from the dashboard.
                    </p>
                ) : (
                    <div className="grid gap-5 md:grid-cols-3">
                        {safeLessons.map((lesson) => (
                            <div
                                key={lesson._id}
                                className="rounded-xl border border-orange-100 bg-[#FFF7ED]/60 p-4 shadow-sm hover:shadow-md transition-shadow"
                            >
                                <p className="text-[11px] uppercase tracking-wide text-orange-500 font-semibold mb-1">
                                    {lesson.category || "Life Lesson"}
                                </p>
                                <h3 className="text-sm md:text-base font-semibold text-gray-900 mb-2 line-clamp-2">
                                    {lesson.title}
                                </h3>
                                <p className="text-xs text-gray-600 line-clamp-3 mb-3">
                                    {lesson.summary}
                                </p>
                                <div className="flex justify-between items-center text-[11px] text-gray-500">
                                    <span>By {lesson.contributorName || "Anonymous"}</span>
                                    <span>{lesson.savesCount || 0} saves</span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default FeaturedLessons;
