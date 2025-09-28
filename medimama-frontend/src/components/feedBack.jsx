import React, { useState, useEffect, useRef } from "react";

const Feedback = () => {
  const [showPopup, setShowPopup] = useState(true);
  const [feedbacks, setFeedbacks] = useState([]);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const feedbackSectionRef = useRef(null);

  // Close popup after 5 seconds if ignored
  
  {/*useEffect(() => {
    const timer = setTimeout(() => setShowPopup(false), 5000);
    return () => clearTimeout(timer);
  }, []);
  */}

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    if (rating === 0 || comment.trim() === "") return alert("Please provide both rating and feedback!");

    const newFeedback = { rating, comment, date: new Date().toLocaleString() };
    setFeedbacks([newFeedback, ...feedbacks]); // add new feedback on top
    setRating(0);
    setComment("");
  };

  const scrollToFeedback = () => {
    setShowPopup(false);
    feedbackSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="relative p-6 bg-gray-50 min-h-screen">
      {/* Popup */}
     {/* {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-40 z-50">
          <div className="bg-white rounded-lg p-6 shadow-xl w-96 text-center">
            <h2 className="text-xl font-bold text-green-700 mb-4">
              Enjoy using our app? 🌟
            </h2>
            <p className="text-gray-600 mb-6">
              We’d love to hear your feedback!
            </p>
            <button
              onClick={scrollToFeedback}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
              Give Feedback
            </button>
          </div>
        </div>
      )}
     */}

     
      {/* Feedback Section */}
      <div ref={feedbackSectionRef} className="mt-12">
        <h2 className="text-2xl font-bold text-green-700 mb-4">Your Feedback</h2>
        <form
          onSubmit={handleFeedbackSubmit}
          className="bg-white p-6 rounded-lg shadow-md mb-8"
        >
          {/* Star Rating */}
          <div className="flex gap-2 mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                onClick={() => setRating(star)}
                className={`cursor-pointer text-2xl ${
                  star <= rating ? "text-yellow-400" : "text-gray-300"
                }`}
              >
                ★
              </span>
            ))}
          </div>

          {/* Text Input */}
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write your feedback..."
            className="w-full p-3 border rounded-lg mb-4 focus:ring-2 focus:ring-green-500 outline-none"
          />

          <button
            type="submit"
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            Submit
          </button>
        </form>

        {/* Display Feedbacks */}
        {feedbacks.length > 0 && (
          <div className="space-y-4">
            {feedbacks.map((fb, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-lg shadow-md border"
              >
                <div className="flex items-center gap-2 mb-2">
                  {[...Array(fb.rating)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-lg">★</span>
                  ))}
                  {[...Array(5 - fb.rating)].map((_, i) => (
                    <span key={i} className="text-gray-300 text-lg">★</span>
                  ))}
                </div>
                <p className="text-gray-700">{fb.comment}</p>
                <small className="text-gray-400 text-sm">{fb.date}</small>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Feedback;
