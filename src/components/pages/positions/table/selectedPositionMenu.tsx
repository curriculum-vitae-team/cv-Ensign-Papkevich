import { memo, MouseEvent, useState, useCallback } from "react"
import { Paper, Menu, IconButton } from "@mui/material"
import { MoreVert } from "@mui/icons-material"
import { selectedPositionMenuProps } from "./selectedPositionMenu.types"

export const SelectedPositionMenu = ({
  children,
}: selectedPositionMenuProps) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const open = Boolean(anchorEl)

  const handleOpen = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = useCallback(() => {
    setAnchorEl(null)
  }, [])

  return (
    <>
      <IconButton onClick={handleOpen}>
        <MoreVert />
      </IconButton>
      <Paper>
        <Menu
          anchorEl={anchorEl}
          id="position-menu"
          open={open}
          onClick={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              minWidth: 100,
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "&:before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          {children}
        </Menu>
      </Paper>
    </>
  )
}

export default memo(SelectedPositionMenu)
