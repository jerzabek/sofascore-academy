export type Team = {
  name: string
  slug: string
  shortName: string
  gender: string
  teamColors: TeamColors
}

export type TeamColors = {
  primary: string
  secondary: string
  text: string
}