import { Link, Navigate, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import { FcGoogle } from "react-icons/fc";
import { TbFidgetSpinner } from "react-icons/tb";
import Spinner from "../../components/common/Spinner";

const Login = () => {
  const { signInUser, signInGoogle, loading, user, setLoading } = useAuth();
  const navigate = useNavigate();

  if (loading) return <Spinner />;
  if (user) return <Navigate to="/" replace />;

  // ---------- Email / Password Login ----------
  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    try {
      setLoading(true);

      await signInUser(email, password);

      toast.success("Login successful");
      navigate("/", { replace: true });
    } catch (err) {
      console.error(err);
      toast.error(err?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  // ---------- Google Login ----------
  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);

      await signInGoogle();

      toast.success("Login successful");
      navigate("/", { replace: true });
    } catch (err) {
      console.error(err);
      toast.error(err?.message || "Google login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <div className="flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-100 text-gray-900">
        <div className="mb-8 text-center">
          <h1 className="my-3 text-4xl font-bold">Log In</h1>
          <p className="text-sm text-gray-400">
            Sign in to access your account
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block mb-2 text-sm">
                Email address
              </label>
              <input
                type="email"
                name="email"
                required
                placeholder="Enter Your Email"
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm">
                Password
              </label>
              <input
                type="password"
                name="password"
                required
                placeholder="*******"
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
          </div>

          <button
            type="submit"
            className="bg-primary w-full rounded-md py-3 text-white"
          >
            {loading ? (
              <TbFidgetSpinner className="animate-spin m-auto" />
            ) : (
              "Continue"
            )}
          </button>
        </form>

        <div className="flex items-center pt-4 space-x-1">
          <div className="flex-1 h-px bg-gray-300" />
          <p className="px-3 text-sm text-gray-400">
            Login with social accounts
          </p>
          <div className="flex-1 h-px bg-gray-300" />
        </div>

        <div
          onClick={handleGoogleSignIn}
          className="flex justify-center items-center space-x-2 border m-3 p-2 rounded cursor-pointer"
        >
          <FcGoogle size={32} />
          <p>Continue with Google</p>
        </div>

        <p className="px-6 text-sm text-center text-gray-400">
          Don&apos;t have an account?{" "}
          <Link
            to="/auth/register"
            className="hover:underline text-gray-600"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
