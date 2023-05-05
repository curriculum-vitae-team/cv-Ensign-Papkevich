import { useReactiveVar } from "@apollo/client"
import { securityService } from "@security/securityService"
import { UserRole } from "@constants/userRole.constant"

export const userIsAdmin = () => {
  const user = useReactiveVar(securityService.user$)
  return user?.role === UserRole.Admin
}
