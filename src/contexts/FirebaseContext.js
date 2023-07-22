import { createContext } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import firebaseConfig from "../constants/FirebaseConfig";


export const FirebaseContext = createContext()

export const FirebaseProvider = ({children}) => {
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const db = getFirestore()

    return (
        <FirebaseContext.Provider value={{app , db}}>
            {children}
        </FirebaseContext.Provider>
    )
}