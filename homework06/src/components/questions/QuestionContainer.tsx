import { useContext, useState } from 'react'
import styled from 'styled-components'
import QuestionContext from '../../context/QuestionContext'
import { CenteredContainer } from '../../styledComponents/Container'
import { CustomButton } from './Answer'
import QuestionComponent from './Question'

const Modal = styled(CenteredContainer)`
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  padding: 3em;
  color: #000;
  border-radius: 0.4em;
  max-width: 50%;
  max-height: 300px;

  background-image: url('/images/lost.gif');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;

  display: flex;
  flex-direction: column;
`

const ModalTitle = styled.span`
  background-color: #FFFFFFDD;
  border-radius: 0.4em;
  padding: 1em 1.4em;
`

const ModalButtonContainer = styled.div`
  max-width: 200px;
`

function QuestionContainer() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [modal, setModal] = useState<string>()

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
    setModal("You've failed! Game over.")
  }

  return (
    <div>
      <p>Current question: {currentQuestion + 1}/{questionsContext.length}</p>

      <svg width="100%" height="1em" style={{ margin: '1em 0' }}>
        <rect fill="#38b000" x={0} y={0} width={((currentQuestion + 1) / questionsContext.length) * 100 + "%"} height={100} />
        <rect fillOpacity={0} stroke="#006400" strokeWidth={3} strokeOpacity={1.0} x={0} y={0} width={'100%'} height={'1em'} />
      </svg>

      <QuestionComponent
        correctGuess={nextQuestion}
        wrongGuess={failure}
        question={questionsContext[currentQuestion]} />
      {
        modal && (
          <Modal>
            <ModalTitle>{modal}</ModalTitle>

            <ModalButtonContainer>
              <CustomButton
                backgroundColor='#DB3A34'
                foregroundColor='#FFFFFA'
                onClick={() => window.location.reload()}>Back</CustomButton>
            </ModalButtonContainer>
          </Modal>
        )
      }
    </div>
  )
}

export default QuestionContainer