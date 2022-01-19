import React from "react";
import { NavLink } from "react-router-dom";
import "./style.css";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { LogT } from "./../../reducer/signIn";

const Navbar = () => {
  const navigate = useNavigate();

  const state = useSelector((state) => {
    return state;
  });
  console.log(state.Login.user);
  // console.log(state);
  // logout
  const dispatch = useDispatch();
  const signout = () => {
    localStorage.clear();
    dispatch(LogT({ token: "" }));
    navigate("/login");
  };

  // console.log(state.Login.user.userName);

  return (
    <>
{state.Login.token? (
<>
<div className="navWrapper">
        <div>
          <div className="dropdown">
            <img
              className="dropbtn"
              style={{ borderRadius: "50%", width: "70px" }}
              src="https://thumbs.dreamstime.com/b/default-avatar-profile-icon-trendy-flat-style-isolated-white-background-187477840.jpg"
              alt="img"
            />
            <div className="dropdown-content">
              <Link
                to={`/profile/${state.Login.user?._id}`}
                id="contentProf"
                style={{ marginLeft: "5px", fontSize: "16px" }}
              >
                الصفحة الشخصية
              </Link>
              <Link
                onClick={signout}
                to="/login"
                id="contentProf"
                style={{ marginLeft: "5px", fontSize: "16px" }}
              >
                تسجيل خروج
              </Link>
            </div>
          </div>
        </div>

        {/*  */}
        <NavLink to="/posts" className="linkNav">
          المشاريع
        </NavLink>
        <NavLink to="/inquiries" className="linkNav">
          الاستفسارات
        </NavLink>
        <NavLink to="/ServiceProvider" className="linkNav">
          مقدمي الخدمة
        </NavLink>
        {state.Login.user.role === "61c05aad3708bf224ada4791" ? (
        <NavLink to="/dashboard" className="linkNav">
           المستخدمين
        </NavLink>
        ) : (
          ""
        )}
        <NavLink to="/home">
          <img
            className="igLogo"
            src="./img/logo.png"
            style={{
              width: "180px",
              justifySelf: "flex-end",
              marginTop: "10px",
            }}
            alt="navImg"
          />
        </NavLink>
      </div>
</>) : 
(
"")
}
      
    </>
  );
};

export default Navbar;
