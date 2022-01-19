import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import axios from "axios";
import "./style.css";
import Footer from "../Footer";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

import {
  AiOutlineInstagram,
  AiOutlineTwitter,
  AiFillFacebook,
  AiOutlineMessage,
} from "react-icons/ai";

const Post = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState([]);
  const [edit, setEdit] = useState(false);
  const [user, setUser] = useState([]);

  const state = useSelector((state) => {
    return state;
  });

  useEffect(() => {
    getOnePost();
    getOneUser();
    getServiceProvider();
  }, []);

  const getOnePost = async () => {
    const result = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/getOnePost/${id}`,
      {
        headers: {
          Authorization: `Bearer ${state.Login.token}`,
        },
      }
    );
    // console.log(result);
    setPost(result.data);
    // setEditpost(result.data);
    // setupdatedimg(result.data[0].image);
  };

  //
  //description about user
  const getOneUser = async () => {
    const result = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/getUserPost/${state.Login.user._id}`,
      { headers: { Authorization: `Bearer ${state.Login.token}` } }
    );
    // console.log(result);
    setPost(result.data);
  };
  //

  // edit post
  const updatPost = async (e) => {
    e.preventDefault();
    // console.log(e.target.title.value);
    const result = await axios.put(
      `${process.env.REACT_APP_BASE_URL}/updatePost/${id}`,
      {
        title: e.target.title.value,
        // image: updatedimg,
        dec: e.target.dec.value,
        price: e.target.price.value,
        workingTime: e.target.workingTime.value,
      },
      {
        headers: {
          Authorization: `Bearer ${state.Login.token}`,
        },
      }
    );
    // updatPost(state.Login.token);

    window.location.reload(false);
  };

  // const removeImg = (img) => {
  //   // console.log(img);
  //   let picIndex = updatedimg.indexOf(img);
  //   // console.log(picIndex);
  //   if (updatedimg.length == 1) {
  //     setupdatedimg([]);
  //   } else {
  //     let sliced = updatedimg.splice(picIndex, 1);
  //     setupdatedimg(sliced);
  //   }
  //   // console.log(updatedimg);
  // };

  // useEffect(() => {
  //   // console.log(updatedimg);
  // }, [updatedimg]);

  //get all service providers
  const getServiceProvider = async () => {
    const result = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/getServiceProvider`,
      {
        headers: {
          Authorization: `Bearer ${state.Login.token}`,
        },
      }
    );
    // console.log(result.data);
    setUser(result.data);
  };

  return (
    <>
      <div style={{ marginTop: "30px" }}>
        <div className="postCont">
          {post.map((item) => (
            <>
              <Carousel>
                {item.image.map((img) => (
                  <div key={item._id} style={{ height: "480px" }}>
                    <img src={img} />
                  </div>
                ))}
              </Carousel>

              <div>
                {item.user._id == state.Login.user._id ? (
                  <>
                    <p
                      onClick={() => setEdit(true)}
                      style={{
                        cursor: "pointer",
                        float: "right",
                        fontSize: "13px",
                      }}
                    >
                      ⚙️
                    </p>
                  </>
                ) : (
                  <></>
                )}
                <h1 style={{ fontSize: "40px", marginTop: "80px" }}>
                  {item.title}
                </h1>
                <h4>{item.dec}</h4>
                <h5>السعر: {item.price} ريال</h5>
                <h5> مدة العمل {item.workingTime} </h5>
                <h5
                  className="userName"
                  onClick={() => navigate(`/profile/${item.user._id}`)}
                >
                  صاحب المشروع: {item.user.userName}
                </h5>
              </div>

              {/* {item.image.map((img) => (
                    <h5
                      style={{
                        width: "94%",
                        padding: "30px",
                        backgroundColor: "white",
                      }}
                    >
                      <img style={{ width: "100%" }} src={img}></img>
                    </h5>
                  ))} */}

              {/* <div className="">
                  <img
                    style={{ borderRadius: "50%", width: "100px" }}
                    src={item.user.avatar}
                    alt="avatarImg"
                  ></img>
                  <h5> {item.user.userName}</h5>
                  <p>{item.user.bio}</p>
                  <h5 style={{ textAlign: "center" }}>
                    <AiOutlineInstagram />
                    <AiOutlineTwitter />
                    <AiFillFacebook />
                    <AiOutlineMessage />
                  </h5>
                </div> */}
            </>
          ))}
        </div>

        {/* ...................................
        ......................................
        ........................................ */}
        {/* <div className="desPost">
          {post.map((item) => (
            <>
              <div key={item._id}>
                
                  {item.user._id == state.Login.user._id ? (
                    <>
                      <button
                        onClick={() => setEdit(true)}
                        style={{float:"left" , marginLeft: "100px" }}
                      >
                        ⚙️
                      </button>
                    </>
                  ) : (
                    <></>
                  )} */}
        {/* <div className="allDec">
                    <div className="leftSide">
                      className
                      <h3> {item.workingTime} مدة العمل</h3>
                      <img
                        style={{ borderRadius: "50%" }}
                        id="avatarPost"
                        src={item.user.avatar}
                        alt="avatarImg"
                      ></img>

                      <h3 style={{ textAlign: "center" }}>
                        {item.user.userName}
                      </h3> */}

        {/* </div>
                    <div className="rightSide">
                      <h2 style={{ color: "rgb(19,82,139)"}}>
                        {item.title}
                      </h2>
                    
                      <div className="imgPost">
                        <img
                          style={{ width: "600px", height: "400px" }}
                          name="s"
                          id="image"
                          src={item.image[0]}
                        ></img> */}
        {/* <h3
                        className="desc"
                          style={{ marginRight: "150px", color: "rgb(19,82,139)" , textAlign: "right" }}
                        >
                          {item.dec}
                        </h3>
                      </div>
                    </div> */}
        {/* </div> */}

        <br />
        {/* <div style={{ marginTop: "10px" }} className="allInfoPost"> */}
        {/* <div className="infoPost"> */}
        {/* <h2 style={{color: "rgb(19,82,139)" , padding: "10px"}}>{item.title} </h2> */}
        {/* <h4>{item.title}</h4>
                      <h3 style={{color: "rgb(19,82,139)" , padding: "10px"}}>:وصف المشروع</h3>
                      <h3> {item.dec}</h3> */}
        {/* </div> */}

        {/* <div className="postsImg">
                    {item.image.map((img) => (
                      <img className="post" name="s" id="image" src={img}></img>
                    ))}
                  </div> */}

        {/* <div className="price-worktime"> */}
        {/* <h3>السعر {item.price} ريال</h3>
                    <h3 style={{ paddingLeft: "550px" }}>
                      {" "}
                      {item.workingTime} مدة العمل
                    </h3> */}
        {/* </div> */}
        {/* </div>
              </div> */}
        {/* </div> */}
        {/* </>
          ))}
        </div> */}

        {/* .........................................
        ................................................
        ................................................... */}
        {edit ? (
          <div style={{ marginTop: "-20px" }} className="edit">
            {post.map((item) => (
              // <div className="card">
              <form onSubmit={updatPost}>
                {/* {console.log(item)} */}
                <div key={item._id} className="card">
                  <div className="input">
                    <input
                      style={{ textAlign: "right" }}
                      className="input-field"
                      type="text"
                      name="title"
                      defaultValue={item.title}
                    />
                    <label
                      style={{ color: "rgb(19,82,139)", fontSize: "20px" }}
                    >
                      :عنوان المشروع
                    </label>
                  </div>
                  <div className="input">
                    <textarea
                      style={{ textAlign: "right" }}
                      className="input-field"
                      type="text"
                      name="dec"
                      defaultValue={item.dec}
                    />
                    <label
                      style={{ color: "rgb(19,82,139)", fontSize: "20px" }}
                    >
                      :وصف المشروع
                    </label>
                  </div>
                  <div className="input">
                    <input
                      style={{ textAlign: "right" }}
                      className="input-field"
                      type="number"
                      name="price"
                      defaultValue={item.price}
                    />
                    <label
                      style={{ color: "rgb(19,82,139)", fontSize: "20px" }}
                    >
                      :السعر
                    </label>
                  </div>
                  <div className="input">
                    <input
                      style={{ textAlign: "right" }}
                      className="input-field"
                      type="text"
                      name="workingTime"
                      defaultValue={item.workingTime}
                    />
                    <label
                      style={{ color: "rgb(19,82,139)", fontSize: "20px" }}
                    >
                      :مدة العمل
                    </label>
                  </div>

                  {/* {updatedimg.map((img) => (
                      <div key={item._id}
                       className="posts">
                          <img
                            className="post"
                            name="s"
                            id="image"
                            src={img}
                          ></img>
                          <button onClick={()=>removeImg(img)}
                            type="button"
                            style={{
                              width: "60px",
                              height: "50px",
                              marginTop: "50px",
                            }}
                          >
                            حذف الصوره
                          </button>
                      </div>
                    ))} */}
                  <div className="action">
                    <button className="action-button" type="submit">
                      حفظ
                    </button>
                    <button
                      style={{ backgroundColor: "grey", margin: "10px" }}
                      className="action-button"
                      onClick={() => setEdit(false)}
                    >
                      الغاء
                    </button>
                  </div>
                </div>
              </form>
              //  </div>
            ))}
          </div>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default Post;
