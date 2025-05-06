import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormData } from "../../Context/FormContext";

import useSignup from "../../hooks/useSignup";
import { addCollection } from "../../hooks/useFireStore";
import { AuthContext } from "../../Context/AuthContext";

export default function AboutSleep() {
  const [selected, setSelected] = useState([]);

  let navigate = useNavigate();

  let { data, setData } = useFormData();

  let { error, loading, SignUp } = useSignup();

  let { user } = useContext(AuthContext);

  const options = [
    { id: "option1", label: "😞 No, I sleep well" },
    { id: "option2", label: "😩 Waking up during the night" },
    { id: "option3", label: "😣 Waking up tired" },
    { id: "option4", label: "😮‍💨 Difficulty falling asleep" },
    { id: "option5", label: "😐 Lack of sleep" },
    { id: "option6", label: "🤔 Something else" },
  ];

  useEffect(() => {
    setData({ ...data, aboutSleep: selected });
  }, [selected]);

  // useEffect(() => {
  //   console.log(data);
  // }, [data]);

  const toggleSelection = (label) => {
    setSelected((prev) =>
      prev.includes(label)
        ? prev.filter((item) => item !== label)
        : [...prev, label]
    );
  };

  let signUpUser = async (e) => {
    e.preventDefault();

    // Step 1: Call the signup function
    let result = await SignUp(data.email, data.password);

    // Step 2: If signup fails, exit early
    if (!result.success) {
      return;
    }

    // Step 3: If signup succeeds, then add the user document
    const dataToFb = {
      email: data.email,
      name: data.name,
      periodLength: data.periodLength,
      circleLength: data.circleLength,
      isCircleRegular: data.isCircleRegular,
      lastPeriodDate: data.lastPeriodDate,
      feelDiscomfort: data.feelDiscomfort,
      isReproductiveDisorder: data.isReproductiveDisorder,
      aboutSleep: data.aboutSleep,
    };

    await addCollection("users", dataToFb);

    // Step 4: Navigate to home or next screen
    navigate("/");
  };

  return (
    <>
      {!!error && (
        <div className=" flex flex-col items-center justify-center h-100 w-full">
          <h1 className="text-red-700 font-bold text-lg w-[80%] text-center">
            {error}
          </h1>
          <button
            onClick={() => navigate("/register")}
            className="bg-pink-500 rounded-full py-4 px-4 mt-5 text-white"
          >
            Try Again
          </button>
        </div>
      )}
      {loading && (
        <div className=" flex items-center justify-center h-100">
          <img
            src="https://cdn.pixabay.com/animation/2023/05/02/04/29/04-29-03-511_512.gif"
            className="w-15 h-auto"
          ></img>
        </div>
      )}
      {!loading && !error && (
        <div className="flex flex-col  justify-between h-150 ">
          <div className="mt-3 ms-5">
            <p className="text-xl font-semibold">
              Anything you want to improve about your sleep?
            </p>
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

          <button
            className={`rounded-full py-4  cursor-pointer text-center ${
              selected.length
                ? "bg-pink-500 text-white"
                : "bg-gray-50 text-gray-400 cursor-not-allowed"
            }`}
            onClick={signUpUser}
          >
            Continue
          </button>
        </div>
      )}
    </>
  );
}
