import React, { useEffect, useState } from "react";
import axios from "axios";
import "./style.css";
import { useSelector } from "react-redux";
import Search from "../search";
import { useNavigate } from "react-router-dom";

const Posts = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);

  const state = useSelector((state) => {
    return state;
  });
  useEffect(() => {
    getAllPosts();
    // eslint-disable-next-line
  }, []);

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
    setPosts(result.data);
  };
  //delete post
  const deletePost = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_BASE_URL}/deletePost/${id}`, {
        headers: {
          Authorization: `Bearer ${state.Login.token}`,
        },
      });
      deletePost(state.Login.token);
    } catch (error) {
      // console.log(error);
    }
  };

  //search
  const searchpages = (e) => {
    const value = e.target.value.toLowerCase();
    if (value !== "") {
      setPosts(
        posts.filter((post) => {
          const postName = post.title.toLowerCase();
          if (postName.includes(value)) return post;
          else return null;
        })
      );
    } else {
      getAllPosts();
    }
  };

  return (
    <>
      <div style={{ marginTop: "100px" }}>
        <Search className="search" searchpages={searchpages} />

        <div className="grid-containerPosts">
          {posts.map((item) => (
            <div key={item._id}>
              
              <img
                style={{ width: "100%", height: "250px" }}
                src={item.image}
                alt="postsImg"
              />
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
                onClick={() => navigate(`/Post/${item._id}`)}
                style={{ padding: "40px", cursor: "pointer" }}
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
          ))}
        </div>
      </div>
    </>
  );
};

export default Posts;
