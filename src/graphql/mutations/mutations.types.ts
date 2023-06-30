import { IUser } from "../../interfaces/user.interface"
import { ILanguage } from "../../interfaces/language.interface"
import { ISkill } from "../../interfaces/skill.interface"
import { IDepartment } from "../../interfaces/department.interface"
import { IPosition } from "../../interfaces/position.interface"

export type CreateUserResult = {
  user: IUser
}

export type UpdateUserInput = {
  id: string
  user: {
    profile: {
      first_name: string
      last_name: string
    }
    departmentId: string
    positionId: string
  }
}

export type UpdateUserResult = {
  updatedUser: IUser
}

export type AvatarResult = {
  uploadAvatar: string
}

export type CreateLanguageResult = {
  createLanguage: ILanguage
}

export type CreateSkillResult = {
  createSkill: ISkill
}

export type CreateDepartmentResult = {
  createDepartment: IDepartment
}

export type CreatePositionResult = {
  createPosition: IPosition
}
