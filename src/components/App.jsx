import Description from "./Description";
import Feedback from "./Feedback";
import Options from "./Options";
import Notification from "./Notification";
import { useState, useEffect } from "react";

const defaultFeedback = {
  good: 0,
  neutral: 0,
  bad: 0,
};

const getFeedback = () => {
  const savedFeedback = window.localStorage.getItem("feedback");
  if (savedFeedback !== null) {
    return JSON.parse(savedFeedback);
  }
  return defaultFeedback;
};

const App = () => {
  const [feedback, setFeedback] = useState(getFeedback());

  const { good, neutral, bad } = feedback;
  const totalFeedback = feedback.good + feedback.neutral + feedback.bad;
  const positiveFeedback =
    Math.round((feedback.good / totalFeedback) * 100) || 0;

  const updateFeedback = (feedbackType) => {
    setFeedback({
      ...feedback,
      [feedbackType]: feedback[feedbackType] + 1,
    });
  };

  useEffect(() => {
    window.localStorage.setItem("feedback", JSON.stringify(feedback));
  }, [feedback]);

  const resetFeedback = () => {
    setFeedback(defaultFeedback);
  };

  return (
    <div>
      <Description />
      <Options
        updateFeedback={updateFeedback}
        totalFeedback={totalFeedback}
        resetFeedback={resetFeedback}
      />
      {totalFeedback > 0 ? (
        <Feedback
          good={good}
          neutral={neutral}
          bad={bad}
          totalFeedback={totalFeedback}
          positiveFeedback={positiveFeedback}
        />
      ) : (
        <Notification />
      )}
    </div>
  );
};

export default App;
