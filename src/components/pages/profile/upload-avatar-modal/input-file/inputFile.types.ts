import { ReactNode } from "react"
import { UseFormRegister } from "react-hook-form"
import { IAvatarForm } from "../uploadAvatar.types"

export interface IInputFileProps {
  children: ReactNode
  registerName: "picture"
  register: UseFormRegister<IAvatarForm>
}
