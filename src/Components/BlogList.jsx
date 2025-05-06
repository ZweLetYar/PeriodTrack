import React from "react";
import useTheme from "../hooks/useTheme";
import { useGetCollection } from "../hooks/useFireStore";
import { Link } from "react-router-dom";

export default function BlogList() {
  let { isDark } = useTheme();

  let { error, loading, data: blogs } = useGetCollection("blogs", null);
  return (
    <>
      <h1 className={`font-bold text-lg ms-2 ${isDark ? " text-white" : ""}`}>
        Blogs & News
      </h1>

      {loading && (
        <div className=" flex items-center justify-center h-100">
          <img
            src="https://cdn.pixabay.com/animation/2023/05/02/04/29/04-29-03-511_512.gif"
            className="w-15 h-auto"
          ></img>
        </div>
      )}

      {!loading && !error && blogs && (
        <div className="px-4 py-2">
          <div className="flex flex-col  gap-4 w-full items-center">
            {blogs.map((blog) => (
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
                      className={`text-sm text-gray-600  line-clamp-5 overflow-hidden ${
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
