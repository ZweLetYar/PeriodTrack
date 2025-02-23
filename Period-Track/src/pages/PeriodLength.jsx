import React from "react";
import DateSelecter from "../Components/DateSelecter";
import { Link } from "react-router-dom";

export default function PeriodLength() {
  return (
    <div className="flex flex-col items-center justify-between h-145 ">
      <img
        className="w-70 h-auto "
        src="\images\menstrual-period-calendar-floral-background-menstruation-woman-cycle-control-vector-menstrual-period-calendar-floral-298274355.webp"
        alt="periodcalender"
      />
      <div className="px-5 ">
        <p className="text-xl font-medium">Your Average Period length?</p>
        <p className="text-xs">
          if you are unsure of your period length of if it is irregular,than tap
          on "Not Sure" Button.
        </p>
      </div>
      <DateSelecter />
      <div className="flex justify-evenly  w-full">
        <Link
          to="/circlelength"
          className="rounded-full py-4  text-center border border-pink-500 text-pink-500 px-10"
        >
          Not Sure
        </Link>
        <Link
          to="/circlelength"
          className="rounded-full py-4   text-center bg-pink-500 text-white px-15"
        >
          Next Step
        </Link>
      </div>
    </div>
  );
}
