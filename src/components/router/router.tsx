import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { SecurityObserver } from "@security/securityObserver"
import { Layout } from "@templates/layout"
import { Signup } from "@pages/auth/signup/signup"
import { Login } from "@pages/auth/login/login"
import { Employees } from "@pages/employees"
import { Profile } from "@pages/profile"
import { Languages } from "@pages/languages"

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth">
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/signup" element={<Signup />} />
        </Route>
        <Route element={<Layout />}>
          <Route path="/employees" element={<SecurityObserver />}>
            <Route path="" element={<Employees />} />
            <Route path=":id/profile" element={<Profile />} />
          </Route>
          <Route path="/languages" element={<SecurityObserver />}>
            <Route path="" element={<Languages />} />
          </Route>
        </Route>
        <Route path="*" element={<Navigate to="/auth/login" />} />
      </Routes>
    </BrowserRouter>
  )
}
