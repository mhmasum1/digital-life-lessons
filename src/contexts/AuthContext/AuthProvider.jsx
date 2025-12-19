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
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const axiosPublic = useAxiosPublic();

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

    const logOut = () => {
        setLoading(true);
        localStorage.removeItem("access-token");
        return signOut(auth);
    };

    const updateUserProfile = (name, photoURL) => {
        setLoading(true);
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL,
        })
            .then(() => {
                setUser((prev) => {
                    if (!prev) return prev;
                    return { ...prev, displayName: name, photoURL };
                });
            })
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setUser(currentUser);

            // ✅ JWT token collect & store
            try {
                if (currentUser?.email) {
                    const res = await axiosPublic.post("/jwt", { email: currentUser.email });
                    if (res?.data?.token) {
                        localStorage.setItem("access-token", res.data.token);
                    }
                } else {
                    localStorage.removeItem("access-token");
                }
            } catch (err) {
                console.error("JWT error:", err);
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
