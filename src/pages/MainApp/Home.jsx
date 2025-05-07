import DateIndication from "../../Components/DateIndication";
import { format, addDays, differenceInCalendarDays, isSameDay } from "date-fns";
import { useContext } from "react";

import { useGetCollection } from "../../hooks/useFireStore";
import { AuthContext } from "../../Context/AuthContext";
import LogButton from "../../Components/LogButton";
import { Link } from "react-router-dom";
import { ThemeContext } from "../../Context/ThemeContext";

import calender from "../../assets/event-calender-date-note-svgrepo-com.svg";
import notebook from "../../assets/note-book-svgrepo-com.svg";
import newslogo from "../../assets/news-svgrepo-com.svg";

import SampleBlog from "../../Components/SampleBlog";
import FeedbackForm from "../../Components/FeedbackForm";

export default function Home() {
  let { isDark } = useContext(ThemeContext);

  let { user } = useContext(AuthContext);

  let {
    error,
    loading,
    data: users,
  } = useGetCollection("users", user ? ["email", "==", user.email] : null);

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
    <>
      {loading ? (
        <div className=" flex items-center justify-center h-100">
          <img
            src="https://cdn.pixabay.com/animation/2023/05/02/04/29/04-29-03-511_512.gif"
            className="w-15 h-auto"
          ></img>
        </div>
      ) : (
        <div>
          <div className="flex flex-col items-center justify-center mt-5">
            <h2
              className={`text-xl font-semibold mb-3  ${
                isDark ? "text-white" : "text-pink-500"
              }`}
            >
              Period Cycle Tracker
            </h2>

            <div
              className={`relative w-80 h-80  shadow-xl rounded-full ${
                isDark
                  ? "bg-gradient-to-r from-gray-600 via-gray-800 to-black"
                  : "bg-white"
              }`}
            >
              {cycleDays.map((day, i) => {
                const angle = (360 / cycleLength) * i;
                const radius = 120;
                const x = radius * Math.cos((angle - 90) * (Math.PI / 180));
                const y = radius * Math.sin((angle - 90) * (Math.PI / 180));
                const status = getDayStatus(day);

                let classes = "bg-gradient-to-r from-rose-100 to-teal-100  ";
                if (status === "period")
                  classes = "bg-red-500 border-2 border-black-500 text-white";
                else if (status === "ovulation")
                  classes = "bg-pink-600 text-white border border-black";
                else if (status === "today")
                  classes = "bg-cyan-700 border-2 border-black-500 text-white ";

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
                <p
                  className={`text-sm ${
                    isDark ? "text-white" : "text-gray-500"
                  }`}
                >
                  Next period in
                </p>
                <p className="text-3xl font-bold text-pink-600">
                  {daysUntilNextPeriod} days
                </p>
                <p
                  className={`mt-2 text-sm font-medium ${
                    isDark ? "text-white" : "text-gray-600"
                  }`}
                >
                  {phase}
                </p>
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

            <LogButton />

            <div
              className={`text-sm  space-y-1 ${
                isDark ? "text-white" : "text-gray-600"
              }`}
            >
              <div>
                <span className="inline-block w-3 h-3 rounded-full bg-red-500 mr-2"></span>
                Period Days
              </div>
              <div>
                <span className="inline-block w-3 h-3 rounded-full bg-pink-600 mr-2"></span>
                Ovulation Day
              </div>
              <div>
                <span className="inline-block w-3 h-3 rounded-full  bg-cyan-700 mr-2"></span>
                Today
              </div>
            </div>
          </div>

          <DateIndication
            periodStart={periodStart}
            periodLength={periodLength}
            cycleLength={cycleLength}
          />

          <h1
            className={`font-bold text-lg ms-2 ${isDark ? " text-white" : ""}`}
          >
            Today Details
          </h1>
          <div className="flex flex-wrap justify-between gap-4 items-stretch mx-5 my-6">
            <Link
              to="/symptoms"
              className="flex-1 min-w-[45%] bg-pink-100 rounded-lg shadow-md text-center p-4 transition-transform hover:scale-[1.02]"
            >
              <div className="h-full flex flex-col justify-between">
                <div>
                  <h1 className="font-semibold text-sm md:text-base mt-2">
                    {phase === "Menstruation"
                      ? `Period Day ${cycleDay + 1}`
                      : phase === "Ovulation"
                      ? "Ovulation Day"
                      : `Cycle Day ${cycleDay + 1}`}
                  </h1>
                  <h1 className="text-sm text-pink-700 mt-2">
                    Symptoms you might feel today
                  </h1>
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6 text-pink-900 self-end mt-4"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm4.28 10.28a.75.75 0 0 0 0-1.06l-3-3a.75.75 0 1 0-1.06 1.06l1.72 1.72H8.25a.75.75 0 0 0 0 1.5h5.69l-1.72 1.72a.75.75 0 1 0 1.06 1.06l3-3Z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </Link>

            <Link
              to="/logsymptoms"
              className="flex-1 min-w-[45%] bg-pink-200 rounded-lg shadow-md text-center p-4 transition-transform hover:scale-[1.02]"
            >
              <div className="h-full flex flex-col justify-between">
                <div>
                  <h1 className="font-semibold text-sm md:text-base mt-2">
                    Log Symptoms
                  </h1>
                  <h1 className="text-sm text-pink-900 mt-2">
                    How do you feel today?
                  </h1>
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6 text-pink-900 self-end mt-4"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </Link>
          </div>

          <h1
            className={`font-bold text-lg ms-2 ${isDark ? " text-white" : ""}`}
          >
            Other Tools
          </h1>

          <div className="flex justify-evenly gap-5 items-center mx-5 my-5">
            <Link
              to="/periodcalender"
              className="  flex flex-col items-center "
            >
              <img src={calender} alt="calender" className="w-8 h-auto" />
              <h1
                className={`font-semibold text-sm ms-2 ${
                  isDark ? " text-white" : ""
                }`}
              >
                Calender
              </h1>
            </Link>
            <Link to="/dailynotes" className="  flex flex-col items-center ">
              <img src={notebook} alt="notebook" className="w-8 h-auto" />
              <h1
                className={`font-semibold text-sm ms-2 ${
                  isDark ? " text-white" : ""
                }`}
              >
                Daily Notes
              </h1>
            </Link>
            <Link to="/bloglist" className=" flex flex-col items-center ">
              <img src={newslogo} alt="newslogo" className="w-8 h-auto" />
              <h1
                className={`font-semibold text-sm ms-2 ${
                  isDark ? " text-white" : ""
                }`}
              >
                Blog/News
              </h1>
            </Link>
          </div>

          <SampleBlog />
          <FeedbackForm />
        </div>
      )}
    </>
  );
}
