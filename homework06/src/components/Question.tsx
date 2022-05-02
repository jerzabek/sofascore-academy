import styled from 'styled-components';
import { QuestionPropTypes } from '../model/Question'

// OpenTDB Returns questins with HTML Entities, we use this function to decode them
function decodeHtml(html: string) {
  var txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
}

const QuestionTitle = styled.p`
  margin-bottom: 0.5em;
`

const QuestionDetails = styled.p`
  opacity: 0.6;
  margin-bottom: 2em;
`

const AnswerContainer = styled.div`
  display: flex;
  
  @media (max-width: 900px) {
    flex-wrap: wrap;
  }
`

const AnswerOption = styled.div`
  flex: 1;
  flex-basis: 100%;
  text-align: center;

  &:hover {
    cursor: pointer;
  }
  
  @media (max-width: 900px) {
    margin-bottom: 1em;
  }
`

function Question({ question }: QuestionPropTypes) {
  // We sort the array to make sure the order of the answers stays consistent but so that the correct answer isn't always the last
  const answers = [...question.incorrect_answers, question.correct_answer].sort()

  return (
    <div>
      <QuestionTitle>{decodeHtml(question.question)}</QuestionTitle>
      <QuestionDetails>Category: {question.category}<br />Difficulty: {question.difficulty}</QuestionDetails>

      <AnswerContainer>
        {answers.map((value, index) =>
          <AnswerOption key={index}>{value}</AnswerOption>
        )}
      </AnswerContainer>
    </div>
  )
}

export default Question