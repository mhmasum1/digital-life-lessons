import { useEffect, useState } from "react";
import {
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateProfile,
} from "firebase/auth";
import { auth } from "../../firebase/firebase.init";
import { AuthContext } from "./AuthContext";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
    const axiosPublic = useAxiosPublic();

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const registerUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const signInUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    const signInGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    };

    const logOut = async () => {
        setLoading(true);
        await signOut(auth);
        localStorage.removeItem("access-token");
        setLoading(false);
    };

    const updateUserProfile = (name, photoURL) => {
        setLoading(true);
        return updateProfile(auth.currentUser, { displayName: name, photoURL })
            .then(() => {
                setUser((prev) => (prev ? { ...prev, displayName: name, photoURL } : prev));
            })
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setUser(currentUser);

            try {
                if (currentUser?.email) {
                    //  get jwt token + store
                    const { data } = await axiosPublic.post("/jwt", { email: currentUser.email });
                    if (data?.token) {
                        localStorage.setItem("access-token", data.token);
                    }
                } else {
                    localStorage.removeItem("access-token");
                }
            } catch (err) {
                console.log("JWT error:", err?.response?.data || err?.message);
                localStorage.removeItem("access-token");
            } finally {
                setLoading(false);
            }
        });

        return () => unSubscribe();
    }, [axiosPublic]);

    const authInfo = {
        user,
        loading,
        registerUser,
        signInUser,
        signInGoogle,
        logOut,
        updateUserProfile,
        setLoading,
    };

    return <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
