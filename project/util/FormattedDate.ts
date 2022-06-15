/**
 * Returns current date formated as YYYY-MM-DD.
 * 
 * @returns Date formated as YYYY-MM-DD
 */
export default function getFormattedDate(): string {
  const date = new Date()

  // Adds '0' to single digit dates/months
  const year = date.getFullYear()
  const monthIndex = date.getMonth() + 1
  const month = monthIndex < 10 ? '0' + monthIndex : monthIndex
  const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()

  return `${year}-${month}-${day}`
}

export function getFormattedDateFrom(date: Date): string {
  // Adds '0' to single digit dates/months
  const monthIndex = date.getMonth() + 1
  const month = monthIndex < 10 ? '0' + monthIndex : monthIndex
  const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()

  return `${day}.${month}`
}

export function getFormattedTimeFrom(date: Date): string {
  // Adds '0' to single digit hours/minutes
  const hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
  const mins = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()

  return `${hours}:${mins}`
}