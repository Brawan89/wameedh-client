import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import Footer from "../Footer";
import Navbar from "../Navbar";
import { useNavigate } from "react-router-dom";
import "./style.css";
import Search from "../search";

const Dashboard = () => {
  const [user, setUser] = useState([]);
  const navigate = useNavigate();

  const state = useSelector((state) => {
    return state;
  });

  useEffect(() => {
    getAllUsers();
  }, []);

  //get all users
  const getAllUsers = async () => {
    const result = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/allusers`,
      {
        headers: {
          Authorization: `Bearer ${state.Login.token}`,
        },
      }
    );
    // console.log(result);
    setUser(result.data);
  };

  //delete user
  const deleteUsers = async (_id) => {
    // console.log("_id" , _id);
   const result =
      await axios.put(
        `${process.env.REACT_APP_BASE_URL}/delUser/${_id}`,{},
        {
          headers: {
            Authorization: `Bearer ${state.Login.token}`,
          },
        }
      );
      // console.log("result" , result);
      // deleteUsers();
      getAllUsers(result);
    // } catch (error) {
    //   console.log(error);
    // }
    // window.location.reload(false);
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
      getAllUsers();
    }
  };
  return (
    <>
      <div style={{ marginTop: "80px" }}>
        <Search className="search" searchpages={searchpages} />
        <div className="grid-containerService">
          {user?.map((item) => (
            <div key={item._id}>
                          {console.log("item",item)}

               { console.log("user" , item.role.role !== "admin")}
               {/* {state.Login.user.role === "61c05aad3708bf224ada4791" ? ( */}
                  <p
                    style={{
                      fontSize: "25px",
                      cursor: "pointer",
                    }}
                    onClick={() => deleteUsers(item._id)}
                  >
                    x
                  </p>
                {/* ) : (
                  ""
                )} */}

              <img
                style={{
                  borderRadius: "50%",
                  width: "60px",
                  float: "right",
                  padding: "10px",
                  marginBottom: "20px",
                }}
                src={item.avatar}
              />

              <h5
                style={{ padding: "15px", cursor: "pointer" }}
                onClick={() => navigate(`/profile/${item._id}`)}
              >
                {item.userName}
              </h5>
              {/* item.role.role */}
              <h6 style={{ color: "gray" }}>  {item.role.role}</h6>
              
              {/* role -> هنا ابغى احط وش نوع اليوزر */}
              <h6 style={{ color: "gray" }}>  {item.email}</h6>

            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
