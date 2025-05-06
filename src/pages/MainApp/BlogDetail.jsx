import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { updateDocument, useGetDocument } from "../../hooks/useFireStore";
import useTheme from "../../hooks/useTheme";
import moment from "moment";
import CommentSection from "../../Components/CommentSection";

export default function BlogDetail() {
  let [isLike, setIsLike] = useState(false);
  let { isDark } = useTheme();
  const { id } = useParams();
  const { error, loading, data: blog } = useGetDocument("blogs", id);
  let [isComment, setIsComment] = useState(false);

  let handleComment = () => {
    setIsComment(true);
  };

  let handleLike = () => {
    const updatedCount = isLike ? blog.likeCount - 1 : blog.likeCount + 1;
    setIsLike(!isLike);
    updateDocument("blogs", id, { likeCount: updatedCount });
  };

  if (loading) return <p className="text-center mt-5">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!blog) return <p className="text-center text-gray-500">No blog found.</p>;

  return (
    <div className="flex flex-col gap-2 mt-5 items-center ml-auto mr-auto w-[90%]">
      <div className="flex justify-between items-center w-[90%]">
        <p className="text-sm text-gray-500 dark:text-gray-300 ms-1">
          {moment(blog?.date?.seconds * 1000).fromNow()}
        </p>

        <div className="flex">
          <button onClick={handleLike}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill={`${isLike ? "currentColor" : "none"}`}
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6 text-red-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
              />
            </svg>
          </button>
          <p>{blog.likeCount}</p>
        </div>
      </div>
      <div className="flex flex-col gap-5 mt-5 items-center ml-auto mr-auto w-[90%] ">
        <img
          src={blog.imagePath}
          alt={blog.title}
          className="w-full max-w-xl rounded-lg"
        />
        <h1 className={`text-lg font-semibold ${isDark ? " text-white" : ""}`}>
          {blog.title}
        </h1>
        <p className={`text-justify  ${isDark ? "text-white" : ""}`}>
          {blog.blogBody}
        </p>
      </div>
      <button
        className="w-[90%] bg-pink-400 py-3 text-center text-white rounded-md my-5"
        onClick={handleComment}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6 inline "
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
          />
        </svg>
        &nbsp; Comment
      </button>
      {isComment && (
        <CommentSection isComment={isComment} setIsComment={setIsComment} />
      )}
    </div>
  );
}
