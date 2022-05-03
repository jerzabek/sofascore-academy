import { useContext, useState } from 'react'
import styled from 'styled-components'
import QuestionContext from '../../context/QuestionContext'
import { CenteredContainer } from '../../styledComponents/Container'
import QuestionComponent from './Question'

const FixedCenteredContainer = styled(CenteredContainer)`
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`

function QuestionContainer() {
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const questionsContext = useContext(QuestionContext);

  function nextQuestion() {
    if (currentQuestion === questionsContext.length - 1) {
      // User answered all questions - victory
      alert('you win')
      return;
    }

    setCurrentQuestion(curr => Math.min(questionsContext.length - 1, curr + 1))
  }

  function failure() {
    // alert('game over')
  }

  return (
    <div>
      <p>Current question: {currentQuestion + 1}/{questionsContext.length}</p>
      <QuestionComponent
        correctGuess={nextQuestion}
        wrongGuess={failure}
        question={questionsContext[currentQuestion]} />
      {
        false && (
          <FixedCenteredContainer>
          </FixedCenteredContainer>
        )
      }
    </div>
  )
}

export default QuestionContainer