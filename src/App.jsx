import { useContext } from "react";
import "./index.css";
import AppRoutes from "./router/AppRoutes";
import { BrowserRouter } from "react-router-dom";
import { AuthContext } from "./Context/AuthContext";

function App() {
  let { AuthReady } = useContext(AuthContext);

  return (
    AuthReady && (
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    )
  );
}

export default App;
