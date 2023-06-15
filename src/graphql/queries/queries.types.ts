import { IUser } from "../../interfaces/user.interface"
import { IDepartment } from "../../interfaces/department.interface"
import { IPosition } from "../../interfaces/position.interface"
import { ILanguage } from "../../interfaces/language.interface"

export type UserQueryResult = {
  user: IUser
}

export type UsersQueryResult = {
  users: IUser[]
}

export type DepartmentQueryReturn = {
  departments: IDepartment[]
}

export type PositionQueryReturn = {
  positions: IPosition[]
}

export type LanguagesResult = {
  languages: ILanguage[]
}
