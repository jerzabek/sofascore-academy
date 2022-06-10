import { useEffect, useMemo, useState } from 'react'
import VolumeImage from '../resources/gfx/volume.png'
import MuteImage from '../resources/gfx/mute.png'
import styled from 'styled-components'
import { MusicControllerProps } from '../model/MusicController'

const SoundIcon = styled.img`
  width: 3em;
  height: 3em;

  filter: drop-shadow(2px 3px 2px rgb(0 0 0 / 0.4));
  transition: all 0.05s linear;

  &:hover {
    cursor: pointer;
    transform: translate(-0.1em, -0.1em);
    filter: drop-shadow(3px 4px 3px rgb(0 0 0 / 0.4));
    transition: all 0.05s linear;

  }

  &:active {
    filter: drop-shadow(3px 5px 3px rgb(0 0 0 / 0.4));
    transform: translate(0, 0);
    transition: all 0.05s linear;
  }
`

function MusicController({ sound, autoplay = false }: MusicControllerProps) {
  const audio = useMemo(() => new Audio(sound), [sound])

  const [isPlaying, setPlaying] = useState(autoplay)

  function playAudio() {
    let playPromise = audio.play()

    if (playPromise !== undefined) {
      playPromise.then().catch((e) => { console.log('err when playing', e) })
    }
  }

  useEffect(() => {
    if (isPlaying) {
      playAudio()
    }

    // We loop the music once it ends
    audio.addEventListener('ended', () => {
      playAudio()
    })

    return () => {
      audio.pause()
      audio.removeEventListener('ended', () => {
        audio.pause()
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [audio])

  function handleClick() {
    if (isPlaying) {
      audio.pause()
    } else {
      playAudio()
    }

    setPlaying(playing => !playing)
  }

  return (
    <SoundIcon
      onClick={handleClick}
      src={isPlaying ? VolumeImage : MuteImage} />
  )
}

export default MusicController;