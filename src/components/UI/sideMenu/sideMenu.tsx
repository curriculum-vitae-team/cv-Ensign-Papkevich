import * as React from "react"
import Box from "@mui/material/Box"
import Drawer from "@mui/material/Drawer"
import Button from "@mui/material/Button"
import List from "@mui/material/List"
import Divider from "@mui/material/Divider"
import ListItem from "@mui/material/ListItem"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemText from "@mui/material/ListItemText"
import { Link, Typography } from "@mui/material"
import PeopleAltIcon from "@mui/icons-material/PeopleAlt"
import * as Styled from "./sideMenu.styles"
import { StyleRounded } from "@mui/icons-material"

export default function SideBar() {
  const [isOpened, setIsOpened] = React.useState(false)
  const handleClickShowSideBar = () => {
    setIsOpened(!isOpened)
  }

  const generateList = (items: Array<string>) => {
    return (
      <List>
        {items.map((text) => (
          <Link
            href={"/".concat(text.toLowerCase()).concat("/")}
            underline="none"
            key={text}
          >
            <ListItemButton>
              <ListItemText primary={text} />
            </ListItemButton>
          </Link>
        ))}
      </List>
    )
  }

  const list = () => (
    <Box>
      <Styled.SideBarHeader>
        <PeopleAltIcon />
        <Typography variant="h6" sx={{ mt: "-2%" }}>
          Employees
        </Typography>
      </Styled.SideBarHeader>
      {generateList(["Projects", "CVs"])}
      <Divider />
      {generateList(["Departments", "Positions", "Skills", "Languages"])}
    </Box>
  )

  return (
    <>
      <Drawer
        open={isOpened}
        onClose={handleClickShowSideBar}
        PaperProps={{
          sx: { width: "17%", alignItems: "center", pt: "2%" },
        }}
      >
        {list()}
      </Drawer>
      <Button onClick={handleClickShowSideBar}>Btn</Button>
    </>
  )
}
