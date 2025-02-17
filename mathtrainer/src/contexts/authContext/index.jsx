import React, { useContext, useState, useEffect } from "react";
import { auth } from "../../firebase/firebase";
import { GoogleAuthProvider, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, get } from "firebase/database"; // Lisa Firebase Database

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [isEmailUser, setIsEmailUser] = useState(false);
  const [isGoogleUser, setIsGoogleUser] = useState(false);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState(""); // Lisa username state

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setCurrentUser(user);
        setUserLoggedIn(true);

        const isEmail = user.providerData.some(
          (provider) => provider.providerId === "password"
        );
        setIsEmailUser(isEmail);

        const isGoogle = user.providerData.some(
          (provider) => provider.providerId === GoogleAuthProvider.PROVIDER_ID
        );
        setIsGoogleUser(isGoogle);

        // **Laadi kasutajanimi Firebase Realtime Database'ist**
        const db = getDatabase();
        const userRef = ref(db, "user/" + user.uid); // Veendu, et Firebases on "users/" mitte "user/"
        const snapshot = await get(userRef);

        if (snapshot.exists()) {
          setUsername(snapshot.val().username); // Salvesta username state'i
        } else {
          setUsername("Unknown user(ERROR)"); // Kui kasutajanime pole, pane placeholder
        }
      } else {
        setCurrentUser(null);
        setUserLoggedIn(false);
        setUsername(""); // Nulli username kui pole sisse logitud
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    userLoggedIn,
    isEmailUser,
    isGoogleUser,
    currentUser,
    username, // Lisa username väärtus konteksti
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
