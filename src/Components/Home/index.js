import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Footer from "../Footer";
import Navbar from "../Navbar";
import "./style.css";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [inquiries, setInquiries] = useState([]);
  const [posts, setPosts] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    getAllInquiries();
    getAllPosts();
  }, []);

  const state = useSelector((state) => {
    return state;
  });

  // get inquiry
  const getAllInquiries = async () => {
    const result = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/getInquiries`,
      {
        headers: {
          Authorization: `Bearer ${state.Login.token}`,
        },
      }
    );
    // console.log(result);
    setInquiries(result.data.slice(-3));
  };

  // get posts
  const getAllPosts = async () => {
    const result = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/getAllPosts`,
      {
        headers: {
          Authorization: `Bearer ${state.Login.token}`,
        },
      }
    );
    // console.log(result);
    setPosts(result.data.slice(-3));
  };

  return (
    <>
      <div className="containerHome">
        <div className="c1">
          <div className="app-text">
            <h1 style={{ color: "rgb(221,233,247)" }}>ما هو وميض؟</h1>
            <br />
            <h5>
              في منصة وميض يمكنك كـمستفيد العثور على مقدمي الخدمة ويمكنك طرح
              سؤالك أو .استفسارك وستجد إجابة له وكـمقدم خدمة يمكنك عرض خدمتك
              وتسويق مشروعك ليسهل على المستفيد الوصول لك
            </h5>
          </div>
          <div className="app-picture">
            <img style={{ width: "580px" }} src="./img/image31.png" />
          </div>
        </div>
      </div>
      <div>
        {/* latest inquiry */}
        <h2 className="lastInq">أحدث الاستفسارات</h2>
        <div className="grid-containerInqHome">
          {inquiries
            .map((i) => {
              return (
             
                  <div key={i._id}>
                    <div>
                      <img
                        className="avtarHome"
                        style={{ width: "80px", borderRadius: "50%" }}
                        src={i.user?.avatar}
                        alt="avatarImg"
                      />
                      <h4>{i.user?.userName}</h4>
                      <br />
                      <p
                        style={{ cursor: "pointer" }}
                        className="clickTite"
                        onClick={() => navigate(`/inquiry/${i._id}`)}
                      >
                        {i.title}
                      </p>
                    </div>
                  </div>
              
              );
            })
            .reverse()}
        </div>
        <br />
        <div className="containerHome-two">
          <div className="c1">
            <div className="app-text">
              <h1 style={{ color: "black" }}>لماذا وميض؟ </h1>
              <h5>
                في البداية ، معناها هو ضوء ضئيل يسطع فجأة في بعض البلورات عند
                تعرضها للإشعاع أو الجسيمات المشعة. تساعد هذه المنصة وتعطي بريقًا
                لكل مستخدم يريد خدمة ولم يجدها ، وهنا يجد جميع أنواع الخدمات دون
                أن يستغرق وقتًا طويلاً وبحثًا سهلاً
              </h5>
            </div>
            <div className="app-picture">
              <img style={{ width: "580px" }} src="./img/image4.jpg" />
            </div>
          </div>
        </div>

        <br />

        <h4 className="lastInq">أحدث المشاريع</h4>
        <div className="grid-containerHome">
          {posts
            .map((i) => {
              return (
                <div key={i._id}>
              
                    <img
                      style={{ width: "100%", height: "250px" }}
                      src={i.image}
                    />
                    <h3
                      className="clickTite"
                      onClick={() => navigate(`/Post/${i._id}`)}
                      style={{ padding: "40px", cursor: "pointer" }}
                    >
                      {i.title}
                    </h3>
                    <div className="grid-post">
                      <button style={{ borderRight: " 1px solid black" }}>
                        {i.price}
                      </button>

                      <button>{i.workingTime}</button>
                    </div>
           
                </div>
              );
            })
            .reverse()}
        </div>
      </div>
    </>
  );
};

export default Home;
