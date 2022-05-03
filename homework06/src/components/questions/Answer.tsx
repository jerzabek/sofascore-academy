import styled from "styled-components"
import { AnswerProps } from "../../model/Answer"
import { ResponsiveResolutions } from "../../Responsive"

interface AnswerOptionProps {
  backgroundColor: string,
  foregroundColor: string
}

export const CustomButton = styled.div<AnswerOptionProps>`
  flex: 1;
  flex-basis: 100%;
  text-align: center;

  background-color: ${props => props.backgroundColor};
  color: ${props => props.foregroundColor};

  margin: 1em;
  padding: 2em 4em;
  border-radius: 0.4em;
  
  display: flex;
  justify-content: center;
  align-items: center;
  
  font-size: 1.2em;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
  transition: transform 0.05s linear, box-shadow 0.05s linear;

  &:hover {
    cursor: pointer;
    transform: translate(-0.2em, -0.2em);
    box-shadow: rgba(0, 0, 0, 0.1) 0px 20px 25px -5px, rgba(0, 0, 0, 0.04) 0px 10px 10px -5px;
    filter: contrast(125%);
    transition: transform 0.05s linear, box-shadow 0.05s linear;

  }

  &:active {
    filter: contrast(125%) brightness(85%);
    transform: translate(-0em, -0em);
    transition: transform 0.05s linear, box-shadow 0.05s linear;
  }
  
  @media ${ResponsiveResolutions.md} {
    margin-bottom: 1em;
  }
`

function Answer({ text, backgroundColor, foregroundColor, onClick }: AnswerProps) {

  function clicked() {
    const audio = new Audio(require('../../resources/sfx/click.mp3'))

    let playPromise = audio.play()

    if (playPromise !== undefined) {
      playPromise.then().catch((e) => { console.log('err in play', e) })
    }

    onClick()
  }

  return (
    <CustomButton onClick={clicked} foregroundColor={foregroundColor} backgroundColor={backgroundColor}>{text}</CustomButton>
  )
}

export default Answer