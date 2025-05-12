import { useState } from "react";

const TestQuizCard = ({ onComplete, points }) => {
  const [selected, setSelected] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const question = {
    question: "What letter comes after A?",
    options: ["B", "C", "D", "Z"],
    answer: "B",
  };

  const handleSubmit = () => {
    const isCorrect = selected === question.answer;
    setSubmitted(true);
    onComplete(isCorrect ? points : 0);
  };

  return (
    <div className="p-6 max-w-md mx-auto space-y-4">
      <h2 className="text-2xl font-bold">Test Quiz</h2>
      <div className="p-4 border rounded-md space-y-2">
        <p className="font-semibold">{question.question}</p>
        {question.options.map((option) => (
          <label key={option} className="block">
            <input
              type="radio"
              name="quiz"
              value={option}
              disabled={submitted}
              checked={selected === option}
              onChange={() => setSelected(option)}
            />{" "}
            {option}
          </label>
        ))}
      </div>

      {!submitted && (
        <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-primary text-white rounded-md"
          disabled={selected === null}
        >
          Submit
        </button>
      )}

      {submitted && (
        <p className="text-lg font-medium">
          {selected === question.answer ? "✅ Correct!" : "❌ Incorrect."}
        </p>
      )}
    </div>
  );
};

export default TestQuizCard;
