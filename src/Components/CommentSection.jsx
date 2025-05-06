import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import useTheme from "../hooks/useTheme";
import { AuthContext } from "../Context/AuthContext";
import {
  addCollection,
  deleteDocument,
  updateDocument,
  useGetCollection,
} from "../hooks/useFireStore";

import pencil from "../assets/pencil.svg";
import trash from "../assets/trash.svg";
import pinkGirl from "../assets/avatar-female-girl-svgrepo-com.svg";
import moment from "moment";

export default function CommentSection({ isComment, setIsComment }) {
  let { id } = useParams();

  let { isDark } = useTheme();
  let [commentBody, setCommentBody] = useState("");

  let { user } = useContext(AuthContext);

  let addComment = async (e) => {
    e.preventDefault();

    let data = {
      userName: users && users[0] ? users[0].name : "Unknown",
      blogId: id,
      userId: user.uid,
      commentBody,
      likeCount: 0,
      unLikeCount: 0,
    };
    await addCollection("comments", data);

    setCommentBody("");
  };

  //-----------------------note list

  let [isEdit, setIsEdit] = useState(false);
  let [editCommentId, setEditCommentId] = useState("");
  let [editedCommentBody, setEditedCommentBody] = useState("");
  let [likeCommentId, setLikeCommentId] = useState("");
  let [unLikeCommentId, setUnLikeCommentId] = useState("");

  let deleteComment = async (e, id) => {
    e.preventDefault();
    await deleteDocument("comments", id);
  };

  let editCommentHandler = async (e) => {
    e.preventDefault();
    let data = { commentBody: editedCommentBody };
    await updateDocument("comments", editCommentId, data);
    setIsEdit(false);
  };

  let { data: users } = useGetCollection(
    "users",
    user ? ["email", "==", user.email] : null
  );

  let { data: comments, error } = useGetCollection("comments", [
    "blogId",
    "==",
    id,
  ]);

  let [likedComments, setLikedComments] = useState({});
  let [unlikedComments, setUnlikedComments] = useState({});

  return (
    <div className="w-[90%] mt-5  border-t ">
      <div className="flex">
        <h1 className="text-md font-semibold mr-auto my-5">Comments</h1>
        <button className="ml-auto my-5" onClick={() => setIsComment(false)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      {/* comment Section */}
      <div className=" flex flex-col items-center mb-15">
        {comments?.length > 0 ? (
          comments.map((comment) => (
            <div
              key={comment.id}
              className={`w-full max-w-xl mb-5 p-4 rounded-lg shadow-sm transition ${
                isDark
                  ? "bg-gradient-to-l from-gray-700 via-gray-900 to-black text-white"
                  : " text-gray-900"
              }`}
            >
              <div className="flex items-start gap-4">
                <img
                  className="w-5 h-5 rounded-full"
                  src={pinkGirl}
                  alt="User"
                />
                <div className="flex-grow">
                  <h1 className="text-xs ">{comment.userName}</h1>
                  <p className="text-xs text-gray-500 dark:text-gray-300">
                    {moment(comment?.date?.seconds * 1000).fromNow()}
                  </p>
                </div>

                <div
                  className={`flex items-start gap-2 ${
                    comment.userId != user.uid ? "hidden" : ""
                  }`}
                >
                  {isEdit && editCommentId === comment.id ? (
                    <>
                      <button
                        onClick={(e) => editCommentHandler(e, comment.id)}
                        className="p-1 rounded bg-green-500 hover:bg-green-600 text-white"
                        title="Save"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          className="w-3 h-3"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fillRule="evenodd"
                            d="M19.916 4.626a.75.75 0 0 1 .208 1.04l-9 13.5a.75.75 0 0 1-1.154.114l-6-6a.75.75 0 0 1 1.06-1.06l5.353 5.353 8.493-12.74a.75.75 0 0 1 1.04-.207Z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          setIsEdit(false);
                        }}
                        className="p-1 rounded bg-red-500 hover:bg-red-600 text-white"
                        title="Cancel"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          className="w-3 h-3"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </>
                  ) : (
                    <>
                      <img
                        src={pencil}
                        alt="Edit"
                        title="Edit"
                        onClick={(e) => {
                          e.preventDefault();
                          setIsEdit(true);
                          setEditCommentId(comment.id);
                          setEditedCommentBody(comment.commentBody);
                        }}
                        className="w-3 h-3 cursor-pointer hover:opacity-75"
                      />
                      <img
                        src={trash}
                        alt="Delete"
                        title="Delete"
                        className="w-3 h-3 cursor-pointer hover:opacity-75"
                        onClick={(e) => {
                          deleteComment(e, comment.id);
                        }}
                      />
                    </>
                  )}
                </div>
              </div>

              <div className="mt-3">
                {isEdit && editCommentId === comment.id ? (
                  <textarea
                    className="w-full bg-gray-200 dark:bg-gray-800 dark:text-white rounded px-3 py-2 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none min-h-[100px]"
                    placeholder="Edit your note..."
                    onChange={(e) => setEditedCommentBody(e.target.value)}
                    value={editedCommentBody}
                  />
                ) : (
                  <p className="text-base break-words text-sm whitespace-pre-wrap">
                    {comment.commentBody}
                  </p>
                )}

                <div className="flex justify-end gap-5 text-xs">
                  <button
                    onClick={() => {
                      const isLiked = likedComments[comment.id];
                      const updatedCount = isLiked
                        ? comment.likeCount - 1
                        : comment.likeCount + 1;

                      setLikedComments((prev) => ({
                        ...prev,
                        [comment.id]: !isLiked,
                      }));

                      updateDocument("comments", comment.id, {
                        likeCount: updatedCount,
                      });
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill={likedComments[comment.id] ? "currentColor" : "none"}
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-3 inline"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z"
                      />
                    </svg>
                    {comment.likeCount > 0 && comment.likeCount}
                  </button>
                  <button
                    onClick={() => {
                      const isUnliked = unlikedComments[comment.id];
                      const updatedCount = isUnliked
                        ? comment.unLikeCount - 1
                        : comment.unLikeCount + 1;

                      setUnlikedComments((prev) => ({
                        ...prev,
                        [comment.id]: !isUnliked,
                      }));

                      updateDocument("comments", comment.id, {
                        unLikeCount: updatedCount,
                      });
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill={
                        unlikedComments[comment.id] ? "currentColor" : "none"
                      }
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-3 inline"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M7.498 15.25H4.372c-1.026 0-1.945-.694-2.054-1.715a12.137 12.137 0 0 1-.068-1.285c0-2.848.992-5.464 2.649-7.521C5.287 4.247 5.886 4 6.504 4h4.016a4.5 4.5 0 0 1 1.423.23l3.114 1.04a4.5 4.5 0 0 0 1.423.23h1.294M7.498 15.25c.618 0 .991.724.725 1.282A7.471 7.471 0 0 0 7.5 19.75 2.25 2.25 0 0 0 9.75 22a.75.75 0 0 0 .75-.75v-.633c0-.573.11-1.14.322-1.672.304-.76.93-1.33 1.653-1.715a9.04 9.04 0 0 0 2.86-2.4c.498-.634 1.226-1.08 2.032-1.08h.384m-10.253 1.5H9.7m8.075-9.75c.01.05.027.1.05.148.593 1.2.925 2.55.925 3.977 0 1.487-.36 2.89-.999 4.125m.023-8.25c-.076-.365.183-.75.575-.75h.908c.889 0 1.713.518 1.972 1.368.339 1.11.521 2.287.521 3.507 0 1.553-.295 3.036-.831 4.398-.306.774-1.086 1.227-1.918 1.227h-1.053c-.472 0-.745-.556-.5-.96a8.95 8.95 0 0 0 .303-.54"
                      />
                    </svg>
                    {comment.unLikeCount > 0 && comment.unLikeCount}
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <h1 className="my-20 text-gray-500">No comment yet!</h1>
        )}
      </div>

      {/* Form Section */}

      <div className="fixed bottom-0 left-0 w-full bg-white dark:bg-black px-4 py-3 sm:static sm:px-0 sm:py-0 sm:bg-transparent">
        <form
          className="w-full max-w-xl mx-auto flex gap-4 items-center"
          onSubmit={addComment}
        >
          <div className="relative flex-1">
            <input
              type="text"
              className={`w-full pr-12 shadow-md border rounded-full px-4 py-3 h-[40px] transition focus:outline-none focus:ring-2 ${
                isDark
                  ? "bg-gradient-to-l from-gray-600 via-gray-800 to-black text-white placeholder-white border-white focus:ring-pink-400"
                  : "bg-pink-100 border-pink-300 text-gray-700 placeholder-gray-500 focus:ring-pink-500"
              }`}
              placeholder="Comment..."
              onChange={(e) => setCommentBody(e.target.value)}
              value={commentBody}
            />

            <button
              type="submit"
              className={`absolute top-1/2 right-2 -translate-y-1/2 flex items-center gap-2 px-3 py-2 text-sm font-sm rounded-full transition ${
                isDark
                  ? " text-white  hover:opacity-90"
                  : " text-black  hover:bg-pink-300"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
                />
              </svg>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
