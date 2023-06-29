import { IUser } from "@interfaces/user.interface"

export const countUsersByRole = (
  users: IUser[]
): { id: string; value: number }[] => {
  const roles: { [role: string]: number } = {}
  users.forEach((user) => {
    const role = user.role
    if (roles[role]) {
      roles[role]++
    } else {
      roles[role] = 1
    }
  })

  const usersByRole = Object.keys(roles).map((role) => ({
    id: role,
    value: roles[role],
  }))

  return usersByRole
}
