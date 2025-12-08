import { useEffect, useState } from "react";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useUserInfo = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const [dbUser, setDbUser] = useState(null);
    const [loadingUser, setLoadingUser] = useState(true);

    useEffect(() => {
        if (!user?.email) {
            setDbUser(null);
            setLoadingUser(false);
            return;
        }

        setLoadingUser(true);

        axiosSecure
            .get(`/users/${user.email}`)
            .then((res) => {
                setDbUser(res.data || null);
            })
            .catch(() => {
                setDbUser(null);
            })
            .finally(() => {
                setLoadingUser(false);
            });
    }, [user?.email, axiosSecure]);

    return { dbUser, loadingUser };
};

export default useUserInfo;
