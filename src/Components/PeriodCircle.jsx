import { format, addDays, differenceInCalendarDays, isSameDay } from "date-fns";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import { useGetCollection } from "../hooks/useFireStore";

export default function PeriodCircle() {
  let { user } = useContext(AuthContext);

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
  const periodStart =
    users && users[0]
      ? new Date(users[0].lastPeriodDate.seconds * 1000)
      : new Date(2025, 3, 10); // fallback value if no user
  const periodLength = users && users[0] ? users[0].periodLength : 0;
  const cycleLength = users && users[0] ? users[0].circleLength : 28;

  const nextPeriod = format(addDays(periodStart, cycleLength), "MMM d");

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
  const daysUntilNextPeriod = cycleLength - cycleDay;

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

  return (
    <div className="flex flex-col items-center justify-center mt-5">
      <h2 className="text-xl font-semibold mb-3 text-pink-500">
        Period Cycle Tracker
      </h2>

      <div className="relative w-80 h-80 bg-white shadow-xl rounded-full">
        {cycleDays.map((day, i) => {
          const angle = (360 / cycleLength) * i;
          const radius = 120;
          const x = radius * Math.cos((angle - 90) * (Math.PI / 180));
          const y = radius * Math.sin((angle - 90) * (Math.PI / 180));
          const status = getDayStatus(day);

          let classes = "bg-gradient-to-r from-rose-100 to-teal-100  ";
          if (status === "period")
            classes = "bg-red-500 border border-black text-white";
          else if (status === "ovulation")
            classes = "bg-pink-600 text-white border border-black";
          else if (status === "today")
            classes =
              "bg-gradient-to-r from-gray-700 via-gray-900 to-black border-2 border-blue-500 text-white";

          return (
            <div
              key={i}
              className={`absolute w-7 h-7 rounded-full ${classes} text-xs flex items-center justify-center`}
              style={{
                left: `calc(50% + ${x}px - 14px)`,
                top: `calc(50% + ${y}px - 14px)`,
              }}
              title={format(day, "MMM d")}
            >
              {format(day, "d")}
            </div>
          );
        })}

        {/* Info center */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <p className="text-sm text-gray-500">Next period in</p>
          <p className="text-3xl font-bold text-pink-600">
            {daysUntilNextPeriod} days
          </p>
          <p className="mt-2 text-sm font-medium text-gray-600">{phase}</p>
          <p
            className={`text-xs  mt-1 ${
              pregnancyChance === "High"
                ? "text-red-600"
                : pregnancyChance === "Medium"
                ? "text-yellow-700"
                : "text-green-600"
            }`}
          >
            {pregnancyChance} chance of pregnancy
          </p>
        </div>
      </div>

      <div className="mt-6 text-sm text-gray-600 space-y-1">
        <div>
          <span className="inline-block w-3 h-3 rounded-full bg-red-500 mr-2"></span>
          Period Days
        </div>
        <div>
          <span className="inline-block w-3 h-3 rounded-full bg-pink-600 mr-2"></span>
          Ovulation Day
        </div>
        <div>
          <span className="inline-block w-3 h-3 rounded-full  bg-gradient-to-r from-gray-700 via-gray-900 to-black mr-2"></span>
          Today
        </div>
      </div>
    </div>
  );
}
