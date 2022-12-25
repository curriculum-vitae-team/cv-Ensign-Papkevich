import { Container } from "@mui/material"
import * as Styled from "./header.styles"
import { UserMenuList } from "../user_menu"

export const Header = () => {
  return (
    <Styled.Header>
      <Container maxWidth="xl">
        <Styled.LeftPart></Styled.LeftPart>
        <Styled.RightPart>
          <UserMenuList />
        </Styled.RightPart>
      </Container>
    </Styled.Header>
  )
}
