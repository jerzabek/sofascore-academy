import { useContext, useState } from 'react';
import styled from 'styled-components';
import QuestionContext from '../../context/QuestionContext';
import QuestionComponent from './Question'

const PaginationButton = styled.button`
`

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
      <PaginationButton onClick={previousQuestion}>Previous</PaginationButton>
      <PaginationButton onClick={nextQuestion}>Next</PaginationButton>

      <QuestionComponent question={questionsContext[currentQuestion]} />
    </div>
  )
}

export default QuestionContainer