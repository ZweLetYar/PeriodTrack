import { useFormData } from "../../Context/FormContext";

import { useNavigate } from "react-router-dom";

export default function Naming() {
  const { data, setData } = useFormData();
  // let [email, setEmail] = useState("");
  // let [password, setPassword] = useState("");

  let navigate = useNavigate();

  return (
    <div className="flex flex-col items-center">
      <p className="text-xl font-semibold mt-9 ms-5 text-center">Register!</p>

      <div className="flex flex-col items-center justify-center gap-3 h-115 w-100">
        <input
          type="email"
          className="outline outline-none  caret-pink-800 py-3 ps-4 rounded-xl bg-pink-50 w-[75%]"
          placeholder="Email"
          onChange={(e) => setData({ ...data, email: e.target.value })}
          value={data.email}
        />

        <input
          type="password"
          className="outline outline-none caret-pink-800 py-3 ps-4 rounded-xl bg-pink-50 w-[75%]"
          placeholder="Password"
          onChange={(e) => setData({ ...data, password: e.target.value })}
          value={data.password}
        />
      </div>
      <button
        className={`rounded-full py-4 px-30 text-center ${
          data.email && data.password
            ? "bg-pink-500 text-white"
            : "bg-gray-50 text-gray-400 cursor-not-allowed"
        }`}
        onClick={() => {
          navigate("/naming");
        }}
      >
        continue
      </button>
    </div>
  );
}
