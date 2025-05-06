import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useFormData } from "../../Context/FormContext";

export default function RegularOrNot() {
  const [selected, setSelected] = useState("");
  let { data, setData } = useFormData();

  const options = [
    { id: "option1", label: "☺️ My Cycle is regular", type: true },
    { id: "option2", label: "😣 My Cycle is irregular", type: false },
    { id: "option3", label: "🤔 I don't know", type: null },
  ];

  return (
    <div className="flex flex-col ">
      <div className="mt-3 ms-5">
        <p className="text-xl font-semibold">
          Is your menstrual cycle regular?
        </p>
        <p className="text-xs">Choose one option to get closer to your goal.</p>
      </div>
      <div className="flex flex-col gap-4 h-115 justify-center items-center">
        {options.map((option) => (
          <div
            key={option.id}
            onClick={() => {
              setData({ ...data, isCircleRegular: option.type });
              setSelected(option.id);
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
      <div className="flex justify-evenly  w-full">
        <Link
          to="/lastperioddate"
          className="rounded-full py-4  text-center border border-pink-500 text-pink-500 px-10"
        >
          Not Sure
        </Link>
        <Link
          to="/lastperioddate"
          className="rounded-full py-4   text-center bg-pink-500 text-white px-15"
        >
          Next Step
        </Link>
      </div>
    </div>
  );
}
