const MostSavedLessons = ({ lessons }) => {
    return (
        <section className="py-10 bg-[#FFF7ED]">
            <div className="max-w-6xl mx-auto px-4">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl md:text-2xl font-semibold text-gray-900">
                        Most Saved Lessons
                    </h2>
                    <p className="text-xs md:text-sm text-gray-500">
                        The lessons people return to again and again
                    </p>
                </div>

                {lessons.length === 0 ? (
                    <p className="text-sm text-gray-500">
                        No saved lessons yet. Encourage users to bookmark their favorite stories.
                    </p>
                ) : (
                    <div className="grid gap-5 md:grid-cols-3">
                        {lessons.map((lesson) => (
                            <div
                                key={lesson._id}
                                className="rounded-xl bg-white border border-orange-100 p-4 shadow-sm hover:shadow-md transition-shadow"
                            >
                                <h3 className="text-sm md:text-base font-semibold text-gray-900 mb-2 line-clamp-2">
                                    {lesson.title}
                                </h3>
                                <p className="text-xs text-gray-600 line-clamp-3 mb-3">
                                    {lesson.summary}
                                </p>
                                <div className="flex justify-between items-center text-[11px] text-gray-500">
                                    <span>By {lesson.contributorName || "Anonymous"}</span>
                                    <span>{lesson.savesCount} saves</span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default MostSavedLessons;
