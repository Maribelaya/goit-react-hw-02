import Description from "./Description";
import Feedback from "./Feedback";
import Options from "./Options";
import { useState } from "react";
import { useEffect } from "react";

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
};

const { good, neutral, bad } = feedback;
const totalFeedback = good + neutral + bad;
count positiveFeedback = Math.round((good / totalFeedback) * 100);

const updateFeedback = (feedbackType) => {
  setFeedback({
    ...feedback,
    [feedbackType]: feedback[feedbackType] + 1,
  });
};
useEffect(() => {
  localStorage.setItem("feedback", JSON.stringify(feedback));
}, [feedback]);

return (
  <div>
    <Description />
    <Options updateFeedback={updateFeedback} totalFeedback={totalFeedback} />
    <Feedback
    good = {good}
     />
    <Notification />
  </div>
);

export default App;

// {totalFeedback > 0 ? <Feedback/> : <Notification/>}
