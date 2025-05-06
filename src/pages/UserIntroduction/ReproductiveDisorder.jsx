import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useFormData } from "../../Context/FormContext";

export default function RegularOrNot() {
  const [selected, setSelected] = useState("");

  let { data, setData } = useFormData();

  const options = [
    { id: "option1", label: "🙄 I don't know", type: null },
    { id: "option2", label: "🙁 Yes", type: true },
    { id: "option3", label: "🙂 No", type: false },
    { id: "option4", label: "😕 No, but I used to", type: null },
  ];

  return (
    <div className="flex flex-col ">
      <div className="mt-3 ms-5">
        <p className="text-xl font-semibold">
          Do you have any reproductive health disorders?
        </p>
      </div>
      <div className="flex flex-col gap-4 h-115 justify-center items-center">
        {options.map((option) => (
          <div
            key={option.id}
            onClick={() => {
              setSelected(option.id),
                setData({ ...data, isReproductiveDisorder: option.type });
            }}
            className={`cursor-pointer border rounded-lg p-4 text-center w-[95%]  transition-all duration-200 ${
              selected === option.id
                ? "bg-pink-500 text-white border-pink-400"
                : "bg-white text-gray-700 border-pink-700 hover:border-pink-900"
            }`}
          >
            {option.label}
          </div>
        ))}
      </div>

      <Link
        to="/aboutsleep"
        className={`rounded-full py-4   text-center ${
          selected
            ? "bg-pink-500 text-white"
            : "bg-gray-50 text-gray-400 cursor-not-allowed"
        }`}
      >
        Continue
      </Link>
    </div>
  );
}
