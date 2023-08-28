import { createContext, useContext, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({Id:'', Cookie:''});
const router=useRouter()
  const login = (id, cookie) => {
    setUser({ Id:id, Cookie:cookie });
    

  };

  const checkUser = () => {
    console.log("user:  ")
    console.log(user)
   
    if(user.Id!='' && user.Cookie!='') {
      return true;
    }
    else
    {
      return false;
    }

  };

  const logout = () => {

    doSignOut()
  };
  async function doSignOut() {
    
        document.cookie = null;

        router.push('/cred/login');
      
  }
  return (
    <AuthContext.Provider value={{ user, login, logout,checkUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);