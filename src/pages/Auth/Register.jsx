import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import { TbFidgetSpinner } from "react-icons/tb";

const SignUp = () => {
    const { registerUser, updateUserProfile, signInGoogle, loading } = useAuth()

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        const imageUrl = form.image.value;

        try {
            const result = await registerUser(email, password);

            await updateUserProfile(
                name,
                imageUrl ||
                "https://i.ibb.co/7S0qM0M/default-avatar.png"
            );
            console.log(result);

            toast.success("Signup Successful");

            navigate("/", { replace: true });
        } catch (err) {
            console.log(err);
            toast.error(err?.message);
        }
    };

    const handleGoogleSignIn = async () => {
        try {
            await signInGoogle();
            toast.success("Signup Successful");

            navigate("/", { replace: true });
        } catch (err) {
            console.log(err);
            toast.error(err?.message);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-white">
            <div className="flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-100 text-gray-900">
                <div className="mb-8 text-center">
                    <h1 className="my-3 text-4xl font-bold">Sign Up</h1>
                    <p className="text-sm text-gray-400">Welcome to Digital Life Lessons</p>
                </div>

                <form
                    onSubmit={handleSubmit}
                    noValidate
                    className="space-y-6 ng-untouched ng-pristine ng-valid"
                >
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="name" className="block mb-2 text-sm">
                                Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                placeholder="Enter Your Name Here"
                                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-primary bg-gray-200 text-gray-900"
                            />
                        </div>

                        {/* Profile Image URL */}
                        <div>
                            <label
                                htmlFor="image"
                                className="block mb-2 text-sm font-medium text-gray-700"
                            >
                                Profile Image URL
                            </label>
                            <input
                                name="image"
                                type="text"
                                id="image"
                                placeholder="Paste your image URL here"
                                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-primary bg-gray-200 text-gray-900"
                            />
                        </div>

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
                                autoComplete="new-password"
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

                <div className="flex items-center pt-4 space-x-1">
                    <div className="flex-1 h-px sm:w-16 dark:bg-gray-700" />
                    <p className="px-3 text-sm dark:text-gray-400">
                        Signup with social accounts
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
                    Already have an account?{" "}
                    <Link
                        to="/auth/login"
                        className="hover:underline hover:text-lime-500 text-gray-600"
                    >
                        Login
                    </Link>
                    .
                </p>
            </div>
        </div>
    );
};

export default SignUp;
