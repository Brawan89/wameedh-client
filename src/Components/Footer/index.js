import React from "react";
import "./style.css";
import {
  AiFillFacebook,
  AiOutlineTwitter,
  AiFillInstagram,
  AiFillGithub,
} from "react-icons/ai";

const Footer = () => {
  return (
    <>
      <div className="fulldiv">
        <div className="navStart">
          <a href="https://twitter.com/gth495" id="socaialIcons">
            <AiOutlineTwitter />
          </a>
          <a href="https://www.instagram.com/?hl=en" id="socaialIcons">
            <AiFillInstagram />
          </a>
          <a href="https://www.facebook.com/" id="socaialIcons">
            <AiFillFacebook />
          </a>
          <a href="https://github.com/MP-Project-Rawan-Badr" id="socaialIcons">
            <AiFillGithub />
          </a>
        </div>

        <h4
          style={{
            color: "white",
            fontFamily:
              "'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif",
          }}
        >
          جميع الحقوق محفوظة لومـيـض - 2022
        </h4>
      </div>
    </>
  );
};

export default Footer;
