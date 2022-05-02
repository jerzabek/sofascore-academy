import { useContext, useState } from 'react';
import QuestionContext from '../context/QuestionContext';
import QuestionComponent from './Question'

function QuestionContainer() {
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const questionsContext = useContext(QuestionContext);

  // We use Math.max & min function to make sure index (currentQuestion) stays within array bounds (questionContext.length)
  function previousQuestion() {
    setCurrentQuestion(curr => Math.max(0, curr - 1))
  }

  function nextQuestion() {
    setCurrentQuestion(curr => Math.min(questionsContext.length, curr + 1))
  }

  return (
    <div>
      <p>Num of questions: {questionsContext.length}</p>
      <QuestionComponent question={questionsContext[currentQuestion]} />
      <button onClick={previousQuestion}>Previous</button>
      <button onClick={nextQuestion}>Next</button>
    </div>
  )
}

export default QuestionContainer