import { useState } from "react";
import useSignin from "../../hooks/useSignin";
import { Link, useNavigate } from "react-router-dom";

export default function Naming() {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let { error, SignIn } = useSignin();
  let navigate = useNavigate();

  let handleClick = async () => {
    let result = await SignIn(email, password);
    if (result.success) {
      navigate("/");
    } else {
      return;
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="mt-9 ms-5 text-center">
        <p className="text-xl font-semibold ">Please Log In!</p>
        <p className="text-sm">
          Are you new user?
          <span className="text-pink-500 text-xs hover:text-blue-500 ms-3">
            <Link to="/register">create an account</Link>
          </span>
        </p>
      </div>
      <div className="flex flex-col items-center justify-center gap-3 h-110 w-100">
        <input
          type="email"
          className="outline outline-none  caret-pink-800 py-3 ps-4 rounded-xl bg-pink-50 w-[75%]"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />

        <input
          type="password"
          className="outline outline-none caret-pink-800 py-3 ps-4 rounded-xl bg-pink-50 w-[75%]"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        {error && <p className="text-red-500 text-xs italic mt-3">{error}</p>}
      </div>
      <button
        className={`rounded-full py-4 px-27  text-center ${
          email && password
            ? "bg-pink-500 text-white"
            : "bg-gray-50 text-gray-400 cursor-not-allowed"
        }`}
        onClick={handleClick}
      >
        That's me
      </button>
    </div>
  );
}
