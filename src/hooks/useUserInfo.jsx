import { useEffect, useState } from "react";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useUserInfo = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const [dbUser, setDbUser] = useState(null);
    const [loadingUser, setLoadingUser] = useState(false);

    useEffect(() => {
        if (!user?.email || !axiosSecure) {
            setDbUser(null);
            setLoadingUser(false);
            return;
        }

        let cancelled = false;

        const fetchUser = async () => {
            setLoadingUser(true);

            try {
                const res = await axiosSecure.get(`/users/${user.email}`);
                if (!cancelled) {
                    setDbUser(res.data || null);
                }
            } catch (error) {
                console.error("useUserInfo error:", error);
                if (!cancelled) {
                    setDbUser(null);
                }
            } finally {
                if (!cancelled) {
                    setLoadingUser(false);
                }
            }
        };

        fetchUser();

        return () => {
            cancelled = true;
        };
    }, [user?.email]);

    return { dbUser, loadingUser };
};

export default useUserInfo;
