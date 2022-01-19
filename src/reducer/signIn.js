const initialState = {
    role: "",
    token: "",
    user: "",
  };
  
  const Login = (state = initialState, action) => {
    const { type, payload } = action;
  
    switch (type) {
      case "LOGIN":
        const { role, token, user } = payload;
        localStorage.setItem("token", token);
        localStorage.setItem("role", role);
        localStorage.setItem("user", JSON.stringify(user));
        return { role, token, user };
      case "LOGOUT":
        localStorage.clear();
        
        return payload;
      default:
        const tokenStorge = localStorage.getItem("token");
        const roleStorge = localStorage.getItem("role");
        const userStorge = JSON.parse(localStorage.getItem("user"));
        if (tokenStorge && roleStorge && userStorge)
          return { role: roleStorge, token: tokenStorge, user: userStorge };
        else return state;
    }
  };
  
  export default Login;
  
  export const Log = (data) => {
    return {
      type: "LOGIN",
      payload: data,
    };
  };
  
  export const LogT = (data) => {
    return {
      type: "LOGOUT",
      payload: data,
    };
  };