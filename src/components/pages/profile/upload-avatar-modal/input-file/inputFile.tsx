import { FC } from "react"
import * as Styled from "./inputFile.styles"
import { IInputFileProps } from "./inputFile.types"

export const InputFile: FC<IInputFileProps> = ({
  children,
  register,
  registerName,
}) => {
  return (
    <Styled.InputFileArea component="label">
      {children}
      <input
        type="file"
        hidden
        accept="image/png, image/jpeg, image/jpg, image/gif"
        {...register(registerName)}
      />
    </Styled.InputFileArea>
  )
}
