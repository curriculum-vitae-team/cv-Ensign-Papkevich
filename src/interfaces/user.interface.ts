import { IUserProfile } from "./user_profile.interface"
import { UserRole } from "../constants/user_role.constant"

export interface IUser {
  id: string
  created_at: string
  email: string
  is_verified: boolean
  profile: IUserProfile
  department_name: string
  position_name: string
  role: UserRole
}
