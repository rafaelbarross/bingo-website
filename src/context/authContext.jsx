import { useContext, createContext, useState, useEffect } from "react";
import { signInWithPopup, signOut, onAuthStateChanged, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../firebase";

const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [bingo, setBingo] = useState();
  
  

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };
    
    const logOut = () => {
    signOut(auth);
    };
    
    useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
    });

    return () =>  unsubscribe();
    }, [user]);
    
   


  return (
    <AuthContext.Provider value={{ user, googleSignIn, logOut, bingo, setBingo }}>{children}</AuthContext.Provider>
  );
  
};

export const UserAuth = () => {
  return useContext(AuthContext);
};
