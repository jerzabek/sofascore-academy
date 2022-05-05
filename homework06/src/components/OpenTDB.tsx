import styled from 'styled-components'
import './opentdb.css'
import { ResponsiveResolutions } from '../Responsive'
import MusicController from './MusicController'
import { CenteredContainer } from '../styledComponents/Container'
import Game from './Game'
import { useState } from 'react'
import { CustomButton } from './questions/Answer'

export const Background = styled.main`
  height 100%;
  overflow: auto;
`

export const Container = styled.div`
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

const FlexContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  
  @media ${ResponsiveResolutions.md} {
    flex-direction: column;
  }
`

const TitleContainer = styled(CenteredContainer)`
  background-image: url('/images/title.gif');
  background-position: center;
  background-size: contain;

  display: flex;
  flex-direction: column;

  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: auto;
`

const AppTitle = styled.h1`
  font-family: 'Neucha', cursive;
  font-size: 7em;
  text-shadow: -3px -3px 0 #fff, 3px -3px 0 #fff, -3px 3px 0 #fff, 3px 3px 0 #fff;
  
  animation: float 5s linear infinite;

  @keyframes float {
    0% {
      transform: translatey(0px) rotate(3deg);
    }
    25% {
      transform: translatey(-12.5px) rotate(4deg);
    }
    50% {
      transform: translatey(-25px) rotate(3deg);
    }
    75% {
      transform: translatey(-12.5px) rotate(-4deg);
    }
    100% {
      transform: translatey(0px) rotate(3deg);
    }
  }

  @media ${ResponsiveResolutions.md} {
    font-size: 4em;
  }
`

function OpenTDB() {
  const [readyToPlay, setReadyToPlay] = useState(false)

  function handleReadyButtonClick() {
    const audio = new Audio(require('../resources/sfx/click.mp3'))

    let playPromise = audio.play()

    if (playPromise !== undefined) {
      playPromise.then().catch((e) => { console.log('err in play', e) })
    }

    setReadyToPlay(true)
  }

  if (readyToPlay) {
    return (
      <Background className={'background-pattern'}>
        <Container>
          <Game />
        </Container>
      </Background>
    )
  }

  return (
    <Background className={'background-pattern'}>
      <Container>
        <FlexContainer style={{ alignItems: 'end' }}>
          <p style={{ marginBottom: '1em' }}>You can Play music by pressing the volume button on the right!</p>

          <MusicController sound={require('../resources/sfx/menu.mp3')} />
        </FlexContainer>

        <TitleContainer>
          <AppTitle>TriviaScore</AppTitle>
          <CustomButton
            backgroundColor='#DB3A34'
            foregroundColor='#FFFFFA'
            onClick={handleReadyButtonClick}>Play now!</CustomButton>
        </TitleContainer>
      </Container>
    </Background>
  )
}

export default OpenTDB