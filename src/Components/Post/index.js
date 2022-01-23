import React, { useEffect, useState } from "react";
import axios from "axios";
import "./style.css";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

const Post = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState([]);
  const [edit, setEdit] = useState(false);

  const state = useSelector((state) => {
    return state;
  });

  useEffect(() => {
    getOnePost();
    getOneUser();
    getServiceProvider();
    // eslint-disable-next-line
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
        await axios.put(
      `${process.env.REACT_APP_BASE_URL}/updatePost/${id}`,
      {
        title: e.target.title.value,
        // image: updatedimg,
        dec: e.target.dec.value,
        price: e.target.price.value,
        workingTime: e.target.workingTime.value,
        delivery: e.target.delivery.value,

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
    await axios.get(
      `${process.env.REACT_APP_BASE_URL}/getServiceProvider`,
      {
        headers: {
          Authorization: `Bearer ${state.Login.token}`,
        },
      }
    );
    // console.log(result.data);
    
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
                    <img src={img}
                    alt="posttsImg" />
                  </div>
                ))}
              </Carousel>

              <div>
                {item.user._id === state.Login.user._id ? (
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
                <h5>التوصيل: {item.delivery}</h5>
                <h5
                  className="userName"
                  onClick={() => navigate(`/profile/${item.user._id}`)}
                >
                  صاحب المشروع: {item.user.userName}
                </h5>
                <h4>:للطلب</h4>
                <a
              href={`https://wa.me/${item.user.Phone_Number}`}
              className="whatsapp_Icon"
              target="_blank"
              rel="noopener noreferrer"
            >
              {/* <p className=" fa whatsapp-num">{item.user.Phone_Number}</p> */}

              <i className="fa fa-whatsapp whatsapp-icon"></i>
            </a>
         
            <a href={`mailto:${item.user.Email}`} className="email_Icon">
              {/* <p className="fa em">{item.user.Email}</p> */}
              <i className="fa fa-envelope"></i>
            </a>
              </div>

              
            </>
          ))}
        </div>

       

        <br />
        

        {/* .........................................
        ................................................
        ................................................... */}
        {edit ? (
          <div style={{ marginTop: "-20px" }} className="editP">
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
                  <div className="input">
                    <input
                      style={{ textAlign: "right" }}
                      className="input-field"
                      type="text"
                      name="delivery"
                      defaultValue={item.delivery}
                    />
                    <label
                      style={{ color: "rgb(19,82,139)", fontSize: "20px" }}
                    >
                      : التوصيل
                    </label>

                  </div>
                  {/* delivery */}

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
