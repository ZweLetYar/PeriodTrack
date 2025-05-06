import { useNavigate } from "react-router-dom";

export default function LogButton() {
  const navigate = useNavigate();

  return (
    <div className="w-full text-center my-5">
      <button
        className="bg-pink-500 hover:bg-pink-600 transition-colors duration-200 text-white rounded-full px-5 py-2 md:px-6 md:py-3 text-sm md:text-base mx-auto flex items-center gap-2 shadow-md"
        onClick={() => navigate("/logperiodform")}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5 md:w-6 md:h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
        <span className="font-medium">Log Period</span>
      </button>
    </div>
  );
}
