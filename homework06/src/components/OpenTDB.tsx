import useSWR from 'swr'
import { OPENTDB_URL } from '../API'
import { QuestionsResponse } from '../model/Question'
import QuestionContext from '../context/QuestionContext'
import QuestionContainer from './questions/QuestionContainer'
import styled from 'styled-components'
import './opentdb.css'
import { ResponsiveResolutions } from '../Responsive'

const Background = styled.main`
  height 100%;
  overflow: auto;
`

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

  @media ${ResponsiveResolutions.lg} {
    max-width: 900px;
  }
  
  @media ${ResponsiveResolutions.md} {
    max-width: 100%;
  }
`

function OpenTDB() {
  // Loading the questions
  // We "missuse" SWR by setting all default settings to ensure we only load the questions once at mount
  const { data, error } = useSWR<QuestionsResponse>(OPENTDB_URL, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    refreshWhenOffline: false,
    refreshWhenHidden: false,
    refreshInterval: 0
  })

  if (!data && !error) {
    return (
      <Background className={'background-pattern'}>
        <CenteredContainer>Loading...</CenteredContainer>
      </Background>
    )
  }

  if (!data) { // if (error)
    return (
      <Background className={'background-pattern'}>
        <CenteredContainer>An error has occurred...</CenteredContainer>
      </Background>
    )
  }

  return (
    <QuestionContext.Provider value={data.results}>
      <Background className={'background-pattern'}>
        <Container>
          <h1>Welcome to SofaTrivia!</h1>
          <p style={{ marginBottom: '1em' }}>Best trivia application in town.</p>

          <QuestionContainer />
        </Container>
      </Background>
    </QuestionContext.Provider>
  )
}

export default OpenTDB