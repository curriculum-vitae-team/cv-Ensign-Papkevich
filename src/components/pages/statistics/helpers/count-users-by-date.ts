import { ICalendarDatum } from "@interfaces/calendar-datum.interface"
import { IUser } from "@interfaces/user.interface"

export const countUsersByDate = (users: IUser[]): ICalendarDatum[] => {
  const userCountByDate: { [date: string]: number } = {}
  users.forEach((user) => {
    const createdAt = new Date(Number(user.created_at))
      .toISOString()
      .slice(0, 10)
    if (userCountByDate[createdAt]) {
      userCountByDate[createdAt]++
    } else {
      userCountByDate[createdAt] = 1
    }
  })

  const createdUsersByDate: ICalendarDatum[] = Object.keys(userCountByDate).map(
    (date) => ({
      day: date,
      value: userCountByDate[date],
    })
  )

  return createdUsersByDate
}
