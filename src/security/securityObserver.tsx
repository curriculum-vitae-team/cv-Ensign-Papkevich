import { useReactiveVar } from "@apollo/client"
import { Outlet, Navigate } from "react-router-dom"
import { securityService } from "./securityService"

export const SecurityObserver = () => {
  const access_token = useReactiveVar(securityService.access_token$)

  if (access_token) {
    return <Outlet />
  }

  return <Navigate to="/auth/login" />
}
