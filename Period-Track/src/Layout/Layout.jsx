import React from "react";
import Navbar from "../Components/Navbar/Navbar";

export default function Layout({ children }) {
  return (
    <div>
      <Navbar />
      <main>{children}</main>
    </div>
  );
}
