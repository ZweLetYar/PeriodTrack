import React from "react";
import { format, addDays, differenceInCalendarDays, isSameDay } from "date-fns";
import { useContext } from "react";

import { useGetCollection } from "../../hooks/useFireStore";
import { AuthContext } from "../../Context/AuthContext";
import { ThemeContext } from "../../Context/ThemeContext";

export default function Symptoms() {
  let { user } = useContext(AuthContext);
  let { isDark } = useContext(ThemeContext);

  let {
    error,
    loading,
    data: users,
  } = useGetCollection("users", user ? ["email", "==", user.email] : null);

  // if (!user) {
  //   console.log("user not found");
  //   return <div>Loading user...</div>; // ⬅️ important to RETURN here
  // }

  const today = new Date();
  // const periodStart = new Date(2025, 3, 10); // April 10, 2025
  const rawPeriodStart =
    users && users[0]
      ? new Date(users[0].lastPeriodDate.seconds * 1000)
      : new Date(2025, 3, 10); // fallback

  // Adjust period start to the most recent past cycle start
  const cycleLength = users && users[0] ? users[0].circleLength : 28;
  let adjustedPeriodStart = new Date(rawPeriodStart);
  while (adjustedPeriodStart < today) {
    adjustedPeriodStart = addDays(adjustedPeriodStart, cycleLength);
  }
  while (adjustedPeriodStart > today) {
    adjustedPeriodStart = addDays(adjustedPeriodStart, -cycleLength);
  }

  const periodStart = adjustedPeriodStart;

  const periodLength = users && users[0] ? users[0].periodLength : 0;

  const cycleDays = Array.from({ length: cycleLength }, (_, i) =>
    addDays(periodStart, i)
  );

  const getDayStatus = (day) => {
    const dateStr = format(day, "yyyy-MM-dd");
    const periodDays = Array.from({ length: periodLength }, (_, i) =>
      format(addDays(periodStart, i), "yyyy-MM-dd")
    );
    const ovulationDate = format(addDays(periodStart, 14), "yyyy-MM-dd");

    if (periodDays.includes(dateStr)) return "period";
    if (dateStr === ovulationDate) return "ovulation";
    if (isSameDay(day, today)) return "today";
    return "normal";
  };

  const cycleDay = differenceInCalendarDays(today, periodStart) % cycleLength;

  let phase = "Luteal Phase";
  let pregnancyChance = "Low";

  if (cycleDay <= periodLength - 1) {
    phase = "Menstruation";
    pregnancyChance = "Low";
  } else if (cycleDay <= 12) {
    phase = "Follicular Phase";
    pregnancyChance = "Medium";
  } else if (cycleDay <= 15) {
    phase = "Ovulation";
    pregnancyChance = "High";
  }

  const symptomMap = {
    Menstruation: [
      "Abdominal cramps 🤕",
      "Fatigue 😴",
      "Lower back pain 💢",
      "Bloating 💨",
      "Mood swings 😡😢",
      "Headache 🤯",
      "Breast tenderness 💥",
      "Nausea 🤢",
    ],
    "Follicular Phase": [
      "Increased energy ⚡",
      "Clear skin ✨",
      "Improved mood 😊",
      "Light cervical mucus 💧",
      "Mental clarity 🧠",
      "Less bloating 🪶",
    ],
    Ovulation: [
      "Ovulation pain (mittelschmerz) 🩻",
      "Increased libido 🔥",
      "Clear, stretchy cervical mucus 🧵",
      "Breast tenderness 💓",
      "Slight cramping 🔄",
      "Mild spotting 🔻",
    ],
    "Luteal Phase": [
      "Mood swings 😠😩",
      "Breast swelling 🎈",
      "Irritability 😤",
      "Sleep issues 💤",
      "Food cravings 🍫🍟",
      "Constipation 🚫💩",
      "Pimples 🩹",
      "Fatigue 😪",
    ],
  };
  const symptomsToday = symptomMap[phase] || [];

  return (
    <>
      <h1
        className={`text-lg my-10  text-center ${
          isDark ? "text-white" : "text-pink-700"
        }`}
      >
        Symptoms you might feel today
      </h1>
      <div className="flex flex-col gap-4  justify-center items-center ">
        {symptomsToday.map((s, i) => (
          <div
            key={i}
            className={`border border-pink-400 rounded-lg p-4 text-center w-[90%] transition-all duration-200 ${
              isDark ? "text-white border-2" : ""
            }`}
          >
            {s}
          </div>
        ))}
      </div>
    </>
  );
}
