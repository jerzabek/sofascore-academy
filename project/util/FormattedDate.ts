/**
 * Returns current date formated as YYYY-MM-DD.
 * 
 * @returns Date formated as YYYY-MM-DD
 */
export default function getFormattedDate(): string {
  const date = new Date()

  // Adds '0' to single digit dates/months
  const year = date.getFullYear()
  const month = date.getMonth() < 10 ? '0' + date.getMonth() : date.getMonth()
  const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()

  return `${year}-${month}-${day}`
}