import { createContext, useContext, useEffect, useRef, useState } from "react";
import { FirebaseContext } from "./FirebaseContext";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const isMount = useRef(false);
  const { app } = useContext(FirebaseContext);
  const auth = getAuth(app);

  const signUp = async ({ email, password }) => {
    const creds = await createUserWithEmailAndPassword(auth, email, password);
    console.log("creds", creds);
  };

  const logIn = async ({ email, password }) => {
    const creds = await signInWithEmailAndPassword(auth, email, password);
    console.log("creds", creds);
  };

  const logOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      alert(error.message)
    }
  };

  useEffect(() => {
    if (!isMount.current) {
      onAuthStateChanged(auth, (user) => {
        console.log("user", user);
        setUser(user);
      });
      isMount.current = true;
    }
  },[auth]);

  return (
    <AuthContext.Provider value={{ signUp, logIn, user, isAuth: !!user , logOut }}>
      {children}
    </AuthContext.Provider>
  );
};
