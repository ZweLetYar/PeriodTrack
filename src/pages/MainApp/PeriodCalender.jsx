import React, { useContext } from "react";
import { CycleContext } from "../../Context/CycleContext";
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  isSameMonth,
  isSameDay,
  addMonths,
} from "date-fns";

const getDayClass = (status) => {
  switch (status) {
    case "period":
      return "bg-pink-300 text-white";
    case "ovulation":
      return "bg-orange-300 text-white";
    case "today":
      return "border border-black";
    default:
      return "";
  }
};

const isFertileWindow = (periodStart, day) => {
  const fertileStart = addDays(periodStart, 10);
  const fertileEnd = addDays(periodStart, 16);
  return day >= fertileStart && day <= fertileEnd;
};

const renderMonth = (monthStart, getDayStatus, periodStart) => {
  const monthEnd = endOfMonth(monthStart);
  const calendarStart = startOfWeek(monthStart, { weekStartsOn: 1 });
  const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 1 });

  const days = [];
  let day = calendarStart;

  while (day <= calendarEnd) {
    const inMonth = isSameMonth(day, monthStart);
    const status = inMonth ? getDayStatus(day) : "normal";
    const isFertile = isFertileWindow(periodStart, day);
    const key = format(day, "yyyy-MM-dd");

    days.push(
      <div
        key={key}
        className={`w-10 h-10 flex items-center justify-center rounded-full text-sm relative
          ${getDayClass(status)}
          ${isFertile && status === "normal" ? "bg-blue-200" : ""}
          ${!inMonth ? "text-gray-300" : ""}`}
      >
        {format(day, "d")}
        {status === "period" && (
          <span className="absolute bottom-0 text-pink-700 text-xs">💧</span>
        )}
        {status === "ovulation" && (
          <span className="absolute bottom-0 text-orange-700 text-xs">🟠</span>
        )}
      </div>
    );

    day = addDays(day, 1);
  }

  const weeks = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(
      <div key={`week-${i}`} className="grid grid-cols-7 gap-2 mb-2">
        {days.slice(i, i + 7)}
      </div>
    );
  }

  return (
    <div key={format(monthStart, "yyyy-MM")} className="mb-8">
      <h2 className="text-lg font-semibold my-4">
        {format(monthStart, "MMMM, yyyy")}
      </h2>
      <div className="flex gap-4 text-sm ml-auto mb-4">
        <div className="flex items-center gap-1">
          <div className="w-4 h-4 bg-pink-300 rounded-full" /> Period
        </div>
        <div className="flex items-center gap-1">
          <div className="w-4 h-4 bg-blue-200 rounded-full" /> Fertility
        </div>
        <div className="flex items-center gap-1">
          <div className="w-4 h-4 bg-orange-300 rounded-full" /> Ovulation
        </div>
      </div>
      <div className="grid grid-cols-7 text-sm text-gray-500 mb-2">
        <div>M</div>
        <div>T</div>
        <div>W</div>
        <div>T</div>
        <div>F</div>
        <div>S</div>
        <div>S</div>
      </div>
      {weeks}
    </div>
  );
};

const PeriodCalendar = () => {
  const { getDayStatus, periodStart } = useContext(CycleContext);

  const months = [];
  const startMonth = startOfMonth(periodStart);

  for (let i = 0; i < 12; i++) {
    const month = addMonths(startMonth, i);
    months.push(renderMonth(month, getDayStatus, periodStart));
  }

  return <div className="p-4">{months}</div>;
};

export default PeriodCalendar;
