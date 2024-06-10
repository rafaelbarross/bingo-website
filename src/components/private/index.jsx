import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
// import { APP_ROUTES } from "@/constants/app-routes";
import { APP_ROUTES } from "../../constants/app-routes";
import { useEffect, useState } from "react";
import { Spinner } from "@material-tailwind/react";

// eslint-disable-next-line react/prop-types
const PrivateRoute = ({ children }) => {
  const navigate = useNavigate();
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false | null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsUserAuthenticated(!!user);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (isUserAuthenticated === false) {
      navigate(APP_ROUTES.public.home);
    }
  }, [isUserAuthenticated, navigate]);

  if (isUserAuthenticated === null) {
    return (
      <div className="absolute right-0 left-0 bottom-0 top-0 grid place-items-center">
        <Spinner color="green" className="w-12 h-12 z-50" />
      </div>
    );
  }

  return (
    <>
      {!isUserAuthenticated && null}
      {isUserAuthenticated && children}
    </>
  );
};

export default PrivateRoute;
