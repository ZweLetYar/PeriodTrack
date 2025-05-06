import React, { useContext, useState } from "react";
import useTheme from "../../hooks/useTheme";
import { AuthContext } from "../../Context/AuthContext";
import {
  addCollection,
  deleteDocument,
  updateDocument,
  useGetCollection,
} from "../../hooks/useFireStore";
import moment from "moment";
import pencil from "../../assets/pencil.svg";
import trash from "../../assets/trash.svg";
import pinkGirl from "../../assets/avatar-female-girl-svgrepo-com.svg";

export default function DailyNotes() {
  let { isDark } = useTheme();
  let [noteBody, setNoteBody] = useState("");

  let { user } = useContext(AuthContext);
  const [selectedDate, setSelectedDate] = useState(
    () => new Date().toISOString().split("T")[0]
  );

  let addNote = async (e) => {
    e.preventDefault();

    let data = {
      datenote: selectedDate,
      userId: user.uid,
      noteBody,
    };
    await addCollection("notes", data);

    setNoteBody("");
  };

  //-----------------------note list

  let { data: notes, error } = useGetCollection("notes", [
    "userId",
    "==",
    user.uid,
  ]);

  // Then filter by `selectedDate` in your component
  const filteredNotes = notes.filter((note) => note.datenote === selectedDate);

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

  let { data: users } = useGetCollection(
    "users",
    user ? ["email", "==", user.email] : null
  );

  return (
    <div
      className={`min-h-screen px-4 py-6 ${
        isDark ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      {/* Form Section */}
      <form
        className="max-w-xl mx-auto flex flex-col gap-4 items-center"
        onSubmit={addNote}
      >
        <div className="w-full">
          <label className="block font-semibold mb-1">Date 📅</label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            max={new Date().toISOString().split("T")[0]}
            className="w-full border rounded px-4 py-2 dark:bg-gray-800 dark:text-white dark:border-gray-600"
          />
        </div>

        <textarea
          className={`w-full shadow-md border rounded px-4 py-3 resize-none min-h-[60px] transition focus:outline-none focus:ring-2 ${
            isDark
              ? "bg-gradient-to-l from-gray-600 via-gray-800 to-black text-white placeholder-white border-white focus:ring-pink-400"
              : "bg-pink-100 border-pink-300 text-gray-700 placeholder-gray-500 focus:ring-pink-500"
          }`}
          placeholder="You can write note here..."
          onChange={(e) => setNoteBody(e.target.value)}
          value={noteBody}
        />

        <button
          type="submit"
          className={`flex items-center gap-2 px-4 py-2 text-sm font-sm rounded-xl transition ${
            isDark
              ? "bg-gradient-to-r from-gray-900 via-gray-800 to-black text-white border border-white hover:opacity-90"
              : "bg-pink-100 text-black border border-pink-300 hover:bg-pink-200"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          Add Note
        </button>
      </form>

      {/* Notes Section */}
      <div className="mt-10 flex flex-col items-center">
        {!!filteredNotes &&
          filteredNotes.map((note) => (
            <div
              key={note.id}
              className={`w-full max-w-xl mb-5 p-4 rounded-lg shadow-md transition ${
                isDark
                  ? "bg-gradient-to-l from-gray-700 via-gray-900 to-black text-white"
                  : "bg-gray-100 text-gray-900"
              }`}
            >
              <div className="flex items-start gap-4">
                <img
                  className="w-10 h-10 rounded-full"
                  src={pinkGirl}
                  alt="User"
                />
                <div className="flex-grow">
                  <h1 className="text-md font-semibold">
                    {users && users[0] ? users[0].name : "Unknown"}
                  </h1>
                  <p className="text-sm text-gray-500 dark:text-gray-300">
                    {moment(note?.date?.seconds * 1000).fromNow()}
                  </p>
                </div>

                <div className="flex items-start gap-2">
                  {isEdit && editNoteId === note.id ? (
                    <>
                      <button
                        onClick={(e) => editNoteHandler(e, note.id)}
                        className="p-1 rounded bg-green-500 hover:bg-green-600 text-white"
                        title="Save"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          className="w-5 h-5"
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
                          className="w-5 h-5"
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
                          setEditNoteId(note.id);
                          setEditedNoteBody(note.noteBody);
                        }}
                        className="w-5 h-5 cursor-pointer hover:opacity-75"
                      />
                      <img
                        src={trash}
                        alt="Delete"
                        title="Delete"
                        className="w-5 h-5 cursor-pointer hover:opacity-75"
                        onClick={(e) => {
                          deleteNote(e, note.id);
                        }}
                      />
                    </>
                  )}
                </div>
              </div>

              <div className="mt-3">
                {isEdit && editNoteId === note.id ? (
                  <textarea
                    className="w-full bg-gray-200 dark:bg-gray-800 dark:text-white rounded px-3 py-2 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none min-h-[100px]"
                    placeholder="Edit your note..."
                    onChange={(e) => setEditedNoteBody(e.target.value)}
                    value={editedNoteBody}
                  />
                ) : (
                  <p className="text-base break-words whitespace-pre-wrap">
                    {note.noteBody}
                  </p>
                )}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
