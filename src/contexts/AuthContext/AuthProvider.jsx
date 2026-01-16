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

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

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

  const getJwtWithRetry = async (email) => {
    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        const { data } = await axiosPublic.post("/jwt", { email });
        if (data?.token) return data.token;
      } catch (err) {
        await sleep(1500 * attempt);
      }
    }
    return null;
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (!currentUser?.email) {
        localStorage.removeItem("access-token");
        setLoading(false);
        return;
      }

      try {
        await axiosPublic.post("/users", {
          email: currentUser.email,
          name: currentUser.displayName || "",
          photoURL: currentUser.photoURL || "",
        });

        const token = await getJwtWithRetry(currentUser.email);

        if (token) {
  localStorage.setItem("access-token", token);
} else {
  localStorage.removeItem("access-token");
}

      } catch (err) {
        console.log("Auth/JWT error:", err?.response?.data || err?.message);
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
