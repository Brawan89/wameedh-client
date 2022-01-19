import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./style.css";
import Swal from "sweetalert2";
import zxcvbn from "zxcvbn";

const Register = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const signup = async (e) => {
    try {
      e.preventDefault();
      const result = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/register`,
        {
          userName,
          email,
          password,
          password2,
          role: e.target.role.value,
        }
      );
      Swal.fire({
        icon: "error",
        title: "!!!خطأ",
        text: " قُم بتعبئة جميع الخانات ",
      });
      // console.log("massage..... ",result.data.message);
      if (result.data.errors) {
        // console.log("err" , result.data.errors[0].msg);
        setError(result.data.errors[0].msg);
      } else if (result.data.message) {
        setError(result.data.message);
      }
      Swal.fire(
        "تم انشاء الحساب بنجاح",
        "من فضلك اذهب الى ايميلك لتفعيل حسابك ثم قم بتسجيل الدخول ",
        "success"
      );
    } catch (error) {
      console.log(error);
    }
  };

  //stronge pass
  const testResult = zxcvbn(password);
  const num = (testResult.score * 100) / 4;

  const createPassLable = () => {
    switch (testResult.score) {
      case 0:
        return "ضعيف جدا";
      case 1:
        return "ضعيف";
      case 2:
        return "متوسط";
      case 3:
        return "جيد";
      case 4:
        return "قويه";
      default:
        return "";
    }
  };

  const funcProgressColor = () => {
    switch (testResult.score) {
      case 0:
        return "#828282";
      case 1:
        return "#EA1111";
      case 2:
        return "#FFAD00";
      case 3:
        return "#9bc158";
      case 4:
        return "#00b500";
      default:
        return "none";
    }
  };

  const changePassColors = () => ({
    width: `${num}%`,
    background: funcProgressColor(),
    height: "10px",
  });
  //

  return (
    <>
      <div className="containerForm">
        <div className="card">
          <div className="card-image"></div>
          <form onSubmit={signup} className="card-form">
            <div style={{ marginBottom: "5px" }} className="input">
              <input
                className="input-field"
                type="text"
                name="userName"
                placeholder="روان بدر"
                onChange={(e) => {
                  setUserName(e.target.value);
                }}
              />
              <label className="inputLabel" htmlFor="username">
                :اسم المستخدم
              </label>
            </div>
            <div style={{ marginBottom: "5px" }} className="input">
              <input
                placeholder="example@gmail.com"
                className="input-field"
                type="email"
                name="email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <label className="inputLabel" htmlFor="email">
                :ايـمـيـل
              </label>
            </div>
            <div className="input">
              <input
                className="input-field"
                type="password"
                name="password"
                placeholder="**************"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <label className="inputLabel" htmlFor="password">
                :الرقم السري
              </label>
            </div>
            <div className="progAndText">
              <div style={{ height: "10px", width: "80%" }}>
                <div className="progress-bar" style={changePassColors()}></div>
              </div>
              <p style={{ color: funcProgressColor(), fontWeight: "bold" }}>
                {createPassLable()}
              </p>
            </div>
            <div style={{ marginBottom: "5px" }} className="input">
              <input
                className="input-field"
                type="password"
                name="password2"
                placeholder="**************"
                onChange={(e) => {
                  setPassword2(e.target.value);
                }}
              />
              <label className="inputLabel" htmlFor="password2">
                :تأكيد الرقم السري
              </label>
            </div>
            <div className="selector">
              <select className="select" name="role">
                <option value="61c05adf3708bf224ada4794">مستفيد</option>
                <option value="61c4375564bde5690cdb68d0">مقدم خدمة</option>
              </select>
              <label
                style={{
                  fontSize: "22px",
                  color: "rgb(19,82,139)",
                  fontWeight: "bold",
                }}
              >
                ما نوع الخدمة؟
              </label>
            </div>

            <div className="action">
              <button className="action-button" type="submit">
                انشاء
              </button>
              <button
                className="action-button"
                style={{ backgroundColor: "grey", margin: "10px" }}
                onClick={() => {
                  navigate("/");
                }}
              >
                رجوع
              </button>
              <p
                onClick={() => {
                  navigate("/login");
                }}
              >
                اذا كان لديك حساب بالفعل اضغط{" "}
                <span
                  style={{
                    color: "rgb(6,170,212)",
                    textAlign: "center",
                    cursor: "pointer",
                  }}
                >
                  هنا
                </span>{" "}
              </p>
            </div>
          </form>
          <p>{error}</p>
        </div>
      </div>
    </>
  );
};

export default Register;
