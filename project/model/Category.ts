import { Sport } from "./Sport"

export interface Categories {
  categories: CategoryInfo[]
}

export interface Category {
  alpha2: string
  flag: string
  id: number
  name: string
  priority: number
  slug: string
  sport: Sport
}

export interface CategoryInfo {
  category: Category
  totalEventPlayerStatistics: number
  totalEvents: number
  uniqueTournamentIds?: number[]
}
