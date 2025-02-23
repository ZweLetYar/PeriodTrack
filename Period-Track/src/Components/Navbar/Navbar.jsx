import React from "react";
import "./Navbar.css";

export default function Navbar() {
  return (
    <div className="container border-2 border-gray-300 w-full h-auto ">
      <ul className="flex items-center justify-center max-w-4xl mx-auto my-3">
        <li className="flex ">
          <img src="\images\unnamed.png" alt="logo" className="w-7 h-auto" />

          <span className="text-pink-500 text-xl font-bold">Period Track</span>

          <img src="\images\unnamed.png" alt="logo" className="w-7 h-auto" />
        </li>
      </ul>
    </div>
  );
}
