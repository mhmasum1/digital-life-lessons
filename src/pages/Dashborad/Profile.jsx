import { useEffect, useMemo, useState } from "react";
import useAuth from "../../hooks/useAuth";
import useUserInfo from "../../hooks/useUserInfo";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Spinner from "../../components/common/Spinner";
import { Link } from "react-router-dom";

const Profile = () => {
  const { user } = useAuth();
  const { dbUser, loadingUser } = useUserInfo();
  const axiosSecure = useAxiosSecure();

  const [myLessons, setMyLessons] = useState([]);
  const [favCount, setFavCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const isPremium = dbUser?.isPremium === true;

  useEffect(() => {
    if (!user?.email || loadingUser) return;

    const load = async () => {
      try {
        setLoading(true);

        const [lessonRes, favRes] = await Promise.all([
          axiosSecure.get(`/lessons/my?email=${user.email}`),
          axiosSecure.get(`/favorites`),
        ]);

        setMyLessons(Array.isArray(lessonRes.data) ? lessonRes.data : []);
        setFavCount((favRes.data?.favorites || []).length);
      } catch (e) {
        console.error("Profile load error:", e);
        setMyLessons([]);
        setFavCount(0);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [user?.email, loadingUser]); 

  const publicLessons = useMemo(() => {
    return myLessons
      .filter((l) => l?.visibility === "public")
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }, [myLessons]);

  if (loadingUser || loading) return <Spinner />;

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="bg-white rounded-2xl border border-orange-100 shadow-sm p-6 flex flex-col md:flex-row gap-6 items-start md:items-center">
        <div className="flex items-center gap-4">
          <img
            src={
              dbUser?.photoURL ||
              user?.photoURL ||
              "https://i.ibb.co/2kRZ7cB/user.png"
            }
            alt="profile"
            className="w-20 h-20 rounded-full object-cover border"
          />
          <div>
            <h1 className="text-xl font-bold text-gray-900">
              {dbUser?.name || user?.displayName || "User"}
              {isPremium && <span className="ml-2 text-amber-600">⭐ Premium</span>}
            </h1>
            <p className="text-sm text-gray-600">{user?.email}</p>
            <p className="text-xs text-gray-500 mt-1">
              Email edit disabled (Firebase security).
            </p>
          </div>
        </div>

        <div className="md:ml-auto grid grid-cols-2 gap-4 text-sm w-full md:w-auto">
          <div className="bg-orange-50 border border-orange-100 rounded-xl p-4">
            <p className="text-gray-500">Lessons Created</p>
            <p className="text-2xl font-bold text-gray-900">{myLessons.length}</p>
          </div>
          <div className="bg-orange-50 border border-orange-100 rounded-xl p-4">
            <p className="text-gray-500">Lessons Saved</p>
            <p className="text-2xl font-bold text-gray-900">{favCount}</p>
          </div>
        </div>
      </div>

      <div className="mt-8 bg-white rounded-2xl border border-orange-100 shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          My Public Lessons
        </h2>

        {publicLessons.length === 0 ? (
          <p className="text-sm text-gray-600">No public lessons yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {publicLessons.map((lesson) => (
              <Link
                key={lesson._id}
                to={`/lessons/${lesson._id}`}
                className="border border-gray-200 rounded-xl p-4 hover:border-orange-300 hover:shadow-md transition"
              >
                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                  {lesson.title}
                </h3>
                <p className="text-xs text-gray-600 line-clamp-2">
                  {lesson.shortDescription}
                </p>

                <div className="mt-3 flex gap-2">
                  <span className="text-[10px] px-2 py-1 rounded bg-orange-50 text-orange-700">
                    {lesson.category || "Category"}
                  </span>
                  <span className="text-[10px] px-2 py-1 rounded bg-blue-50 text-blue-700">
                    {lesson.emotionalTone || "Tone"}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
