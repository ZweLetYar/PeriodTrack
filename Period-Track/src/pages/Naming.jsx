import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Naming() {
  let [name, setName] = useState("");

  return (
    <div className="flex flex-col">
      <div className="mt-3 ms-5">
        <p className="text-xl font-semibold">What shall I call you?</p>
        <p className="text-sm">Write your full name here</p>
      </div>
      <div className="flex items-center justify-center h-115">
        <input
          type="text"
          className="outline-none caret-pink-800"
          placeholder="We would love to know!"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
      </div>
      <Link
        to="/periodlength"
        className={`rounded-full py-4   text-center ${
          name
            ? "bg-pink-500 text-white"
            : "bg-gray-50 text-gray-400 cursor-not-allowed"
        }`}
      >
        That's me
      </Link>
    </div>
  );
}
