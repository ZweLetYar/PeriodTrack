import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { FormProvider } from "./Context/FormContext.jsx";
import { AuthContextProvider } from "./Context/AuthContext.jsx";
import { ThemeContextProvider } from "./Context/ThemeContext.jsx";
import { CycleContextProvider } from "./Context/CycleContext.jsx";

createRoot(document.getElementById("root")).render(
  <AuthContextProvider>
    <FormProvider>
      <ThemeContextProvider>
        <CycleContextProvider>
          <App />
        </CycleContextProvider>
      </ThemeContextProvider>
    </FormProvider>
  </AuthContextProvider>
);
