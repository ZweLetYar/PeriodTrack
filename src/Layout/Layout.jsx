import React, { useContext } from "react";
import Navbar from "../Components/Navbar";
import InnerNavbar from "../Components/InnerNavbar";
import { AuthContext } from "../Context/AuthContext";
import { ThemeContext } from "../Context/ThemeContext";
import { SwitchTransition, CSSTransition } from "react-transition-group";
import { useLocation } from "react-router-dom";
import "./style.css";

export default function Layout({ children }) {
  let { user } = useContext(AuthContext);
  let { isDark } = useContext(ThemeContext);
  let location = useLocation();
  return (
    <div
      className={` ${
        isDark
          ? "bg-gradient-to-b from-gray-700 to-pink-300 bg-gradient-to-r"
          : "bg-white"
      }`}
    >
      {!user ? <Navbar /> : <InnerNavbar />}
      <SwitchTransition>
        <CSSTransition timeout={200} classNames="fade" key={location.pathname}>
          <main>{children}</main>
        </CSSTransition>
      </SwitchTransition>
    </div>
  );
}
