import { useState } from "react";

function ExamPage() {
    const questions = [
        {
            question: "Which hook is used for state management?",
            options: ["useEffect", "useState", "useRouter", "useMemo"],
            answer: "useState",
        },
        {
            question: "Which method is used to render array data?",
            options: ["filter()", "reduce()", "map()", "push()"],
            answer: "map()",
        },
        {
            question: "Which library is used for routing?",
            options: ["Axios", "React Router", "Redux", "Firebase"],
            answer: "React Router",
        },
    ];

    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [submitted, setSubmitted] = useState(false);

    const handleAnswer = (index, option) => {
        setSelectedAnswers({
            ...selectedAnswers,
            [index]: option,
        });
    };

    const score = questions.reduce((total, q, index) => {
        return selectedAnswers[index] === q.answer ? total + 1 : total;
    }, 0);

    return (
        <div className="exam-page">
            <div className="exam-header">
                <h1>Online Examination System</h1>
                <p>MCQ questions, score calculation and result dashboard</p>
            </div>

            <div className="exam-box">
                {questions.map((q, index) => (
                    <div className="question-card" key={index}>
                        <h3>
                            {index + 1}. {q.question}
                        </h3>

                        {q.options.map((option) => (
                            <label key={option}>
                                <input
                                    type="radio"
                                    name={`question-${index}`}
                                    value={option}
                                    onChange={() => handleAnswer(index, option)}
                                />
                                {option}
                            </label>
                        ))}
                    </div>
                ))}

                <button className="submit-exam-btn" onClick={() => setSubmitted(true)}>
                    Submit Exam
                </button>

                {submitted && (
                    <div className="result-box">
                        <h2>Result</h2>
                        <p>
                            Score: {score} / {questions.length}
                        </p>
                        <p>
                            Percentage: {Math.round((score / questions.length) * 100)}%
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ExamPage;