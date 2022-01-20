import React, { useEffect, useState } from "react";
import axios from "axios";
import "./style.css";
import { useSelector } from "react-redux";
import Search from "../search";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";


const Inquiries = () => {
  const [inquiries, setInquiries] = useState([]);
  const navigate = useNavigate();

  const state = useSelector((state) => {
    return state;
  });

  useEffect(() => {
    getAllInquiries();
    // eslint-disable-next-line
  }, []);

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
    setInquiries(result.data);
  };

  //search
  const searchpages = (e) => {
    const value = e.target.value.toLowerCase();
    if (value !== "") {
      setInquiries(
        inquiries.filter((inquiry) => {
          const inquiryName = inquiry.title.toLowerCase();
          if (inquiryName.includes(value)) return inquiry;
          else return null;
        })
      );
    } else {
      getAllInquiries();
    }
  };

  //delete inquiry
  const deleteInquiry =  async(id) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then(async(result) => {
      if (result.isConfirmed) {
        swalWithBootstrapButtons.fire(
          'Deleted!',
          'Your file has been deleted.',
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
        'Cancelled',
        'Your imaginary file is safe :)',
        'error'
      )
    }
  })
   
    // window.location.reload(false);
 
  };
 

  return (
    <>
      <div style={{ marginTop: "100px" }}>
        <Search className="search" searchpages={searchpages} />

        <div className="grid-containerInqi">
          {inquiries.map((item) => (
              <div key={item._id}>
                {state.Login.user.role === "61c05aad3708bf224ada4791" ||
                item.user?._id === state.Login.user._id ? (
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
                <img
                  //  className="avtarHome"
                  style={{ width: "80px", borderRadius: "50%" }}
                  src={item.user?.avatar}
                  alt="avatarImg"
                />
                <h5>{item.user?.userName}</h5>
                <br />
                <h4
                  className="clickTite"
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate(`/inquiry/${item._id}`)}
                >
                  {item.title}
                </h4>
                <br />
                <div className="grid-inq">
                  <button style={{ borderRight: " 1px solid black" }}>
                    {item.complete}
                  </button>
                  <button>المنطقة : {item.user?.city}</button>
                </div>
              </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Inquiries;
