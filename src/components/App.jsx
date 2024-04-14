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
// об'явлення функції отримання feedback з localStorage
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
  const totalFeedback = good + neutral + bad;
  const positiveFeedback = Math.round((good / totalFeedback) * 100);

  const updateFeedback = (feedbackType) => {
    setFeedback({
      ...feedback,
      [feedbackType]: feedback[feedbackType] + 1,
    });
  };

  // збереження у localStorage за допомогою useEffect
  useEffect(() => {
    window.localStorage.setItem("feedback", JSON.stringify(feedback));
  }, [feedback]);

  return (
    <div>
      <Description />
      <Options updateFeedback={updateFeedback} totalFeedback={totalFeedback} />
      {totalFeedback > 0 ? (
        <Feedback
          good={good}
          neutral={neutral}
          bad={bad}
          total={totalFeedback}
          positive={positiveFeedback}
        />
      ) : (
        <Notification />
      )}
    </div>
  );
};

export default App;
