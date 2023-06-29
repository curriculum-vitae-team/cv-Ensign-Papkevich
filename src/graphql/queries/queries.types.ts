import { IUser } from "../../interfaces/user.interface"
import { IDepartment } from "../../interfaces/department.interface"
import { IPosition } from "../../interfaces/position.interface"
import { ILanguage } from "../../interfaces/language.interface"
import { ISkill } from "../../interfaces/skill.interface"

export type UserQueryResult = {
  user: IUser
}

export type UsersQueryResult = {
  users: IUser[]
}

export type DepartmentQueryResult = {
  departments: IDepartment[]
}

export type PositionQueryResult = {
  positions: IPosition[]
}

export type LanguagesResult = {
  languages: ILanguage[]
}

export type SkillsResult = {
  skills: ISkill[]
}
