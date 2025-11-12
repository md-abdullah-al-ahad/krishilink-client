import { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";
import { auth } from "../firebase/firebase.config";
import { validatePassword } from "../utils/validation";

// Create AuthContext
export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Set Firebase persistence on mount
  useEffect(() => {
    setPersistence(auth, browserLocalPersistence)
      .then(() => {
        console.log("Firebase persistence enabled");
      })
      .catch((error) => {
        console.error("Failed to set persistence:", error);
      });
  }, []);

  // Register user with email and password
  const createUser = async (email, password, name = "") => {
    setLoading(true);
    setError(null);

    // Validate password
    const passwordValidation = validatePassword(password);
    if (!passwordValidation.isValid) {
      setLoading(false);
      throw new Error(passwordValidation.errors.join(", "));
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Update profile with display name if provided
      if (name && userCredential.user) {
        await updateProfile(userCredential.user, {
          displayName: name,
        });
      }

      setLoading(false);
      return userCredential;
    } catch (err) {
      setLoading(false);
      setError(err.message);
      throw err;
    }
  };

  // Sign in with email and password
  const signIn = async (email, password) => {
    setLoading(true);
    setError(null);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      setLoading(false);
      return userCredential;
    } catch (err) {
      setLoading(false);
      setError(err.message);
      throw err;
    }
  };

  // Sign in with Google
  const signInWithGoogle = async () => {
    setLoading(true);
    setError(null);

    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({
        prompt: "select_account",
      });
      const userCredential = await signInWithPopup(auth, provider);
      setLoading(false);
      return userCredential;
    } catch (err) {
      setLoading(false);
      setError(err.message);
      throw err;
    }
  };

  // Logout user
  const logout = async () => {
    setLoading(true);
    setError(null);

    try {
      await signOut(auth);
      setUser(null);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError(err.message);
      throw err;
    }
  };

  // Update user profile (name and photo)
  const updateUserProfile = async (name, photoURL) => {
    setError(null);

    try {
      if (!auth.currentUser) {
        throw new Error("No user is currently signed in");
      }

      const updates = {};
      if (name) updates.displayName = name;
      if (photoURL) updates.photoURL = photoURL;

      await updateProfile(auth.currentUser, updates);

      // Update local user state
      setUser({ ...auth.currentUser });
      return auth.currentUser;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // Monitor auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Context value
  const value = {
    user,
    loading,
    error,
    createUser,
    signIn,
    signInWithGoogle,
    logout,
    updateUserProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
