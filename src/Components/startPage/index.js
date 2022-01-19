import React from "react";
import { NavLink } from "react-router-dom";
import "./style.css";
import { useNavigate } from "react-router-dom";

const StartPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="containerStart">
        <div className="navStart"></div>
        <div className="centerBackground">
          <h1
            style={{
              color: "rgb(59,78,92)",
            }}
          >
            <NavLink to="/">
              <img
                src="./img/logo.png"
                style={{
                  width: "280px",
                  // float: "right",
                  paddingRight: "0",
                }}
                alt="logoImge"
              />
            </NavLink>
          </h1>
          <h5>
              في منصة وميض يمكنك كـمستفيد العثور على مقدمي الخدمة ويمكنك طرح سؤالك أو
              .استفسارك وستجد إجابة له
              وكـمقدم خدمة يمكنك عرض خدمتك وتسويق مشروعك ليسهل على المستفيد الوصول لك
            </h5>
          <p>لتبدأ مع ومـيـض انشئ حسابك الان</p>
          <button
            onClick={() => {
              navigate("/register");
            }}
            style={{
              fontSize: "20px",
              padding: "10px",
              paddingLeft: "30px",
              paddingRight: "30px",
              backgroundColor: "rgb(59,78,92)",
              borderBottom: "1px solid black",
              color: "white",
              cursor: "pointer",
            }}
          >
            انشاء حساب
          </button>
        </div>
      </div>
    </>
  );
};

export default StartPage;
