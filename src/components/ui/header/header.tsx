import { Container } from "@mui/material"
import * as Styled from "./header.styles"
import { UserMenuList } from "../menu"
import SideBar from "../sideMenu/sideMenu"

export const Header = () => {
  return (
    <Styled.Header>
      <Container maxWidth="xl">
        <Styled.LeftPart>
          <SideBar />
        </Styled.LeftPart>
        <Styled.RightPart>
          <UserMenuList />
        </Styled.RightPart>
      </Container>
    </Styled.Header>
  )
}
