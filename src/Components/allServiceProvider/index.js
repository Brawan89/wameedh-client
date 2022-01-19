import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./style.css";
import Search from "../search";

const ServiceProvider = () => {
  const [user, setUser] = useState([]);
  const navigate = useNavigate();

  const state = useSelector((state) => {
    return state;
  });

  useEffect(() => {
    getServiceProvider();
    // eslint-disable-next-line
  }, []);

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
  // search on service provider...
  const searchpages = (e) => {
    const value = e.target.value.toLowerCase();
    if (value !== "") {
      setUser(
        user.filter((user) => {
          const Name = user.userName.toLowerCase();
          if (Name.includes(value)) return user;
          else return null;
        })
      );
    } else {
      getServiceProvider();
    }
  };
  return (
    <>
      <div style={{ marginTop: "100px" }}>
        <Search className="search" searchpages={searchpages} />
        <div className="grid-containerService">
          {user?.map((item) => (
            <div key={item._id}>
              <img
                style={{
                  borderRadius: "50%",
                  width: "70px",
                  float: "right",
                  padding: "10px",
                  marginBottom: "20px",
                }}
                src={item.avatar}
                alt="avImg"
              />

              <h5
                style={{ padding: "15px", cursor: "pointer" }}
                onClick={() => navigate(`/profile/${item._id}`)}
              >
                {item.userName}
              </h5>
              <h6 style={{ color: "gray" }}> التصنيف: {item.specialty}</h6>
              <h6 style={{ color: "gray" }}>المنطقة: {item.city}</h6>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ServiceProvider;
