import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Log } from "../../reducer/signIn";
import Swal from "sweetalert2";
import "./style.css";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useSelector((state) => {
    return state;
  });
  const dispatch = useDispatch();

  const login = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/login`,
        {
          email,
          password,
        }
      );
      const data = {
        user: result.data.result,
        token: result.data.token,
        role: result.data.result.role,
      };

      console.log("user" , result.data);
      dispatch(Log(data));
      // console.log(result.data.result.role);
      Swal.fire("تم تسجيل الدخول بنجاح", "تم تسجيل دخولك بنجاح", "success");
      navigate("/home");
      //
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "!!!خطأ",
        text: " خطأ في كلمة المرور او الايميل ",
      });
    }
  };

  return (
    <div>
      <div className="container">
        <div className="card">
          <div className="card-image"></div>
          <form onSubmit={login}>
            <div className="input">
              <input
                onChange={(e) => setEmail(e.target.value)}
                className="input-field"
                type="email"
                name="email"
                placeholder="example@gmail.com"
              />
              <label className="inputLabel" htmlFor="email">
                :ايميل
              </label>
            </div>
            <div className="input">
              <input
                onChange={(e) => setPassword(e.target.value)}
                className="input-field"
                type="password"
                name="password"
                placeholder="*******"
              />
              <label className="inputLabel" htmlFor="password">
                :الرقم السري
              </label>
            </div>
            <p
              className="forfPass"
              onClick={() => {
                navigate("/forfPass");
              }}
            >
              هل نسيت كلمة المرور؟
            </p>

            <div className="actionLogin">
              <button className="actionButton" type="submit">
                تسجيل الدخول
              </button>
              <button
                className="actionButton"
                style={{ backgroundColor: "grey", margin: "10px" }}
                onClick={() => {
                  navigate("/");
                }}
              >
                رجوع
              </button>
              <p
                onClick={() => {
                  navigate("/register");
                }}
              >
                اضغط{" "}
                <span
                  style={{
                    color: "rgb(6,170,212)",
                    textAlign: "center",
                    cursor: "pointer",
                  }}
                >
                  هنا
                </span>{" "}
                اذا لم يكن لديك حساب
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
