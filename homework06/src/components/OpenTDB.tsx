import useSWR from 'swr'
import { OPENTDB_URL } from '../API'
import { QuestionsResponse } from '../model/Question'
import QuestionContext from '../context/QuestionContext'
import QuestionContainer from './QuestionContainer'

function OpenTDB() {
  // Loading the questions
  const { data, error } = useSWR<QuestionsResponse>(OPENTDB_URL, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    refreshWhenOffline: false,
    refreshWhenHidden: false,
    refreshInterval: 0
  })

  if (!data && !error) {
    return (<div>Loading...</div>)
  }

  if (!data) { // if (error)
    return (<div>An error has occurred...</div>)
  }

  return (
    <QuestionContext.Provider value={data.results}>
      <h1>Welcome!</h1>
      <QuestionContainer />
    </QuestionContext.Provider>
  )
}

export default OpenTDB