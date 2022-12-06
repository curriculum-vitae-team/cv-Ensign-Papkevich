import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { Signup } from "../pages/auth/signup/signup"
import { Login } from "../pages/auth/login/login"

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  )
}
