import React, { useContext, useState } from "react";

import useTheme from "../hooks/useTheme";
import { AuthContext } from "../Context/AuthContext";
import { addCollection } from "../hooks/useFireStore";

export default function NoteForm() {
  let { isDark } = useTheme();
  let [noteBody, setNoteBody] = useState("");
 


  let { user } = useContext(AuthContext);
  const [selectedDate, setSelectedDate] = useState(
    () => new Date().toISOString().split("T")[0]
  );

  let addNote = async (e) => {
    e.preventDefault();

    let data = {
      datenote:selectedDate,
      userId:user.uid,
      noteBody,
      
    };
    await addCollection("notes", data);

    setNoteBody("");
  };

  return (
    <form className="flex flex-col items-center justify-center" onSubmit={addNote}>

<div>
        <label className="font-semibold">Date 📅</label>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          max={new Date().toISOString().split("T")[0]} // disables future dates
          className="mt-1 w-full border rounded px-4 py-2"
        />
      </div>
      <textarea
        className={`appearance-none shadow-md block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 ${
          isDark
            ? "bg-gradient-to-l from-gray-500 via-gray-700 to-black text-white placeholder-white"
            : ""
        }`}
        type="text"
        placeholder="You can write note here...."
        onChange={(e) => setNoteBody(e.target.value)}
        value={noteBody}
      />
      <button
        className={`bg-gray-300  mb-3  rounded-sm py-5 ms-1 cursor-pointer border border-black ${
          isDark
            ? "bg-gradient-to-r from-gray-900 via-gray-900 to-black  border border-white"
            : ""
        }`}
        type="submit"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-7"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
      </button>
    </form>
  );
}
