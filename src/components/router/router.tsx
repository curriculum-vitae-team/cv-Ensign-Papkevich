import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { SecurityObserver } from "@security/securityObserver"
import { Layout } from "@templates/layout"
import { Signup } from "@pages/auth/signup/signup"
import { Login } from "@pages/auth/login/login"
import { Employees } from "@pages/employees"
import { Profile } from "@pages/profile"
import { Languages } from "@pages/languages"
import { Statistics } from "@pages/statistics"
import { Skills } from "@pages/skills"
import { Departments } from "@pages/departments"
import { Positions } from "@pages/positions"

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
          <Route path="/main" element={<SecurityObserver />}>
            <Route path="" element={<Statistics />} />
          </Route>
          <Route path="/skills" element={<SecurityObserver />}>
            <Route path="" element={<Skills />} />
          </Route>
          <Route path="/departments" element={<SecurityObserver />}>
            <Route path="" element={<Departments />} />
          </Route>
          <Route path="/positions" element={<SecurityObserver />}>
            <Route path="" element={<Positions />} />
          </Route>
        </Route>
        <Route path="*" element={<Navigate to="/auth/login" />} />
      </Routes>
    </BrowserRouter>
  )
}
