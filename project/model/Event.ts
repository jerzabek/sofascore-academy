import { Category } from "./Category"
import { Team } from "./Team"

export type Events = {
  events: EventInfo[]
}

export type EventStatus = 'notstarted' | 'inprogress' | 'finished'
export type EventWinnerCode = 0 | 1 | 2 | 3

export type TeamScore = {
  display: number
}

export type EventInfo = {
  id: number
  tournament: Tournament
  status: {
    type: EventStatus
  }
  winnerCode: EventWinnerCode
  homeTeam: Team
  awayTeam: Team
  homeScore: TeamScore
  awayScore: TeamScore
  uniqueTournament?: UniqueTournament
}

export type Tournament = {
  id: number
  category: Category
  name: string
  slug: string
}

export type UniqueTournament = {
  id: number
  name: string
  slug: string
  category: Category
}