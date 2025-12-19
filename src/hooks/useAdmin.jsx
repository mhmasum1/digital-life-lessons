import { useEffect, useState } from "react";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useAdmin = () => {
    const { user, loading } = useAuth();
    const axiosSecure = useAxiosSecure();

    const [isAdmin, setIsAdmin] = useState(false);
    const [isAdminLoading, setIsAdminLoading] = useState(true);

    useEffect(() => {
        const checkAdmin = async () => {
            if (!user?.email) {
                setIsAdmin(false);
                setIsAdminLoading(false);
                return;
            }

            try {
                setIsAdminLoading(true);
                const res = await axiosSecure.get(`/users/admin/${user.email}`);
                setIsAdmin(!!res.data?.admin);
            } catch (error) {
                setIsAdmin(false);
            } finally {
                setIsAdminLoading(false);
            }
        };

        if (!loading) checkAdmin();
    }, [user?.email, loading, axiosSecure]);

    return [isAdmin, isAdminLoading];
};

export default useAdmin;
