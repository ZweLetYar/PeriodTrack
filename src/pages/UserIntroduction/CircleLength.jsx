import React from "react";
import DateSelecter2 from "../../Components/DateSelecter2";
import { Link } from "react-router-dom";

export default function PeriodLength() {
  return (
    <div className="flex flex-col items-center justify-between h-145 ">
      <img
        className="w-70 h-auto "
        src="\images\pngtree-pink-glowing-circle-png-image_6058681-removebg-preview.png"
        alt="periodcalender"
      />
      <div className="px-5 ">
        <p className="text-xl font-medium">Your Average Circle length?</p>
        <p className="text-xs">
          if you are unsure of your period length of if it is irregular,than tap
          on "Not Sure" Button.
        </p>
      </div>
      <DateSelecter2 />
      <div className="flex justify-evenly  w-full">
        <Link
          to="/regularornot"
          className="rounded-full py-4  text-center border border-pink-500 text-pink-500 px-10"
        >
          Not Sure
        </Link>
        <Link
          to="/regularornot"
          className="rounded-full py-4   text-center bg-pink-500 text-white px-15"
        >
          Next Step
        </Link>
      </div>
    </div>
  );
}
