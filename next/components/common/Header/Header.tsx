"use client";

import Navigation from "../Navigation";
import "./Header.css";

const Header = () => {
  return (
    <header className="header">
      <div className="header__container">
        <div className="header__content">
          <h1>Next.js TypeScript Sample App</h1>
        </div>
        <Navigation />
      </div>
    </header>
  );
};

export default Header;

