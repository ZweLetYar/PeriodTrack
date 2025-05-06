import React from "react";
import blood from "../assets/blood-donation-blood-drop-svgrepo-com.svg";
import sperm from "../assets/fertilization-sperm-svgrepo-com.svg";
import correct from "../assets/correct-success-tick-svgrepo-com.svg";
import { addDays, format } from "date-fns";

export default function DateIndication({
  periodStart,
  periodLength,
  cycleLength,
}) {
  const nextPeriod = format(addDays(periodStart, cycleLength), "MMM d");
  const ovulationDate = format(addDays(periodStart, 14), "MMM d");
  const safeDay = format(addDays(periodStart, 17), "MMM d");
  return (
    <div className="flex justify-between h-30 items-center mx-5 my-5">
      <div className="h-full w-[30%] bg-pink-100 rounded-sm shadow-lg text-center">
        <img src={blood} alt="blood" className="w-10 h-10 ps-2 pt-2" />
        <h1 className=" font-semibold text-sm mt-4">Next Period</h1>
        <h3 className="text-sm ">{nextPeriod}</h3>
      </div>
      <div className="h-full w-[30%] bg-pink-200 rounded-sm shadow-lg text-center">
        <img src={sperm} alt="blood" className="w-10 h-10 ps-2 pt-2" />
        <h1 className=" font-semibold text-sm mt-4">Ovulation</h1>
        <h3 className="text-sm ">{ovulationDate}</h3>
      </div>
      <div className="h-full w-[30%] bg-green-100 rounded-sm shadow-lg text-center">
        <img src={correct} alt="blood" className="w-10 h-10 ps-2 pt-2" />
        <h1 className=" font-semibold text-sm mt-4">Safe Days</h1>
        <h3 className="text-sm ">{safeDay}</h3>
      </div>
    </div>
  );
}
