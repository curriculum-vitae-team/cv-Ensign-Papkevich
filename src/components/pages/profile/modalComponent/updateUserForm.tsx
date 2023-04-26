import { IUser } from "../../../../interfaces/user.interface"
import { Spinner } from "../../../ui/spinner"
import { useMutation } from "@apollo/client"
import { Button, TextField } from "@mui/material"
import { Form } from "./updateUserForm.styles"
import { useForm } from "react-hook-form"
import { SelectInputField } from "../../../templates/select-input-field/selectInputField"
import { useUpdateUserFormData } from "../../../../hooks/updateUserFormDataHook"

export const UpdateUserForm = ({ user, handleClose }) => {
  const setDefaultValues = (user: IUser | undefined) => ({
    first_name: user?.profile.first_name || "",
    last_name: user?.profile.last_name || "",
    department: user?.department?.name || "",
    position: user?.position?.name || "",
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: setDefaultValues(user),
  })

  const { loading, departmentsData, positionsData } = useUpdateUserFormData()

  const onSubmit = () => {
    console.log("Submit form")
  }
  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <Form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
          <TextField
            id="filled-basic"
            label="First Name"
            variant="filled"
            error={!!errors.first_name}
            helperText={
              errors.first_name ? String(errors.first_name.message) : ""
            }
            {...register("first_name")}
          />

          <TextField
            id="filled-basic"
            label="Last Name"
            variant="filled"
            error={!!errors.last_name}
            helperText={
              errors.last_name ? String(errors.last_name.message) : ""
            }
            {...register("last_name")}
          />

          <SelectInputField
            label="Position"
            registerName="position"
            register={register}
            defaultValue={""}
            data={positionsData!.positions}
          />

          <SelectInputField
            label="Department"
            registerName="department"
            register={register}
            defaultValue={""}
            data={departmentsData!.departments}
          />

          <Button type="submit" variant="contained" color="secondary">
            Submit
          </Button>
        </Form>
      )}
    </>
  )
}
