import * as React from "react"
import Box from "@mui/material/Box"
import Drawer from "@mui/material/Drawer"
import List from "@mui/material/List"
import Divider from "@mui/material/Divider"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemText from "@mui/material/ListItemText"
import { Link, Typography } from "@mui/material"
import PeopleAltIcon from "@mui/icons-material/PeopleAlt"
import * as Styled from "./sideMenu.styles"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import { IconButton } from "@mui/material"

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
          Menu
        </Typography>
      </Styled.SideBarHeader>
      {generateList(["Main"])}
      <Divider />
      {generateList(["Employees", "Departments", "Positions"])}
      <Divider />
      {generateList(["Languages", "Skills"])}
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
      <IconButton onClick={handleClickShowSideBar}>
        <MoreVertIcon />
      </IconButton>
    </>
  )
}
