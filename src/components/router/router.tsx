import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { Signup } from "../pages/auth/signup/signup"
import { Login } from "../pages/auth/login/login"
import { Example } from "../pages/example"

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={
            localStorage.getItem("access_token") == null ? (
              <Login />
            ) : (
              <Example />
            )
          }
        />
        <Route
          path="/"
          element={
            localStorage.getItem("access_token") == null ? (
              <Login />
            ) : (
              <Example />
            )
          }
        />
        <Route path="/signup" element={<Signup />} />
        <Route path="/example" element={<Example />} />
      </Routes>
    </BrowserRouter>
  )
}
