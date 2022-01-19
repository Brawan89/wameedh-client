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
          <Link to="" id="socaialIcons">
            <AiOutlineTwitter />
          </Link>
          <Link to="" id="socaialIcons">
            <AiFillInstagram />
          </Link>
          <Link to="" id="socaialIcons">
            <AiFillFacebook />
          </Link>
          <Link to="" id="socaialIcons">
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
