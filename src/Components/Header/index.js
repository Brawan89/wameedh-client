import React from "react";
import "./style.css";

const Header = () => {
  return (
    <>
    <div className="hedWrapper" >
        <img
        className="backgroundImgHome"
          src="./img/background.jpg" 
          alt="backgroundImg"
        />
      
      <div id="Textcentered">
        <h1 style={{ color: "rgb(221,233,247)"  }}>ما هو وميض؟</h1>
        في منصة وميض يمكنك العثور على مزودي الخدمة ويمكنك طرح سؤالك أو استفسارك
        وستجد إجابة له. يمكنك وضع تقييمك للخدمات التي قمت بتجربتها وإعجابك بها ،
        وكذلك تحديد موعد مع مزود الخدمة ، وكذلك الدخول في محادثة معه ومناقشة ما
        تريد والاتفاق معه. يمكنك أيضًا الدفع من خلال محفظة داخل الموقع أو
        استخدام تأشيرة أو بطاقة ائتمان.
      </div>
      </div>
    </>
  );
};

export default Header;
