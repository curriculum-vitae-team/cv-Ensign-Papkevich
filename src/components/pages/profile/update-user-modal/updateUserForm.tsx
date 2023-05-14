import { useForm } from "react-hook-form"
import { useMutation } from "@apollo/client"
import { Button, TextField } from "@mui/material"
import { IUser } from "@interfaces/user.interface"
import { Spinner } from "@ui/spinner"
import { Form } from "./updateUserForm.styles"
import { SelectInputField } from "@templates/select-input-field/selectInputField"
import {
  UpdateUserInput,
  UpdateUserResult,
} from "@graphql/mutations/mutations.types"
import { UPDATE_USER_MUTATION } from "@graphql/mutations/updateUser"
import { UpdateUserFormValues } from "./updateUserForm.types"
import { USER_QUERY } from "@graphql/queries/user"

export const UpdateUserForm = ({
  user,
  handleClose,
  positionsData,
  departmentsData,
  id,
}) => {
  const setDefaultValues = (user: IUser | undefined) => ({
    first_name: user?.profile.first_name || "",
    last_name: user?.profile.last_name || "",
    department: user?.department?.name || "",
    position: user?.position?.name || "",
  })

  const [updateUser, { loading }] = useMutation<
    UpdateUserResult,
    UpdateUserInput
  >(UPDATE_USER_MUTATION, {
    refetchQueries: [
      {
        query: USER_QUERY,
        variables: { id },
      },
    ],
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: setDefaultValues(user),
  })

  const onSubmit = async (inputs: UpdateUserFormValues) => {
    try {
      const { data } = await updateUser({
        variables: {
          id: user.id,
          user: {
            profile: {
              first_name: inputs.first_name,
              last_name: inputs.last_name,
            },
            departmentId: inputs.department,
            positionId: inputs.position,
          },
        },
      })

      if (data) {
        reset(setDefaultValues(data.updatedUser))
      }
      handleClose()
    } catch (error) {
      console.error(error)
    }
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
            data={positionsData!.positions}
          />

          <SelectInputField
            label="Department"
            registerName="department"
            register={register}
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
