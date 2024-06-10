

import { getAuth } from "firebase/auth";

// import { UserAuth } from "../../context/authContext";

export const checkUserAuthenticated = () => {
  // const {user} = UserAuth();

  const auth = getAuth();
  const user = auth.currentUser;
  return user ? true : false;
};
