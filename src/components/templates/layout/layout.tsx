import { Suspense, memo } from "react"
import { Container, CircularProgress } from "@mui/material"
import { Outlet } from "react-router-dom"
import { Header } from "@ui/header"

const Layout = () => {
  return (
    <>
      <Header />
      <Container maxWidth="xl">
        <Suspense fallback={<CircularProgress />}>
          <Outlet />
        </Suspense>
      </Container>
    </>
  )
}
export default memo(Layout)
