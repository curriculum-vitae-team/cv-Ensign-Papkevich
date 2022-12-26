import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { Signup } from "../pages/auth/signup/signup"
import { Login } from "../pages/auth/login/login"
import { Example } from "../pages/example"
import { Employees } from "../pages/employees"
import { SecurityObserver } from "../../security/securityObserver"


export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth">
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/signup" element={<Signup />} />
        </Route>
        <Route path="" element={<SecurityObserver />}>
          <Route path="/" element={<Login />} />
          <Route path="/example" element={<Example />} />
          <Route path="/employees" element={<Employees />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
