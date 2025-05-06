import { useFormData } from "../../Context/FormContext";

import { useNavigate } from "react-router-dom";

export default function Naming() {
  const { data, setData } = useFormData();
  // let [email, setEmail] = useState("");
  // let [password, setPassword] = useState("");

  let navigate = useNavigate();

  return (
    <div className="flex flex-col">
      <div className="mt-3 ms-5">
        <p className="text-xl font-semibold">What shall I call you?</p>
        <p className="text-sm">Write your full name here</p>
      </div>
      <div className="flex flex-col items-center justify-center gap-3 h-115">
        <div>
          <input
            type="text"
            className="outline outline-none  caret-pink-800 py-3 ps-4 rounded-xl bg-pink-50 "
            placeholder="Enter Your Name"
            onChange={(e) => setData({ ...data, name: e.target.value })}
            value={data.name}
          />
        </div>
      </div>
      <button
        className={`rounded-full py-4 px-27  text-center ${
          data.name
            ? "bg-pink-500 text-white"
            : "bg-gray-50 text-gray-400 cursor-not-allowed"
        }`}
        onClick={() => {
          navigate("/periodlength");
        }}
      >
        That's me
      </button>
    </div>
  );
}
