import { IUser } from "../../interfaces/user.interface"
import { ILanguage } from "../../interfaces/language.interface"

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
