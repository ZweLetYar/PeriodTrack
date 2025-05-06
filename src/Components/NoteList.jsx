import React, { useEffect, useState } from "react";
import useFireStore from "../hooks/useFireStore";

import pencil from "../assets/pencil.svg";
import trash from "../assets/trash.svg";
import moment from "moment";
import useTheme from "../hooks/useTheme";

export default function NoteList() {
  let { isDark } = useTheme();
  
  let { getCollection, deleteDocument, updateDocument } = useFireStore();
  let { data: notes } = getCollection("notes", ["bookId", "==", id]);
  let [isEdit, setIsEdit] = useState(false);
  let [editNoteId, setEditNoteId] = useState("");
  let [editedNoteBody, setEditedNoteBody] = useState("");

  let deleteNote = async (e, id) => {
    e.preventDefault();
    await deleteDocument("notes", id);
  };

  let editNoteHandler = async (e) => {
    e.preventDefault();
    let data = { noteBody: editedNoteBody };
    await updateDocument("notes", editNoteId, data);
    setIsEdit(false);
  };

  return (
    !!notes &&
    notes.map((note) => (
      <div
        className={`bg-gray-100 rounded-lg mb-4 shadow-md ${
          isDark ? "bg-gradient-to-l from-gray-700 via-gray-900 to-black " : ""
        }`}
        key={note.id}
      >
        <div className="flex ">
          <img
            className="w-10 h-10 rounded-full m-5 inline"
            src="https://cdn.creativecodermm.com/public/cc_profile/Profile-Robot-06.jpg"
            alt="acc"
          />
          <div className="my-3">
            <h1 className="text-lg font-semibold">Zwe Let Yar</h1>
            <h1 className="text-sm text-gray-700">
              {moment(note?.date?.seconds * 1000).fromNow()}
            </h1>
          </div>
          <div className="flex ml-auto items-start gap-2 mr-5 mt-5">
            {isEdit && editNoteId === note.id ? (
              <>
                <button
                  onClick={(e) => editNoteHandler(e, note.id)}
                  className="cursor-pointer bg-green-400 rounded-lg "
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-6"
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
                  className="cursor-pointer bg-red-400 rounded-lg "
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-6"
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
                  alt="edit icon"
                  onClick={(e) => {
                    e.preventDefault();
                    setIsEdit(true);
                    setEditNoteId(note.id);
                    setEditedNoteBody(note.noteBody);
                  }}
                  className="cursor-pointer"
                />
                <img
                  src={trash}
                  alt="delete icon"
                  className="cursor-pointer"
                  onClick={(e) => {
                    deleteNote(e, note.id);
                  }}
                />
              </>
            )}
          </div>
        </div>
        {isEdit && editNoteId === note.id ? (
          <textarea
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4  leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            type="text"
            placeholder="You can write note here"
            onChange={(e) => setEditedNoteBody(e.target.value)}
            value={editedNoteBody}
          />
        ) : (
          <p className="p-5 pt-0 ">{note.noteBody}</p>
        )}
      </div>
    ))
  );
}
