import { Header } from "../../ui/header"
import { Container, CircularProgress } from "@mui/material"
import { Suspense, memo } from "react"
import { Outlet } from "react-router-dom"


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
