import React, { useContext } from "react";
import useSignout from "../hooks/useSignout";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import { useGetCollection } from "../hooks/useFireStore";
import pinkGirl from "../assets/avatar-fashion-female-svgrepo-com.svg";
import { ThemeContext } from "../Context/ThemeContext";

export default function InnerNavbar() {
  let { logOut } = useSignout();
  let navigate = useNavigate();

  let { isDark, changeTheme } = useContext(ThemeContext);

  let logOutButton = async () => {
    await logOut();

    navigate("/login");
  };

  let { user } = useContext(AuthContext);

  let {
    error,
    loading,
    data: users,
  } = useGetCollection("users", user ? ["email", "==", user.email] : null);
  return (
    <div className="flex items-center justify-between max-w-4xl mx-auto p-5 ">
      <div className="flex items-start">
        <img className="rounded-full w-10" src={pinkGirl} alt="logo" />
        <div className="flex flex-col">
          <p className={`text-sm ${isDark ? "text-white" : "text-black"}`}>
            👋 Welcome
          </p>
          <p
            className={`font-boldest  text-md ms-3 ${
              isDark ? "text-pink-300" : "text-pink-700"
            }`}
          >
            {users && users[0] ? users[0].name : null}
          </p>
        </div>
      </div>

      <div className="flex ">
        <div className="cursor-pointer ms-1 flex">
          {isDark && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
              onClick={() => changeTheme("light")}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
              />
            </svg>
          )}
          {!isDark && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
              onClick={() => changeTheme("dark")}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
              />
            </svg>
          )}
        </div>
        <button
          className={`border border-outline-red-700  text-xs rounded-lg cusor-pointer px-2 py-1 ms-2 ${
            isDark ? "bg-red-300 text-white" : "text-red-500"
          }`}
          onClick={logOutButton}
        >
          Log out
        </button>
      </div>
    </div>
  );
}
