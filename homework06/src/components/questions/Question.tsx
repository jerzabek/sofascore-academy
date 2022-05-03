import { ReactElement, useEffect, useState } from 'react';
import styled from 'styled-components';
import { QuestionPropTypes } from '../../model/Question'
import { ResponsiveResolutions } from '../../Responsive';
import Answer from './Answer';

const answerColors = [
  { background: '#177E89', foreground: '#FFFFFA' },
  { background: '#084C61', foreground: '#FFFFFA' },
  { background: '#DB3A34', foreground: '#FFFFFA' },
  { background: '#FFC857', foreground: '#040000' },
  { background: '#323031', foreground: '#FFFFFA' }
]

const QuestionTitle = styled.h2`
  text-align: center;
  margin: 2em 0 1.5em;
`

const QuestionDetails = styled.p`
  opacity: 0.6;
  margin-bottom: 2em;
`

const AnswerContainer = styled.div`
  display: flex;
  
  @media ${ResponsiveResolutions.lg} {
    flex-wrap: wrap;
  }
`

function Question({ question, correctGuess, wrongGuess }: QuestionPropTypes) {
  const [elems, setElemes] = useState<ReactElement[]>()

  function userAnswered(answer: string) {
    if (answer === question.correct_answer) {
      correctGuess()
    } else {
      wrongGuess()
    }
  }

  useEffect(() => {
    // We sort the array to make sure the order of the answers stays consistent but so that the correct answer isn't always the last
    const answers = [...question.incorrect_answers, question.correct_answer].sort()
    let colors = [...answerColors]

    setElemes(answers.map((answerText, index) => {
      // This is so we don't use the same color on multiple answers
      // We pick a random index from the array, remove it and extract the background and foreground colors from it
      let colorIndex = Math.floor(Math.random() * colors.length)
      let color = colors.splice(colorIndex, 1)[0] || answerColors[0];

      return (
        <Answer key={index}
          onClick={() => userAnswered(answerText)}
          backgroundColor={color.background}
          foregroundColor={color.foreground}
          text={decodeURIComponent(answerText)} />
      )
    }))

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [question])

  // OpenTDB Returns questins encoded in URL encoding (RFC 3986) so we use decodeURIComponent() function to reverse that
  return (
    <div>
      <QuestionDetails>Category: {decodeURIComponent(question.category)}<br />Difficulty: {decodeURIComponent(question.difficulty)}</QuestionDetails>
      <QuestionTitle>{decodeURIComponent(question.question)}</QuestionTitle>

      <AnswerContainer>
        {elems}
      </AnswerContainer>
    </div>
  )
}

export default Question