import Link from "next/link"
import { useEffect, useState } from "react"
import styled from "styled-components"
import { LiveIndicator } from "../../components/Category"
import { TournamentEvent, TournamentEventBody, TournamentEventStatus, TournamentName, VerticalBorder } from "../../components/Tournament"
import { MediumText, MutedText, SmallText } from "../../components/Typography"
import { EventInfo, Tournament } from "../../model/Event"
import getFormattedDate, { getFormattedDateFrom, getFormattedTimeFrom } from "../../util/FormattedDate"
import isToday from "../../util/IsToday"

export interface TournamentData {
  id: number
  tournament: Tournament
  events: EventInfo[]
}

interface TournamentProps {
  tournament: TournamentData
}

export default function TournamentPreview({ tournament }: TournamentProps) {
  return (
    <div>
      <TournamentName>{tournament.tournament.name}</TournamentName>
      <hr />
      {
        tournament.events && tournament.events.map(event => (
          <Event key={tournament.tournament.id + "-" + event.id} event={event} />
        ))
      }
    </div>
  )
}

interface EventProps {
  event: EventInfo
}

function scoreAvailable(event: EventInfo): boolean {
  return event.status.type == 'finished' || event.status.type == 'inprogress'
}

function Event({ event }: EventProps) {
  const [isScoreAvailable, setScoreAvailable] = useState(scoreAvailable(event))
  const [startTime, setStartTime] = useState('-')
  const [startDate, setStartDate] = useState<string>()

  useEffect(() => {
    const date = new Date(0)
    date.setUTCSeconds(event.startTimestamp)

    setStartTime(getFormattedTimeFrom(date))

    if (!isToday(date) || event.status.type === 'finished') {
      setStartDate(getFormattedDateFrom(date))
    }
  }, [event])

  return (
    <TournamentEvent>
      <TournamentEventStatus>
        {
          startDate && (
            <p>{startDate}</p>
          )
        }
        {
          event.status.type === 'inprogress' ? (
            <LiveIndicator>LIVE!</LiveIndicator>
          ) : event.status.type === 'finished' ? (
            <p><MutedText>Finished</MutedText></p>
          ) : (
            <p><MutedText>{startTime}</MutedText></p>
          )
        }
      </TournamentEventStatus>
      <VerticalBorder></VerticalBorder>
      <TournamentEventBody>
        <p><MediumText>
          {
            event.winnerCode == 2 ? (
              <MutedText>{event.homeTeam.name}</MutedText>
            ) : (
              event.homeTeam.name
            )
          }
        </MediumText></p>

        <p><MediumText>
          {
            event.winnerCode == 1 ? (
              <MutedText>{event.awayTeam.name}</MutedText>
            ) : (
              event.awayTeam.name
            )
          }
        </MediumText></p>
      </TournamentEventBody>

      {
        isScoreAvailable && (
          <>
            <VerticalBorder></VerticalBorder>
            <p>{event.homeScore.display}:{event.awayScore.display}</p>
          </>
        )
      }

      <VerticalBorder></VerticalBorder>

      <Link href={`/event/${event.id}`}>Link na event</Link>
    </TournamentEvent>
  )
}