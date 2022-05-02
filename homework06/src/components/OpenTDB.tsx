import useSWR from 'swr'
import { OPENTDB_URL } from '../API'
import { QuestionsResponse } from '../model/Question'
import QuestionContext from '../context/QuestionContext'
import QuestionContainer from './QuestionContainer'
import styled from 'styled-components'

const CenteredContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Container = styled.div`
  margin: 0 auto;
  max-width: 1200px;
  padding: 3em 1.5em;

  @media (max-width: 1200px) {
    max-width: 900px;
  }
  
  @media (max-width: 900px) {
    max-width: 100%;
  }
`

const Divider = styled.hr`
  margin: 1em 0;
`

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
    return (<CenteredContainer>Loading...</CenteredContainer>)
  }

  if (!data) { // if (error)
    return (<CenteredContainer>An error has occurred...</CenteredContainer>)
  }

  return (
    <QuestionContext.Provider value={data.results}>
      <Container>
        <h1>Welcome to SofaTrivia!</h1>
        <p>Best trivia application in town.</p>
        <Divider />
        <QuestionContainer />
      </Container>
    </QuestionContext.Provider>
  )
}

export default OpenTDB