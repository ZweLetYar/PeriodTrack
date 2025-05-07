import React, { useState } from "react";
import useTheme from "../hooks/useTheme";
import { useGetCollection } from "../hooks/useFireStore";
import { Link } from "react-router-dom";

export default function BlogList() {
  const { isDark } = useTheme();
  const { error, loading, data: blogs } = useGetCollection("blogs", null);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredBlogs = blogs?.filter((blog) =>
    blog.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col">
      <h1 className={`font-bold text-lg ms-2 ${isDark ? "text-white" : ""}`}>
        Blogs & News
      </h1>

      <div className="w-[90%] px-4 py-2 mt-4 ml-auto mr-auto sm:w-80 md:w-96 lg:w-1/2 xl:w-1/3 relative">
        <input
          type="text"
          placeholder="Search by title..."
          className={`w-full pr-10 mb-4 p-2 rounded border ${
            isDark
              ? "bg-gray-800 text-white border-pink-600 focus:border-pink-900"
              : "border-pink-400 focus:border-pink-900"
          }`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5 absolute right-7 top-5 text-gray-500 pointer-events-none"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>
      </div>

      {loading && (
        <div className="flex items-center justify-center h-100">
          <img
            src="https://cdn.pixabay.com/animation/2023/05/02/04/29/04-29-03-511_512.gif"
            className="w-15 h-auto"
            alt="loading"
          />
        </div>
      )}

      {!loading && !error && filteredBlogs && (
        <div className="px-4 py-2">
          <div className="flex flex-col gap-7 w-full items-center">
            {filteredBlogs.map((blog) => (
              <Link
                to={`/bloglist/${blog.id}`}
                key={blog.id}
                className={`w-[90%] max-w-md rounded-xl shadow-md transition hover:scale-[1.02] duration-300 ${
                  isDark
                    ? "bg-gradient-to-br from-gray-800 to-gray-700 text-white"
                    : "bg-white text-gray-900 border border-pink-300"
                }`}
              >
                <div>
                  <img
                    src={blog.imagePath}
                    alt={blog.title}
                    className="h-40 w-full object-cover rounded-t-xl"
                  />
                  <div className="p-4 flex flex-col justify-between">
                    <h2 className="font-semibold text-md mb-2 line-clamp-2">
                      {blog.title}
                    </h2>
                    <p
                      className={`text-sm text-gray-600 line-clamp-5 overflow-hidden ${
                        isDark ? "text-white" : ""
                      }`}
                    >
                      {blog.blogBody}
                    </p>
                  </div>
                </div>
              </Link>
            ))}

            {filteredBlogs.length === 0 && (
              <p className={`${isDark ? "text-white" : "text-gray-600"}`}>
                No blogs matched your search.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
