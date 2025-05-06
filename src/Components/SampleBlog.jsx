import React from "react";
import useTheme from "../hooks/useTheme";
import { useGetCollection } from "../hooks/useFireStore";
import { limit } from "firebase/firestore";
import { Link } from "react-router-dom";

export default function BlogList() {
  const { isDark } = useTheme();
  const {
    error,
    loading,
    data: blogs,
  } = useGetCollection("blogs", null, { limit: 3 });

  return (
    <>
      <h1
        className={`font-bold text-lg ms-2 mb-2 ${isDark ? "text-white" : ""}`}
      >
        Blogs & News
      </h1>

      {loading && (
        <div className="flex items-center justify-center h-100">
          <img
            src="https://cdn.pixabay.com/animation/2023/05/02/04/29/04-29-03-511_512.gif"
            className="w-15 h-auto"
            alt="loading"
          />
        </div>
      )}

      {!loading && !error && blogs && (
        <div className="overflow-x-auto">
          <div className="flex gap-4 px-4 py-2 w-[80%]">
            {blogs.slice(0, 4).map((blog) => (
              <Link to={`/bloglist/${blog.id}`} key={blog.id}>
                <div
                  className={`min-w-[250px] max-w-[300px] rounded-xl shadow-md transition hover:scale-105 duration-300 ${
                    isDark
                      ? "bg-gradient-to-br from-gray-800 to-gray-700 text-white"
                      : "bg-white text-gray-900 border border-pink-300"
                  }`}
                >
                  <img
                    src={blog.imagePath}
                    alt={blog.title}
                    className="h-40 w-full object-cover rounded-t-xl"
                  />
                  <div className="p-4 flex flex-col justify-between h-[200px]">
                    <h2 className="font-semibold text-md mb-2 line-clamp-2">
                      {blog.title}
                    </h2>
                    <p
                      className={`text-sm text-gray-600 h-[59%] line-clamp-5  overflow-hidden ${
                        isDark ? "text-white" : ""
                      }`}
                    >
                      {blog.blogBody}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
