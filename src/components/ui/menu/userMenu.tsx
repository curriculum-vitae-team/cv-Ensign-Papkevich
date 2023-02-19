import { MouseEvent, useState, useCallback } from "react"
import {
  Paper,
  MenuItem,
  Typography,
  Avatar,
  Menu,
  Divider,
} from "@mui/material"
import { useReactiveVar } from "@apollo/client"
import { securityService } from "../../../security/securityService"

export const UserMenuList = () => {
  const user = useReactiveVar(securityService.user$)

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const open = Boolean(anchorEl)

  const handleClick = useCallback((event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }, [])

  const handleClose = useCallback(() => {
    setAnchorEl(null)
  }, [])

  const handleLogout = useCallback(() => {
    securityService.clearStorage()
  }, [])
  // TO_DO: Add navigation to pages onClick

  return (
    <>
      <Typography color="white" sx={{ mr: 2 }}>
        {user?.profile.full_name || user?.email}
      </Typography>
      <Avatar
        src={user?.profile.avatar}
        sx={{ backgroundColor: "#C8E0F4", cursor: "pointer" }}
        onClick={handleClick}
      >
        {user?.profile.full_name?.[0] || user?.email[0]}
      </Avatar>
      <Paper>
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
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
          <MenuItem>Profile</MenuItem>
          <MenuItem>Settings</MenuItem>
          <Divider />
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </Paper>
    </>
  )
}
