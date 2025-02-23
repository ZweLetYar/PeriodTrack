import { useState, useRef } from "react";

export default function DateSelecter() {
  const periods = [27, 28, 29, 30, 31]; // Days options
  const [selected, setSelected] = useState(29);
  const scrollRef = useRef(null);

  const handleSelect = (day) => {
    setSelected(day);
    const index = periods.indexOf(day);
    if (scrollRef.current) {
      const scrollAmount = index * 80; // Adjust based on item width
      scrollRef.current.scrollTo({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className="flex justify-center items-center mt-4">
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto no-scrollbar p-4 w-80"
      >
        {periods.map((day) => (
          <div
            key={day}
            onClick={() => handleSelect(day)}
            className={`flex flex-col items-center justify-center w-20 h-28 rounded-full cursor-pointer 
              transition-all duration-300 ${
                selected === day
                  ? "bg-pink-200 text-pink-600 font-bold scale-110 shadow-lg"
                  : "text-gray-400 opacity-50"
              }`}
          >
            <span className="text-2xl">{day}</span>
            <span className="text-sm">Days</span>
          </div>
        ))}
      </div>
    </div>
  );
}
