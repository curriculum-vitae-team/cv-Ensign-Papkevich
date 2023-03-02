import React, { FC } from "react"
import { IHiddenButtonProps } from "./hiddenButton.types"
import { Button } from "@mui/material"

export const HiddenButton: FC<IHiddenButtonProps> = ({
  children,
  isVisible,
  ...props
}) => {
  if (!isVisible) {
    return null
  }

  return (
    <Button {...props} variant="contained">
      {children}
    </Button>
  )
}
