import { IUserProfile } from "./profile.interface"
import { UserRole } from "@constants/userRole.constant"
import { IDepartment } from "./department.interface"
import { IPosition } from "./position.interface"

export interface IUser {
  id: string
  created_at: string
  email: string
  is_verified: boolean
  profile: IUserProfile
  department: IDepartment
  department_name?: string
  position: IPosition
  position_name?: string
  role: UserRole
}
