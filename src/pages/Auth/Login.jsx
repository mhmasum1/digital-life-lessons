import { Link, Navigate, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import { FcGoogle } from "react-icons/fc";
import { TbFidgetSpinner } from "react-icons/tb";
import Spinner from "../../components/common/Spinner";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const Login = () => {
    const { signInUser, signInGoogle, loading, user, setLoading } = useAuth();
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic();

    if (loading) return <Spinner />;
    if (user) return <Navigate to="/" replace={true} />;

    // ✅ helper: get JWT + store
    const getAndStoreToken = async (email) => {
        const res = await axiosPublic.post("/jwt", { email });
        const token = res?.data?.token;
        if (token) {
            localStorage.setItem("access-token", token);
        }
        return token;
    };

    // ---------- Email / Password Login ----------
    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;

        try {
            setLoading(true);

            const result = await signInUser(email, password);
            const loggedUser = result?.user;

            if (loggedUser?.email) {
                // 1) upsert user
                await axiosPublic.post("/users", {
                    email: loggedUser.email,
                    name: loggedUser.displayName || "",
                    photoURL: loggedUser.photoURL || "",
                });

                // 2) get JWT + store
                await getAndStoreToken(loggedUser.email);
            }

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

            const result = await signInGoogle();
            const loggedUser = result?.user;

            if (loggedUser?.email) {
                // 1) upsert user
                await axiosPublic.post("/users", {
                    email: loggedUser.email,
                    name: loggedUser.displayName || "",
                    photoURL: loggedUser.photoURL || "",
                });

                // 2) get JWT + store
                await getAndStoreToken(loggedUser.email);
            }

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

                <form
                    onSubmit={handleSubmit}
                    noValidate
                    className="space-y-6 ng-untouched ng-pristine ng-valid"
                >
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="email" className="block mb-2 text-sm">
                                Email address
                            </label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                required
                                placeholder="Enter Your Email Here"
                                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-primary bg-gray-200 text-gray-900"
                            />
                        </div>

                        <div>
                            <div className="flex justify-between">
                                <label htmlFor="password" className="text-sm mb-2">
                                    Password
                                </label>
                            </div>
                            <input
                                type="password"
                                name="password"
                                autoComplete="current-password"
                                id="password"
                                required
                                placeholder="*******"
                                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-primary bg-gray-200 text-gray-900"
                            />
                        </div>
                    </div>

                    <div>
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
                    </div>
                </form>

                <div className="space-y-1">
                    <button className="text-xs hover:underline hover:text-primary text-gray-400 cursor-pointer">
                        Forgot password?
                    </button>
                </div>

                <div className="flex items-center pt-4 space-x-1">
                    <div className="flex-1 h-px sm:w-16 dark:bg-gray-700" />
                    <p className="px-3 text-sm dark:text-gray-400">
                        Login with social accounts
                    </p>
                    <div className="flex-1 h-px sm:w-16 dark:bg-gray-700" />
                </div>

                <div
                    onClick={handleGoogleSignIn}
                    className="flex justify-center items-center space-x-2 border m-3 p-2 border-gray-300 border-rounded cursor-pointer"
                >
                    <FcGoogle size={32} />
                    <p>Continue with Google</p>
                </div>

                <p className="px-6 text-sm text-center text-gray-400">
                    Don&apos;t have an account yet?{" "}
                    <Link
                        to="/auth/register"
                        className="hover:underline hover:text-primary text-gray-600"
                    >
                        Register
                    </Link>
                    .
                </p>
            </div>
        </div>
    );
};

export default Login;
