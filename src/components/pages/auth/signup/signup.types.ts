import { AuthFormValues } from "../auth.types"

export interface SignUpFormValues extends AuthFormValues {
  confirm_password: string
}
