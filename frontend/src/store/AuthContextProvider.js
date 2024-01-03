import { useContext } from "react";
import AuthContext from "./authContext";

const AuthProvider = (props) => {
  const ctx = useContext(AuthContext);
  const setToken = (token) =>{
    localStorage.setItem("token", token);
    const expiryDate = new Date();
    expiryDate.setHours(new Date().getHours() + 1);
    localStorage.setItem("expiryDate", expiryDate.toISOString());
    ctx.token = token;
  }

  const removeToken = () =>{
    ctx.token = "";
    localStorage.removeItem("token");
    localStorage.removeItem("expiryDate");
    ctx.isLoggedIn = false;
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: false,
        token: "token",
        setToken: setToken,
        removeToken: removeToken,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
