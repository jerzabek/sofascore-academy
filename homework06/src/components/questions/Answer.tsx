import { AnswerProps } from "../../model/Answer"
import Button from "../Button"

function Answer({ text, backgroundColor, foregroundColor, onClick }: AnswerProps) {
  return (
    <Button
      text={decodeURIComponent(text)}
      backgroundColor={backgroundColor}
      foregroundColor={foregroundColor}
      handleClick={onClick}
    />
  )
}

export default Answer