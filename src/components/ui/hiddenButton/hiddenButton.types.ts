import { ReactNode } from "react"

export interface IHiddenButtonProps {
  children: ReactNode
  isVisible: boolean
  onClick: () => void
  disabled?: boolean
}
