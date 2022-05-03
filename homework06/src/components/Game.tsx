import useSWR from 'swr'
import { OPENTDB_URL } from '../API'
import { QuestionsResponse } from '../model/Question'
import QuestionContext from '../context/QuestionContext'
import QuestionContainer from './questions/QuestionContainer'
import styled from 'styled-components'
import './opentdb.css'
import { ResponsiveResolutions } from '../Responsive'
import { CenteredContainer } from '../styledComponents/Container'
import MusicController from './MusicController'
import { Background, Container } from './OpenTDB'

const FlexContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  
  @media ${ResponsiveResolutions.md} {
    flex-direction: column;
  }
`

function Game() {
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
        <CenteredContainer>An error has occurred... Could not load questions :/</CenteredContainer>
      </Background>
    )
  }

  return (
    <QuestionContext.Provider value={data.results}>
      <Container>
        <FlexContainer style={{ justifyContent: 'end' }}>
          <MusicController autoplay sound={require('../resources/sfx/background.mp3')} />
        </FlexContainer>

        <QuestionContainer />
      </Container>
    </QuestionContext.Provider>
  )
}

export default Game