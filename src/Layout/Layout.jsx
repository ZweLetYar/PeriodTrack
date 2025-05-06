import React, { useContext } from "react";
import Navbar from "../Components/Navbar";
import InnerNavbar from "../Components/InnerNavbar";
import { AuthContext } from "../Context/AuthContext";
import { ThemeContext } from "../Context/ThemeContext";

export default function Layout({ children }) {
  let { user } = useContext(AuthContext);
  let { isDark } = useContext(ThemeContext);
  return (
    <div
      className={` ${
        isDark
          ? "bg-gradient-to-b from-gray-700 to-pink-300 bg-gradient-to-r"
          : "bg-white"
      }`}
    >
      {!user ? <Navbar /> : <InnerNavbar />}
      <main>{children}</main>
    </div>
  );
}
