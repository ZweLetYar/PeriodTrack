import { createContext, useState, useContext } from "react";

const FormContext = createContext();

export function useFormData() {
  return useContext(FormContext);
}

export function FormProvider({ children }) {
  const [data, setData] = useState({
    email: "",
    password: "",
    name: "",
    periodLength: 0,
    circleLength: 0,
    isCircleRegular: null,
    lastPeriodDate: "",
    feelDiscomfort: [],
    isReproductiveDisorder: null,
    aboutSleep: [],
  });

  return (
    <FormContext.Provider value={{ data, setData }}>
      {children}
    </FormContext.Provider>
  );
}
