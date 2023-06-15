import { useReactiveVar } from "@apollo/client"
import { securityService } from "@security/securityService"

export const useUser = () => {
  const user = useReactiveVar(securityService.user$)
  return user
}
