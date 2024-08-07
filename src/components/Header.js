import React from "react";
import "./Header.css";
import Banner from "../images/header/Banner.png";
import Avatar from "../images/header/Avatar.png";
import Icon from "../images/icons/Icon.png";
import Phone from "../images/icons/Phone.png";

const Header = () => {
  return (
    <header className="header">
      <img className="header-banner" src={Banner} alt="Banner" />

      <div className="header-info">
        <div className="header-avatar">
          <img src={Avatar} alt="Avatar" />
          <h2>Sirotyuk Maxim</h2>
        </div>

        <div className="header-buttons">
          <button>
            <img src={Icon} alt="message" width={16} height={16} />
            Сообщение
          </button>
          <button>
            <img src={Phone} alt="Phone" width={16} height={16} />
            Звонок
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
