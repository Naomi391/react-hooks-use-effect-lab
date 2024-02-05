import React, { useState, useEffect } from "react";

function Question({ question, onAnswered }) {
  const [timeRemaining, setTimeRemaining] = useState(10);

  useEffect(() => {
    let timerId;

    // Decrease timeRemaining every second
    const timerFunction = () => {
      setTimeRemaining((prevTime) => prevTime - 1);
    };

    // Set up the timer and cleanup function
    if (timeRemaining > 0) {
      timerId = setTimeout(timerFunction, 1000);
    } else {
      // When time runs out, reset the timer and trigger onAnswered with false
      setTimeRemaining(10);
      onAnswered(false);
    }

    return () => {
      // Cleanup: clear the timeout to avoid memory leaks
      clearTimeout(timerId);
    };
  }, [timeRemaining, onAnswered]);

  function handleAnswer(isCorrect) {
    setTimeRemaining(10);
    onAnswered(isCorrect);
  }

  const { id, prompt, answers, correctIndex } = question;

  return (
    <>
      <h1>Question {id}</h1>
      <h3>{prompt}</h3>
      {answers.map((answer, index) => {
        const isCorrect = index === correctIndex;
        return (
          <button key={answer} onClick={() => handleAnswer(isCorrect)}>
            {answer}
          </button>
        );
      })}
      <h5>{timeRemaining} seconds remaining</h5>
    </>
  );
}

export default Question;