import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import zxcvbn from "zxcvbn";
import Swal from "sweetalert2";
import "./style.css";

const ResetPass = () => {
  const location = useLocation();
  const navigate = useNavigate();

  //token
  const token = location.pathname.split("/")[2];
  const [err, setErr] = useState("");
  const [Erro, setErro] = useState(true);
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  //   resetToken
  const resetToken = async () => {
    try {
      const result = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/reset/${token}`
      );
      if (result.data.success) {
        setId(result.data.success);
        setErro(false);
      }
      if (result.data.error) {
        setErr(result.data.error);
      }
      // console.log(result.data);
    } catch (error) {
      // console.log(error);
    }
  };

  useEffect(() => {
    resetToken();
  }, []);

  const reset = async (e) => {
    try {
      e.preventDefault();
      const result = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/resetPass/${id}`,
        {
          password,
          password2,
        }
      );
      // console.log(result.data);
      Swal.fire(
        "تم تغيير كلمة المرور بنجاح",
        " لقد تم تغيير كلمة مرورك بنجاح , يمكنك الان تسجيل الدخول  ",
        "success"
      );
      navigate("/login");
      if (result.data.error) {
        setErr(result.data.error);
        Swal.fire({
          icon: "error",
          title: "!!!خطأ",
          text: " خطأ في كلمة المرور ",
        });
      }
    } catch (error) {
      // console.log(error);
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
    <div>
      <div className="containerForm">
        {!Erro ? (
          <div className="card">
            <div className="card-image"></div>
            <p style={{ marginBottom: "50px", textAlign: "center" }}>
              أدخل كلمة المرور الجديدة
            </p>
            <form onSubmit={reset}>
              <div className="input">
                <input
                  className="input-field"
                  style={{ marginTop: "16px" }}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  type="password"
                  name="password"
                />
                <label
                  style={{ marginLeft: "200px" }}
                  className="inputLabel"
                  htmlFor="password"
                >
                  كلمة المرور الجديدة
                </label>
              </div>
              <div className="progAndText" style={{ height: "10px" }}>
                <div style={{ height: "10px", width: "80%" }}>
                  <div
                    className="progress-bar"
                    style={changePassColors()}
                  ></div>
                </div>
                <p style={{ color: funcProgressColor() }}>
                  {createPassLable()}
                </p>
              </div>
              {/* <div
                style={{
                  fontSize: "12px",
                 textAlagin: "center",
                  marginBottom: "50px",
                }}
              >
                <p>اختر كلمة مرور قويه لحماية حسابك</p>
                <p>مكونه من احرف كبيره وارقام </p>
                <p>يجب ان تكون اكثر من ثمان حرف ورقم</p>
              </div> */}
              <br />
              <br />
              <div className="input">
                <input
                  className="input-field"
                  onChange={(e) => {
                    setPassword2(e.target.value);
                  }}
                  type="password"
                  name="password2"
                />
                <label
                  style={{ marginLeft: "220px" }}
                  className="inputLabel"
                  htmlFor="password2"
                >
                  تأكيد كلمة المرور
                </label>
              </div>
              <div className="actionLogin"></div>

              <button className="actionButton" type="submit">
                تغيير
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
            </form>
            <p>{err}</p>
          </div>
        ) : (
          <div className="card">
            <h1>!!! خطأ</h1>
            <p>{err}</p>
            <button
              onClick={() => {
                navigate("/login");
              }}
            >
              رجوع تسجيل الدخول
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResetPass;
