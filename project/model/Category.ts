import { Sport } from "./Sport"

export type Categories = {
  categories: CategoryInfo[]
}

export type Category = {
  alpha2: string
  flag: string
  id: number
  name: string
  priority: number
  slug: string
  sport: Sport
}

export type CategoryInfo = {
  category: Category
  totalEventPlayerStatistics: number
  totalEvents: number
  uniqueTournamentIds?: number[]
}
