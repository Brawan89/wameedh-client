import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./style.css";
import Search from "../search";
import Swal from "sweetalert2";
import {FaRetweet} from "react-icons/fa"


const Dashboard = () => {
  const [user, setUser] = useState([]);
  const [userDel, setUserDel] = useState([]);

  const navigate = useNavigate();

  const state = useSelector((state) => {
    return state;
  });

  useEffect(() => {
    getAllUsers();
    getUsers();
    // eslint-disable-next-line
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

  //get all users after block
  const getUsers = async () => {

    const resultd = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/users`,
      {
        headers: {
          Authorization: `Bearer ${state.Login.token}`,
        },
      }
    );
    console.log("result" , resultd);
    setUserDel(resultd.data);
  };

  // users

  //delete user
  const deleteUsers = async (_id) => {
    // console.log("_id" , _id);
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: 'هل انت متأكد من حذف اليوزر؟',
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
          'تم حذف اليوزر',
          'success'
        )
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
    } else if (
      /* Read more about handling dismissals below */
      result.dismiss === Swal.DismissReason.cancel
    ) {
      swalWithBootstrapButtons.fire(
        'الغاء',
        'اليوزر بأمان (:',
        'error'
      )
    }
  })
    // } catch (error) {
    //   console.log(error);
    // }
    // window.location.reload(false);
  };

  // reUser
  const reUser = async (_id) => {
    // console.log("_id" , _id);
   const result =
      await axios.put(
        `${process.env.REACT_APP_BASE_URL}/reUser/${_id}`,{},
        {
          headers: {
            Authorization: `Bearer ${state.Login.token}`,
          },
        }
      );
      // console.log("result" , result);
      // deleteUsers();
      getAllUsers(result);
    
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

               {/* { console.log("user" , item.role.role !== "admin")} */}
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
                  width: "80px",
                  float: "right",
                  padding: "10px",
                  marginBottom: "20px",
                }}
                src={item.avatar}
                alt="avatImg"
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
        <br/>
        <hr/>
        <br/>
        <div className="grid-containerService">
          {userDel?.map((itemD) => (
            <div key={itemD._id}>

               { console.log("user" , itemD)}
               {state.Login.user.role === "61c05aad3708bf224ada4791" ? (
                  <p
                    style={{
                      fontSize: "25px",
                      cursor: "pointer",
                    }}
                    onClick={() => reUser(itemD._id)}
                  >
                   < FaRetweet/>
                  </p>
                ) : (
                  ""
                )}

              <img
                style={{
                  borderRadius: "50%",
                  width: "80px",
                  float: "right",
                  padding: "10px",
                  marginBottom: "20px",
                }}
                src={itemD.avatar}
                alt="avatImg"
              />

              <h5
                style={{ padding: "15px", cursor: "pointer" }}
                onClick={() => navigate(`/profile/${itemD._id}`)}
              >
                {itemD.userName}
              </h5>
              {/* item.role.role */}
              <h6 style={{ color: "gray" }}>  {itemD.role.role}</h6>
              
              {/* role -> هنا ابغى احط وش نوع اليوزر */}
              <h6 style={{ color: "gray" }}>  {itemD.email}</h6>

            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
