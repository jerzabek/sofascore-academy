// OpenTDB question format
export interface Question {
  category: string,
  type: string,
  difficulty: string,
  question: string,
  correct_answer: string,
  incorrect_answers: Array<string>
}

export interface QuestionsResponse {
  results: Question[], 
  response_code: number
}

export interface QuestionPropTypes {
  question: Question
}