import { useState, useEffect, useContext } from "react";
import { CycleContext } from "../../Context/CycleContext";
import { addCollection } from "../../hooks/useFireStore";
import { AuthContext } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";

// Dummy function: replace with real period check
// const isPeriodDay = (dateStr) => {
//   // Simulate period from 1st–5th of every month
//   const day = new Date(dateStr).getDate();
//   return day >= 1 && day <= 5;
// };

export default function LogSymptoms() {
  let { user } = useContext(AuthContext);
  const [selectedDate, setSelectedDate] = useState(
    () => new Date().toISOString().split("T")[0]
  );

  let navigate = useNavigate();

  let { getDayStatus } = useContext(CycleContext);

  const [isPeriodDay, setIsPeriodDay] = useState(false);

  useEffect(() => {
    let status = getDayStatus(selectedDate);
    if (status == "period") {
      setIsPeriodDay(true);
    } else {
      setIsPeriodDay(false);
    }
  }, [selectedDate]);

  // const [isFlowVisible, setIsFlowVisible] = useState(isPeriodDay(selectedDate));
  const [log, setLog] = useState({
    dateLog: selectedDate,
    userId: user.uid,
    mood: [],
    menstruationFlow: [],
    physical: [],
    sexDrive: [],
    discharge: [],
  });

  //   useEffect(() => {
  //     setIsFlowVisible(isPeriodDay(selectedDate));
  //     setLog((prev) => ({ ...prev, date: selectedDate }));
  //   }, [selectedDate]);

  const toggleSelection = (field, value) => {
    setLog((prev) => {
      const current = prev[field];
      return {
        ...prev,
        [field]: current.includes(value)
          ? current.filter((v) => v !== value)
          : [...current, value],
      };
    });
  };

  const renderOptions = (field, options, colorClass) => (
    <div className="flex gap-3 mt-2 flex-wrap">
      {options.map((option) => (
        <button
          key={option}
          onClick={() => toggleSelection(field, option)}
          className={`px-3 py-1 rounded-full border border-pink-400 text-sm transition ${
            log[field].includes(option)
              ? `${colorClass} text-white`
              : " hover:bg-gray-200"
          }`}
        >
          {option}
        </button>
      ))}
    </div>
  );

  const submitLog = async () => {
    await addCollection("symptoms", log);
    navigate("/");
  };

  return (
    <div className="max-w-xl mx-auto bg-white shadow-xl p-6 rounded-xl space-y-6 text-gray-800">
      <h2 className="text-2xl font-bold text-center text-pink-600">
        Log Your Symptoms
      </h2>

      {/* Date Picker */}
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

      {/* Moods */}
      <div>
        <label className="font-semibold">Moods 😌</label>
        {renderOptions(
          "mood",
          [
            "Happy 😊",
            "Sad 😢",
            "Irritated 😠",
            "Anxious 😰",
            "Calm 😇",
            "Angry 😤",
          ],
          "bg-pink-500"
        )}
      </div>

      {/* Menstruation Flow (Only if Period Day) */}
      {isPeriodDay && (
        <div>
          <label className="font-semibold">Menstruation Flow 🩸</label>
          {renderOptions(
            "menstruationFlow",
            ["Light 💧", "Medium 💦", "Heavy 💥", "Spotting 🩹"],
            "bg-red-500"
          )}
        </div>
      )}

      {/* Physical Symptoms */}
      <div>
        <label className="font-semibold">Physical Symptoms 🤕</label>
        {renderOptions(
          "physical",
          [
            "Cramps 🌀",
            "Acne 😬",
            "Breast Pain 😖",
            "Fatigue 😴",
            "Headache 🤯",
            "Back Pain 🦴",
          ],
          "bg-purple-500"
        )}
      </div>

      {/* Sex Drive */}
      <div>
        <label className="font-semibold">Sex Drive 💕</label>
        {renderOptions(
          "sexDrive",
          ["Low 😐", "Normal 🙂", "High 🔥"],
          "bg-yellow-500"
        )}
      </div>

      {/* Vaginal Discharge */}
      <div>
        <label className="font-semibold">Vaginal Discharge 💧</label>
        {renderOptions(
          "discharge",
          [
            "None 🚫",
            "Sticky 🧼",
            "Creamy 🥛",
            "Egg White 🥚",
            "Watery 💦",
            "Yellowish 🟡",
          ],
          "bg-blue-500"
        )}
      </div>

      {/* Submit */}
      <div className="text-center pt-4">
        <button
          onClick={submitLog}
          className="px-6 py-2 bg-pink-600 text-white rounded-full hover:bg-pink-700 transition"
        >
          Save Log
        </button>
      </div>
    </div>
  );
}
