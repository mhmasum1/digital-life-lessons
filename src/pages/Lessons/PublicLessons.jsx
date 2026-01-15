import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Spinner from "../../components/common/Spinner";

const PAGE_SIZE = 9;

const PublicLessons = () => {
  const axiosPublic = useAxiosPublic();

  const [lessons, setLessons] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1, total: 0 });

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [tone, setTone] = useState("");
  const [sort, setSort] = useState("newest"); 
  const [page, setPage] = useState(1);

  const categories = useMemo(() => {
    const set = new Set(lessons.map((l) => l.category).filter(Boolean));
    return ["", ...Array.from(set)];
  }, [lessons]);

  const tones = useMemo(() => {
    const set = new Set(lessons.map((l) => l.emotionalTone).filter(Boolean));
    return ["", ...Array.from(set)];
  }, [lessons]);

  const fetchLessons = async () => {
    setLoading(true);
    try {
      const params = {
        search: search.trim(),
        category,
        tone,
        sort,
        page,
        limit: PAGE_SIZE,
      };

      Object.keys(params).forEach((k) => {
        if (!params[k]) delete params[k];
      });

      const res = await axiosPublic.get("/lessons/public", { params });
      setLessons(res.data?.lessons || []);
      setPagination(res.data?.pagination || { page: 1, totalPages: 1, total: 0 });
    } catch (err) {
      console.error("PublicLessons fetch error:", err);
      setLessons([]);
      setPagination({ page: 1, totalPages: 1, total: 0 });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLessons();
  }, [category, tone, sort, page]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setPage(1);
    fetchLessons();
  };

  const handleClear = () => {
    setSearch("");
    setCategory("");
    setTone("");
    setSort("newest");
    setPage(1);
  };

  if (loading) return <Spinner />;

  return (
    <div className="bg-[#FFF7ED] min-h-screen py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Public Lessons</h1>

        {/* Filters */}
        <div className="bg-white border border-orange-100 rounded-2xl p-5 mb-6 shadow-sm">
          <form
            onSubmit={handleSearchSubmit}
            className="grid grid-cols-1 md:grid-cols-4 gap-3"
          >
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by title/keyword..."
              className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-orange-500"
            />

            <select
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                setPage(1);
              }}
              className="w-full px-4 py-2 rounded-lg border border-gray-200"
            >
              <option value="">All Categories</option>
              {categories
                .filter(Boolean)
                .map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
            </select>

            <select
              value={tone}
              onChange={(e) => {
                setTone(e.target.value);
                setPage(1);
              }}
              className="w-full px-4 py-2 rounded-lg border border-gray-200"
            >
              <option value="">All Tones</option>
              {tones
                .filter(Boolean)
                .map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
            </select>

            <select
              value={sort}
              onChange={(e) => {
                setSort(e.target.value);
                setPage(1);
              }}
              className="w-full px-4 py-2 rounded-lg border border-gray-200"
            >
              <option value="newest">Sort: Newest</option>
              <option value="mostSaved">Sort: Most Saved</option>
            </select>

            <div className="md:col-span-4 flex gap-2 mt-1">
              <button
                type="submit"
                className="px-5 py-2 rounded-lg bg-orange-500 text-white font-medium hover:bg-orange-600 transition"
              >
                Search
              </button>
              <button
                type="button"
                onClick={handleClear}
                className="px-5 py-2 rounded-lg border border-orange-200 bg-white text-gray-800 hover:bg-orange-50 transition"
              >
                Clear
              </button>
            </div>
          </form>
        </div>

        {/* List */}
        {lessons.length === 0 ? (
          <div className="bg-white border border-orange-100 rounded-2xl p-10 text-center">
            <p className="text-gray-600">No lessons found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {lessons.map((lesson) => (
              <Link
                key={lesson._id}
                to={`/lessons/${lesson._id}`}
                className="bg-white border border-gray-200 rounded-2xl p-5 hover:border-orange-300 hover:shadow-md transition"
              >
                <div className="flex gap-2 mb-3 flex-wrap">
                  <span className="px-2 py-1 rounded-full bg-orange-50 text-orange-700 text-[11px] border border-orange-200">
                    {lesson.category || "General"}
                  </span>
                  <span className="px-2 py-1 rounded-full bg-blue-50 text-blue-700 text-[11px] border border-blue-200">
                    {lesson.emotionalTone || "Neutral"}
                  </span>
                </div>

                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                  {lesson.title}
                </h3>
                <p className="text-sm text-gray-600 line-clamp-2">
                  {lesson.shortDescription}
                </p>

                <div className="mt-4 flex justify-between text-xs text-gray-500">
                  <span>Saved: {lesson.savedCount || 0}</span>
                  <span>{lesson.createdAt ? new Date(lesson.createdAt).toLocaleDateString() : ""}</span>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Pagination */}
        <div className="mt-8 flex items-center justify-center gap-2">
          <button
            disabled={pagination.page <= 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className="px-4 py-2 rounded-lg border bg-white disabled:opacity-50"
          >
            Prev
          </button>

          <span className="text-sm text-gray-700">
            Page {pagination.page} of {pagination.totalPages}
          </span>

          <button
            disabled={pagination.page >= pagination.totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="px-4 py-2 rounded-lg border bg-white disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default PublicLessons;
