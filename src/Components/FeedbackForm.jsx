import { useContext, useState } from "react";
import { Star } from "lucide-react";
import { addCollection } from "../hooks/useFireStore";
import { AuthContext } from "../Context/AuthContext";

export default function FeedbackForm() {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);

  let { user } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let data = {
      userID: user.uid,
      rating,
      comment,
    };
    await addCollection("feedbacks", data);

    setSubmitted(true);
  };

  return (
    <div className="max-w-md  flex flex-col items-center mx-auto p-6 bg-white rounded-2xl shadow-lg ">
      <h2 className="text-xl font-semibold mb-4">
        Tell your experience about this App.
      </h2>

      {submitted ? (
        <p className="text-green-600">Thank you for your feedback!</p>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="space-y-4 flex flex-col w-full"
        >
          {/* Rating stars */}
          <div className="flex space-x-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`w-6 h-6 cursor-pointer ${
                  (hover || rating) >= star
                    ? "text-yellow-400"
                    : "text-gray-300"
                }`}
                onMouseEnter={() => setHover(star)}
                onMouseLeave={() => setHover(0)}
                onClick={() => setRating(star)}
                fill={(hover || rating) >= star ? "currentColor" : "none"}
              />
            ))}
          </div>

          {/* Comment input */}
          <textarea
            className="w-full p-3 border border-pink-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            rows="4"
            placeholder="Tell us what you think..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></textarea>

          {/* Submit button */}
          <button
            type="submit"
            className={`border border-pink-300  px-4 py-2 rounded-lg hover:bg-pink-700 transition ml-auto ${
              !comment
                ? "bg-white cursor-not-allowed text-pink-500"
                : "bg-pink-600 text-white"
            }`}
          >
            Send
          </button>
        </form>
      )}
    </div>
  );
}
