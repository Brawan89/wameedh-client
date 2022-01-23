import React, { useEffect, useState } from "react";
import axios from "axios";
import "./style.css";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { storage } from "./../Firebase";
import Swal from "sweetalert2";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Profile = () => {
  //get user in profile...
  const [user, setUser] = useState([]);
  // get post for user
  const [posts, setPosts] = useState([]);
  // get inquiry for user
  const [inquiry, setInquiry] = useState([]);
  // add post
  const [addPost, setAddPost] = useState(false);
  // add inquiry
  const [addInquiry, setAddInquiry] = useState(false);

  //counter in upload image in add post
  const [counter, setCounter] = useState(0);

  // add post
  const [title, setTitle] = useState("");
  const [dec, setDec] = useState("");
  const [image, setImage] = useState([]);
  const [url, setUrl] = useState([]);
  const [progress, setProgress] = useState(0);
  const [price, setPrice] = useState(0);
  const [workingTime, setWorkingTime] = useState("");
  //edit profile
  const [edit, setEdit] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [urll, setUrll] = useState("");

  const navigate = useNavigate();

  const p = useParams();

  const state = useSelector((state) => {
    return state;
  });

  //description about user
  const getOneUser = async () => {
    const result = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/Oneusers/${p.id}`,
      { headers: { Authorization: `Bearer ${state.Login.token}` } }
    );
    // console.log(result.data);
    setUser(result.data);
  };
  // console.log("token", state.Login.token);
  // console.log(state.Login.user.userName);
  //

  //user post
  const getUserPost = async () => {
    const result = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/getUserPost/${p.id}`,
      {
        headers: {
          Authorization: `Bearer ${state.Login.token}`,
        },
      }
    );
    // console.log(result);
    setPosts(result.data);
  };
  //

  // getUserInquiry
  //user inquiry
  const getUserInquiry = async () => {
    const result = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/getUserInquiry/${p.id}`,
      {
        headers: {
          Authorization: `Bearer ${state.Login.token}`,
        },
      }
    );
    // console.log(result);
    setInquiry(result.data);
  };
  //

  // avatar
  const handleChangeAvatar = (e) => {
    if (e.target.files[0]) {
      setAvatar(e.target.files[0]);
    }
  };

  const handleUploadAvatar = () => {
    const uploadTask = storage.ref(`image/${avatar.name}`).put(avatar);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        console.log(error);
      },
      () => {
        storage
          .ref("image")
          .child(avatar.name)
          .getDownloadURL()
          .then((urll) => {
            setUrll(urll);
            updateUser(urll);
            console.log(urll);
          });
      }
    );
  };
  //

  // edit profile
  const updateUser = async (e) => {
    // console.log(user[0].avatar);
    e.preventDefault();
    const result = await axios.put(
      `${process.env.REACT_APP_BASE_URL}/update_user`,
      {
        userName: e.target.userName.value,
        status: e.target.statuss.value,
        bio: e.target.bio.value,
        specialty: e.target.specialty.value,
        Email: e.target.Email.value,
        Phone_Number: e.target.Phone_Number.value,
        city: e.target.city.value,
        avatar: urll || user[0].avatar,
      },
      {
        headers: {
          Authorization: `Bearer ${state.Login.token}`,
        },
      }
    );
    console.log(result.data);
    getOneUser();
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'تم التعديل',
      showConfirmButton: false,
      timer: 1500
    })
  };
  // window.location.reload(false);

  //delete post
  const deletePost = async (id) => {
    try {
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
      })
      
      swalWithBootstrapButtons.fire({
        title: 'هل انت متأكد من حذف المشروع',
        text: "!لن تتمكن من التراجع عن هذا",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'حذف',
        cancelButtonText: 'الغاء',
        reverseButtons: true
      }).then(async(result) => {
        if (result.isConfirmed) {
          swalWithBootstrapButtons.fire(
            'تم الحذف',
            'تم حذف المشروع',
            'success'
          )
      await axios.delete(`${process.env.REACT_APP_BASE_URL}/deletePost/${id}`, {
        headers: {
          Authorization: `Bearer ${state.Login.token}`,
        },
      });
      deletePost(state.Login.token);
    } else if (
      /* Read more about handling dismissals below */
      result.dismiss === Swal.DismissReason.cancel
    ) {
      swalWithBootstrapButtons.fire(
        'الغاء',
        'المشروع بأمان (:',
        'error'
      )
    }
  })
    } catch (error) {
      // console.log(error);
    }
    window.location.reload(false);
  };

  //delete inquiry
  const deleteInquiry = async (id) => {
    try {
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
      })
      
      swalWithBootstrapButtons.fire({
        title: 'هل انت متأكد من حذف الاستفسار',
        text: "!لن تتمكن من التراجع عن هذا",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'حذف',
        cancelButtonText: 'الغاء',
        reverseButtons: true
      }).then(async(result) => {
        if (result.isConfirmed) {
          swalWithBootstrapButtons.fire(
            'تم الحذف',
            'تم حذف الاستفسار',
            'success'
          )
      await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/deleteInquiry/${id}`,
        {
          headers: {
            Authorization: `Bearer ${state.Login.token}`,
          },
        }
      );
      deleteInquiry(state.Login.token);
    } else if (
      /* Read more about handling dismissals below */
      result.dismiss === Swal.DismissReason.cancel
    ) {
      swalWithBootstrapButtons.fire(
        'الغاء',
        'الاستفسار بأمان (:',
        'error'
      )
    }
  })
    } catch (error) {
      // console.log(error);
    }
    window.location.reload(false);
  };

  //add posts
  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        console.log(error);
      },
      () => {
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((newUrl) => {
            setUrl([...url, newUrl]);
            // console.log(newUrl);
            setCounter(counter + 1);
          });
      }
    );
  };

  const addNewPost = async () => {
    // console.log(url);
    if (url) {
      await axios.post(
        `${process.env.REACT_APP_BASE_URL}/addpost`,
        {
          title,
          dec,
          image: url,
          price,
          workingTime,
        },
        {
          headers: {
            Authorization: `Bearer ${state.Login.token}`,
          },
        }
      );
 
    }
    Swal.fire("تم اضافة المشروع", "👏 تم اضافة مشروعك بنجاح", "success");
  };
  //
  //add inquiry
  const addNewInquiry = async () => {
    console.log(url);
    if (url) {
      await axios.post(
        `${process.env.REACT_APP_BASE_URL}/addinquiry`,
        {
          title,
        },
        {
          headers: {
            Authorization: `Bearer ${state.Login.token}`,
          },
        }
      );
     
    }
    Swal.fire("تم اضافة سؤالك", "👏 تم اضافة سؤالك بنجاح", "success");
  };
 
  //
  useEffect(() => {
    getOneUser();
    getUserPost();
    getUserInquiry();
    // eslint-disable-next-line
  }, [p]);

  //
  return (
    <>
      <div style={{ marginTop: "100px" }}>
        <div className="grid-profile">
          <div></div>

          {/* left  */}
          <div className="Left-sideProf" style={{ paddingRight: "40px" }}>
            {user[0]?._id === state.Login.user._id ? (
              <>
                <h6
                  style={{ float: "left", cursor: "pointer" }}
                  onClick={() => setEdit(true)}
                >
                  ⚙️
                </h6>
              </>
            ) : (
              <></>
            )}
            <h1>الاسم: {user[0]?.userName}</h1>
            <h6>الحاله: {user[0]?.status} </h6>
            <h5 style={{ color: "gray" }}> التصنيف: {user[0]?.specialty}</h5>
            <h4> {user[0]?.bio}</h4>
            <h5>المدينة: {user[0]?.city}</h5>
            <br />
            <h4>:لـلـتـواصـل</h4>

            <a
              href={`https://wa.me/${user[0]?.Phone_Number}`}
              className="whatsapp_Icons"
              target="_blank"
              rel="noopener noreferrer"
            >
              <p className=" fa whatsapp-num">{user[0]?.Phone_Number}</p>

              <i className="fa fa-whatsapp whatsapp-icon"></i>
            </a>

            <br />
            <a href={`mailto:${user[0]?.Email}`} className="email_Icons">
              <p className="fa em">{user[0]?.Email}</p>
              <i className="fa fa-envelope"></i>
            </a>
            <br />
          </div>
          {/* Right */}
          <div className="Right-sideProf">
            <img
              className="imgAvProf"
              src={user[0]?.avatar}
              alt="avatarImg"
            ></img>
            <br />
            <h3> {user[0]?.userName}</h3>
            <br />
            {state.Login.user.role !== "61c05aad3708bf224ada4791" &&
            user[0]?._id === state.Login.user._id ? (
              <>
                <button
                className="btnInq"
                  style={{ cursor: "pointer" }}
                  onClick={() => setAddInquiry(true)}
                >
                  اضافة استفسار 
                </button>
              </>
            ) : (
              ""
            )}
          
            {state.Login.user.role === "61c4375564bde5690cdb68d0" &&
            user[0]?._id === state.Login.user._id ? (
              <button
              className="btnPost"
                style={{ cursor: "pointer" }}
                onClick={() => setAddPost(true)}
              >
                اضافة مشروع 
              </button>
            ) : (
              ""
            )}
            <br />
          </div>
          {/*  */}
        </div>
        {/* ................................................................ */}

        {/* .................................................................... */}

        <hr />
        {/* posts -> service */}
        <h3>المشاريع </h3>
        <div class="grid-containerPosts">
          {posts.map((item) => (
            <>
              <div key={item._id}>
                <img
                  style={{ width: "100%", height: "250px" }}
                  src={item.image}
                  alt="postImg"
                ></img>
                {state.Login.user.role === "61c05aad3708bf224ada4791" ||
                item.user === state.Login.user._id ? (
                  <h1
                    style={{
                      float: "right",
                      fontSize: "30px",
                      marginTop: "-10px",
                      paddingRight: "15px",
                      cursor: "pointer",
                    }}
                    onClick={() => deletePost(item._id)}
                  >
                    x
                  </h1>
                ) : (
                  ""
                )}
                <h3
                  className="clickTite"
                  style={{ padding: "40px", cursor: "pointer" }}
                  onClick={() => navigate(`/Post/${item._id}`)}
                >
                  {item.title}
                </h3>
                <div className="grid-post">
                  <button style={{ borderRight: " 1px solid black" }}>
                    {item.price} ريال
                  </button>

                  <button>{item.workingTime}</button>
                </div>
              </div>
            </>
          ))}
        </div>
        <hr />
        {/* inquiry -> user & service */}
        <h3>الاستفسارات </h3>

        <div className="grid-containerInqi">
          {inquiry.map((item) => (
            <>
              <div key={item._id}>
                {state.Login.user.role === "61c05aad3708bf224ada4791" ||
                item.user === state.Login.user._id ? (
                  <p
                    style={{
                      float: "right",
                      fontSize: "30px",
                      marginTop: "-10px",
                      paddingRight: "15px",
                      cursor: "pointer",
                    }}
                    onClick={() => deleteInquiry(item._id)}
                  >
                    x
                  </p>
                ) : (
                  ""
                )}
                <h3
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate(`/inquiry/${item._id}`)}
                >
                  {item.title}
                </h3>
                <br />
                <div className="grid-inq">
                  <button style={{ borderRight: " 1px solid black" }}>
                    {item.complete}
                  </button>
                  <button>المنطقة : {item.city}</button>
                </div>
              </div>
            </>
          ))}
        </div>
        {/* add posts in profile */}
        {addPost ? (
          <div className="edit">
            <div className="container">
              <div className="card">
                <div className="input">
                  <input
                    name="text"
                    type="text"
                    className="input-field"
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <label className="inputabel" htmlFor="email">
                    عنوان المشروع
                  </label>
                </div>
                <div className="input">
                  <input
                    name="w3review"
                    rows="3"
                    cols="100pm"
                    className="input-field"
                    onChange={(e) => setDec(e.target.value)}
                  />
                  <label className="inputabel">اكتب وصف لمشروعك</label>
                </div>
                <div className="input">
                  <input
                    className="input-field"
                    type="number"
                    onChange={(e) => setPrice(e.target.value)}
                  />
                  <label className="inputabel">ماهو سعر المشروع؟</label>
                </div>
                <div className="input">
                  <input
                    className="input-field"
                    type="text"
                    onChange={(e) => setWorkingTime(e.target.value)}
                  />
                  <label className="inputabel">مدة العمل على المشروع؟</label>
                </div>
                <div className="input">
                  <input
                    className="input-field"
                    type="file"
                    name="post"
                    multiple
                    onChange={handleChange}
                  />
                  <label className="inputabel">اضف صور لمشروعك</label>
                </div>
                <progress style={{ width: "100%" }} value={progress} max="100" />
                <div>تم تحميل {counter} صورة</div>

                <button
                    className="action_Button"
                    style={{ backgroundColor: "grey" , color: "white" }}
                    onClick={handleUpload}
                  >
                    تحميل الصوره
                  </button>
               
                <div className="actionLogin">
                  
                  <button className="actionButton" onClick={addNewPost}>
                    اضافه
                  </button>
                  <button
                    style={{ float: "left" }}
                    className="actionButton"
                    onClick={() => setAddPost(false)}
                  >
                    حفظ
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}

        {/* add inquiry in profile */}
        {addInquiry ? (
          <>
            <div className="edit">
              <div className="container">
                <div className="card">
                  <form onSubmit={addNewInquiry}>
                    <div className="input">
                      <input
                        name="text"
                        id="text"
                        type="text"
                        placeholder="ماهو سؤالك؟"
                        onChange={(e) => setTitle(e.target.value)}
                      />
                      </div>
                      <br />
                      <button className="action-Button" type="submit">
                        اضافه
                      </button>

                      <button
                        style={{ float: "right", backgroundColor: "gray" }}
                        className="action-Button"
                        onClick={() => setAddInquiry(false)}
                      >
                        الغاء
                      </button>
                    
                  </form>
                </div>
              </div>
            </div>
          </>
        ) : (
          <></>
        )}
        {edit ? (
          <div className="edit">
            {user.map((item) => (
              <form onSubmit={updateUser}>
                <div key={item._id} className="card">
                  <select name="statuss">
                    <option value="متوفر ">متوفر</option>
                    <option value="مشغول ">مشغول</option>
                  </select>

                  <div className="input">
                    <input
                      style={{ textAlign: "right" }}
                      className="input-field"
                      type="text"
                      name="userName"
                      defaultValue={user[0]?.userName}
                    />
                    <label
                      style={{ color: "rgb(19,82,139)", fontSize: "20px" }}
                    >
                      : اسم المستخدم
                    </label>
                  </div>
                  <div className="input">
                    <textarea
                      style={{ textAlign: "right" }}
                      className="input-field"
                      type="text"
                      name="specialty"
                      defaultValue={user[0]?.specialty}
                    />
                    <label
                      style={{ color: "rgb(19,82,139)", fontSize: "20px" }}
                    >
                      : التصنيف
                    </label>
                  </div>
                  <div className="input">
                    <input
                      style={{ textAlign: "right" }}
                      className="input-field"
                      type="text"
                      name="bio"
                      defaultValue={user[0]?.bio}
                    />
                    <label
                      style={{ color: "rgb(19,82,139)", fontSize: "20px" }}
                    >
                      :بايو
                    </label>
                  </div>
                  <div className="input">
                    <input
                      style={{ textAlign: "right" }}
                      className="input-field"
                      type="email"
                      name="Email"
                      defaultValue={user[0]?.Email}
                    />
                    <label
                      style={{ color: "rgb(19,82,139)", fontSize: "20px" }}
                    >
                      : الايميل
                    </label>
                  </div>
                  <div className="input">
                    <input
                      style={{ textAlign: "right" }}
                      className="input-field"
                      type="Number"
                      name="Phone_Number"
                      defaultValue={user[0]?.Phone_Number}
                    />
                    <label
                      style={{ color: "rgb(19,82,139)", fontSize: "20px" }}
                    >
                      : رقم الجوال
                    </label>
                  </div>
                  <div className="input">
                    <input
                      style={{ textAlign: "right" }}
                      className="input-field"
                      type="text"
                      name="city"
                      defaultValue={user[0]?.city}
                    />
                    <label
                      style={{ color: "rgb(19,82,139)", fontSize: "20px" }}
                    >
                      المدينة:
                    </label>
                  </div>
                  {/* edit avatar..... */}

                  <div>
                    <input
                      style={{ marginLeft: "100px", fontSize: "20px" }}
                      type="file"
                      name="avatar"
                      onChange={handleChangeAvatar}
                    />
                    <br />
                    <progress
                      style={{ marginLeft: "100px" }}
                      value={progress}
                      max="100"
                    />
                    <button
                      className="add"
                      style={{ marginLeft: "100px", fontSize: "20px" }}
                      onClick={handleUploadAvatar}
                    >
                     تحميل الصوره
                    </button>
                  </div>
                  <div className="action">
                    <button type="submit" className="action-button" 
                    >
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
            ))}
          </div>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default Profile;
