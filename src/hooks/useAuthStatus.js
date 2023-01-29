
import { useEffect, useState,useRef } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export const useAuthStatus = () => {
  const [logedIn, setLogedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const isMounted = useRef(true)
  useEffect(() => {
    if(isMounted){

      const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setLogedIn(true);
      }
      setLoading(false);
    });
 
    }
    return () => {
isMounted.current = false

    }
     },[isMounted]);
  return {logedIn,loading}
};

export default useAuthStatus;
