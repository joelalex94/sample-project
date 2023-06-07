import { createContext, useContext, useEffect, useState } from "react";
import {createUserWithEmailAndPassword,signInWithEmailAndPassword,signOut,onAuthStateChanged,sendPasswordResetEmail} from "firebase/auth";
import {auth} from '.././firebase';


const userAuthContext = createContext();

export function UserAuthContextProvider({children}){
    const [user, setUser] = useState({});

    function logIn(email, password){
        console.log("Email",email);
        return signInWithEmailAndPassword(auth, email, password);
    }
    function signUp(email, password){
        return createUserWithEmailAndPassword(auth, email, password);
    }
    function logOut(){
        return signOut(auth);
    }
    function forgotPassword(email){
        return sendPasswordResetEmail(auth, email);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => {
            unsubscribe();
        }
    }, []);
    return <userAuthContext.Provider value={{user, signUp, logIn, logOut, forgotPassword}}>{children}</userAuthContext.Provider>
}

export function useUserAuth(){
    return useContext(userAuthContext);
}