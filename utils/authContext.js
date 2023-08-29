import axios from "axios";
import { useRouter } from "next/router";
import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AdminAuthProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const router = useRouter()

  const login = (email, cookie) => {
    setUser({ email, cookie });
  };

  const checkUser = () => {
    console.log("user:  " + user?.email);
    console.log("user:  " + user?.cookie);
    if (user.email != null && user.cookie != null) {
      return true;
    } else {
      return false;
    }
  };

  const logout = () => {
    doSignOut();
  };
  async function doSignOut() {
    try {
      const response = await axios.get(
        process.env.NEXT_PUBLIC_API_ENDPOINT + "/admin/signout/",
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          withCredentials: true,
        }
      );
      console.log(response);
      setUser(null);
      document.cookie = null;

      router.push("/login");
    } catch (error) {
      console.error("error failed: ", error);
    }
  }
  return (
    <AuthContext.Provider value={{ user, login, logout, checkUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAdminAuth = () => useContext(AuthContext);
