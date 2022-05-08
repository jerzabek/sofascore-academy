import { ReactNode, useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import QuestionContext from '../../context/QuestionContext'
import { Question } from '../../model/Question'
import { ResponsiveResolutions } from '../../Responsive'
import { CenteredContainer } from '../../styledComponents/Container'
import Button from '../Button'
import QuestionComponent from './Question'

interface ModalProps {
  backgroundUrl: string
}

const Modal = styled(CenteredContainer) <ModalProps>`
  z-index: 1000;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  padding: 3em;
  color: #000;
  border-radius: 0.4em;
  max-width: 50%;
  max-height: 300px;

  background-color: #000;
  background-image: url('${props => props.backgroundUrl}');
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

const CheatsContainer = styled.div`
  font-size: 0.9em;
  margin-top: 5em;

  @media ${ResponsiveResolutions.lg} {
    text-align: center;
  }
`

const FlexContainer = styled.div`
  display: flex;
  flex-direction: row;

  @media ${ResponsiveResolutions.lg} {
    flex-wrap: wrap;
  }
`

const AudienceVoteContainer = styled.div`
  font-size: 1.2em;
  padding-top: 0.4em;
`

interface AudienceVoteProps {
  percentage: number
}

const AudienceVote = styled.p<AudienceVoteProps>`
  background-color: ${({percentage}) => `rgb(124,181,24,${percentage})`};
  margin-bottom: 0.4em;
`

interface ModalData {
  text: string | ReactNode,
  backgroundUrl: string,
  callback: Function
}

interface VotePercentageType {
  answer: string,
  vote: number
}

function QuestionContainer() {
  const questionsContext = useContext(QuestionContext)

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [currentQuestion, setCurrentQuestion] = useState<Question>()
  const [modal, setModal] = useState<ModalData>()

  const [isFiftyFiftyAvailable, setFiftyFiftyAvailable] = useState(true)
  const [isAudienceVoteAvailable, setAudienceVoteAvailable] = useState(true)
  const [isTelephoneAvailable, setTelephoneAvailable] = useState(true)

  useEffect(() => {
    setCurrentQuestion(questionsContext[currentQuestionIndex])
  }, [questionsContext, currentQuestionIndex])

  function nextQuestion() {
    if (currentQuestionIndex === questionsContext.length - 1) {
      // User answered all questions - victory
      setModal({ text: "Victory! Congratulations.", backgroundUrl: '/images/success.webp', callback: () => window.location.reload() })
      return;
    }

    // Math.min used to prevent index out of bounds
    setCurrentQuestionIndex(curr => Math.min(questionsContext.length - 1, curr + 1))
  }

  function failure() {
    setModal({ text: "You've failed! Game over.", backgroundUrl: '/images/lost.gif', callback: () => window.location.reload() })
  }

  function useFiftyFifty() {
    if (!currentQuestion) return;

    // Out of the incorrect answers we remove all except one
    let numOfIncorrectAnswers = currentQuestion.incorrect_answers.length
    let randomIncorrectAnswer = currentQuestion.incorrect_answers[Math.floor(Math.random() * numOfIncorrectAnswers)]

    setCurrentQuestion({ ...questionsContext[currentQuestionIndex], incorrect_answers: [randomIncorrectAnswer] })
    setFiftyFiftyAvailable(false)
  }

  function useAudienceVote() {
    if (!currentQuestion) return;
    let percentages: number[] = []

    // We get as many random numbers in the range [0, 100] as there are answers
    let answers = [...currentQuestion.incorrect_answers, currentQuestion.correct_answer]

    let max = 100
    for(let i = 0; i < answers.length; i++) {
      let current = Math.random() * max
      percentages.push(current)
      max = max - current
    }
    // The sum of the numbers will never go above 100, but it may be below 100
    // We sort the percentages ascending, meaning the highest percentage will be matched with the last answer (the correct answer)
    // There is a bit of uncertainty and randomness involved, the highest voted answer won't always be correct (i don't know why)
    let votePercentages: VotePercentageType[] = percentages.sort().map((percentage, index) => {
      return {
        answer: answers[index],
        vote: percentage
      }
    })

    setModal({
      text: (
        <>
          <p>The audience has cast their vote, this is what they chose:</p>
          <AudienceVoteContainer>
            {
              votePercentages.map(({ answer, vote }) =>
                <AudienceVote key={answer} percentage={vote/100}><b>{decodeURIComponent(answer)}</b>: {vote.toFixed(2)}%</AudienceVote>
              )
            }
          </AudienceVoteContainer>
        </>
      ),
      backgroundUrl: '/images/telephone.webp',
      callback: () => setModal(undefined)
    })

    setAudienceVoteAvailable(false)
  }

  function useTelephone() {
    if (!currentQuestion) return;

    let chosenAnswer = currentQuestion.correct_answer

    // When user uses telephone they "call a close friend or family to ask for the answer".
    // There will be a 30% chance that the answer they give is incorrect.
    if (Math.random() < 0.3) {
      let incorrectAnswerIndex = Math.floor(Math.random() * currentQuestion.incorrect_answers.length)

      chosenAnswer = currentQuestion.incorrect_answers[incorrectAnswerIndex]
    }

    setModal({
      text: (<span>You called your friend! They think that <b>{decodeURIComponent(chosenAnswer)}</b> is the correct answer. Do you agree? ;)</span>),
      backgroundUrl: '/images/telephone.webp',
      callback: () => setModal(undefined)
    })

    setTelephoneAvailable(false)
  }

  return (
    <div>
      <p>Current question: {currentQuestionIndex + 1}/{questionsContext.length}</p>

      <svg width="100%" height="1em" style={{ margin: '1em 0' }}>
        <rect fill="#38b000" x={0} y={0} width={((currentQuestionIndex + 1) / questionsContext.length) * 100 + "%"} height={100} />
        <rect fillOpacity={0} stroke="#006400" strokeWidth={3} strokeOpacity={1.0} x={0} y={0} width={'100%'} height={'1em'} />
      </svg>

      {
        currentQuestion && (
          <QuestionComponent
            correctGuess={nextQuestion}
            wrongGuess={failure}
            question={currentQuestion} />
        )
      }

      <CheatsContainer>
        <p>If you think you are stuck you can get help:</p>
        <FlexContainer>
          <Button
            small
            disabled={!isFiftyFiftyAvailable || currentQuestion?.type === 'boolean'}
            backgroundColor='#134611'
            foregroundColor='#FFFFFA'
            text='50/50'
            handleClick={useFiftyFifty}
          />
          <Button
            small
            disabled={!isAudienceVoteAvailable}
            backgroundColor='#3e8914'
            foregroundColor='#FFFFFA'
            text='Audience vote'
            handleClick={useAudienceVote}
          />
          <Button
            small
            disabled={!isTelephoneAvailable}
            backgroundColor='#3da35d'
            foregroundColor='#FFFFFA'
            text='Telephone'
            handleClick={useTelephone}
          />
        </FlexContainer>
      </CheatsContainer>


      {
        modal && (
          <Modal backgroundUrl={modal.backgroundUrl}>
            <ModalTitle>{modal.text}</ModalTitle>

            <ModalButtonContainer>
              <Button
                text='Back'
                backgroundColor='#DB3A34'
                foregroundColor='#FFFFFA'
                handleClick={modal.callback} />
            </ModalButtonContainer>
          </Modal>
        )
      }
    </div>
  )
}

export default QuestionContainer