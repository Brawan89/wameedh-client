import React from "react";
import "./style.css";
import { Link } from "react-router-dom";
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
          <Link to="https://twitter.com/gth495" id="socaialIcons">
            <AiOutlineTwitter />
          </Link>
          <Link to="https://www.instagram.com/?hl=en" id="socaialIcons">
            <AiFillInstagram />
          </Link>
          <Link to="https://www.facebook.com/" id="socaialIcons">
            <AiFillFacebook />
          </Link>
          <Link to="https://github.com/MP-Project-Rawan-Badr" id="socaialIcons">
            <AiFillGithub />
          </Link>
        </div>

        <h4
          style={{
            color: "white",
            fontFamily:
              "'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif",
          }}
        >
          جميع الحقوق محفوظة لومـيـض - 2021
        </h4>
      </div>
    </>
  );
};

export default Footer;
