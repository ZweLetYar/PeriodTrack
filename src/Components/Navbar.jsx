import React from "react";
import pinkGirl from "../assets/avatar-female-girl-svgrepo-com.svg";
export default function Navbar() {
  return (
    <div className="container border-b-2 border-pink-500  h-20 text-center flex items-center justify-center max-w-4xl mx-auto ">
      <img src={pinkGirl} alt="logo" className="w-10 h-auto" />
      <p className="text-pink-500 text-xl font-bold">Moon Cal</p>
    </div>
  );
}
