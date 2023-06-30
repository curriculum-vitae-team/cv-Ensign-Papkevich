import { IUser } from "@interfaces/user.interface"

export const countUsersByDepartment = (
  users: IUser[]
): { department: string; count: number }[] => {
  const departments: { [department: string]: number } = {}
  users.forEach((user) => {
    const department = user.department_name
    if (department) {
      if (departments[department]) {
        departments[department]++
      } else {
        departments[department] = 1
      }
    }
  })

  const data = Object.keys(departments).map((department) => ({
    department,
    count: departments[department],
  }))

  return data
}
