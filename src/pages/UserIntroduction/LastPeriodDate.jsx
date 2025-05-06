import { useEffect, useState } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  addDays,
  subMonths,
  addMonths,
  isSameDay,
  isSameMonth,
  isAfter,
  isToday as checkIsToday,
} from "date-fns";
import { Link } from "react-router-dom";
import { useFormData } from "../../Context/FormContext";

export default function LastPeriodDate() {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(startOfMonth(today));

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const startDate = startOfWeek(monthStart);

  let { data, setData } = useFormData();

  useEffect(() => {
    setData({ ...data, lastPeriodDate: selectedDate });
  }, [selectedDate]);

  const handleSelect = (day) => {
    if (isAfter(day, today)) return;
    setSelectedDate(day);
  };

  const nextMonth = () => {
    const next = addMonths(currentMonth, 1);
    if (isAfter(startOfMonth(next), startOfMonth(today))) return;
    setCurrentMonth(next);
  };

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const renderHeader = () => (
    <div className="flex items-center justify-between mb-4">
      <button
        onClick={prevMonth}
        className="text-gray-600 hover:text-black p-2 rounded-md hover:bg-gray-200"
      >
        ←
      </button>
      <h2 className="text-lg font-semibold text-gray-800">
        {format(currentMonth, "MMMM yyyy")}
      </h2>
      <button
        onClick={nextMonth}
        disabled={format(currentMonth, "yyyy-MM") === format(today, "yyyy-MM")}
        className="text-gray-600 hover:text-black p-2 rounded-md hover:bg-gray-200 disabled:text-gray-300 disabled:hover:bg-transparent"
      >
        →
      </button>
    </div>
  );

  const renderDays = () => {
    const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return (
      <div className="grid grid-cols-7 text-center text-sm text-gray-500 mb-1">
        {weekdays.map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>
    );
  };

  const renderCells = () => {
    const rows = [];
    let days = [];
    let day = startDate;

    while (day <= monthEnd || days.length % 7 !== 0) {
      for (let i = 0; i < 7; i++) {
        const currentDay = new Date(day);
        const isCurrentMonth = isSameMonth(currentDay, currentMonth);
        const isFuture = isAfter(currentDay, today);
        const isSelected = selectedDate && isSameDay(currentDay, selectedDate);
        const isToday = checkIsToday(currentDay);

        days.push(
          <div
            key={currentDay.toString()}
            onClick={() =>
              !isFuture && isCurrentMonth ? handleSelect(currentDay) : null
            }
            className={`text-sm text-center p-2 rounded-md transition select-none ${
              !isCurrentMonth
                ? "text-gray-300"
                : isFuture
                ? "text-gray-300 cursor-not-allowed"
                : isSelected
                ? "bg-pink-600 text-white font-semibold cursor-pointer"
                : isToday
                ? "border border-pink-500 text-pink-600 font-semibold cursor-pointer"
                : "text-gray-800 hover:bg-gray-100 cursor-pointer"
            }`}
          >
            {isCurrentMonth ? format(currentDay, "d") : ""}
          </div>
        );

        day = addDays(day, 1);
      }

      rows.push(
        <div key={day.toString()} className="grid grid-cols-7 gap-1">
          {days}
        </div>
      );
      days = [];
    }

    return <div className="space-y-1">{rows}</div>;
  };

  return (
    <div className="flex flex-col">
      <div className="mt-3 ms-5">
        <p className="text-xl font-semibold">
          When did your last period start?
        </p>
      </div>
      <div className="h-125 flex items-center justify-center">
        <div className="max-w-md mx-auto bg-white rounded-xl shadow p-4">
          {renderHeader()}
          {renderDays()}
          {renderCells()}
          {selectedDate && (
            <p className="text-center mt-4 text-pink-500 font-medium">
              Selected Date: {format(selectedDate, "PPP")}
            </p>
          )}
        </div>
      </div>
      <Link
        to="/discomfort"
        className={`rounded-full py-4   text-center ${
          selectedDate
            ? "bg-pink-500 text-white"
            : "bg-gray-50 text-gray-400 cursor-not-allowed"
        }`}
      >
        Continue
      </Link>
    </div>
  );
}
