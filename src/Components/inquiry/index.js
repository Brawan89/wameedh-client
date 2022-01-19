import React, { useEffect, useState } from "react";
import axios from "axios";
import "./style.css";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const Inquiry = () => {
  const { id } = useParams();
  const [inquiry, setInquiry] = useState([]);
  const [comment, setComment] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [edit, setEdit] = useState(false);
  // const [compleet, setCompleet] = useState("");

  const state = useSelector((state) => {
    return state;
  });

  const getOneInquiry = async () => {
    const result = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/getOneInquiry/${id}`,
      {
        headers: {
          Authorization: `Bearer ${state.Login.token}`,
        },
      }
    );
    // console.log(result);
    setInquiry(result.data);
  };

  //description about user
  const getOneUser = async () => {
    const result = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/getUserInquiry/${state.Login.user._id}`,
      { headers: { Authorization: `Bearer ${state.Login.token}` } }
    );
    // console.log(result);
    setInquiry(result.data);
  };
  // console.log("token", state.Login.token);
  // console.log(state.Login);

  // add comment
  const addComment = async () => {
    try {
      await axios.post(
        `${process.env.REACT_APP_BASE_URL}/comments/${id}`,
        {
          comment: newComment,
        },
        {
          headers: {
            Authorization: `Bearer ${state.Login.token}`,
          },
        }
      );
      // console.log("new comment", result.data);
      setNewComment();
      getOneInquiry();
      getAllComment();
    } catch (error) {
      // console.log(error);
    }
  };

  //get comments
  const getAllComment = async () => {
    try {
      const result = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/comments/${id}`,
        { headers: { Authorization: `Bearer ${state.Login.token}` } }
      );
      // console.log(result.data);
      setComment(result.data);
    } catch (error) {
      // console.log(error);
    }
  };

  //
  const updateInquiry = async (e) => {
    e.preventDefault();
    // console.log("complete... ", e.target.completed.value);
    await axios.put(
      `${process.env.REACT_APP_BASE_URL}/updateInquiry/${id}`,
      {
        title: e.target.title.value,
        // city: e.target.city.value,
        complete: e.target.completed.value,
      },
      {
        headers: {
          Authorization: `Bearer ${state.Login.token}`,
        },
      }
    );
    // console.log(result.data);
    window.location.reload(false);

  };

  //

  // deleteComment
  // comments
  const deleteComment = async (id) => {
    // console.log(e.preventDefault());
    // console.log("complete... ", compleet);
    await axios.put(
      `${process.env.REACT_APP_BASE_URL}/comments/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${state.Login.token}`,
        },
      }
    );

    // console.log(result.data);
    getAllComment();
    // window.location.reload(false);
  };

  //
  useEffect(() => {
    getOneInquiry();
    getOneUser();
    getAllComment();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <div style={{ marginTop: "100px" }}>
        <div className="flex-contanerInq">
          {/* <div className="centerBottom"> */}

           {/* left  */}
           
           {/* comments */}
           <div className="Left-side" >
            <ul>
              {comment?.map((ele) => {
                return (
                  <div key={ele._id} className="comment">
                    <h5>
                      {ele.comment} [ {ele.user.userName} ]
                      {state.Login.user.role === "61c05aad3708bf224ada4791" ||
                      ele.user._id === state.Login.user._id ? (
                        <p
                          onClick={() => deleteComment(ele._id)}
                          style={{
                            cursor: "pointer",
                            float: "left",
                            fontSize: "13px",
                            paddingLeft: "10px",
                          }}
                        >
                          ✖️
                        </p>
                      ) : (
                        ""
                      )}
                    </h5>
                  </div>
                );
              })}
            </ul>
            </div>
          {/* ........................................ */}
                    {/* Right */}

          <div className="Right-side" style={{ backgroundColor: "white" , textAlign: "right" , paddingTop: "20px"  }}>
            {inquiry.map((item) => (
              <div key={item._id}>
            <h6 style={{float: "right" , padding: "20px"}}>
                  {item.complete}
                </h6>
                <h4
                  style={{
                    fontSize: "30px",
                     paddingRight: "80px" , paddingTop: "60px"
                  }}
                >
                  {item.title}
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
                </h4>

                <h6 style={{ color: "gray" , paddingRight: "80px" }}>
                  {item.user.userName}
                </h6>
                {/* <h6 style={{ color: "gray" , paddingRight: "80px" }}>
                  {item.city}
                </h6> */}
            
              </div>
            ))}
        </div>
        <div></div>
        <div>
          <button
            style={{
              paddingLeft: "20px",
              paddingRight: "20px",
              border: "1px solid gray",
            }}
            onClick={addComment}
          >
            اضافة تعليق
          </button>

          <input
            style={{  width: "80%"  }}
            className="inputInqComent"
            required
            placeholder="اضافة تعليق"
            type="text"
            onChange={(e) => setNewComment(e.target.value)}
          /></div>
        
{/* ........................................ */}

           
         
            </div>
        {edit ? (
          <div className="edit">
            {inquiry.map((item) => (
              <form onSubmit={updateInquiry}>
                <div key={item._id} className="card">
                  <div className="input">
                    <input className="input-field" type="text" name="title" defaultValue={item.title} />
                  </div>
                  {/* <div className="input">
                    <input className="input-field" type="text" name="city" defaultValue={item.city} />
                  </div> */}
                  
                <select name="completed">
                  <option value="مكتمل">مكتمل</option>
                  <option value="غير مكتمل">غير مكتمل</option>
                </select>
                <div className="action">
                <button  className="action-button"  type="submit">حفظ</button>
                <button
                 style={{ backgroundColor: "grey", margin: "10px" }}
                 className="action-button"
                 onClick={() => setEdit(false)}>الغاء</button>
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

export default Inquiry;
