import { QuestionPropTypes } from '../model/Question'

// OpenTDB Returns questins with HTML Entities, we use this function to decode them
function decodeHtml(html: string) {
  var txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
}

function Question({ question }: QuestionPropTypes) {
  // We sort the array to make sure the order of the answers stays consistent but so that the correct answer isn't always the last
  const answers = [...question.incorrect_answers, question.correct_answer].sort()

  return (
    <div>
      <h1>{decodeHtml(question.question)}</h1>
      <p>{question.difficulty} - {question.category} - {question.type}</p>

      <ul>
        {answers.map((value, index) =>
          <li key={index}>{value}</li>
        )}
      </ul>
    </div>
  )
}

export default Question