import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./style.css";
import Swal from "sweetalert2";

const ForgotPass = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  //show massege from backend
  const [err, setErr] = useState("");

  //user write ->  email
  const forgPass = async (e) => {
    try {
      e.preventDefault();
      const result = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/forgotPass`,
        {
          email,
        }
      );
      // console.log(result.data);
      if (result.data.success) {
        setErr(result.data.success);
        Swal.fire(
          "تم ارسال الرابط الى بريدك الالكتروني بنجاح",
          " .تم إرسال رابط إعادة تعيين كلمة المرور إلى معرف البريد الإلكتروني الخاص بك يرجى اتباع التعليمات ",
          "success"
        );
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "!!!خطأ",
        text: " خطأ في الايميل ",
      });
    }
  };

  return (
    <>
      <div className="container">
        <div className="card">
          <div className="card-image"></div>
          <form onSubmit={forgPass}>
            <p style={{ marginBottom: "10px", textAlign: "center" }}>
              أدخل البريد الإلكتروني لإرسال رابط إعادة تعيين كلمة المرور
            </p>
            <br />
            <div className="input">
              <input
                style={{ marginTop: "10px" }}
                className="input-field"
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                name="email"
                placeholder="example@gmail.com"
              />
              <label className="inputLabel" htmlFor="email">
                :ايميل
              </label>
            </div>

            <div className="actionLogin">
              <button className="actionButton" type="submit">
                ارسال
              </button>
              <button
                className="actionButton"
                style={{ backgroundColor: "grey", margin: "10px" }}
                onClick={() => {
                  navigate("/login");
                }}
              >
                الغاء
              </button>
            </div>
          </form>
          <p>{err}</p>
        </div>
      </div>
    </>
  );
};

export default ForgotPass;
