import { createContext, useContext, useMemo } from "react";

import { addDays, format, isSameDay, differenceInCalendarDays } from "date-fns";
import { AuthContext } from "./AuthContext";
import { useGetCollection } from "../hooks/useFireStore";

const CycleContext = createContext();

const CycleContextProvider = ({ children }) => {
  const { user } = useContext(AuthContext);

  const {
    error,
    loading,
    data: users,
  } = useGetCollection("users", user ? ["email", "==", user.email] : null);

  const today = new Date();
  const rawPeriodStart =
    users && users[0]
      ? new Date(users[0].lastPeriodDate.seconds * 1000)
      : new Date(2025, 3, 10);

  const cycleLength = users && users[0] ? users[0].circleLength : 28;
  const periodLength = users && users[0] ? users[0].periodLength : 0;

  let adjustedPeriodStart = new Date(rawPeriodStart);
  while (adjustedPeriodStart < today) {
    adjustedPeriodStart = addDays(adjustedPeriodStart, cycleLength);
  }
  while (adjustedPeriodStart > today) {
    adjustedPeriodStart = addDays(adjustedPeriodStart, -cycleLength);
  }

  const periodStart = adjustedPeriodStart;

  const cycleDays = useMemo(
    () =>
      Array.from({ length: cycleLength }, (_, i) => addDays(periodStart, i)),
    [periodStart, cycleLength]
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
    <CycleContext.Provider
      value={{
        user,
        loading,
        error,
        users,
        periodStart,
        cycleDays,
        getDayStatus,
        phase,
        pregnancyChance,
        daysUntilNextPeriod,
        cycleDay,
      }}
    >
      {children}
    </CycleContext.Provider>
  );
};

export { CycleContext, CycleContextProvider };
