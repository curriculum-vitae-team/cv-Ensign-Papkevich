import { Header } from "../../ui/header"
import { Container } from "@mui/material"
import { Suspense, memo } from "react"
import { Outlet } from "react-router-dom"
import { SpinnerDotted } from "spinners-react"

const Layout = () => {
  return (
    <>
      <Header />
      <Container maxWidth="xl">
        <Suspense fallback={<SpinnerDotted />}>
          <Outlet />
        </Suspense>
      </Container>
    </>
  )
}
export default memo(Layout)
