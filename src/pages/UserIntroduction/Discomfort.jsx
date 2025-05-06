import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useFormData } from "../../Context/FormContext";

export default function RegularOrNot() {
  const [selected, setSelected] = useState([]);

  let { data, setData } = useFormData();

  const options = [
    { id: "option1", label: "🥺 Painful Menstrual cramps" },
    { id: "option2", label: "😥 PMS Symptoms" },
    { id: "option3", label: "💦 Unusual Discharge" },
    { id: "option4", label: "🩸 Heavy Menstrual flow" },
    { id: "option5", label: "🤯 Mood Swings" },
    // { id: "option6", label: "😶 Others" },
    { id: "option6", label: "🤔 Nothing, I'm totally fine" },
  ];

  useEffect(() => {
    setData({ ...data, feelDiscomfort: selected });
  }, [selected]);

  const toggleSelection = (label) => {
    setSelected((prev) =>
      prev.includes(label)
        ? prev.filter((item) => item !== label)
        : [...prev, label]
    );
  };

  return (
    <div className="flex flex-col  justify-between h-150 ">
      <div className="mt-3 ms-5">
        <p className="text-xl font-semibold">Do you feel any discomfort?</p>
      </div>
      <div className="flex flex-col gap-4 h-115 justify-center items-center ">
        {options.map((option) => (
          <div
            key={option.id}
            onClick={() => toggleSelection(option.label)}
            className={`cursor-pointer border rounded-lg p-4 text-center w-[95%] transition-all duration-200 ${
              selected.includes(option.label)
                ? "bg-pink-500 text-white border-pink-600"
                : "bg-white text-gray-700 border-pink-300 hover:border-pink-400"
            }`}
          >
            {option.label}
          </div>
        ))}
      </div>

      <Link
        to="/reproductivedisorder"
        className={`rounded-full py-4   text-center ${
          selected.length
            ? "bg-pink-500 text-white"
            : "bg-gray-50 text-gray-400 cursor-not-allowed"
        }`}
      >
        Continue
      </Link>
    </div>
  );
}
