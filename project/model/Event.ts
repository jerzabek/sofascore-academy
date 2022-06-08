import { Team } from "./Team"

export type Events = EventInfo[]

export type EventStatus = 'notstarted' | 'inprogress' | 'finished'
export type EventWinnerCode = 0 | 1 | 2 | 3

export type TeamScore = {
  display: number
}

export type EventInfo = {
  tournament: Tournament
  status: EventStatus
  winnerCode: EventWinnerCode
  homeTeam: Team
  awayTeam: Team
  homeScore: TeamScore
  awayScore: TeamScore
}

export type Tournament = {

}