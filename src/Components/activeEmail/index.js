import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const ActivateEmail = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // token
  const token = location.pathname.split("/")[2];
  // console.log( "loc" , location.pathname.split("/")[2]);
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const [err, setErr] = useState("");
  const [Erro, setErro] = useState(true);

  const check = async () => {
    try {
      const result = await axios.get(`${BASE_URL}/activate/${token}`);
      if (result.data.success) {
        setErro(false);
      }
      if (result.data.err) {
        setErr(result.data.err);
      }
      // console.log(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    check();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      {!Erro ? (
        <div className="container">
          <div className="card">
            <div className="card-image"></div>
            <br />
            <h3>تم تنشيط حسابك</h3>
            <br />
            <button
              style={{ backgroundColor: "rgb(26,87,142)", color: "white" }}
              onClick={() => {
                navigate("/login");
              }}
            >
              اذهب الى تسجيل الدخول
            </button>
          </div>
        </div>
      ) : (
        <div className="container">
          <h1>!!خطأ</h1>
          <p>{err}</p>
          <button
            onClick={() => {
              navigate("/");
            }}
          >
            رجوع
          </button>
        </div>
      )}
    </div>
  );
};

export default ActivateEmail;
